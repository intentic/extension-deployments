import { z } from "zod";

// THE DAEMON'S MANAGED-ENVIRONMENT ROUTES (`/deploys/*`), as this extension reads them. The published
// `@intentic/sandbox-contract` this repository builds against predates them, so the shapes are the extension's own:
// the fields it uses, mirrored from the daemon's JSON (sandbox-contract `schemas/deploys.ts`), every object loose so a
// field a newer daemon adds never drops the board, and every closed vocabulary falling back to `unknown` rather than
// failing the parse. Zod only, so both halves import it: the backend for the agent's tools, the browser for the board.

// ---- vocabularies ---------------------------------------------------------------------------------------------------

// How a deploy ended, or that it has not yet (`queued`, `running`).
export const DeployOutcomeWireSchema = z
    .enum(["queued", "running", "succeeded", "failed", "rolled-back", "superseded", "refused", "unknown"])
    .catch("unknown");
export type DeployOutcomeWire = z.infer<typeof DeployOutcomeWireSchema>;

// A record still waiting or running: the engine is not done with it.
export const isLiveOutcome = (outcome: DeployOutcomeWire): boolean => outcome === "queued" || outcome === "running";

// How the stack is doing on its computer, as the daemon's monitor last read it.
export const StackHealthWireSchema = z
    .enum(["running", "unhealthy", "restarting", "stopped", "missing", "unreachable", "unknown"])
    .catch("unknown");
export type StackHealthWire = z.infer<typeof StackHealthWireSchema>;

// What starts a deploy by itself, as the stacks manifest declares it: one key per trigger. Loose, so a trigger kind a
// newer daemon adds still parses (and reads as one this version cannot describe).
export const DeployTriggerWireSchema = z.looseObject({
    ci: z.looseObject({ branch: z.string(), workflow: z.string().optional(), job: z.string().optional() }).optional(),
    registry: z.looseObject({ every: z.string() }).optional(),
    after: z.looseObject({ stack: z.string() }).optional(),
});
export type DeployTriggerWire = z.infer<typeof DeployTriggerWireSchema>;

// ---- records ------------------------------------------------------------------------------------------------------

export const DeployRecordWireSchema = z.looseObject({
    id: z.string(),
    repo: z.string(),
    stack: z.string(),
    device: z.string(),
    commit: z.string(),
    ref: z.string().optional(),
    // What started it: `manual`, `ci`, `registry`, `after`, `rollback`, `promote`, `secret-change`, or one newer.
    trigger: z.looseObject({ kind: z.string(), detail: z.string().optional(), url: z.string().optional() }),
    outcome: DeployOutcomeWireSchema,
    queuedAt: z.string(),
    startedAt: z.string().optional(),
    endedAt: z.string().optional(),
    // Service → the image by digest it ran, once it ran.
    digests: z.record(z.string(), z.string()).optional(),
    secretNames: z.array(z.string()).default([]),
    healthySeconds: z.number().optional(),
    rolledBackTo: z.string().optional(),
    error: z.string().optional(),
    outputTail: z.string().optional(),
    forgeUrl: z.string().optional(),
});
export type DeployRecordWire = z.infer<typeof DeployRecordWireSchema>;

// ---- environments ---------------------------------------------------------------------------------------------------

export const DeployEnvironmentWireSchema = z.looseObject({
    repo: z.string(),
    stack: z.string(),
    // The computer as the manifest names it, and its device card's id when that resolves (else `problems` says why).
    device: z.string(),
    deviceId: z.string().optional(),
    mode: z.string().default("images"),
    description: z.string().optional(),
    triggers: z.array(DeployTriggerWireSchema).default([]),
    secrets: z.array(z.string()).default([]),
    ungranted: z.array(z.string()).default([]),
    secretsChanged: z.array(z.string()).default([]),
    // The last successful deploy, the one running or waiting now, and the newest attempt of any outcome.
    current: DeployRecordWireSchema.optional(),
    active: DeployRecordWireSchema.optional(),
    latest: DeployRecordWireSchema.optional(),
    state: StackHealthWireSchema,
    stateSince: z.string().optional(),
    ownedElsewhere: z.boolean().default(false),
    problems: z.array(z.string()).default([]),
});
export type DeployEnvironmentWire = z.infer<typeof DeployEnvironmentWireSchema>;

export const ManifestErrorWireSchema = z.looseObject({ repo: z.string(), error: z.string() });
export type ManifestErrorWire = z.infer<typeof ManifestErrorWireSchema>;

// GET /deploys/environments
export const DeployEnvironmentsWireSchema = z.looseObject({
    environments: z.array(DeployEnvironmentWireSchema),
    manifestErrors: z.array(ManifestErrorWireSchema).default([]),
});
export type DeployEnvironmentsWire = z.infer<typeof DeployEnvironmentsWireSchema>;

// GET /deploys/history
export const DeployHistoryWireSchema = z.looseObject({ records: z.array(DeployRecordWireSchema) });

// POST /deploys/deploy, /deploys/rollback, /deploys/promote
export const DeployAnswerWireSchema = z.looseObject({ record: DeployRecordWireSchema });

// POST /deploys/grants/grant answers every grant; the board only needs it to have worked.
export const DeployGrantsWireSchema = z.looseObject({ grants: z.array(z.looseObject({ repo: z.string(), stack: z.string() })) });

// ---- requests -------------------------------------------------------------------------------------------------------

// A commit as the daemon takes one: full or abbreviated hex.
export const CommitWireSchema = z.string().regex(/^[0-9a-f]{7,64}$/u, "a commit: 7 to 64 lowercase hex characters");

export interface StackRefWire {
    readonly repo: string;
    readonly stack: string;
}

export const DEPLOYS_PATHS = {
    environments: "/deploys/environments",
    history: "/deploys/history",
    deploy: "/deploys/deploy",
    rollback: "/deploys/rollback",
    promote: "/deploys/promote",
    grant: "/deploys/grants/grant",
} as const;

// GET /deploys/history's query: oRPC reads a GET input from the query string.
export const historyPath = (ref: StackRefWire, limit?: number): string => {
    const query = new URLSearchParams({ repo: ref.repo, stack: ref.stack, ...(limit === undefined ? {} : { limit: String(limit) }) });
    return `${DEPLOYS_PATHS.history}?${query.toString()}`;
};

// ---- refusals -------------------------------------------------------------------------------------------------------

// What a sandbox from before managed environments makes of every `/deploys/*` path: nothing.
export const DEPLOYS_PREDATED =
    "This sandbox predates managed environments: update it, and the stacks your repositories declare in .intentic/stacks.json appear here.";

// Thrown for a bare 404 from a `/deploys/*` route, so a caller tells "update this sandbox" apart from a real refusal.
export class DeploysUnavailableError extends Error {
    constructor() {
        super(DEPLOYS_PREDATED);
        this.name = "DeploysUnavailableError";
    }
}

// A `/deploys/*` answer that was not ok, in the daemon's own words. oRPC refuses with `{ message }` (a stack the
// manifest does not declare is a 404 WITH one); a 404 without one is a route this sandbox does not serve at all.
export const deploysRefusal = (status: number, body: string): Error => {
    let message: string | undefined;
    try {
        const parsed = JSON.parse(body) as { message?: unknown };
        message = typeof parsed.message === "string" && parsed.message !== "" ? parsed.message : undefined;
    } catch {
        // Not JSON: a proxy's page or a plain-text 404, read below.
    }
    if (status === 404 && message === undefined) {
        return new DeploysUnavailableError();
    }
    if (message !== undefined) {
        return new Error(message);
    }
    const line = body.trim().split("\n")[0] ?? "";
    return new Error(line === "" ? `the sandbox answered ${status}` : line.slice(0, 500));
};

// One `/deploys/*` response read as `schema`, or thrown as its refusal.
export const readDeploys = async <T>(response: Response, schema: z.ZodType<T>): Promise<T> => {
    const text = await response.text();
    if (!response.ok) {
        throw deploysRefusal(response.status, text);
    }
    return schema.parse(JSON.parse(text));
};
