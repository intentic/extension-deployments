import { createHash } from "node:crypto";
import { errorMessage } from "@intentic/base/errors";
import type { DeploysDaemon } from "./daemon.js";
import type { DeploysEngine } from "./engine.js";
import { secretsChangedMessageOf } from "./events.js";
import type { DeclaredStack } from "./git.js";
import type { Logger } from "./lanes.js";
import type { StackSpec } from "./manifest.js";
import type { DeployRecord } from "./records.js";
import type { DeployWatchStore } from "./watch-store.js";

/* A SECRET ROTATED UNDER A RUNNING STACK (manifest.ts `onSecretChange`). The extension never holds a value: a managed
   deploy answers a keyed MARK of each value it filled (the daemon's HMAC under a key only it holds), kept on the record,
   and every minute the daemon is asked for the marks of those names now (POST /secrets/marks, names only). A name whose
   mark differs (changed, or no longer held) is on the board as changed (`secretsChanged`) until the stack deploys
   again, and each new change is acted on once, as the manifest at HEAD says: `redeploy` queues the stack again at the
   commit and images it runs (trigger `secret-change`), `notify` tells the owner's automations (`secrets_changed`).

   A redeploy is left to a deploy already waiting for the stack, which fills the new value anyway; one running now may
   have filled the old one, so the redeploy waits behind it, at its commit. */

export interface RotationDeps {
    readonly engine: Pick<DeploysEngine, "enqueue" | "records" | "setSecretsChanged">;
    readonly daemon: Pick<DeploysDaemon, "marks" | "dispatch">;
    readonly store: DeployWatchStore;
    readonly logger: Logger;
}

// What a name nothing holds marks as now: no HMAC ever reads so.
const ABSENT = "absent";
// How many names one marks call carries (the route's own bound).
const MARKS_PER_CALL = 200;

// A change already acted on, by its names and marks: an id for its one event, derived from marks only.
const changeId = (fresh: readonly (readonly [string, string])[]): string =>
    createHash("sha256")
        .update(fresh.map(([name, mark]) => `${name}=${mark}`).join("\n"))
        .digest("hex")
        .slice(0, 16);

interface Watched {
    readonly declared: DeclaredStack;
    // The stack's last successful deploy, whose marks are what it runs with.
    readonly current: DeployRecord & { readonly secretMarks: Readonly<Record<string, string>> };
}

export const createRotationWatch = (deps: RotationDeps) => {
    // `redeploy`: queued again at what it runs, unless a deploy already waits; whether the change is now acted on.
    const redeploy = async (repo: string, stack: string, names: readonly string[]): Promise<boolean> => {
        const own = (await deps.engine.records()).filter((record) => record.repo === repo && record.stack === stack);
        if (own.some((record) => record.outcome === "queued")) {
            return true;
        }
        const target = own.find((record) => record.outcome === "running") ?? own.find((record) => record.outcome === "succeeded");
        if (target === undefined) {
            return true;
        }
        const trigger = { kind: "secret-change" as const, detail: `${names.join(", ")} changed in the secret store`.slice(0, 300) };
        try {
            await deps.engine.enqueue({ repo, stack, commit: target.commit, ref: target.ref, pins: target.pins, trigger });
            return true;
        } catch (error) {
            deps.logger.warn(`deploys: a rotated secret's redeploy of ${repo} ${stack} could not queue: ${errorMessage(error)}`);
            return false;
        }
    };

    const notify = async (repo: string, spec: StackSpec, fresh: readonly (readonly [string, string])[]): Promise<boolean> => {
        const message = secretsChangedMessageOf({ repo, stack: spec.name, device: spec.device, names: fresh.map(([name]) => name), mark: changeId(fresh) });
        try {
            await deps.daemon.dispatch(message);
            return true;
        } catch (error) {
            deps.logger.warn(`deploys: a rotated secret's event for ${repo} ${spec.name} could not be dispatched: ${errorMessage(error)}`);
            return false;
        }
    };

    // Every name the stacks' current deploys received, marked by the daemon now; a name it holds no value for is absent.
    const marksNow = async (names: readonly string[]): Promise<ReadonlyMap<string, string>> => {
        const marks = new Map<string, string>();
        for (let start = 0; start < names.length; start += MARKS_PER_CALL) {
            const chunk = names.slice(start, start + MARKS_PER_CALL);
            const answered = await deps.daemon.marks(chunk);
            for (const name of chunk) {
                marks.set(name, answered[name] ?? ABSENT);
            }
        }
        return marks;
    };

    // One pass: every stack's marks against the store's now, the board's `secretsChanged`, and each new change acted on.
    const check = async (stacks: readonly DeclaredStack[]): Promise<void> => {
        const records = await deps.engine.records();
        const watched: Watched[] = stacks.flatMap((declared) => {
            const current = records.find((record) => record.repo === declared.repo && record.stack === declared.spec.name && record.outcome === "succeeded");
            return current?.secretMarks === undefined || Object.keys(current.secretMarks).length === 0 ? [] : [{ declared, current: current as Watched["current"] }];
        });
        if (watched.length === 0) {
            return;
        }
        const now = await marksNow([...new Set(watched.flatMap(({ current }) => Object.keys(current.secretMarks)))].sort());
        const file = await deps.store.read();
        for (const { declared, current } of watched) {
            const { repo, spec } = declared;
            const held = file.marks.find((entry) => entry.repo === repo && entry.stack === spec.name && entry.record === current.id)?.told ?? {};
            const changed: string[] = [];
            const fresh: (readonly [string, string])[] = [];
            for (const [name, deployed] of Object.entries(current.secretMarks).toSorted(([a], [b]) => a.localeCompare(b))) {
                const mark = now.get(name) ?? ABSENT;
                if (mark !== deployed) {
                    changed.push(name);
                    fresh.push(...(held[name] === mark ? [] : [[name, mark] as const]));
                }
            }
            deps.engine.setSecretsChanged(repo, spec.name, changed);
            if (fresh.length === 0) {
                continue;
            }
            const names = fresh.map(([name]) => name);
            const acted = spec.onSecretChange === "redeploy" ? await redeploy(repo, spec.name, names) : await notify(repo, spec, fresh);
            if (acted) {
                deps.logger.info?.(`deploys: ${names.join(", ")} changed under ${repo} ${spec.name} (${spec.onSecretChange})`);
                await deps.store.update((watch) => {
                    const others = watch.marks.filter((entry) => !(entry.repo === repo && entry.stack === spec.name));
                    return { ...watch, marks: [...others, { repo, stack: spec.name, record: current.id, told: { ...held, ...Object.fromEntries(fresh) } }] };
                });
            }
        }
    };

    return { check };
};
