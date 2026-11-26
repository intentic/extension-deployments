import { keyedLock } from "@intentic/base/async";
import { errorMessage } from "@intentic/base/errors";
import { type CiDeploymentStateWire, DaemonRefusal } from "../../deploysWire.js";
import type { DeploysDaemon } from "./daemon.js";
import type { DeploysEngine } from "./engine.js";
import { type Git, manifestAt, repoFolder, runGit } from "./git.js";
import type { Logger } from "./lanes.js";
import type { StackSpec } from "./manifest.js";
import type { DeployRecord } from "./records.js";
import { type DeployWatchStore, FORGE_REPORTS_KEPT, type ForgeReport } from "./watch-store.js";

/* EACH DEPLOY ON THE FORGE ITS COMMIT CAME FROM, through the daemon's CI connection (POST /ci/deployments): a GitHub
   Deployment of the commit to an environment named after the stack (production unless the name says staging) and its
   statuses, or a GitLab commit status `deploy/<stack>`. Told when it starts (`in_progress`) and when it ends: `success`,
   `failure` (failed, rolled back, refused) or `inactive` (replaced while it waited, once it had started there). The
   environment URL is the origin of the stack's first health URL that is not loopback; the deployment's page link points
   back at this board (`/ext/deployments?repo=&stack=`) when the sandbox's address is known. The record keeps where the
   forge shows it (`forgeUrl`). Nothing here fails a deploy: a token without the scope is shown as a problem on the
   repository's environments until a report there works again; a repository with no CI connection is left alone. */

export interface ForgeDeps {
    readonly root: string;
    readonly engine: Pick<DeploysEngine, "noteForgeUrl" | "setForgeProblem">;
    readonly daemon: Pick<DeploysDaemon, "reportDeployment">;
    readonly store: DeployWatchStore;
    // The sandbox's public address, when it is known: the base of the board's link.
    readonly publicUrl?: (() => string | undefined) | undefined;
    readonly logger: Logger;
    readonly git?: Git | undefined;
}

export const forgeStateOf = (record: Pick<DeployRecord, "outcome">): CiDeploymentStateWire | undefined => {
    switch (record.outcome) {
        case "running":
            return "in_progress";
        case "succeeded":
            return "success";
        case "failed":
        case "rolled-back":
        case "refused":
            return "failure";
        case "superseded":
            return "inactive";
        default:
            return undefined;
    }
};

const LOOPBACK = /^(?:localhost|127\.\d+\.\d+\.\d+|\[::1\]|0\.0\.0\.0)$/iu;

// Where the stack answers from outside: the origin of its first health URL that is not loopback.
export const environmentUrlOf = (spec: Pick<StackSpec, "health"> | undefined): string | undefined => {
    for (const url of spec?.health?.http ?? []) {
        const parsed = URL.canParse(url) ? new URL(url) : undefined;
        if (parsed !== undefined && !LOOPBACK.test(parsed.hostname)) {
            return parsed.origin;
        }
    }
    return undefined;
};

// One line for the forge's status, at most what GitHub keeps (140 characters).
const descriptionOf = (record: DeployRecord): string => {
    const said = record.error?.split("\n")[0] ?? (record.outcome === "running" ? `Deploying ${record.commit.slice(0, 8)} by Intentic` : `Deploy ${record.outcome}`);
    return said.length > 140 ? `${said.slice(0, 139)}…` : said;
};

// The board's link for a stack, on the sandbox's own address.
export const boardLinkOf = (base: string, record: Pick<DeployRecord, "repo" | "stack">): string =>
    `${base.replace(/\/+$/u, "")}/ext/deployments?repo=${encodeURIComponent(record.repo)}&stack=${encodeURIComponent(record.stack)}`;

// A refusal the owner mends with the token's scopes, rather than one about this commit or the forge being down.
const scopeRefusal = (error: unknown): boolean => error instanceof DaemonRefusal && (error.status === 401 || error.status === 403);
// A repository the daemon reports nothing for (no CI connection maps it), or a sandbox without the route.
const notMapped = (error: unknown): boolean => error instanceof DaemonRefusal && (error.status === 404 || error.bare);

export const createForgeReports = (deps: ForgeDeps) => {
    const git = deps.git ?? runGit;
    // One record's reports in order: its deployment before its statuses.
    const inOrder = keyedLock<string>();
    // Repositories whose failure is logged already, until a report there works.
    const logged = new Set<string>();

    const specOf = async (record: DeployRecord): Promise<StackSpec | undefined> => {
        const read = await repoFolder(deps.root, record.repo)
            .then((dir) => manifestAt(dir, record.commit, git))
            // The URL is an extra on the forge's page; a status without it still says how the deploy went.
            .catch(() => undefined);
        return read?.kind === "read" ? read.manifest.stacks.find((stack) => stack.name === record.stack) : undefined;
    };

    const report = async (record: DeployRecord): Promise<void> => {
        const state = forgeStateOf(record);
        const held = (await deps.store.read()).forge.find((entry) => entry.id === record.id);
        // Told already, or replaced before it ever started there: nothing new for the forge.
        if (state === undefined || held?.reported === state || (held === undefined && state === "inactive") || !/^[0-9a-f]{40,64}$/u.test(record.commit)) {
            return;
        }
        const environmentUrl = environmentUrlOf(await specOf(record));
        const base = deps.publicUrl?.();
        let answer: { readonly deploymentId?: number | undefined; readonly url?: string | undefined };
        try {
            answer = await deps.daemon.reportDeployment({
                repo: record.repo,
                sha: record.commit,
                environment: record.stack,
                state,
                production: !record.stack.includes("staging"),
                description: descriptionOf(record),
                ...(environmentUrl === undefined ? {} : { environmentUrl }),
                ...(base === undefined ? {} : { logUrl: boardLinkOf(base, record) }),
                ...(held?.deployment === undefined ? {} : { deploymentId: held.deployment }),
            });
        } catch (error) {
            if (notMapped(error)) {
                return;
            }
            if (scopeRefusal(error)) {
                deps.engine.setForgeProblem(record.repo, `The forge refused this repository's deploy reports: ${errorMessage(error)}`);
            }
            if (!logged.has(record.repo)) {
                logged.add(record.repo);
                deps.logger.warn(`deploys: the forge was not told of ${record.id}: ${errorMessage(error)}`);
            }
            return;
        }
        logged.delete(record.repo);
        deps.engine.setForgeProblem(record.repo, undefined);
        const deployment = answer.deploymentId ?? held?.deployment;
        const kept: ForgeReport = { id: record.id, ...(deployment === undefined ? {} : { deployment }), reported: state };
        await deps.store.update((current) => ({ ...current, forge: [...current.forge.filter((entry) => entry.id !== record.id), kept].slice(-FORGE_REPORTS_KEPT) }));
        if (answer.url !== undefined && record.forgeUrl === undefined) {
            await deps.engine.noteForgeUrl(record.id, answer.url);
        }
    };

    return {
        // Every record as the engine writes it; never rejects.
        recorded: (record: DeployRecord): Promise<void> =>
            inOrder(record.id, () => report(record)).catch((error: unknown) => deps.logger.warn(`deploys: a forge report for ${record.id} stopped: ${errorMessage(error)}`)),
    };
};
