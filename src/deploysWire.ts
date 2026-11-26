import { z } from "zod";

// THE MANAGED-ENVIRONMENT WIRE, both halves' and the daemon's. Two kinds of shape live here:
// - the BOARD'S: a deploy record and an environment as this extension's backend answers them (its engine keeps them,
//   src/server/engine/), read by the browser's Environments group and by the agent's tools;
// - the DAEMON'S PRIMITIVES the engine stands on (sandbox-contract `device-stacks.ts`, `stack-grants.ts`, `ci.ts`,
//   `secrets.ts`): the published `@intentic/sandbox-contract` this repository builds against predates them, so the fields
//   used are mirrored here, every object loose so a field a newer daemon adds never drops a read, and every closed
//   vocabulary falling back to `unknown` rather than failing the parse.
// Zod only, so both halves import it without the route table.

// ---- vocabularies ---------------------------------------------------------------------------------------------------

// How a deploy ended, or that it has not yet (`queued`, `running`).
export const DeployOutcomeWireSchema = z
    .enum(["queued", "running", "succeeded", "failed", "rolled-back", "superseded", "refused", "unknown"])
    .catch("unknown");
export type DeployOutcomeWire = z.infer<typeof DeployOutcomeWireSchema>;

// A record still waiting or running: the engine is not done with it.
export const isLiveOutcome = (outcome: DeployOutcomeWire): boolean => outcome === "queued" || outcome === "running";

// How the stack is doing on its computer, as the monitor last read it.
export const StackHealthWireSchema = z
    .enum(["running", "unhealthy", "restarting", "stopped", "missing", "unreachable", "unknown"])
    .catch("unknown");
export type StackHealthWire = z.infer<typeof StackHealthWireSchema>;

// What starts a deploy by itself, as the stacks manifest declares it: one key per trigger. Loose, so a trigger kind a
// newer manifest adds still parses (and reads as one this version cannot describe).
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

export const DeployEnvironmentsWireSchema = z.looseObject({
    environments: z.array(DeployEnvironmentWireSchema),
    manifestErrors: z.array(ManifestErrorWireSchema).default([]),
});
export type DeployEnvironmentsWire = z.infer<typeof DeployEnvironmentsWireSchema>;

// The backend's answer to a press: the record it queued.
export const DeployAnswerWireSchema = z.looseObject({ record: DeployRecordWireSchema });

// ---- requests -------------------------------------------------------------------------------------------------------

// A commit as the engine takes one: full or abbreviated hex.
export const CommitWireSchema = z.string().regex(/^[0-9a-f]{7,64}$/u, "a commit: 7 to 64 lowercase hex characters");

export interface StackRefWire {
    readonly repo: string;
    readonly stack: string;
}

// The backend's own routes for the board (relative to its `/x` namespace): reads and presses alike, since the engine
// that deploys lives in the backend now.
export const ENVIRONMENT_PATHS = {
    environments: "environments",
    history: "environments/history",
    deploy: "environments/deploy",
    rollback: "environments/rollback",
    promote: "environments/promote",
} as const;

// ---- the daemon's primitives ---------------------------------------------------------------------------------------

// GET /stack-grants: which secret names each managed stack may receive, by repository, stack and DEVICE CARD id. The
// owner grants (POST /stack-grants/grant, from the browser as the person pressing); no extension token can.
// The device a grant is keyed by: the CARD part of a connection key (`<card>::<environment>` for a WSL side), since the
// daemon grants a stack on a computer, and every side of that computer shares it (secrets/stack-grants in the daemon).
export const grantDeviceOf = (connection: string): string => connection.split("::")[0] ?? connection;

export const STACK_GRANTS_PATHS = { list: "/stack-grants", grant: "/stack-grants/grant", revoke: "/stack-grants/revoke" } as const;
export const StackGrantWireSchema = z.looseObject({
    repo: z.string(),
    stack: z.string(),
    device: z.string(),
    secrets: z.array(z.string()).default([]),
    grantedBy: z.string().optional(),
    grantedAt: z.string().optional(),
});
export type StackGrantWire = z.infer<typeof StackGrantWireSchema>;
export const StackGrantsWireSchema = z.looseObject({ grants: z.array(StackGrantWireSchema).default([]) });

// The grant a person presses: exactly these names, added to what the stack already holds on that computer.
export interface StackGrantSetWire {
    readonly repo: string;
    readonly stack: string;
    readonly device: string;
    readonly secrets: readonly string[];
}

// POST /system/devices/{id}/stacks/{name}/deploy-managed: the stack's definition with `{{secret:NAME}}` references the
// daemon fills under the stack's grant (the `{{deploy:…}}` ones already filled here), the repository packed at the
// commit, the machine's deploy relayed and its health waited for. Strict on the daemon's side: send only these.
export interface ManagedDeployInputWire {
    readonly repo: string;
    readonly commit: string;
    readonly composeFile?: string | undefined;
    readonly mode: "images" | "build";
    readonly env?: Readonly<Record<string, string>> | undefined;
    readonly registries?: readonly { readonly host: string; readonly username: string; readonly password: string }[] | undefined;
    readonly hooks?: { readonly preDeploy?: string | undefined; readonly postDeploy?: string | undefined } | undefined;
    readonly health?: { readonly timeoutSeconds?: number | undefined; readonly http?: readonly string[] | undefined } | undefined;
    readonly pins?: Readonly<Record<string, string>> | undefined;
    readonly adopt?: boolean | undefined;
    readonly reason?: string | undefined;
}
export const ManagedDeployResultWireSchema = z.looseObject({
    stack: z.string().optional(),
    commit: z.string().optional(),
    path: z.string().optional(),
    output: z.string().default(""),
    digests: z.record(z.string(), z.string()).optional(),
    envDigest: z.string().optional(),
    healthySeconds: z.number().optional(),
    // The names filled (never a value) and a keyed mark of each value as it went: what tells a changed secret later.
    secretNames: z.array(z.string()).default([]),
    secretMarks: z.record(z.string(), z.string()).default({}),
});
export type ManagedDeployResultWire = z.infer<typeof ManagedDeployResultWireSchema>;

// GET /system/devices/{id}/host-stats (device feature `host-stats`).
export const HostStatsWireSchema = z.looseObject({
    disks: z
        .array(z.looseObject({ role: z.string().optional(), path: z.string(), totalBytes: z.number(), freeBytes: z.number() }))
        .default([]),
    memory: z.looseObject({ totalBytes: z.number(), availableBytes: z.number() }),
});
export type HostStatsWire = z.infer<typeof HostStatsWireSchema>;

// GET /system/devices, as far as the engine reads it: which card each computer is, under which connection key, whether
// it is connected, and what its agent says it can do.
export const DeviceRowWireSchema = z.looseObject({
    key: z.string().optional(),
    label: z.string().optional(),
    card: z.string().optional(),
    hostId: z.string().optional(),
    online: z.boolean().optional(),
    facts: z.looseObject({ features: z.array(z.string()).optional() }).optional(),
});
export type DeviceRowWire = z.infer<typeof DeviceRowWireSchema>;
export const DevicesWireSchema = z.looseObject({ devices: z.array(DeviceRowWireSchema).default([]) });

// Who deployed a managed stack, as `list_stacks` shows it on the computer's stack list.
export const StackOwnerWireSchema = z.looseObject({ sandbox: z.string(), you: z.boolean() });

// GET /ci/feed (Server-Sent Events, one `data:` line a frame) and GET /ci/runs: what the forges said.
const CiStatusWireSchema = z.enum(["queued", "running", "success", "failed", "canceled", "skipped", "unknown"]).catch("unknown");
export const CiRunWireSchema = z.looseObject({
    repo: z.string(),
    host: z.string(),
    project: z.string().optional(),
    runId: z.number(),
    workflow: z.string().optional(),
    branch: z.string(),
    sha: z.string(),
    status: CiStatusWireSchema,
    url: z.string().optional(),
    createdAt: z.number().optional(),
});
export type CiRunWire = z.infer<typeof CiRunWireSchema>;
export const CiFeedEventWireSchema = z.discriminatedUnion("kind", [
    z.looseObject({ kind: z.literal("run"), run: CiRunWireSchema }),
    z.looseObject({
        kind: z.literal("job"),
        repo: z.string(),
        host: z.string(),
        project: z.string().optional(),
        runId: z.number(),
        workflow: z.string().optional(),
        job: z.string(),
        // A job's own id is not on the frame: the run and the job's name say which it is.
        branch: z.string(),
        sha: z.string(),
        status: CiStatusWireSchema,
        url: z.string().optional(),
    }),
]);
export type CiFeedEventWire = z.infer<typeof CiFeedEventWireSchema>;
// Each run parsed on its own by the reader, so one a newer daemon shapes differently costs only itself.
export const CiRunsWireSchema = z.looseObject({ runs: z.array(z.unknown()).default([]) });

// POST /ci/deployments: a deploy shown on the repository's forge (a GitHub Deployment and its statuses, a GitLab commit
// status), through the CI board's own connection. The first report answers the deployment's id; later ones pass it back.
export type CiDeploymentStateWire = "in_progress" | "success" | "failure" | "inactive";
export interface CiDeploymentReportWire {
    readonly repo: string;
    readonly sha: string;
    readonly environment: string;
    readonly state: CiDeploymentStateWire;
    readonly production?: boolean | undefined;
    readonly description?: string | undefined;
    readonly environmentUrl?: string | undefined;
    readonly logUrl?: string | undefined;
    readonly deploymentId?: number | undefined;
}
export const CiDeploymentAnswerWireSchema = z.looseObject({ deploymentId: z.number().optional(), url: z.string().optional() });

// POST /secrets/marks: a keyed mark of each named value (an HMAC under a key only the daemon holds), never the value; a
// name nothing holds answers no mark.
export const SecretMarksWireSchema = z.looseObject({ marks: z.record(z.string(), z.string()).default({}) });

// ---- the `deploys` listener provider this extension contributes ------------------------------------------------------

export const DEPLOYS_PROVIDER = "deploys";
export const DEPLOY_EVENT_TYPES = [
    "deploy_succeeded",
    "deploy_failed",
    "deploy_rolled_back",
    "deploy_refused",
    "stack_unhealthy",
    "stack_recovered",
    "secrets_changed",
    "host_low_disk",
    "host_low_memory",
] as const;
export type DeployEventType = (typeof DEPLOY_EVENT_TYPES)[number];

// What POST /listeners/deploys/dispatch takes (sandbox-contract `listener-protocol.ts` ListenerMessageSchema): the fields
// a deploy event fills. `id` is also the idempotency key, so a retried dispatch is admitted once.
export interface ListenerMessageWire {
    readonly provider: string;
    readonly type: DeployEventType;
    readonly id: string;
    readonly channelId: string;
    readonly branch?: string;
    readonly author: { readonly id: string; readonly name: string };
    readonly content: string;
    readonly timestamp: string;
    readonly extra?: Readonly<Record<string, unknown>>;
}
export const listenerDispatchPath = (provider: string): string => `/listeners/${encodeURIComponent(provider)}/dispatch`;
// The header the daemon dedupes a retried dispatch by (LISTENER_DISPATCH_KEY_HEADER).
export const LISTENER_DISPATCH_KEY_HEADER = "idempotency-key";

// ---- refusals -------------------------------------------------------------------------------------------------------

// What a sandbox from before managed deploys makes of `deploy-managed` and the other primitives: a bare 404.
export const SANDBOX_PREDATES_MANAGED =
    "This sandbox predates managed deploys: update it (Sandbox ▸ Update), then deploy again. The stacks your repositories declare in .intentic/stacks.json deploy once it is updated.";

// A daemon answer that was not ok: its status, its own sentence when it gave one (oRPC answers `{ message }`), and
// whether it was a BARE 404, which only a route this sandbox does not serve gives.
export class DaemonRefusal extends Error {
    constructor(
        readonly status: number,
        message: string,
        readonly bare: boolean,
    ) {
        super(message);
        this.name = "DaemonRefusal";
    }
}

export const refusalOf = (status: number, body: string): DaemonRefusal => {
    let message: string | undefined;
    try {
        const parsed = JSON.parse(body) as { message?: unknown };
        message = typeof parsed.message === "string" && parsed.message !== "" ? parsed.message : undefined;
    } catch {
        // Not JSON: a proxy's page or a plain-text 404, read below.
    }
    if (status === 404 && message === undefined) {
        return new DaemonRefusal(status, SANDBOX_PREDATES_MANAGED, true);
    }
    if (message !== undefined) {
        return new DaemonRefusal(status, message, false);
    }
    const line = body.trim().split("\n")[0] ?? "";
    return new DaemonRefusal(status, line === "" ? `the sandbox answered ${status}` : line.slice(0, 500), false);
};

// One answer read as `schema`, or thrown as its refusal.
export const readAnswer = async <T>(response: Response, schema: z.ZodType<T>): Promise<T> => {
    const text = await response.text();
    if (!response.ok) {
        throw refusalOf(response.status, text);
    }
    return schema.parse(text === "" ? {} : JSON.parse(text));
};
