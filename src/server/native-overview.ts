import { z } from "zod";
import type { DeployAlert, DeployResource, DeployServer, DeployState } from "../contract.js";

// One connected computer's compose stacks, in the board's vocabulary: the same rows, host strip and alert log a Komodo
// board draws, so the view needs no second shape. Pure, so the mapping is tested without a daemon or a Docker.
//
// A Komodo keeps an alert log of its own; a computer doesn't. The board's incidents are edges, never a running count (a
// stopped stack must not badge for ever), so the backend keeps the last state it saw per stack and turns each move into
// or out of a broken state into an alert entry, opened and later resolved, exactly as Komodo's own log reads.

// The daemon's answer for GET /system/devices/{id}/stacks, as far as this board reads it. Parsed loosely: a field a newer
// daemon adds is no reason to drop the board.
const ServiceSchema = z.looseObject({
    service: z.string(),
    container: z.string(),
    image: z.string(),
    state: z.string(),
    status: z.string(),
    health: z.string().optional(),
});
const StackSchema = z.looseObject({
    name: z.string(),
    status: z.string(),
    configFiles: z.array(z.string()).default([]),
    workingDir: z.string().optional(),
    managed: z.boolean().default(false),
    sandbox: z.boolean().default(false),
    services: z.array(ServiceSchema).default([]),
});
export const DeviceStacksSchema = z.looseObject({ root: z.string(), stacks: z.array(StackSchema) });
export type DeviceStacks = z.infer<typeof DeviceStacksSchema>;
export type DeviceStack = z.infer<typeof StackSchema>;
type DeviceService = z.infer<typeof ServiceSchema>;

// A one-shot service (a migration, a seed) that finished is `exited (0)`, and that is it working, not it breaking.
const exitCode = (status: string): number | undefined => {
    const matched = /^Exited \((-?\d+)\)/u.exec(status);
    return matched?.[1] === undefined ? undefined : Number(matched[1]);
};

// Never a resting state, whoever asked for it: a failing healthcheck, a crash loop, a container Docker gave up on.
const failing = (service: DeviceService): boolean => service.health === "unhealthy" || service.state === "restarting" || service.state === "dead";

// A service that stopped on an error while the rest of its stack runs on: a partial outage. A whole stack that is down
// is a level, not a breakage (it may have been stopped on purpose, and a stopped container's exit code often says a
// signal, 137 or 143, either way); what says a running stack went down is the move, which foldStates records.
const crashedBeside = (service: DeviceService, stack: DeviceStack): boolean =>
    service.state === "exited" &&
    (exitCode(service.status) ?? 1) !== 0 &&
    stack.services.some((other) => other.state === "running");

const broken = (stack: DeviceStack) => (service: DeviceService): boolean => failing(service) || crashedBeside(service, stack);

// The stack's one state from its services: anything broken wins, then anything running, then stopped. A stack whose
// services finished cleanly (only one-shots, all exit 0) reads as stopped, which is what it is.
export const stackState = (stack: DeviceStack): DeployState => {
    if (stack.services.length === 0) {
        return "unknown";
    }
    if (stack.services.some(broken(stack))) {
        return "unhealthy";
    }
    if (stack.services.some((service) => service.state === "running")) {
        return stack.services.some((service) => service.health === "starting") ? "deploying" : "running";
    }
    return "stopped";
};

// The row's status line: what is wrong with which service when something is, else compose's own summary.
const stackStatus = (stack: DeviceStack): string => {
    const failed = stack.services.filter(broken(stack));
    if (failed.length === 0) {
        return stack.status;
    }
    return failed.map((service) => `${service.service}: ${service.health === "unhealthy" ? "unhealthy" : service.status}`).join(", ");
};

// The board's rows: stacks only, and never an Intentic sandbox's own project (the Devices view drives those).
export const deviceResources = (device: string, stacks: readonly DeviceStack[]): DeployResource[] =>
    stacks
        .filter((stack) => !stack.sandbox)
        .map((stack) => {
            const image = stack.services[0]?.image;
            return {
                kind: "stack" as const,
                id: stack.name,
                name: stack.name,
                state: stackState(stack),
                status: stackStatus(stack),
                server: device,
                ...(image === undefined ? {} : { image }),
                // Docker answers nothing about newer images without pulling them; `Update` (pull) is still on every row.
                updateAvailable: false,
                services: stack.services.map((service) => ({ name: service.service, image: service.image, updateAvailable: false })),
                url: "",
            };
        });

// The host strip: the computer itself, answering or not. It reports no gauges through this route.
export const deviceServer = (device: string, reachable: boolean): DeployServer => ({
    id: device,
    name: device,
    state: reachable ? "ok" : "unreachable",
    url: "",
});

// What the backend remembers per connection between reads: each stack's last state, and the alert log built from it.
export interface NativeMemory {
    readonly states: Readonly<Record<string, DeployState>>;
    readonly alerts: readonly DeployAlert[];
}

export const EMPTY_MEMORY: NativeMemory = { states: {}, alerts: [] };

// The log keeps the newest entries only; resolved history beyond this is nobody's business on a board.
export const ALERT_LOG_MAX = 50;

// Where a move INTO opens an alert: a breakage, from anywhere; a stop, only from up (a broken stack being stopped is the
// owner dealing with it, not news). Where a move out of resolves one: back up.
const UP: ReadonlySet<DeployState> = new Set(["running", "deploying"]);

// The alert's `to`, in the words incidents.ts reads as a breakage: a stack that went down is said as Docker says it.
const alertTarget = (state: DeployState): string | undefined => (state === "unhealthy" ? "unhealthy" : state === "stopped" ? "exited" : undefined);

// One read folded into the memory. A stack moving into a broken state, or going down from up, opens an alert; coming back
// up resolves every open alert about it; a stack that disappeared resolves its alerts too (removed is not broken). The
// first read of a connection (no states yet) opens alerts for what is broken right now, since that is news to the owner,
// but not for what is merely down. `quiet` names the stacks this board itself just stopped: their going down was asked
// for. `at` is the backend's clock.
export const foldStates = (
    memory: NativeMemory,
    device: string,
    resources: readonly DeployResource[],
    at: number,
    quiet: ReadonlySet<string> = new Set(),
): NativeMemory => {
    const states: Record<string, DeployState> = {};
    let alerts = [...memory.alerts];
    const resolveFor = (name: string): void => {
        alerts = alerts.map((alert) => (alert.resource === name && !alert.resolved ? { ...alert, resolved: true } : alert));
    };
    for (const resource of resources) {
        states[resource.name] = resource.state;
        const before = memory.states[resource.name];
        const open = alerts.some((alert) => alert.resource === resource.name && !alert.resolved);
        const wentBroken = resource.state === "unhealthy" && (before !== "unhealthy" || !open);
        const wentDown = resource.state === "stopped" && before !== undefined && UP.has(before) && !quiet.has(resource.name);
        const to = alertTarget(resource.state);
        if ((wentBroken || wentDown) && to !== undefined) {
            alerts.unshift({
                id: `${resource.name}-${at.toString(36)}`,
                type: "StackStateChange",
                level: "critical",
                resolved: false,
                ts: at,
                resource: resource.name,
                server: device,
                ...(before === undefined ? {} : { from: before }),
                to,
            });
        } else if (UP.has(resource.state) || (resource.state === "stopped" && before === "unhealthy")) {
            resolveFor(resource.name);
        }
    }
    for (const name of Object.keys(memory.states)) {
        if (states[name] === undefined) {
            resolveFor(name);
        }
    }
    return { states, alerts: alerts.slice(0, ALERT_LOG_MAX) };
};
