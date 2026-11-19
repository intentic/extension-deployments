import { AgentRunPickSchema } from "@intentic/sandbox-contract";
import { z } from "zod";

// The deployments extension's own wire shapes, shared by its UI and server halves, used by nobody else. Zod only lives
// here: the UI half imports it and must not pull the oRPC contract into the web bundle. Route table for these shapes is
// in server/contract.ts.

// Komodo deployments: the daemon does vendor translation (Komodo's shapes to the flat ones below); the extension layers
// an attention model on top, unit-testable without a daemon. Routes are per-connection; the browser never holds the
// Komodo API key itself.

// Collapses Komodo's ~11 states onto 5; `stopped` is a level only, transitions live in the alert log instead.
export const DeployStateSchema = z.enum(["running", "deploying", "stopped", "unhealthy", "unknown"]);
export type DeployState = z.infer<typeof DeployStateSchema>;

// Stack and deployment share one row type: an operator scanning for what's down wants one list, not two.
const DeployResourceKindSchema = z.enum(["deployment", "stack"]);

// One service inside a stack; rides Komodo's ListStacks response, so expanding a stack needs no extra fetch.
const DeployServiceSchema = z.object({
    name: z.string(),
    image: z.string(),
    updateAvailable: z.boolean(),
});

export const DeployResourceSchema = z.object({
    kind: DeployResourceKindSchema,
    // Komodo's resource id; action routes address by id since names collide across resource types.
    id: z.string(),
    name: z.string(),
    state: DeployStateSchema,
    // Komodo's own status prose, passed through; more precise than anything composed from the state word.
    status: z.string().optional(),
    // Host it runs on; the view's grouping key. Absent when Komodo hasn't placed the resource yet.
    server: z.string().optional(),
    image: z.string().optional(),
    // A newer image at the same tag; an opportunity, not a breakage, so it never tones the rail `danger`.
    updateAvailable: z.boolean(),
    // Stacks only; empty when the stack has nothing deployed yet.
    services: z.array(DeployServiceSchema),
    // Deep link into Komodo's own UI for this resource, rather than reimplementing it here.
    url: z.string(),
});
export type DeployResource = z.infer<typeof DeployResourceSchema>;

export const DeployServerStateSchema = z.enum(["ok", "unreachable", "disabled"]);
export type DeployServerState = z.infer<typeof DeployServerStateSchema>;

// Host plus its three gauges; ride ListServers' own info.stats, so the strip costs nothing extra.
export const DeployServerSchema = z.object({
    id: z.string(),
    name: z.string(),
    state: DeployServerStateSchema,
    cpuPercent: z.number().optional(),
    memPercent: z.number().optional(),
    diskPercent: z.number().optional(),
    url: z.string(),
});
export type DeployServer = z.infer<typeof DeployServerSchema>;

// One alert entry, already timestamped/resolved; `type` keeps Komodo's raw tag so new variants still surface.
export const DeployAlertSchema = z.object({
    id: z.string(),
    type: z.string(),
    level: z.enum(["ok", "warning", "critical"]),
    // Komodo closes an alert once the condition clears; a resolved container-state alert is the recovery.
    resolved: z.boolean(),
    // Epoch ms the alert opened; compared against seenAt so ongoing trouble in one alert doesn't re-badge.
    ts: z.number(),
    // Resource the alert is about, when the variant names one, and the host it runs on.
    resource: z.string().optional(),
    server: z.string().optional(),
    // State transition, on variants that carry one; absent otherwise.
    from: z.string().optional(),
    to: z.string().optional(),
});
export type DeployAlert = z.infer<typeof DeployAlertSchema>;

// Who the API key acts as; Komodo filters lists by permission, so empty could mean no access, not emptiness.
const DeployViewerSchema = z.object({
    username: z.string(),
    // Either of Komodo's admin flags; an admin key sees everything, so its empty board really is empty.
    admin: z.boolean(),
});

// Workspace repo with a compose file, and the Komodo stack it maps to; the daemon suggests, owner confirms.
export const DeployRepoLinkSchema = z.object({
    // Workspace repo dir; the same `repo` key the rest of the app joins on.
    repo: z.string(),
    // Compose project name: the file's `name:` if set, else the repo dir; what `docker compose up` would call it.
    projectName: z.string(),
    // Workspace-relative path of the compose file the name came from, so the UI can say where it looked.
    composePath: z.string(),
    // Stack the owner linked, once they have; absent means unlinked, with `suggestions` as the offer.
    linkedStack: z.string().optional(),
    // Stack names resembling this repo, best first; empty means the UI offers the full list instead.
    suggestions: z.array(z.string()),
});
export type DeployRepoLink = z.infer<typeof DeployRepoLinkSchema>;

// Links a repo to a stack, or clears with empty `stack`; a toggle can't express swapping stacks.
export const DeployLinkParamSchema = z.object({
    capability: z.string(),
    repo: z.string(),
    stack: z.string(),
});

// Fields added after this route shipped are optional or defaulted, never required, since browser and daemon can be on
// different commits. Default when the view renders fine without it; optional when absence itself is meaningful.
export const DeployOverviewResponseSchema = z.object({
    // Which kind of estate this board reads: a Komodo the owner runs, or one of their own connected computers, whose
    // compose stacks the daemon relays (no Komodo between). Defaulted, so an answer from before devices reads as Komodo's.
    source: z.enum(["komodo", "device"]).default("komodo"),
    // Komodo's address; empty on a device board, which has no UI of its own to link to.
    komodoUrl: z.string(),
    // Device boards only: where a stack deployed from here lands on that computer (`<deviceRoot>/<stack>`).
    deviceRoot: z.string().optional(),
    // False means Komodo didn't answer; not seeing it isn't the same as it being broken, so never `danger`.
    reachable: z.boolean(),
    // Why it didn't answer, in Komodo's own words; shown instead of a bare "unavailable".
    unreachableReason: z.string().optional(),
    // Absent when Komodo didn't answer or the daemon predates the field; distinct from "the key sees nothing".
    viewer: DeployViewerSchema.optional(),
    // Every workspace repo with a compose file; shown even on an empty board, when linking one matters most.
    repos: z.array(DeployRepoLinkSchema).default([]),
    resources: z.array(DeployResourceSchema),
    servers: z.array(DeployServerSchema),
    // Newest first, resolved and unresolved both; the badge reads only the unresolved half.
    alerts: z.array(DeployAlertSchema),
    // Last time the owner opened this connection's view, so the rail needs no second call; absent = never opened.
    seenAt: z.number().optional(),
    // Device boards only: what this board started on that computer and how each ended, newest first. An action there
    // can take minutes (a pull, a build), longer than any request may stay open, so it runs on in the backend and the
    // board reads its outcome here instead of from the press that started it.
    operations: z.array(z.lazy(() => DeployOperationSchema)).default([]),
});
export type DeployOverviewResponse = z.infer<typeof DeployOverviewResponseSchema>;

// Which Komodo connection a call addresses: the capability id, the view's `?connection=`.
export const DeployCapabilityParamSchema = z.object({ capability: z.string() });

// No `write/*` on an existing resource here: it would drift against the desired-state repo; `pull` fetches and deploys in
// one click. The one write is `host-stack` below, which points a stack at a folder the owner put on the server.
export const DeployActionSchema = z.enum(["deploy", "restart", "start", "stop", "pull"]);
export type DeployAction = z.infer<typeof DeployActionSchema>;

export const DeployActionParamSchema = z.object({
    capability: z.string(),
    kind: DeployResourceKindSchema,
    // Komodo's resource id; re-resolved per call so a stale card can't act on something already deleted.
    id: z.string(),
    action: DeployActionSchema,
});

export const DeployLogsParamSchema = z.object({
    capability: z.string(),
    kind: DeployResourceKindSchema,
    id: z.string(),
});

// Adds which model to run on, when the reader used the caret; absent falls back to the usual agent-run list.
export const DeployFixParamSchema = DeployLogsParamSchema.extend({ pick: AgentRunPickSchema });

// Komodo returns both channels; the view renders them together, newest at the bottom, like a terminal.
export const DeployLogsResponseSchema = z.object({ stdout: z.string(), stderr: z.string() });
export type DeployLogsResponse = z.infer<typeof DeployLogsResponseSchema>;

// The device board's action, log and fix inputs: the Komodo ones with the device in place of the capability. A device
// board shows stacks only, so `kind` is always `stack` there; it stays in the shape so the view sends one body.
export const DeviceActionParamSchema = DeployActionParamSchema.omit({ capability: true }).extend({ device: z.string().min(1) });
export const DeviceLogsParamSchema = DeployLogsParamSchema.omit({ capability: true }).extend({ device: z.string().min(1) });
export const DeviceFixParamSchema = DeployFixParamSchema.omit({ capability: true }).extend({ device: z.string().min(1) });
export const DeviceLinkParamSchema = DeployLinkParamSchema.omit({ capability: true }).extend({ device: z.string().min(1) });

// Opens an isolated conversation seeded with the resource, state, and log tail; Komodo's UI can't do this.
export const DeployFixResponseSchema = z.object({ conversationId: z.string() });
export type DeployFixResponse = z.infer<typeof DeployFixResponseSchema>;

export const DeploySeenResponseSchema = z.object({ seenAt: z.number() });

// One action a device board started: a deploy of a repo, or an op on a stack. `finishedAt` absent is still running.
export const DeployOperationSchema = z.object({
    stack: z.string(),
    // `deploy`, or the stack op it ran (`up`, `pull`, `restart`, `start`, `stop`).
    action: z.string(),
    // The workspace repo a deploy packed.
    repo: z.string().optional(),
    startedAt: z.number(),
    finishedAt: z.number().optional(),
    // What the computer refused or failed with, in its own words; absent on success.
    error: z.string().optional(),
    // The commit a deploy carried, once it went.
    commit: z.string().optional(),
});
export type DeployOperation = z.infer<typeof DeployOperationSchema>;

// THE DEVICE BOARD'S OWN ROUTES. A connection is `device:<card id>` in the view's picker and `device/<card id>/…` on the
// wire; everything the Komodo board shows is drawn from the same shapes above, so one view serves both.
export const DEVICE_CONNECTION_PREFIX = "device:";
export const isDeviceConnection = (connection: string): boolean => connection.startsWith(DEVICE_CONNECTION_PREFIX);
export const deviceOf = (connection: string): string => connection.slice(DEVICE_CONNECTION_PREFIX.length);
export const deviceConnection = (device: string): string => `${DEVICE_CONNECTION_PREFIX}${device}`;
// Where one connection's routes live in this extension's namespace: `komodo/<capability>` or `device/<card id>`.
export const connectionRoutes = (connection: string): string =>
    isDeviceConnection(connection) ? `device/${encodeURIComponent(deviceOf(connection))}` : `komodo/${encodeURIComponent(connection)}`;

// A compose project name as Docker accepts one, which is also the folder the stack lives in on the computer.
export const StackNameSchema = z
    .string()
    .regex(/^[a-z0-9][a-z0-9_-]{0,62}$/, "lowercase letters, digits, dash and underscore, starting with a letter or digit");

// A repo's compose project name made into one: what the deploy dialog offers before the owner types anything.
export const stackNameFor = (projectName: string): string => {
    const slug = projectName
        .toLowerCase()
        .replaceAll(/[^a-z0-9_-]+/gu, "-")
        .replaceAll(/^[-_]+|-+$/gu, "")
        .slice(0, 63);
    return slug === "" ? "app" : slug;
};

export const DeviceParamSchema = z.object({ device: z.string().min(1) });

// Deploys a workspace repo's COMMITTED tree to the device as a stack of this name (created, or replaced in place).
export const DeviceDeployParamSchema = z.object({
    device: z.string().min(1),
    repo: z.string().min(1),
    stack: StackNameSchema,
});
export type DeviceDeployParam = z.infer<typeof DeviceDeployParamSchema>;

export const DeviceDeployResponseSchema = z.object({
    stack: z.string(),
    // The folder it runs from on the computer, and the commit that went.
    path: z.string(),
    commit: z.string(),
});
export type DeviceDeployResponse = z.infer<typeof DeviceDeployResponseSchema>;

// Puts an agent on a stack's environment: which variables its compose file reads, filled from the sandbox's stored
// secrets into the `.env` beside it on the computer, through the secret gates an agent turn has and a button press does not.
export const DeviceEnvironmentParamSchema = z.object({
    device: z.string().min(1),
    stack: StackNameSchema,
    repo: z.string().min(1).optional(),
    pick: AgentRunPickSchema,
});

// The name a host-folder stack gets when the owner leaves it blank, shared so the dialog's placeholder and the server
// agree. `~/.intentic/compose/acme/` → `intentic-acme`; a segment already carrying the prefix keeps it once. Lowercased
// and reduced to Komodo-safe characters, since the name also becomes the compose project name.
const HOST_STACK_PREFIX = "intentic-";
export const defaultStackName = (folder: string): string => {
    const segment = folder.replace(/\/+$/u, "").split("/").at(-1) ?? "";
    const slug = segment
        .toLowerCase()
        .replaceAll(/[^a-z0-9_-]+/gu, "-")
        .replaceAll(/^-+|-+$/gu, "");
    if (slug === "") {
        throw new Error(`can't name a stack after "${folder}": give it a name`);
    }
    return slug.startsWith(HOST_STACK_PREFIX) ? slug : `${HOST_STACK_PREFIX}${slug}`;
};

// "Run a sandbox from a host folder": a folder on a Komodo server's disk (what `ic sandbox compose <slug>` writes)
// becomes a files-on-host stack, created by name, then deployed. An existing stack of that name is updated only when it is
// already a host-folder stack for the same folder on the same server (a redeploy); any other is refused, never repointed.
export const DeployHostStackParamSchema = z.object({
    capability: z.string(),
    // Komodo's server id, chosen from the board's servers.
    server: z.string(),
    // Absolute path on that server.
    folder: z.string(),
    // Absent or blank: `intentic-<last segment of folder>`.
    name: z.string().optional(),
});
export type DeployHostStackParam = z.infer<typeof DeployHostStackParamSchema>;

export const DeployHostStackResponseSchema = z.object({
    stack: z.string(),
    // False when the same host-folder stack already existed and was redeployed.
    created: z.boolean(),
});
export type DeployHostStackResponse = z.infer<typeof DeployHostStackResponseSchema>;
