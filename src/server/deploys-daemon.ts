import { join, relative } from "node:path";
import type { ExtensionServerApi } from "@intentic/extension-api";
import type { z } from "zod";
import {
    DeployAnswerWireSchema,
    DeployEnvironmentsWireSchema,
    type DeployEnvironmentsWire,
    DeployHistoryWireSchema,
    type DeployRecordWire,
    DEPLOYS_PATHS,
    historyPath,
    readDeploys,
    type StackRefWire,
} from "../deploysWire.js";
import { settledRecord } from "../environments.js";

// The daemon's managed-environment routes (`/deploys/*`, deploysWire.ts), behind one client shape so the agent's tools
// and the board's reads are tested with a fake. Called through `api.daemon.request`, as the device routes are
// (device-daemon.ts), with a deadline of its own per call. None of these calls waits for a deploy: a deploy is queued and
// its record answered at once, and a caller that wants its end polls the stack's history (`awaitRecord`), so a deploy that
// outlasts the caller's patience still has a record id to name.

// Reading the manifests of every repository at HEAD and the records beside them.
const READ_DEADLINE_MS = 60_000;
// Queueing may fetch a commit the repository lacks from its remote first.
const ENQUEUE_DEADLINE_MS = 2 * 60_000;

export interface DeployRequestWire extends StackRefWire {
    readonly commit?: string | undefined;
    readonly reason?: string | undefined;
}

export interface DeploysDaemon {
    // Throws DeploysUnavailableError on a sandbox from before managed environments.
    readonly environments: (signal?: AbortSignal) => Promise<DeployEnvironmentsWire>;
    readonly history: (ref: StackRefWire, limit?: number, signal?: AbortSignal) => Promise<DeployRecordWire[]>;
    readonly deploy: (request: DeployRequestWire) => Promise<DeployRecordWire>;
    readonly rollback: (request: StackRefWire & { readonly to?: string | undefined }) => Promise<DeployRecordWire>;
    readonly promote: (request: { readonly repo: string; readonly from: string; readonly to: string }) => Promise<DeployRecordWire>;
}

const deadline = (ms: number, signal: AbortSignal | undefined): AbortSignal =>
    signal === undefined ? AbortSignal.timeout(ms) : AbortSignal.any([AbortSignal.timeout(ms), signal]);

// Drops what was not given, so the daemon reads its own default rather than an explicit undefined.
const defined = (body: Readonly<Record<string, unknown>>): Record<string, unknown> =>
    Object.fromEntries(Object.entries(body).filter(([, value]) => value !== undefined));

export const daemonDeploys = (api: Pick<ExtensionServerApi, "daemon">): DeploysDaemon => {
    const call = async <T>(path: string, schema: z.ZodType<T>, ms: number, body?: Readonly<Record<string, unknown>>, signal?: AbortSignal): Promise<T> =>
        readDeploys(
            await api.daemon.request(path, {
                method: body === undefined ? "GET" : "POST",
                headers: { "content-type": "application/json" },
                ...(body === undefined ? {} : { body: JSON.stringify(defined(body)) }),
                signal: deadline(ms, signal),
            }),
            schema,
        );
    return {
        environments: (signal) => call(DEPLOYS_PATHS.environments, DeployEnvironmentsWireSchema, READ_DEADLINE_MS, undefined, signal),
        history: async (ref, limit, signal) => (await call(historyPath(ref, limit), DeployHistoryWireSchema, READ_DEADLINE_MS, undefined, signal)).records,
        deploy: async (request) =>
            (
                await call(DEPLOYS_PATHS.deploy, DeployAnswerWireSchema, ENQUEUE_DEADLINE_MS, {
                    repo: request.repo,
                    stack: request.stack,
                    commit: request.commit,
                    reason: request.reason?.slice(0, 300),
                })
            ).record,
        rollback: async (request) =>
            (await call(DEPLOYS_PATHS.rollback, DeployAnswerWireSchema, ENQUEUE_DEADLINE_MS, { repo: request.repo, stack: request.stack, to: request.to })).record,
        promote: async (request) =>
            (await call(DEPLOYS_PATHS.promote, DeployAnswerWireSchema, ENQUEUE_DEADLINE_MS, { repo: request.repo, from: request.from, to: request.to })).record,
    };
};

// A pause that ends early, and leaves no timer behind, when `signal` aborts.
export const pause = (ms: number, signal?: AbortSignal): Promise<void> =>
    new Promise((resolve) => {
        if (signal?.aborted === true) {
            resolve();
            return;
        }
        const done = (): void => {
            clearTimeout(timer);
            signal?.removeEventListener("abort", done);
            resolve();
        };
        const timer = setTimeout(done, ms);
        signal?.addEventListener("abort", done, { once: true });
    });

export interface AwaitOptions {
    // How long to wait in all, and how often to look.
    readonly deadlineMs: number;
    readonly pollMs: number;
    // The caller giving up early: the tool call's own signal, the backend shutting down.
    readonly signal?: AbortSignal | undefined;
    readonly now?: () => number;
    readonly sleep?: (ms: number, signal?: AbortSignal) => Promise<void>;
}

// How a queued record came out: the record as the engine left it (`settled`), or as last read when the wait ran out.
export const awaitRecord = async (
    deploys: Pick<DeploysDaemon, "history">,
    queued: DeployRecordWire,
    options: AwaitOptions,
): Promise<{ readonly record: DeployRecordWire; readonly settled: boolean }> => {
    const now = options.now ?? Date.now;
    const sleep = options.sleep ?? pause;
    const until = now() + options.deadlineMs;
    let last = queued;
    while (options.signal?.aborted !== true && now() < until) {
        await sleep(Math.min(options.pollMs, Math.max(until - now(), 0)), options.signal);
        // A read that fails mid-wait (a daemon restart, a slow moment) is no answer about the deploy: look again.
        const records = await deploys.history({ repo: queued.repo, stack: queued.stack }, 20, options.signal).catch(() => undefined);
        if (records === undefined) {
            continue;
        }
        last = records.find((record) => record.id === queued.id) ?? last;
        const ended = settledRecord(queued.id, records);
        if (ended !== undefined) {
            return { record: ended, settled: true };
        }
    }
    return { record: last, settled: false };
};

// The workspace repositories that declare stacks, workspace-relative: on a sandbox from before managed environments,
// whether telling the owner to update it is worth a line on the board.
export const declaringRepos = async (root: string, dirs: readonly string[], read: (path: string) => Promise<string | undefined>): Promise<string[]> => {
    const found = await Promise.all(dirs.map(async (dir) => ((await read(join(dir, ".intentic", "stacks.json"))) === undefined ? undefined : relative(root, dir))));
    return found.filter((repo): repo is string => repo !== undefined);
};
