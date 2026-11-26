import { randomBytes } from "node:crypto";
import { z } from "zod";
import type { JsonDoc } from "./doc.js";

// EVERY DEPLOY OF A MANAGED STACK, by id, in the extension's state directory (`deploys.json`). The waiting ones are the
// engine's durable queue: a restart finds them here and runs them (engine.ts `recover`). Secret NAMES and keyed MARKS
// only, never a value: the daemon fills values and masks what the machine printed before it answers.

export const DeployTriggerKindSchema = z.enum(["manual", "ci", "registry", "after", "rollback", "promote", "secret-change"]);
export type DeployTriggerKind = z.infer<typeof DeployTriggerKindSchema>;

export const DeployOutcomeSchema = z.enum([
    // Waiting for the stack's lane, or for the one ahead of it.
    "queued",
    "running",
    "succeeded",
    // Came up unhealthy, a hook or compose failed, or what happened is unknown; `error` says which.
    "failed",
    // Failed, and the stack was put back on the previous successful deploy (`rolledBackTo`).
    "rolled-back",
    // A newer deploy of the same stack arrived while this one waited, so it never ran.
    "superseded",
    // Never reached the stack: a secret not granted, a computer that cannot take it, a manifest that does not parse.
    "refused",
]);
export type DeployOutcome = z.infer<typeof DeployOutcomeSchema>;

const DigestsSchema = z.record(z.string(), z.string());

export const DeployRecordSchema = z.object({
    id: z.string(),
    // The repository that declares the stack (workspace-relative) and the stack's name in its manifest.
    repo: z.string(),
    stack: z.string(),
    // The computer as the manifest names it, and the connection key it resolved to when it ran.
    device: z.string(),
    deviceId: z.string().optional(),
    commit: z.string(),
    ref: z.string().optional(),
    trigger: z.object({
        kind: DeployTriggerKindSchema,
        // One line: the CI run and job, who pressed, the stack promoted from.
        detail: z.string().max(300).optional(),
        url: z.string().optional(),
    }),
    outcome: DeployOutcomeSchema,
    queuedAt: z.string(),
    startedAt: z.string().optional(),
    endedAt: z.string().optional(),
    // What it ran: service → image by digest, the `.env`'s sha256, the secret names it received and a keyed mark of each
    // value as it went (the daemon's HMAC, never the value): what tells later that one changed in the store.
    digests: DigestsSchema.optional(),
    // What it was asked to pin (a rollback's or a promotion's images), kept so one waiting across a restart runs them too.
    pins: DigestsSchema.optional(),
    envDigest: z.string().optional(),
    secretNames: z.array(z.string()).default([]),
    secretMarks: z.record(z.string(), z.string()).optional(),
    healthySeconds: z.number().optional(),
    rolledBackTo: z.string().optional(),
    error: z.string().max(4000).optional(),
    // The end of what compose and the hooks printed, as the daemon masked it.
    outputTail: z.string().max(20_000).optional(),
    // Where the forge shows it, once reported.
    forgeUrl: z.string().optional(),
});
export type DeployRecord = z.infer<typeof DeployRecordSchema>;

// How a stack is doing on its computer, as the monitor last read it (monitor.ts).
export const StackHealthStateSchema = z.enum(["running", "unhealthy", "restarting", "stopped", "missing", "unreachable", "unknown"]);
export type StackHealthState = z.infer<typeof StackHealthStateSchema>;

// The file: records by id, each parsed on its own, so one a later version wrote costs itself and never the rest.
export type RecordsFile = Readonly<Record<string, DeployRecord>>;
export const RecordsFileSchema = z.record(z.string(), z.unknown()).transform(
    (records): RecordsFile =>
        Object.fromEntries(
            Object.entries(records).flatMap(([id, raw]) => {
                const parsed = DeployRecordSchema.safeParse(raw);
                return parsed.success ? [[id, parsed.data]] : [];
            }),
        ),
);
export const RECORDS_PATH = "deploys.json";

// Ended records kept per stack, newest first: what history and a rollback reach back to. A live one is never dropped.
export const KEPT_PER_STACK = 50;

export const isLive = (record: Pick<DeployRecord, "outcome">): boolean => record.outcome === "queued" || record.outcome === "running";

// A stack's key across repositories.
export const stackKey = (repo: string, stack: string): string => `${repo}\u0000${stack}`;

// Newest first: by when each was queued, then by id, which is minted in time order.
export const newestFirst = (left: DeployRecord, right: DeployRecord): number => right.queuedAt.localeCompare(left.queuedAt) || right.id.localeCompare(left.id);

// Ids that sort in the order they were minted: the time, a counter for the same millisecond, then a few random bytes.
let minted = 0;
export const recordId = (now: number): string => {
    minted = (minted + 1) % 1296;
    return `dep-${now.toString(36).padStart(9, "0")}${minted.toString(36).padStart(2, "0")}-${randomBytes(3).toString("hex")}`;
};

const trimmed = (records: RecordsFile): RecordsFile => {
    const seen = new Map<string, number>();
    const dropped = new Set<string>();
    for (const record of Object.values(records).toSorted(newestFirst)) {
        if (isLive(record)) {
            continue;
        }
        const key = stackKey(record.repo, record.stack);
        const count = (seen.get(key) ?? 0) + 1;
        seen.set(key, count);
        if (count > KEPT_PER_STACK) {
            dropped.add(record.id);
        }
    }
    return dropped.size === 0 ? records : Object.fromEntries(Object.entries(records).filter(([id]) => !dropped.has(id)));
};

export interface DeploysStore {
    // Newest first.
    readonly all: () => Promise<readonly DeployRecord[]>;
    readonly get: (id: string) => Promise<DeployRecord | undefined>;
    // Writes one record whole; when it is queued, every other record of its stack still queued is ended by `supersede` in
    // the same write, and those are answered as they now stand.
    readonly put: (record: DeployRecord, supersede?: (waiting: DeployRecord) => DeployRecord) => Promise<readonly DeployRecord[]>;
    // Changes one record in place; undefined when there is none.
    readonly update: (id: string, change: (record: DeployRecord) => DeployRecord) => Promise<DeployRecord | undefined>;
}

export const deploysStore = (file: JsonDoc<RecordsFile>): DeploysStore => ({
    all: async () => Object.values(await file.read()).toSorted(newestFirst),
    get: async (id) => (await file.read())[id],
    put: async (record, supersede) => {
        const replaced: DeployRecord[] = [];
        await file.update((current) => {
            replaced.length = 0;
            const waiting =
                record.outcome === "queued" && supersede !== undefined
                    ? Object.values(current).filter((held) => held.outcome === "queued" && held.id !== record.id && held.repo === record.repo && held.stack === record.stack)
                    : [];
            const ended = waiting.map((held) => supersede?.(held) ?? held);
            replaced.push(...ended);
            return trimmed({ ...current, ...Object.fromEntries(ended.map((entry) => [entry.id, entry])), [record.id]: record });
        });
        return replaced;
    },
    update: async (id, change) => {
        let changed: DeployRecord | undefined;
        await file.update((current) => {
            const record = current[id];
            if (record === undefined) {
                changed = undefined;
                return current;
            }
            changed = change(record);
            return trimmed({ ...current, [id]: changed });
        });
        return changed;
    },
});
