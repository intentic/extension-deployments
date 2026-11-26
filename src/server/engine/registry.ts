import { errorMessage } from "@intentic/base/errors";
import type { DeviceRowWire } from "../../deploysWire.js";
import type { DeploysDaemon } from "./daemon.js";
import { deviceOnline, resolveDevice } from "./devices.js";
import type { DeploysEngine } from "./engine.js";
import type { DeclaredStack } from "./git.js";
import type { Logger } from "./lanes.js";
import { deployIntervalMs } from "./manifest.js";
import type { DeployRecord } from "./records.js";
import type { DeployWatchStore, RegistryCheck } from "./watch-store.js";

/* NEWER IMAGES BEHIND THE SAME TAGS (manifest.ts DeployTriggerSchema `registry`): every `every` after the stack's last
   check (or its last successful deploy, whichever is later), the computer is asked to `pull` the stack (POST
   …/stacks/{name}/ops/pull: pull, then `up -d` with the logins and pins its last deploy left), and only when compose
   recreated a container for it (a newer image arrived) is a deploy RECORDED: queued at the commit the stack runs,
   trigger `registry`. That deploy finds the images already there, waits for health, answers the digests it runs and,
   under `onFailure: rollback`, puts the stack back on the digests it ran before. A pull that brought nothing records
   nothing.

   A stack is left alone while a deploy of it runs or waits, until a deploy from here has succeeded, while its computer
   is not connected, and when another sandbox owns it there. */

export interface RegistryDeps {
    readonly engine: Pick<DeploysEngine, "enqueue" | "records" | "stackState">;
    readonly daemon: Pick<DeploysDaemon, "op">;
    readonly store: DeployWatchStore;
    readonly logger: Logger;
    readonly now: () => number;
}

// Whether compose recreated or created a container applying the pull: a newer image behind a tag (or a service it had
// not run). An unchanged stack prints `Container <name>  Running` for each.
export const imagesMoved = (output: string): boolean => /\bContainer\s+\S+\s+(?:Recreated?|Created)\b/u.test(output);

interface Watched {
    readonly repo: string;
    readonly declared: DeclaredStack;
    readonly every: string;
    readonly everyMs: number;
}

// When the stack's images were last known fresh: its last check, or its last successful deploy when that is later.
const freshAt = (check: RegistryCheck | undefined, current: DeployRecord): number =>
    Math.max(check === undefined ? 0 : Date.parse(check.checkedAt), Date.parse(current.endedAt ?? current.queuedAt));

export const createRegistryChecks = (deps: RegistryDeps) => {
    const pullable = (watched: Watched, records: readonly DeployRecord[], rows: readonly DeviceRowWire[]): { id: string; current: DeployRecord } | undefined => {
        const { spec } = watched.declared;
        const own = records.filter((record) => record.repo === watched.repo && record.stack === spec.name);
        const current = own.find((record) => record.outcome === "succeeded");
        const resolved = resolveDevice(spec.device, rows);
        const busy = own.some((record) => record.outcome === "queued" || record.outcome === "running");
        if (current === undefined || resolved === undefined || busy || !deviceOnline(resolved) || deps.engine.stackState(watched.repo, spec.name).ownedElsewhere) {
            return undefined;
        }
        return { id: resolved.id, current };
    };

    const pullOne = async (watched: Watched, id: string, current: DeployRecord): Promise<DeployRecord | undefined> => {
        const { repo } = watched;
        const { spec } = watched.declared;
        let output: string;
        try {
            output = await deps.daemon.op(id, spec.name, "pull");
        } catch (error) {
            deps.logger.warn(`deploys: the registry check could not pull ${repo} ${spec.name} on ${id}: ${errorMessage(error)}`);
            return undefined;
        }
        if (!imagesMoved(output)) {
            return undefined;
        }
        const trigger = { kind: "registry" as const, detail: `newer images behind its tags (pulled every ${watched.every})` };
        try {
            return await deps.engine.enqueue({ repo, stack: spec.name, commit: current.commit, ref: current.ref, trigger });
        } catch (error) {
            deps.logger.warn(`deploys: newer images of ${repo} ${spec.name} were pulled but their deploy could not queue: ${errorMessage(error)}`);
            return undefined;
        }
    };

    // One pass over the stacks with a registry trigger that are due, given what the manifests declare and the devices;
    // what it queued.
    const check = async (stacks: readonly DeclaredStack[], rows: readonly DeviceRowWire[]): Promise<DeployRecord[]> => {
        const watched: Watched[] = stacks.flatMap((declared) =>
            declared.spec.triggers
                .flatMap((trigger) => ("registry" in trigger ? [{ repo: declared.repo, declared, every: trigger.registry.every, everyMs: deployIntervalMs(trigger.registry.every) }] : []))
                .slice(0, 1),
        );
        if (watched.length === 0) {
            return [];
        }
        const [file, records] = await Promise.all([deps.store.read(), deps.engine.records()]);
        const queued: DeployRecord[] = [];
        const checked: RegistryCheck[] = [];
        for (const one of watched) {
            const held = file.registry.find((entry) => entry.repo === one.repo && entry.stack === one.declared.spec.name);
            const ready = pullable(one, records, rows);
            if (ready === undefined || deps.now() - freshAt(held, ready.current) < one.everyMs) {
                checked.push(...(held === undefined ? [] : [held]));
                continue;
            }
            checked.push({ repo: one.repo, stack: one.declared.spec.name, checkedAt: new Date(deps.now()).toISOString() });
            const record = await pullOne(one, ready.id, ready.current);
            queued.push(...(record === undefined ? [] : [record]));
        }
        await deps.store.update((current) => ({ ...current, registry: checked }));
        return queued;
    };
    return { check };
};
