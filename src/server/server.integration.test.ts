import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { type FakeExtension, fakeExtensionApi } from "@intentic/extension-api/testing";
import { afterEach, describe, expect, test } from "vitest";
import manifest from "../../intentic-extension.json";
import { EnvironmentAnswerSchema, EnvironmentsOverviewSchema } from "../contract.js";
import { eventually, fakeDaemon, type FakeDaemon, stackRepo } from "./engine/engine.testing.js";
import * as server from "./server.js";

// The backend on the real backend api, with the daemon stood in for: every call it makes is judged by the manifest's
// `permissions.daemon` (and its `contributes.listener` for the events it dispatches) exactly as the daemon's grant
// judges it, so a route the code reaches and the manifest forgot fails here. The engine is the backend's own; the
// daemon answers only its primitives (engine/engine.testing.ts).

let fake: FakeExtension | undefined;
afterEach(async () => {
    await fake?.dispose();
    fake = undefined;
});

// The fake api hands the daemon a Request; the engine's fake daemon takes a path and an init.
const served =
    (daemon: FakeDaemon) =>
    async (request: Request): Promise<Response | undefined> => {
        const url = new URL(request.url);
        const body = request.method === "GET" ? undefined : await request.text();
        return daemon.request(`${url.pathname}${url.search}`, { method: request.method, headers: request.headers, ...(body === undefined || body === "" ? {} : { body }) });
    };

const start = async (daemon: FakeDaemon, setup?: (root: string) => Promise<void>): Promise<FakeExtension> => {
    // Who it is and how far it reaches: the parts of the manifest the fake judges by.
    fake = await fakeExtensionApi({
        manifest: { publisher: manifest.publisher, name: manifest.name, permissions: manifest.permissions, contributes: { listener: manifest.contributes.listener } },
        daemon: served(daemon),
    });
    await mkdir(join(fake.api.workspaceRoot, "notes", ".git"), { recursive: true });
    await setup?.(fake.api.workspaceRoot);
    await fake.activate(server);
    return fake;
};

const PRODUCTION = { name: "production", device: "rog", env: { API_TOKEN: "{{secret:API_TOKEN}}" } };

describe("the backend's managed environments", () => {
    test("a workspace whose repositories declare no stacks asks the daemon nothing", async () => {
        const daemon = fakeDaemon();
        const extension = await start(daemon, async (root) => {
            // A manifest in the working tree, never committed, declares nothing: manifests are read off HEAD.
            await mkdir(join(root, "shop", ".intentic"), { recursive: true });
            await writeFile(join(root, "shop", ".intentic", "stacks.json"), JSON.stringify({ stacks: [PRODUCTION] }));
        });
        const response = await extension.route("environments");
        expect(response.status).toBe(200);
        expect(EnvironmentsOverviewSchema.parse(await response.json())).toEqual({ environments: [], manifestErrors: [] });
        expect(extension.calls).toEqual([]);
    });

    test("the engine's environments and history come through, with what the owner has not granted", async () => {
        const daemon = fakeDaemon();
        const extension = await start(daemon, async (root) => {
            await stackRepo(root, "shop", [PRODUCTION]);
        });
        const overview = EnvironmentsOverviewSchema.parse(await (await extension.route("environments")).json());
        expect(overview.environments).toMatchObject([{ repo: "shop", stack: "production", device: "rog", deviceId: "rog", secrets: ["API_TOKEN"], ungranted: ["API_TOKEN"] }]);
        const history = (await (await extension.route("environments/history?repo=shop&stack=production&limit=25")).json()) as { records: unknown[] };
        expect(history.records).toEqual([]);
        expect(extension.calls.every((entry) => entry.admitted)).toBe(true);
    });

    test("a board press queues a deploy that reaches deploy-managed, and its end is dispatched to the extension's own listener", async () => {
        const daemon = fakeDaemon();
        daemon.grant("shop", "production", "rog", ["API_TOKEN"]);
        const extension = await start(daemon, async (root) => {
            await stackRepo(root, "shop", [PRODUCTION]);
        });
        const pressed = await extension.route("environments/deploy", {
            method: "POST",
            headers: { "content-type": "application/json", origin: "https://me.example.dev" },
            body: JSON.stringify({ repo: "shop", stack: "production" }),
        });
        expect(pressed.status).toBe(200);
        const { record } = EnvironmentAnswerSchema.parse(await pressed.json());
        expect(record).toMatchObject({ repo: "shop", stack: "production", outcome: "queued", trigger: { kind: "manual", detail: "from the Deployments board" } });
        await eventually(() => daemon.messages.length > 0);

        expect(daemon.deploys().map((call) => call.body)).toMatchObject([{ repo: "shop", env: { API_TOKEN: "{{secret:API_TOKEN}}" }, reason: "manual: from the Deployments board" }]);
        expect(daemon.messages.map((message) => message.type)).toEqual(["deploy_succeeded"]);
        expect(extension.calls.filter((entry) => !entry.admitted)).toEqual([]);
        expect(extension.calls.map((entry) => entry.line)).toEqual(
            expect.arrayContaining(["POST /system/devices/rog/stacks/production/deploy-managed", "GET /stack-grants", "POST /listeners/deploys/dispatch"]),
        );
    });

    test("the agent's deploy waits for its end, naming the conversation that asked", async () => {
        const daemon = fakeDaemon();
        daemon.grant("shop", "production", "rog", ["API_TOKEN"]);
        const extension = await start(daemon, async (root) => {
            await stackRepo(root, "shop", [PRODUCTION]);
        });
        const result = (await extension.callTool("deploy_environment", { repo: "shop", stack: "production" }, undefined, { conversationId: "c-7" })) as {
            content: { text: string }[];
        };
        expect(result.content[0]?.text).toMatch(/^Deployed shop production at [0-9a-f]{8} on rog \(record dep-/u);
        expect((daemon.deploys()[0]?.body as { reason: string }).reason).toBe("manual: by the agent in conversation c-7");
    });

    test("it deactivates, so the host can reload it alone", async () => {
        const extension = await start(fakeDaemon());
        await expect(extension.deactivate()).resolves.toBeUndefined();
        expect(extension.logs.filter((line) => /deactivat/iu.test(line))).toEqual([]);
    });

    test("its stores live in its own state directory, reading the legacy file until the first write there", async () => {
        const extension = await start(fakeDaemon());
        const legacy = join(extension.api.workspaceRoot, ".intentic", "local", "runtime", "extensions", "deployments");
        await mkdir(legacy, { recursive: true });
        await writeFile(join(legacy, "komodo.json"), JSON.stringify({ seenAt: { "device:z440": 5 }, links: { "device:z440": { notes: "notes" } } }));
        const seen = (await (await extension.route("device/z440/seen", { method: "POST" })).json()) as { seenAt: number };
        const written = JSON.parse(await readFile(join(extension.api.stateDir, "komodo.json"), "utf8")) as { seenAt: Record<string, number>; links: Record<string, unknown> };
        // The legacy links came along with the first write, which went to the new place.
        expect(written.seenAt["device:z440"]).toBe(seen.seenAt);
        expect(written.links).toEqual({ "device:z440": { notes: "notes" } });
    });
});
