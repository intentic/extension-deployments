import { ORPCError } from "@orpc/server";
import type { ListenerMessageWire } from "../../deploysWire.js";
import type { DeploysDaemon } from "./daemon.js";
import { branchOf, exactCommit, type Git, headCommit, manifestAt, repoFolder, runGit } from "./git.js";
import { type BookDeps, createLanes, createRecordBook, lastGood, type Logger, type RecordBook } from "./lanes.js";
import { STACKS_MANIFEST_PATH, type StackSpec } from "./manifest.js";
import { type DeployRecord, type DeploysStore, isLive, newestFirst, recordId, type StackHealthState, stackKey } from "./records.js";
import type { RunDeps } from "./run.js";

/* THE DEPLOYS ENGINE: the managed environments' one way to change what runs on a server, now this extension's (it was
   the daemon's; the daemon keeps only what no extension may hold: secret values, filled under the owner's grant).
   Each stack is a lane of its own: at most one deploy RUNNING and one WAITING per stack, and a newer request replaces
   the waiting one, which ends `superseded`. The waiting ones are records (records.ts), so a restart resumes them, and
   one left `running` by a restart ends `failed`, since what happened on the machine is unknown.

   A deploy reads the manifest of the commit it deploys and asks the daemon to run it (run.ts). A deploy the MACHINE says
   failed, of a stack declaring `onFailure: "rollback"`, puts the stack back on its last successful deploy: that commit,
   with its images pinned to the digests it ran, as a record of its own (trigger `rollback`); the failed one then ends
   `rolled-back`, naming the deploy it went back to.

   PUBLIC API, for the routes, the agent's tools and what deploys by itself (watch.ts):
   - enqueue({ repo, stack, commit?, ref?, trigger, pins? }): queue a deploy; HEAD when no commit is named, one the
     repository lacks fetched from its remote first. Throws (BAD_REQUEST, NOT_FOUND) when there is nothing to queue.
   - settled(id, signal?): the record once the engine is done with it (a rollback it set off included).
   - records(), history(ref, limit?): every record, and one stack's, newest first.
   - rollback({ repo, stack, to? }) and promote(repo, from, to): enqueue the commit and pins of an earlier deploy.
   - onDeployRecord(listener): every record as it is written, for the forge, `after` and the marks.
   - setStackState / stackState, setSecretsChanged / secretsChanged, setForgeProblem / forgeProblem: what the watch
     found, shown on the board.
   - start() recovers what a restart left; stop() starts nothing new and waits for what runs. */

export interface EnqueueRequest {
    readonly repo: string;
    readonly stack: string;
    readonly commit?: string | undefined;
    readonly ref?: string | undefined;
    readonly trigger: DeployRecord["trigger"];
    readonly pins?: Readonly<Record<string, string>> | undefined;
}

export interface StackRef {
    readonly repo: string;
    readonly stack: string;
}

export interface StackState {
    readonly state: StackHealthState;
    readonly since?: string | undefined;
    readonly ownedElsewhere: boolean;
}

export interface EngineDeps {
    readonly root: string;
    readonly store: DeploysStore;
    readonly daemon: RunDeps["daemon"] & Pick<DeploysDaemon, "dispatch">;
    readonly logger: Logger;
    // Brings what a repository's remote holds; answers why it could not, or nothing.
    readonly fetchRemote: (dir: string) => Promise<string | undefined>;
    readonly git?: Git | undefined;
    readonly lifetime?: AbortSignal | undefined;
    readonly now?: () => number;
}

export interface DeploysEngine {
    readonly start: () => Promise<void>;
    readonly stop: () => Promise<void>;
    readonly enqueue: (request: EnqueueRequest) => Promise<DeployRecord>;
    readonly settled: (id: string, signal?: AbortSignal) => Promise<DeployRecord>;
    readonly records: () => Promise<readonly DeployRecord[]>;
    readonly history: (ref: StackRef, limit?: number) => Promise<readonly DeployRecord[]>;
    readonly rollback: (ref: StackRef & { readonly to?: string | undefined }, detail?: string) => Promise<DeployRecord>;
    readonly promote: (repo: string, from: string, to: string, detail?: string) => Promise<DeployRecord>;
    readonly onDeployRecord: (listener: (record: DeployRecord) => void) => () => void;
    readonly setStackState: (repo: string, stack: string, state: StackHealthState, since?: string, ownedElsewhere?: boolean) => void;
    readonly stackState: (repo: string, stack: string) => StackState;
    readonly setSecretsChanged: (repo: string, stack: string, names: readonly string[]) => void;
    readonly secretsChanged: (repo: string, stack: string) => readonly string[];
    readonly setForgeProblem: (repo: string, problem: string | undefined) => void;
    readonly forgeProblem: (repo: string) => string | undefined;
    readonly noteForgeUrl: (id: string, url: string) => Promise<void>;
}

export const RESTARTED = "The sandbox restarted during this deploy, so how it ended on the computer is unknown: check the stack there, then deploy again.";

const refused = (message: string): ORPCError<"BAD_REQUEST", unknown> => new ORPCError("BAD_REQUEST", { message });
const missing = (message: string): ORPCError<"NOT_FOUND", unknown> => new ORPCError("NOT_FOUND", { message });

// The stack as `rev` declares it, or why there is none, thrown.
const declaredStack = async (dir: string, ref: StackRef, rev: string, at: string, git: Git): Promise<StackSpec> => {
    const read = await manifestAt(dir, rev, git);
    if (read.kind === "absent") {
        throw missing(`"${ref.repo}" ${at} has no ${STACKS_MANIFEST_PATH}, so it declares no stacks.`);
    }
    if (read.kind === "broken") {
        throw refused(`"${ref.repo}" ${at}: ${read.error}`);
    }
    const spec = read.manifest.stacks.find((stack) => stack.name === ref.stack);
    if (spec === undefined) {
        const names = read.manifest.stacks.map((stack) => stack.name);
        throw missing(`"${ref.repo}" ${at} does not declare "${ref.stack}"${names.length === 0 ? "" : `: it declares ${names.join(", ")}`}.`);
    }
    return spec;
};

// A deploy request as a waiting record of its stack, replacing any record of it that waits already.
const enqueueWith = async (book: RecordBook, deps: EngineDeps, kick: (key: string) => void, request: EnqueueRequest): Promise<DeployRecord> => {
    const git = deps.git ?? runGit;
    const dir = await repoFolder(deps.root, request.repo);
    const commit =
        request.commit === undefined ? await headCommit(dir, request.repo, git) : await exactCommit(dir, request.repo, request.commit, () => deps.fetchRemote(dir), git);
    const spec = await declaredStack(dir, request, commit, `at ${commit.slice(0, 12)}`, git);
    const ref = request.ref ?? (request.commit === undefined ? await branchOf(dir, git) : undefined);
    const record: DeployRecord = {
        id: recordId(book.now()),
        repo: request.repo,
        stack: spec.name,
        device: spec.device,
        commit,
        ...(ref === undefined ? {} : { ref }),
        trigger: request.trigger,
        outcome: "queued",
        queuedAt: book.stamp(),
        secretNames: [],
        ...(request.pins === undefined || Object.keys(request.pins).length === 0 ? {} : { pins: { ...request.pins } }),
    };
    for (const waiting of await book.store.put(record, book.supersededBy(record))) {
        book.publish(waiting);
        book.settle(waiting);
    }
    book.publish(record);
    kick(stackKey(record.repo, record.stack));
    return record;
};

// The record once the engine is done with it; refused when there is none, and given up (the deploy carries on) when
// the caller stops waiting.
const settledIn = (book: RecordBook, id: string, signal?: AbortSignal): Promise<DeployRecord> =>
    new Promise((resolve, reject) => {
        const done = (record: DeployRecord): void => {
            book.endings.delete(listen);
            signal?.removeEventListener("abort", aborted);
            resolve(record);
        };
        const listen = (record: DeployRecord): void => {
            if (record.id === id) {
                done(record);
            }
        };
        const aborted = (): void => {
            book.endings.delete(listen);
            reject(new ORPCError("CLIENT_CLOSED_REQUEST", { message: "Stopped waiting for the deploy; it carries on." }));
        };
        if (signal?.aborted === true) {
            aborted();
            return;
        }
        book.endings.add(listen);
        signal?.addEventListener("abort", aborted, { once: true });
        void book.store.get(id).then((record) => {
            if (record === undefined) {
                book.endings.delete(listen);
                reject(missing(`No deploy is named "${id}".`));
            } else if (!isLive(record) && !book.handling.has(id)) {
                done(record);
            }
        }, reject);
    });

const stackRecords = async (book: RecordBook, ref: StackRef): Promise<DeployRecord[]> =>
    (await book.store.all()).filter((record) => record.repo === ref.repo && record.stack === ref.stack);

// An earlier successful deploy of the stack, as a request: the one named, or the one before the current one.
const rollbackRequest = async (book: RecordBook, ref: StackRef & { readonly to?: string | undefined }, detail?: string): Promise<EnqueueRequest> => {
    const good = (await stackRecords(book, ref)).filter((record) => record.outcome === "succeeded");
    const target = ref.to === undefined ? good[1] : good.find((record) => record.id === ref.to);
    if (target === undefined) {
        throw new ORPCError("CONFLICT", {
            message:
                ref.to === undefined
                    ? `"${ref.stack}" has no earlier successful deploy to go back to.`
                    : `"${ref.to}" is not a successful deploy of "${ref.stack}": its history lists them.`,
        });
    }
    const trigger = { kind: "rollback" as const, detail: `to ${target.id}${detail === undefined ? "" : `, ${detail}`}`.slice(0, 300) };
    return { repo: ref.repo, stack: ref.stack, commit: target.commit, ref: target.ref, pins: target.digests, trigger };
};

// `to` at what `from` runs: its commit and its images by digest.
const promoteRequest = async (book: RecordBook, repo: string, from: string, to: string, detail?: string): Promise<EnqueueRequest> => {
    const source = await lastGood(book, repo, from);
    if (source === undefined) {
        throw new ORPCError("CONFLICT", { message: `"${from}" has no successful deploy to promote: deploy it first.` });
    }
    const trigger = { kind: "promote" as const, detail: `from ${from} (${source.id})${detail === undefined ? "" : `, ${detail}`}`.slice(0, 300) };
    return { repo, stack: to, commit: source.commit, ref: source.ref, pins: source.digests, trigger };
};

// After a restart: a record left running ended unknown (failed), and the newest waiting record of each stack runs; an
// older one still waiting is replaced by it.
const recover = async (book: RecordBook, kick: (key: string) => void): Promise<void> => {
    const records = await book.store.all();
    for (const record of records.filter((entry) => entry.outcome === "running")) {
        await book.end(record.id, { outcome: "failed", error: RESTARTED });
    }
    const kept = new Map<string, DeployRecord>();
    for (const record of records.filter((entry) => entry.outcome === "queued")) {
        const key = stackKey(record.repo, record.stack);
        const newer = kept.get(key);
        if (newer === undefined) {
            kept.set(key, record);
            continue;
        }
        const ended = await book.store.update(record.id, book.supersededBy(newer));
        if (ended !== undefined) {
            book.publish(ended);
            book.settle(ended);
        }
    }
    for (const key of kept.keys()) {
        kick(key);
    }
};

export const createDeploysEngine = (deps: EngineDeps): DeploysEngine => {
    const now = deps.now ?? Date.now;
    const bookDeps: BookDeps = { store: deps.store, dispatch: deps.daemon.dispatch, logger: deps.logger, now };
    const book = createRecordBook(bookDeps);
    const run: RunDeps = { root: deps.root, daemon: deps.daemon, git: deps.git, lifetime: deps.lifetime };
    const lanes = createLanes(book, run);
    const states = new Map<string, StackState>();
    const changedSecrets = new Map<string, readonly string[]>();
    const forgeProblems = new Map<string, string>();
    const enqueue = (request: EnqueueRequest): Promise<DeployRecord> => enqueueWith(book, deps, lanes.kick, request);
    return {
        start: () => recover(book, lanes.kick),
        stop: lanes.stop,
        enqueue,
        settled: (id, signal) => settledIn(book, id, signal),
        records: () => deps.store.all(),
        history: async (ref, limit = 50) => (await stackRecords(book, ref)).toSorted(newestFirst).slice(0, limit),
        rollback: async (ref, detail) => enqueue(await rollbackRequest(book, ref, detail)),
        promote: async (repo, from, to, detail) => enqueue(await promoteRequest(book, repo, from, to, detail)),
        onDeployRecord: (listener) => {
            book.listeners.add(listener);
            return () => void book.listeners.delete(listener);
        },
        setStackState: (repo, stack, state, since, ownedElsewhere = false) => {
            states.set(stackKey(repo, stack), { state, ...(since === undefined ? {} : { since }), ownedElsewhere });
        },
        stackState: (repo, stack) => states.get(stackKey(repo, stack)) ?? { state: "unknown", ownedElsewhere: false },
        setSecretsChanged: (repo, stack, names) => {
            if (names.length === 0) {
                changedSecrets.delete(stackKey(repo, stack));
            } else {
                changedSecrets.set(stackKey(repo, stack), [...names].sort());
            }
        },
        secretsChanged: (repo, stack) => changedSecrets.get(stackKey(repo, stack)) ?? [],
        setForgeProblem: (repo, problem) => {
            if (problem === undefined) {
                forgeProblems.delete(repo);
            } else {
                forgeProblems.set(repo, problem);
            }
        },
        forgeProblem: (repo) => forgeProblems.get(repo),
        noteForgeUrl: async (id, url) => {
            await book.write(id, { forgeUrl: url });
        },
    };
};

export type { ListenerMessageWire };
