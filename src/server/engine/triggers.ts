import { keyedLock } from "@intentic/base/async";
import { errorMessage } from "@intentic/base/errors";
import type { DeploysEngine, EnqueueRequest } from "./engine.js";
import { exactCommit, type Git, holds, manifestAt, repoFolder, runGit } from "./git.js";
import type { Logger } from "./lanes.js";
import type { CiTrigger, StackSpec } from "./manifest.js";
import type { DeployRecord } from "./records.js";

/* WHAT STARTS A DEPLOY BY ITSELF, FROM CI AND FROM ANOTHER STACK (manifest.ts DeployTriggerSchema `ci`, `after`): no
   turn and no person in the path, so the time from CI publishing an image to the deploy starting is a frame on the
   daemon's CI feed (ci-feed.ts) and a few git reads.

   - `ci`: a job that passed deploys every stack whose trigger names that job on that branch, the moment the job ends; a
     trigger naming no job deploys when the whole run passes. `workflow` narrows on GitHub's workflow name; GitLab names
     none, so there a trigger is not narrowed by it. Stacks are read off the repository's manifest at HEAD, as the board
     lists them; the deploy itself reads the manifest of the commit it deploys.
   - `after`: a stack that deploys successfully (other than a rollback) deploys each stack of its repository that follows
     it, at its commit and with its images pinned to the digests it ran.

   A commit never replaces a newer one: when the stack's last successful deploy, or the one running or waiting, is on
   this commit or one that contains it, the event is skipped with a log line. CI deploys a commit to a stack at most
   once (a frame heard twice, a job and its run both passing, a run caught up after a reconnect), and one repository's
   events are handled one at a time, so that check reads what the event before it queued. */

// A CI job or run that passed, as the feed said it.
export interface CiPass {
    readonly host: string;
    // The workspace repository.
    readonly repo: string;
    readonly branch: string;
    readonly sha: string;
    readonly runId: number;
    // GitHub's workflow name; absent on GitLab.
    readonly workflow?: string | undefined;
    // The job that passed, by name; absent when the whole run passed.
    readonly job?: string | undefined;
    readonly url?: string | undefined;
}

export interface TriggerDeps {
    readonly root: string;
    readonly engine: Pick<DeploysEngine, "enqueue" | "records">;
    readonly fetchRemote: (dir: string) => Promise<string | undefined>;
    readonly logger: Logger;
    readonly git?: Git | undefined;
}

// Whether a stack's `ci` trigger asks for this pass: its branch, its workflow where the forge names one, and its job,
// or the whole run when it names none.
export const ciTriggerMatches = (trigger: CiTrigger, pass: Pick<CiPass, "branch" | "workflow" | "job">): boolean => {
    if (trigger.branch !== pass.branch) {
        return false;
    }
    if (trigger.workflow !== undefined && pass.workflow !== undefined && trigger.workflow !== pass.workflow) {
        return false;
    }
    return trigger.job === undefined ? pass.job === undefined : pass.job === trigger.job;
};

// One line naming what passed, for the record.
const ciDetail = (pass: CiPass): string => {
    const what = pass.job === undefined ? "the run" : `job "${pass.job}"`;
    const where = pass.workflow === undefined ? "" : ` of "${pass.workflow}"`;
    return `${what}${where} passed on ${pass.branch} (run ${pass.runId})`.slice(0, 300);
};

// What the stack stands on now: the deploy running or waiting, and its last successful one.
const standingOf = (records: readonly DeployRecord[], repo: string, stack: string): DeployRecord[] => {
    const own = records.filter((record) => record.repo === repo && record.stack === stack);
    const active = own.find((record) => record.outcome === "running") ?? own.find((record) => record.outcome === "queued");
    const current = own.find((record) => record.outcome === "succeeded");
    return [active, current].filter((record): record is DeployRecord => record !== undefined);
};

const sameImages = (left: Readonly<Record<string, string>> | undefined, right: Readonly<Record<string, string>> | undefined): boolean =>
    JSON.stringify(Object.entries(left ?? {}).toSorted()) === JSON.stringify(Object.entries(right ?? {}).toSorted());

// Events heard, by key, so a frame heard twice is dropped before any git runs.
const HEARD_KEPT = 2000;

export const createDeployTriggers = (deps: TriggerDeps) => {
    const git = deps.git ?? runGit;
    const inOrder = keyedLock<string>();
    const heard = new Set<string>();
    const hear = (key: string): boolean => {
        if (heard.has(key)) {
            return false;
        }
        heard.add(key);
        if (heard.size > HEARD_KEPT) {
            heard.delete(heard.values().next().value as string);
        }
        return true;
    };

    // The standing deploy of the stack that already holds `commit` (with `images`, for a promotion), or undefined.
    const supersedes = async (dir: string, records: readonly DeployRecord[], request: EnqueueRequest & { readonly commit: string }): Promise<DeployRecord | undefined> => {
        for (const record of standingOf(records, request.repo, request.stack)) {
            if (record.commit === request.commit) {
                if (request.pins === undefined || sameImages(record.digests ?? record.pins, request.pins)) {
                    return record;
                }
                continue;
            }
            const held = await holds(dir, record.commit, request.commit, git);
            if (held === "unknown") {
                deps.logger.warn(`deploys: could not tell whether ${record.commit.slice(0, 12)} holds ${request.commit.slice(0, 12)}; deploying`);
            } else if (held) {
                return record;
            }
        }
        return undefined;
    };

    // Each stack the manifest at HEAD declares that `wanted` picks, read in the repository's folder.
    const declared = async (repo: string, wanted: (spec: StackSpec) => boolean): Promise<{ readonly dir: string; readonly stacks: readonly StackSpec[] }> => {
        const dir = await repoFolder(deps.root, repo);
        const read = await manifestAt(dir, "HEAD", git);
        return { dir, stacks: read.kind === "read" ? read.manifest.stacks.filter(wanted) : [] };
    };

    const enqueueUnlessHeld = async (dir: string, request: EnqueueRequest & { readonly commit: string }): Promise<DeployRecord | undefined> => {
        const records = await deps.engine.records();
        // CI deploys a commit to a stack once, whatever came of it: a failed one is not tried again by the run passing.
        const ciAlready =
            request.trigger.kind === "ci" &&
            records.some((record) => record.repo === request.repo && record.stack === request.stack && record.commit === request.commit && record.trigger.kind === "ci");
        const held = ciAlready ? undefined : await supersedes(dir, records, request);
        if (ciAlready || held !== undefined) {
            deps.logger.info?.(
                `deploys: skipped ${request.repo} ${request.stack} at ${request.commit.slice(0, 12)} (${request.trigger.kind}): ${ciAlready ? "CI already deployed this commit here" : `it already runs or waits on this commit or a newer one (${held?.id ?? ""})`}`,
            );
            return undefined;
        }
        return await deps.engine.enqueue(request);
    };

    // A CI job or run passed: each stack it triggers, queued at its commit.
    const ciPassedNow = async (pass: CiPass): Promise<DeployRecord[]> => {
        const { dir, stacks } = await declared(pass.repo, (spec) => spec.triggers.some((trigger) => "ci" in trigger && ciTriggerMatches(trigger.ci, pass)));
        if (stacks.length === 0) {
            return [];
        }
        // Fetched once for every stack it triggers: the ancestry check needs the commit here as much as the deploy does.
        const commit = await exactCommit(dir, pass.repo, pass.sha, () => deps.fetchRemote(dir), git);
        const queued: DeployRecord[] = [];
        for (const spec of stacks) {
            const trigger = { kind: "ci" as const, detail: ciDetail(pass), ...(pass.url === undefined ? {} : { url: pass.url }) };
            try {
                const record = await enqueueUnlessHeld(dir, { repo: pass.repo, stack: spec.name, commit, ref: pass.branch, trigger });
                queued.push(...(record === undefined ? [] : [record]));
            } catch (error) {
                deps.logger.warn(`deploys: a passing CI run could not queue ${pass.repo} ${spec.name} at ${commit.slice(0, 12)}: ${errorMessage(error)}`);
            }
        }
        return queued;
    };

    // A stack came up: each stack of its repository that follows it, at its commit and on its images.
    const followNow = async (record: DeployRecord): Promise<DeployRecord[]> => {
        const { dir, stacks } = await declared(record.repo, (spec) => spec.triggers.some((trigger) => "after" in trigger && trigger.after.stack === record.stack));
        const queued: DeployRecord[] = [];
        for (const spec of stacks) {
            const trigger = { kind: "after" as const, detail: `after ${record.stack} (${record.id})` };
            try {
                const request = { repo: record.repo, stack: spec.name, commit: record.commit, ref: record.ref, pins: record.digests, trigger };
                const queuedOne = await enqueueUnlessHeld(dir, request);
                queued.push(...(queuedOne === undefined ? [] : [queuedOne]));
            } catch (error) {
                deps.logger.warn(`deploys: a promotion after ${record.id} could not queue ${spec.name}: ${errorMessage(error)}`);
            }
        }
        return queued;
    };

    return {
        // What it queued; a failure is logged, never thrown: nobody waits on a feed frame's afterthought.
        ciPassed: (pass: CiPass): Promise<DeployRecord[]> => {
            const key = `${pass.host}:${pass.repo}:${pass.runId}:${pass.job === undefined ? "run" : `job:${pass.job}`}`;
            if (!hear(key)) {
                return Promise.resolve([]);
            }
            return inOrder(pass.repo, () => ciPassedNow(pass)).catch((error: unknown) => {
                // Not heard after all: a later frame may find the remote or the repository readable again.
                heard.delete(key);
                deps.logger.warn(`deploys: a passing CI run of ${pass.repo} at ${pass.sha.slice(0, 12)} was not read for deploys: ${errorMessage(error)}`);
                return [];
            });
        },
        // Every record as the engine writes it; acts on each successful one once.
        recorded: (record: DeployRecord): Promise<DeployRecord[]> => {
            if (record.outcome !== "succeeded" || record.trigger.kind === "rollback" || !hear(`after:${record.id}`)) {
                return Promise.resolve([]);
            }
            return inOrder(record.repo, () => followNow(record)).catch((error: unknown) => {
                deps.logger.warn(`deploys: the stacks following ${record.id} were not read: ${errorMessage(error)}`);
                return [];
            });
        },
    };
};
