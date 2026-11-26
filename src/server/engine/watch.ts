import { serialLock } from "@intentic/base/async";
import { errorMessage } from "@intentic/base/errors";
import type { DeviceRowWire } from "../../deploysWire.js";
import { createCiFeed } from "./ci-feed.js";
import type { DeploysDaemon } from "./daemon.js";
import type { DeploysEngine } from "./engine.js";
import { createForgeReports } from "./forge.js";
import { type DeclaredStack, type Git, runGit, workspaceManifests } from "./git.js";
import type { Logger } from "./lanes.js";
import { createMonitor } from "./monitor.js";
import type { DeployRecord } from "./records.js";
import { createRegistryChecks } from "./registry.js";
import { createRotationWatch } from "./rotation.js";
import { type CiPass, createDeployTriggers } from "./triggers.js";
import type { DeployWatchStore } from "./watch-store.js";

/* THE DEPLOYS WATCH: everything that moves a managed environment, or tells the owner about one, with nobody asking and
   no turn in the path; the engine (engine.ts) does each deploy.
   - triggers.ts + ci-feed.ts: a passing CI job or run (the daemon's CI feed), and a stack another one follows.
   - registry.ts: newer images behind a stack's tags, pulled on its interval, recorded as a deploy.
   - monitor.ts: each stack's state on its computer every minute, its server's disks and memory every five.
   - rotation.ts: a secret a stack runs with changed in the store (keyed marks): redeployed or told.
   - forge.ts: each deploy reported to its repository's forge.
   One pass a minute reads the manifests at HEAD first: a workspace that declares no stacks asks the daemon nothing, and
   the CI feed is open only while some stack has a `ci` trigger. */

export interface DeployWatchDeps {
    readonly root: string;
    readonly engine: DeploysEngine;
    readonly daemon: DeploysDaemon;
    readonly store: DeployWatchStore;
    readonly logger: Logger;
    readonly fetchRemote: (dir: string) => Promise<string | undefined>;
    readonly publicUrl?: (() => string | undefined) | undefined;
    readonly git?: Git | undefined;
    readonly now?: () => number;
    // The pass's period and how many passes between server reads; tests drive passes by hand instead.
    readonly everyMs?: number;
    readonly hostsEvery?: number;
    readonly feedBackoff?: { readonly floorMs: number; readonly capMs: number };
}

export interface DeployWatch {
    readonly start: () => Promise<void>;
    // Stops the passes and the feed, and waits for what is running.
    readonly stop: () => Promise<void>;
    // One pass now (what the timer runs): manifests, then stacks, registries, marks, and servers when due.
    readonly pass: (options?: { readonly hosts?: boolean }) => Promise<void>;
    // A CI job or run passed: the deploys it queued. Never rejects.
    readonly ciPassed: (pass: CiPass) => Promise<readonly DeployRecord[]>;
    readonly feedOpen: () => boolean;
}

const EVERY_MS = 60_000;
// Servers' fill every five passes.
const HOSTS_EVERY = 5;

const hasCiTrigger = (stacks: readonly DeclaredStack[]): boolean => stacks.some(({ spec }) => spec.triggers.some((trigger) => "ci" in trigger));

export const createDeployWatch = (deps: DeployWatchDeps): DeployWatch => {
    const now = deps.now ?? Date.now;
    const git = deps.git ?? runGit;
    const triggers = createDeployTriggers({ root: deps.root, engine: deps.engine, fetchRemote: deps.fetchRemote, logger: deps.logger, git });
    const forge = createForgeReports({ root: deps.root, engine: deps.engine, daemon: deps.daemon, store: deps.store, publicUrl: deps.publicUrl, logger: deps.logger, git });
    const monitor = createMonitor({ engine: deps.engine, daemon: deps.daemon, store: deps.store, logger: deps.logger, now });
    const registry = createRegistryChecks({ engine: deps.engine, daemon: deps.daemon, store: deps.store, logger: deps.logger, now });
    const rotation = createRotationWatch({ engine: deps.engine, daemon: deps.daemon, store: deps.store, logger: deps.logger });
    const feed = createCiFeed({
        daemon: deps.daemon,
        store: deps.store,
        onPass: (pass) => triggers.ciPassed(pass),
        logger: deps.logger,
        now,
        ...(deps.feedBackoff === undefined ? {} : { backoff: deps.feedBackoff }),
    });
    const serially = serialLock();
    const inFlight = new Set<Promise<unknown>>();
    const track = (work: Promise<unknown>): void => {
        inFlight.add(work);
        void work.finally(() => inFlight.delete(work));
    };
    const stops: (() => void)[] = [];
    let passes = 0;
    let stopped = false;

    // Each step on its own: one that fails costs itself, never the rest of the pass.
    const step = async (name: string, work: () => Promise<unknown>): Promise<void> => {
        try {
            await work();
        } catch (error) {
            deps.logger.warn(`deploys: the ${name} step stopped on an error: ${errorMessage(error)}`);
        }
    };

    const passNow = async (options: { readonly hosts?: boolean } = {}): Promise<void> => {
        const { stacks } = await workspaceManifests(deps.root, git);
        if (stacks.length === 0) {
            await feed.stop();
            return;
        }
        if (hasCiTrigger(stacks) && !stopped) {
            feed.start();
        } else {
            await feed.stop();
        }
        const rows: readonly DeviceRowWire[] = await deps.daemon.devices().catch((error: unknown) => {
            deps.logger.warn(`deploys: the computers could not be listed: ${errorMessage(error)}`);
            return [];
        });
        await step("monitor", () => monitor.readStacks(stacks, rows));
        await step("registry", () => registry.check(stacks, rows));
        await step("secrets", () => rotation.check(stacks));
        if (options.hosts === true) {
            await step("servers", () => monitor.readHosts(stacks, rows));
        }
    };

    const pass = (options?: { readonly hosts?: boolean }): Promise<void> =>
        serially(() => passNow(options)).catch((error: unknown) => deps.logger.warn(`deploys: a watch pass stopped on an error: ${errorMessage(error)}`));

    return {
        start: async () => {
            stopped = false;
            // Subscribed before anything runs, so the deploys a restart ends reach the forge too.
            stops.push(
                deps.engine.onDeployRecord((record) => {
                    track(triggers.recorded(record));
                    track(forge.recorded(record));
                }),
            );
            await monitor.restore().catch((error: unknown) => deps.logger.warn(`deploys: what the monitor last read could not be restored: ${errorMessage(error)}`));
            const tick = (): void => {
                const hosts = passes % (deps.hostsEvery ?? HOSTS_EVERY) === 0;
                passes += 1;
                track(pass({ hosts }));
            };
            tick();
            const timer = setInterval(tick, deps.everyMs ?? EVERY_MS);
            timer.unref?.();
            stops.push(() => clearInterval(timer));
        },
        stop: async () => {
            stopped = true;
            for (const stop of stops.splice(0)) {
                stop();
            }
            await feed.stop();
            await Promise.allSettled([...inFlight]);
            await feed.stop();
        },
        pass,
        ciPassed: (ciPass) => triggers.ciPassed(ciPass),
        feedOpen: feed.running,
    };
};
