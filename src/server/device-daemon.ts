import type { ExtensionServerApi } from "@intentic/extension-api";
import { z } from "zod";
import { type DeviceStacks, DeviceStacksSchema } from "./native-overview.js";

// The daemon's device-stack routes (system.contract.ts: deviceStacks, deviceStackOp, deviceStackLogs, deployDeviceStack),
// behind one client shape so the board's handlers and the agent's tools are tested with a fake. Called through
// `api.daemon.request`, not `json`: `json` ends every call at 30 seconds, and a deploy builds images for minutes. Each
// call carries a deadline of its own instead, sized to what it waits on.

export type StackOp = "up" | "restart" | "start" | "stop" | "pull";

export interface DeviceDeployed {
    readonly stack: string;
    readonly path: string;
    readonly commit: string;
    readonly output: string;
}

export interface DeviceDaemon {
    readonly stacks: (device: string) => Promise<DeviceStacks>;
    readonly op: (device: string, stack: string, op: StackOp) => Promise<string>;
    readonly logs: (device: string, stack: string, tail: number) => Promise<string>;
    readonly deploy: (device: string, stack: string, repo: string) => Promise<DeviceDeployed>;
}

// Reading is a docker listing on the far side of a device link: seconds, or a minute on a loaded machine.
const READ_DEADLINE_MS = 60_000;
// `pull` fetches images and `up` may start a dozen containers.
const OP_DEADLINE_MS = 10 * 60_000;
// Packing, carrying and building, all three: the daemon's own call to the machine allows about as long.
const DEPLOY_DEADLINE_MS = 20 * 60_000;

const OpAnswerSchema = z.object({ output: z.string() });
const LogsAnswerSchema = z.object({ text: z.string() });
const DeployAnswerSchema = z.object({ stack: z.string(), path: z.string(), commit: z.string(), output: z.string() });

// A refusal's own sentence: oRPC answers `{ message }`, anything else is passed on as the body it was, cut to a line. A
// bare 404 is a sandbox from before these routes, which nothing but an update fixes.
const refusalOf = (status: number, body: string): string => {
    if (status === 404 && !body.includes("message")) {
        return "this sandbox does not serve device stacks yet: update it, then try again";
    }
    try {
        const parsed = JSON.parse(body) as { message?: unknown };
        if (typeof parsed.message === "string" && parsed.message !== "") {
            return parsed.message;
        }
    } catch {
        // Not JSON: the body itself is the best account there is.
    }
    const line = body.trim().split("\n")[0] ?? "";
    return line === "" ? `the sandbox answered ${status}` : line.slice(0, 500);
};

const segment = encodeURIComponent;

export const daemonDevices = (api: Pick<ExtensionServerApi, "daemon">): DeviceDaemon => {
    const call = async <T>(path: string, schema: z.ZodType<T>, deadlineMs: number, body?: unknown): Promise<T> => {
        const response = await api.daemon.request(path, {
            method: body === undefined ? "GET" : "POST",
            headers: { "content-type": "application/json" },
            ...(body === undefined ? {} : { body: JSON.stringify(body) }),
            signal: AbortSignal.timeout(deadlineMs),
        });
        const text = await response.text();
        if (!response.ok) {
            throw new Error(refusalOf(response.status, text));
        }
        return schema.parse(JSON.parse(text));
    };
    const base = (device: string): string => `/system/devices/${segment(device)}/stacks`;
    return {
        stacks: (device) => call(base(device), DeviceStacksSchema, READ_DEADLINE_MS),
        op: async (device, stack, op) => (await call(`${base(device)}/${segment(stack)}/ops/${op}`, OpAnswerSchema, OP_DEADLINE_MS, {})).output,
        logs: async (device, stack, tail) => (await call(`${base(device)}/${segment(stack)}/logs?tail=${tail}`, LogsAnswerSchema, READ_DEADLINE_MS)).text,
        deploy: (device, stack, repo) => call(`${base(device)}/${segment(stack)}/deploy`, DeployAnswerSchema, DEPLOY_DEADLINE_MS, { repo }),
    };
};
