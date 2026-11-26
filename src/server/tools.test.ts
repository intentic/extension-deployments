import type { ToolResult } from "@intentic/extension-api";
import { describe, expect, test } from "vitest";
import { type DeployEnvironmentsWire, DeployEnvironmentsWireSchema, type DeployRecordWire, DeployRecordWireSchema } from "../deploysWire.js";
import type { DeviceBoard } from "./device-board.js";
import type { DeviceDaemon } from "./device-daemon.js";
import type { KomodoStore } from "./komodo-store.js";
import { deploymentTools, type EnvironmentsService } from "./tools.js";

// The agent's managed-environment tools against an engine whose answers the test scripts: what a queued deploy settles
// as (or that it never does within the wait), the environments, and a stack's history.

const record = (fields: Partial<Record<keyof DeployRecordWire, unknown>> = {}): DeployRecordWire =>
    DeployRecordWireSchema.parse({
        id: "dep-1",
        repo: "shop",
        stack: "production",
        device: "z440",
        commit: "0123456789abcdef0123",
        trigger: { kind: "manual" },
        outcome: "queued",
        queuedAt: "2026-11-25T10:00:00.000Z",
        ...fields,
    });

interface Script {
    // What the queued record settles as; `never`: it is still going when the wait ends (history then says `running`).
    readonly ended?: DeployRecordWire | "never";
    readonly environments?: DeployEnvironmentsWire | Error;
    readonly history?: DeployRecordWire[];
}

const fakeDeploys = (script: Script = {}) => {
    const asked: [string, unknown][] = [];
    const environments: EnvironmentsService = {
        environments: async () => {
            const read = script.environments ?? { environments: [], manifestErrors: [] };
            if (read instanceof Error) {
                throw read;
            }
            return read;
        },
        history: async (ref, limit) => {
            asked.push(["history", { ...ref, limit }]);
            return script.history ?? (script.ended === "never" ? [record({ outcome: "running" })] : []);
        },
        deploy: async (request) => {
            asked.push(["deploy", request]);
            return record();
        },
        rollback: async (request) => {
            asked.push(["rollback", request]);
            return record({ trigger: { kind: "rollback" } });
        },
        promote: async (request) => {
            asked.push(["promote", request]);
            return record({ stack: request.to, trigger: { kind: "promote" } });
        },
        settled: (id, signal) =>
            new Promise((resolve, reject) => {
                const ended = script.ended ?? record({ id, outcome: "succeeded" });
                if (ended === "never") {
                    signal?.addEventListener("abort", () => reject(new Error("stopped waiting")), { once: true });
                    return;
                }
                resolve(ended);
            }),
    };
    return { environments, asked };
};

const toolsWith = (environments: EnvironmentsService, deadlineMs = 1_000) =>
    deploymentTools({
        board: {} as DeviceBoard,
        daemon: {} as DeviceDaemon,
        store: {} as KomodoStore,
        scan: { root: "/", read: async () => undefined },
        repoDirs: async () => [],
        environments,
        wait: { deadlineMs },
    });

const call = async (tools: ReturnType<typeof toolsWith>, name: string, args: Record<string, unknown>, conversationId?: string): Promise<ToolResult> => {
    const tool = tools.find((entry) => entry.name === name);
    if (tool === undefined) {
        throw new Error(`no tool ${name}`);
    }
    return (await tool.call(args, { signal: new AbortController().signal, conversationId })) as ToolResult;
};
const said = (result: ToolResult): string => result.content.map((part) => (part.type === "text" ? part.text : "")).join("");

describe("the managed-environment tools", () => {
    test("are served beside the plain compose ones", () => {
        expect(toolsWith(fakeDeploys().environments).map((tool) => tool.name)).toEqual([
            "environments",
            "deploy_environment",
            "rollback_environment",
            "promote_environment",
            "environment_history",
            "deploy_targets",
            "device_stacks",
            "deploy_to_device",
        ]);
    });

    test("deploy_environment queues, waits for the record's end and says how it went", async () => {
        const fake = fakeDeploys({ ended: record({ outcome: "succeeded", startedAt: "2026-11-25T10:00:01.000Z", endedAt: "2026-11-25T10:00:31.000Z", healthySeconds: 9 }) });
        const result = await call(toolsWith(fake.environments), "deploy_environment", { repo: "shop", stack: "production", reason: "ship the fix" }, "c-42");
        expect(result.isError).toBeUndefined();
        expect(said(result)).toBe("Deployed shop production at 01234567 on z440 (record dep-1), healthy after 9s; it took 30s.");
        expect(fake.asked[0]).toEqual(["deploy", { repo: "shop", stack: "production", commit: undefined, reason: "ship the fix (by the agent in conversation c-42)" }]);
    });

    test("a deploy that was rolled back is an error carrying the reason and compose's output", async () => {
        const fake = fakeDeploys({
            ended: record({ outcome: "rolled-back", rolledBackTo: "dep-0", error: "web did not come up healthy", outputTail: "web exited 1", endedAt: "2026-11-25T10:01:00.000Z" }),
        });
        const result = await call(toolsWith(fake.environments), "deploy_environment", { repo: "shop", stack: "production" });
        expect(result.isError).toBe(true);
        expect(said(result)).toContain("failed and the stack was put back on dep-0 (record dep-1): web did not come up healthy");
        expect(said(result)).toContain("--- output tail ---\nweb exited 1");
    });

    test("a deploy that outlasts the wait still running names its record instead of failing", async () => {
        const fake = fakeDeploys({ ended: "never" });
        const result = await call(toolsWith(fake.environments, 20), "deploy_environment", { repo: "shop", stack: "production" });
        expect(result.isError).toBeUndefined();
        expect(said(result)).toMatch(/^Still deploying: shop production at 01234567 on z440 \(record dep-1\)\. It carries on/u);
    });

    test("without waiting it answers once queued", async () => {
        const fake = fakeDeploys();
        const result = await call(toolsWith(fake.environments), "rollback_environment", { repo: "shop", stack: "production", to: "dep-0", wait: false });
        expect(said(result)).toMatch(/^Queued: shop production/u);
        expect(fake.asked).toEqual([["rollback", { repo: "shop", stack: "production", to: "dep-0", reason: "by the agent" }]]);
    });

    test("a refusal is the daemon's sentence, and a bad commit never reaches it", async () => {
        const fake = fakeDeploys({ ended: record({ outcome: "refused", error: "STRIPE_KEY is not granted to production: the owner has a card for it." }) });
        const refused = await call(toolsWith(fake.environments), "promote_environment", { repo: "shop", from: "staging", to: "production" });
        expect(refused.isError).toBe(true);
        expect(said(refused)).toContain("was refused (record dep-1): STRIPE_KEY is not granted");
        const bad = await call(toolsWith(fake.environments), "deploy_environment", { repo: "shop", stack: "production", commit: "HEAD~1" });
        expect(bad.isError).toBe(true);
        expect(fake.asked.filter(([kind]) => kind === "deploy")).toEqual([]);
    });

    test("environments reads in words, and says what went wrong reading them", async () => {
        const environments = DeployEnvironmentsWireSchema.parse({
            environments: [
                {
                    repo: "shop",
                    stack: "production",
                    device: "z440",
                    deviceId: "z440",
                    triggers: [{ ci: { branch: "main", job: "images" } }],
                    secrets: ["DATABASE_URL"],
                    ungranted: ["DATABASE_URL"],
                    state: "running",
                    current: record({ outcome: "succeeded", endedAt: "2026-11-25T10:00:31.000Z" }),
                },
            ],
            manifestErrors: [{ repo: "blog", error: "stacks: Required" }],
        });
        const read = JSON.parse(said(await call(toolsWith(fakeDeploys({ environments }).environments), "environments", {}))) as Record<string, unknown>;
        expect(read).toMatchObject({
            environments: [{ repo: "shop", stack: "production", device: "z440", state: "running", triggers: "on CI job images passing on main", ungrantedSecrets: ["DATABASE_URL"] }],
            manifestErrors: [{ repo: "blog", error: "stacks: Required" }],
        });
        const broken = await call(toolsWith(fakeDeploys({ environments: new Error("git could not read shop") }).environments), "environments", {});
        expect(broken.isError).toBe(true);
        expect(said(broken)).toBe("git could not read shop");
        const none = await call(toolsWith(fakeDeploys().environments), "environments", {});
        expect(said(none)).toContain("No repository in this workspace declares stacks");
    });

    test("environment_history lists records with what started them and why one failed", async () => {
        const fake = fakeDeploys({
            history: [
                record({ id: "dep-2", outcome: "failed", error: "boom", outputTail: "x".repeat(5_000), trigger: { kind: "ci", detail: "images on main", url: "https://ci/1" } }),
                record({ id: "dep-1", outcome: "succeeded", startedAt: "2026-11-25T10:00:00.000Z", endedAt: "2026-11-25T10:00:10.000Z", forgeUrl: "https://forge/d/1" }),
            ],
        });
        const listed = JSON.parse(said(await call(toolsWith(fake.environments), "environment_history", { repo: "shop", stack: "production", limit: 5 }))) as Record<string, unknown>[];
        expect(listed[0]).toMatchObject({ id: "dep-2", outcome: "failed", origin: "CI · images on main", error: "boom", triggerUrl: "https://ci/1" });
        expect(String(listed[0]?.["outputTail"])).toHaveLength(4_000);
        expect(listed[1]).toMatchObject({ id: "dep-1", seconds: 10, forgeUrl: "https://forge/d/1" });
        expect(listed[1]?.["outputTail"]).toBeUndefined();
        expect(fake.asked[0]).toEqual(["history", { repo: "shop", stack: "production", limit: 5 }]);
    });
});
