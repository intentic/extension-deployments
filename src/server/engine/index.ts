import type { ExtensionServerApi } from "@intentic/extension-api";
import type { DeployEnvironmentsWire } from "../../deploysWire.js";
import { daemonDeploys, type DeploysDaemon } from "./daemon.js";
import { type JsonDoc, stateDoc } from "./doc.js";
import { createDeploysEngine, type DeploysEngine } from "./engine.js";
import { deployEnvironments } from "./environments.js";
import { fetchRemote, type Git, runGit } from "./git.js";
import type { Logger } from "./lanes.js";
import { deploysStore, type RecordsFile, RECORDS_PATH, RecordsFileSchema } from "./records.js";
import { createDeployWatch, type DeployWatch } from "./watch.js";
import { DeployWatchFileSchema, type DeployWatchStore, emptyWatch, WATCH_PATH } from "./watch-store.js";

// THE ENGINE AS THE BACKEND COMPOSES IT: its records and its watch's memory in the extension's own state directory
// (`deploys.json`, `deploy-watch.json`), git run in the workspace the daemon packs from, and every daemon call through
// `api.daemon.request` under the manifest's `permissions.daemon`. `start` recovers what a restart left and starts the
// watch; `stop` ends the passes, the CI feed and any wait, and waits for what runs.

export interface Deploys {
    readonly engine: DeploysEngine;
    readonly watch: DeployWatch;
    readonly daemon: DeploysDaemon;
    readonly environments: () => Promise<DeployEnvironmentsWire>;
    readonly start: () => Promise<void>;
    readonly stop: () => Promise<void>;
}

export interface DeploysOptions {
    readonly root: string;
    readonly daemon: DeploysDaemon;
    readonly records: JsonDoc<RecordsFile>;
    readonly watchStore: DeployWatchStore;
    readonly logger: Logger;
    readonly lifetime: AbortSignal;
    readonly publicUrl?: (() => string | undefined) | undefined;
    readonly git?: Git | undefined;
    readonly now?: () => number;
    readonly fetchRemote?: (dir: string) => Promise<string | undefined>;
    readonly everyMs?: number;
    readonly feedBackoff?: { readonly floorMs: number; readonly capMs: number };
}

export const createDeploys = (options: DeploysOptions): Deploys => {
    const git = options.git ?? runGit;
    const fetch = options.fetchRemote ?? ((dir: string) => fetchRemote(dir, git));
    const engine = createDeploysEngine({
        root: options.root,
        store: deploysStore(options.records),
        daemon: options.daemon,
        logger: options.logger,
        fetchRemote: fetch,
        git,
        lifetime: options.lifetime,
        ...(options.now === undefined ? {} : { now: options.now }),
    });
    const watch = createDeployWatch({
        root: options.root,
        engine,
        daemon: options.daemon,
        store: options.watchStore,
        logger: options.logger,
        fetchRemote: fetch,
        publicUrl: options.publicUrl,
        git,
        ...(options.now === undefined ? {} : { now: options.now }),
        ...(options.everyMs === undefined ? {} : { everyMs: options.everyMs }),
        ...(options.feedBackoff === undefined ? {} : { feedBackoff: options.feedBackoff }),
    });
    return {
        engine,
        watch,
        daemon: options.daemon,
        environments: () => deployEnvironments({ root: options.root, daemon: options.daemon, engine, git }),
        start: async () => {
            // The watch first: its record listeners hear the deploys the recovery ends, so the forge is told of them.
            await watch.start();
            await engine.start();
        },
        stop: async () => {
            await watch.stop();
            await engine.stop();
        },
    };
};

// The backend's own: the files in its state directory, the daemon through its token, its log.
export const backendDeploys = (api: ExtensionServerApi, lifetime: AbortSignal, publicUrl: () => string | undefined): Deploys =>
    createDeploys({
        root: api.workspaceRoot,
        daemon: daemonDeploys((path, init) => api.daemon.request(path, init), lifetime),
        records: stateDoc<RecordsFile>(api, RECORDS_PATH, RecordsFileSchema, () => ({})),
        watchStore: stateDoc(api, WATCH_PATH, DeployWatchFileSchema, emptyWatch),
        logger: {
            warn: (message) => api.log(message),
            info: (message) => api.log(message),
        },
        lifetime,
        publicUrl,
    });
