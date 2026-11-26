import { errorMessage } from "@intentic/base/errors";
import type { ListenerMessageWire } from "../../deploysWire.js";
import { deployMessageOf } from "./events.js";
import { type DeployRecord, type DeploysStore, recordId, stackKey } from "./records.js";
import { type Attempted, attemptDeploy, type RunDeps } from "./run.js";

// THE ENGINE'S MOVING PARTS (engine.ts assembles them and says what the whole does): the record book every write goes
// through, the run of one record (its rollback included), and the lanes that run each stack's records one at a time.

export interface Logger {
    readonly warn: (message: string) => void;
    readonly info?: (message: string) => void;
}

export interface BookDeps {
    readonly store: DeploysStore;
    // A `deploys` listener message to the owner's automations (POST /listeners/deploys/dispatch).
    readonly dispatch: (message: ListenerMessageWire) => Promise<void>;
    readonly logger: Logger;
    readonly now: () => number;
}

// Every write of a record goes through here: told to the in-process listeners each time, and at its end to the owner's
// automations and to whoever waits on it.
export const createRecordBook = (deps: BookDeps) => {
    const listeners = new Set<(record: DeployRecord) => void>();
    // Told once per record, when the engine is done with it: what `settled` waits on.
    const endings = new Set<(record: DeployRecord) => void>();
    // Records whose handling has not finished: a failed one stays here while its rollback runs.
    const handling = new Set<string>();
    const stamp = (): string => new Date(deps.now()).toISOString();
    const publish = (record: DeployRecord): void => {
        for (const listener of listeners) {
            try {
                listener(record);
            } catch (error) {
                deps.logger.warn(`deploys: a listener failed on ${record.id}: ${errorMessage(error)}`);
            }
        }
    };
    const settle = (record: DeployRecord): void => {
        for (const ending of [...endings]) {
            ending(record);
        }
    };
    const announce = async (record: DeployRecord): Promise<void> => {
        const message = deployMessageOf(record, new Date(deps.now()));
        if (message !== undefined) {
            await deps.dispatch(message).catch((error: unknown) => deps.logger.warn(`deploys: the event for ${record.id} could not be dispatched: ${errorMessage(error)}`));
        }
    };
    const write = async (id: string, change: Partial<DeployRecord>): Promise<DeployRecord | undefined> => {
        const record = await deps.store.update(id, (current) => ({ ...current, ...change }));
        if (record !== undefined) {
            publish(record);
        }
        return record;
    };
    // A record's last word: written, told to every listener and automation, and settled.
    const end = async (id: string, change: Partial<DeployRecord>): Promise<DeployRecord | undefined> => {
        const record = await write(id, { ...change, endedAt: stamp() });
        if (record !== undefined) {
            await announce(record);
            settle(record);
        }
        return record;
    };
    const supersededBy =
        (newer: DeployRecord) =>
        (waiting: DeployRecord): DeployRecord => ({
            ...waiting,
            outcome: "superseded",
            endedAt: stamp(),
            error: `A newer deploy (${newer.id}, at ${newer.commit.slice(0, 12)}) replaced it while it waited.`,
        });
    return { store: deps.store, now: deps.now, logger: deps.logger, stamp, listeners, endings, handling, publish, settle, write, end, supersededBy };
};
export type RecordBook = ReturnType<typeof createRecordBook>;

// The newest deploy of the stack that came up, other than `except`.
export const lastGood = async (book: Pick<RecordBook, "store">, repo: string, stack: string, except?: string): Promise<DeployRecord | undefined> =>
    (await book.store.all()).find((record) => record.repo === repo && record.stack === stack && record.outcome === "succeeded" && record.id !== except);

const ended = (tried: Attempted): Partial<DeployRecord> => tried.fields;

// Puts the stack back on `previous` after `failed` broke it: a record of its own, run in the failed one's lane, with
// the images the earlier deploy ran pinned by digest.
const rollBack = async (book: RecordBook, run: RunDeps, failed: DeployRecord, previous: DeployRecord): Promise<DeployRecord | undefined> => {
    const record: DeployRecord = {
        id: recordId(book.now()),
        repo: failed.repo,
        stack: failed.stack,
        device: previous.device,
        commit: previous.commit,
        ...(previous.ref === undefined ? {} : { ref: previous.ref }),
        trigger: { kind: "rollback", detail: `after ${failed.id} failed, back to ${previous.id}` },
        outcome: "running",
        queuedAt: book.stamp(),
        startedAt: book.stamp(),
        secretNames: [],
        ...(previous.digests === undefined ? {} : { pins: previous.digests }),
    };
    await book.store.put(record);
    book.publish(record);
    const tried = await attemptDeploy(run, record, false);
    if (tried.interrupted === true) {
        return undefined;
    }
    return book.end(record.id, ended(tried));
};

// Ends a failed attempt: rolled back when the stack asks for it, the machine said it broke, and there is a deploy to go
// back to.
const endFailed = async (book: RecordBook, run: RunDeps, record: DeployRecord, tried: Attempted): Promise<void> => {
    const wants = tried.brokenOnMachine && tried.spec?.onFailure === "rollback" && record.trigger.kind !== "rollback";
    const previous = wants ? await lastGood(book, record.repo, record.stack, record.id) : undefined;
    const said = tried.fields.error ?? "The deploy failed.";
    if (previous === undefined) {
        const nothing = wants ? " Nothing to roll back to: no earlier deploy of this stack from here came up." : "";
        await book.end(record.id, { ...ended(tried), error: `${said}${nothing}` });
        return;
    }
    // Written as failed now, so the board shows it; told once the rollback has ended, as one event.
    await book.write(record.id, { ...ended(tried), endedAt: book.stamp() });
    const back = await rollBack(book, run, record, previous);
    if (back === undefined && run.lifetime?.aborted === true) {
        return;
    }
    if (back?.outcome === "succeeded") {
        await book.end(record.id, { outcome: "rolled-back", rolledBackTo: previous.id });
        return;
    }
    await book.end(record.id, { error: `${said} Going back to ${previous.commit.slice(0, 12)} (${previous.id}) failed too: see ${back?.id ?? "its record"}.` });
};

// One record, from running to its end.
const executeRecord = async (book: RecordBook, run: RunDeps, record: DeployRecord): Promise<void> => {
    book.handling.add(record.id);
    try {
        const firstHere = (await lastGood(book, record.repo, record.stack)) === undefined;
        const tried = await attemptDeploy(run, record, firstHere).catch(
            (error: unknown): Attempted => ({
                fields: { outcome: "failed", error: `The deploy stopped on an error of this extension's own: ${errorMessage(error)}` },
                brokenOnMachine: false,
            }),
        );
        if (tried.interrupted === true) {
            // The backend is stopping: left `running`, for the next start to end as unknown.
            return;
        }
        if (tried.fields.outcome === "failed") {
            await endFailed(book, run, record, tried);
        } else {
            await book.end(record.id, ended(tried));
        }
    } finally {
        book.handling.delete(record.id);
    }
};

// One lane per stack: its newest waiting record runs, then the lane looks again, until none waits. A record that arrives
// while the lane runs marks it to look once more, so none is left behind between its last look and its end.
export const createLanes = (book: RecordBook, run: RunDeps) => {
    const lanes = new Map<string, Promise<void>>();
    const pending = new Set<string>();
    const state = { stopped: false };
    const drain = async (key: string): Promise<void> => {
        while (!state.stopped) {
            const next = (await book.store.all()).find((record) => record.outcome === "queued" && stackKey(record.repo, record.stack) === key);
            if (next === undefined) {
                return;
            }
            const claimed = await book.store.update(next.id, (record) => (record.outcome === "queued" ? { ...record, outcome: "running", startedAt: book.stamp() } : record));
            if (claimed?.outcome === "running" && claimed.id === next.id) {
                book.publish(claimed);
                await executeRecord(book, run, claimed);
            }
        }
    };
    const kick = (key: string): void => {
        pending.add(key);
        if (state.stopped || lanes.has(key)) {
            return;
        }
        const lane = (async () => {
            try {
                while (pending.has(key) && !state.stopped) {
                    pending.delete(key);
                    await drain(key);
                }
            } catch (error) {
                book.logger.warn(`deploys: a stack's lane stopped on an error: ${errorMessage(error)}`);
            } finally {
                lanes.delete(key);
            }
        })();
        lanes.set(key, lane);
    };
    // Nothing new starts; what runs now is waited for (its call to the daemon ends with the backend's lifetime).
    const stop = async (): Promise<void> => {
        state.stopped = true;
        await Promise.allSettled([...lanes.values()]);
    };
    return { kick, stop };
};
