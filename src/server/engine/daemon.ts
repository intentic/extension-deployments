import { errorMessage } from "@intentic/base/errors";
import { z } from "zod";
import {
    CiDeploymentAnswerWireSchema,
    type CiDeploymentReportWire,
    type CiRunWire,
    CiRunWireSchema,
    CiRunsWireSchema,
    DaemonRefusal,
    type DeviceRowWire,
    DevicesWireSchema,
    type HostStatsWire,
    HostStatsWireSchema,
    LISTENER_DISPATCH_KEY_HEADER,
    listenerDispatchPath,
    type ListenerMessageWire,
    type ManagedDeployInputWire,
    type ManagedDeployResultWire,
    ManagedDeployResultWireSchema,
    readAnswer,
    refusalOf,
    SecretMarksWireSchema,
    STACK_GRANTS_PATHS,
    type StackGrantWire,
    StackGrantsWireSchema,
    StackOwnerWireSchema,
} from "../../deploysWire.js";
import { type DeviceStacks, DeviceStacksSchema } from "../native-overview.js";

// THE DAEMON'S PRIMITIVES, as the engine calls them (deploysWire.ts has the shapes): one client over
// `api.daemon.request`, each call with a deadline of its own, so the engine is tested against a fake of these routes.
// Every route here is in the manifest's `permissions.daemon`, and nothing here ever sends or receives a secret's value:
// a deploy sends references, and answers names and keyed marks.

export type DaemonRequest = (path: string, init?: RequestInit) => Promise<Response>;

// How a managed deploy ended, by where (the daemon's status says which):
// - `refused`: nothing reached the stack (400 the repository or commit, 403 a grant or a switch or another sandbox's
//   stack, 409 a computer offline or an agent too old, 412 a secret it cannot fill, 404 a stack or route it does not
//   know). `predates` is a bare 404: the sandbox is older than managed deploys.
// - `machine`: 422, the machine's own word that the deploy failed there (compose, a hook, health): the one case the
//   stack is known broken, so the one a rollback mends.
// - `lost`: 502, 500, a timeout, the link dropping: it may or may not have run, so nothing is rolled back.
export type ManagedOutcome =
    | { readonly kind: "deployed"; readonly result: ManagedDeployResultWire }
    | { readonly kind: "refused"; readonly error: string; readonly predates: boolean }
    | { readonly kind: "machine" | "lost"; readonly error: string };

const REFUSED_STATUSES = new Set([400, 403, 404, 409, 412]);

export const managedOutcomeOf = (status: number, body: string): ManagedOutcome => {
    const refusal = refusalOf(status, body);
    if (status === 422) {
        return { kind: "machine", error: refusal.message };
    }
    if (REFUSED_STATUSES.has(status)) {
        return { kind: "refused", error: refusal.message, predates: refusal.bare };
    }
    return { kind: "lost", error: refusal.message };
};

export type StackOp = "up" | "restart" | "start" | "stop" | "pull";

export interface DeploysDaemon {
    readonly devices: () => Promise<readonly DeviceRowWire[]>;
    readonly stacks: (id: string) => Promise<DeviceStacks>;
    readonly op: (id: string, name: string, op: StackOp) => Promise<string>;
    readonly hostStats: (id: string) => Promise<HostStatsWire>;
    readonly deployManaged: (id: string, name: string, input: ManagedDeployInputWire, signal?: AbortSignal) => Promise<ManagedOutcome>;
    readonly grants: () => Promise<readonly StackGrantWire[]>;
    readonly marks: (names: readonly string[]) => Promise<Readonly<Record<string, string>>>;
    readonly reportDeployment: (report: CiDeploymentReportWire) => Promise<{ readonly deploymentId?: number | undefined; readonly url?: string | undefined }>;
    readonly ciRuns: () => Promise<readonly CiRunWire[]>;
    // The SSE stream itself, for the feed reader (ci-feed.ts).
    readonly ciFeed: (signal: AbortSignal) => Promise<Response>;
    readonly dispatch: (message: ListenerMessageWire) => Promise<void>;
}

// A read is a listing on the far side of a device link, or a file the daemon holds: a minute at most.
const READ_DEADLINE_MS = 60_000;
// `pull` fetches images and applies them.
const OP_DEADLINE_MS = 10 * 60_000;
// Packing, carrying, pulling or building, hooks and the health wait: the daemon's own call to the machine allows ~15.
export const DEPLOY_DEADLINE_MS = 20 * 60_000;

const deadline = (ms: number, signal: AbortSignal | undefined): AbortSignal =>
    signal === undefined ? AbortSignal.timeout(ms) : AbortSignal.any([AbortSignal.timeout(ms), signal]);

const segment = encodeURIComponent;
const OpAnswerSchema = z.looseObject({ output: z.string().default("") });

// The stack list with each stack's owner read (native-overview's schema keeps it as an unknown extra field).
export const stackOwner = (stack: DeviceStacks["stacks"][number]): z.infer<typeof StackOwnerWireSchema> | undefined => {
    const parsed = StackOwnerWireSchema.safeParse((stack as { owner?: unknown }).owner);
    return parsed.success ? parsed.data : undefined;
};

export const daemonDeploys = (request: DaemonRequest, lifetime?: AbortSignal): DeploysDaemon => {
    const call = async <T>(path: string, schema: z.ZodType<T>, ms: number, body?: unknown, signal?: AbortSignal): Promise<T> =>
        readAnswer(
            await request(path, {
                method: body === undefined ? "GET" : "POST",
                headers: { "content-type": "application/json" },
                ...(body === undefined ? {} : { body: JSON.stringify(body) }),
                signal: deadline(ms, signal ?? lifetime),
            }),
            schema,
        );
    const device = (id: string): string => `/system/devices/${segment(id)}`;
    return {
        devices: async () => (await call("/system/devices", DevicesWireSchema, READ_DEADLINE_MS)).devices,
        stacks: (id) => call(`${device(id)}/stacks`, DeviceStacksSchema, READ_DEADLINE_MS),
        op: async (id, name, op) => (await call(`${device(id)}/stacks/${segment(name)}/ops/${op}`, OpAnswerSchema, OP_DEADLINE_MS, {})).output,
        hostStats: (id) => call(`${device(id)}/host-stats`, HostStatsWireSchema, READ_DEADLINE_MS),
        deployManaged: async (id, name, input, signal) => {
            let response: Response;
            try {
                response = await request(`${device(id)}/stacks/${segment(name)}/deploy-managed`, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(input),
                    signal: deadline(DEPLOY_DEADLINE_MS, signal ?? lifetime),
                });
            } catch (error) {
                // The call never came back: a timeout, the backend stopping, the daemon going away under it.
                return { kind: "lost", error: `The sandbox did not answer the deploy: ${errorMessage(error)}` };
            }
            const text = await response.text().catch(() => "");
            if (!response.ok) {
                return managedOutcomeOf(response.status, text);
            }
            let raw: unknown;
            try {
                raw = text === "" ? {} : JSON.parse(text);
            } catch {
                raw = undefined;
            }
            const parsed = ManagedDeployResultWireSchema.safeParse(raw);
            // It ran and answered something else: what it did is unknown, as with a dropped link.
            return parsed.success ? { kind: "deployed", result: parsed.data } : { kind: "lost", error: `The sandbox's answer to the deploy could not be read: ${parsed.error.message}` };
        },
        grants: async () => (await call(STACK_GRANTS_PATHS.list, StackGrantsWireSchema, READ_DEADLINE_MS)).grants,
        marks: async (names) => (await call("/secrets/marks", SecretMarksWireSchema, READ_DEADLINE_MS, { names })).marks,
        reportDeployment: (report) => call("/ci/deployments", CiDeploymentAnswerWireSchema, READ_DEADLINE_MS, report),
        ciRuns: async () =>
            (await call("/ci/runs", CiRunsWireSchema, READ_DEADLINE_MS)).runs.flatMap((raw) => {
                const parsed = CiRunWireSchema.safeParse(raw);
                return parsed.success ? [parsed.data] : [];
            }),
        ciFeed: async (signal) => {
            const response = await request("/ci/feed", { headers: { accept: "text/event-stream" }, signal });
            if (!response.ok) {
                throw refusalOf(response.status, await response.text().catch(() => ""));
            }
            return response;
        },
        dispatch: async (message) => {
            const response = await request(listenerDispatchPath(message.provider), {
                method: "POST",
                headers: { "content-type": "application/json", [LISTENER_DISPATCH_KEY_HEADER]: message.id },
                body: JSON.stringify(message),
                signal: deadline(READ_DEADLINE_MS, lifetime),
            });
            const text = await response.text().catch(() => "");
            if (!response.ok) {
                throw refusalOf(response.status, text);
            }
        },
    };
};

export { DaemonRefusal };
