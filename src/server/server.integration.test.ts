import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { type FakeExtension, fakeExtensionApi } from "@intentic/extension-api/testing";
import { afterEach, describe, expect, test } from "vitest";
import manifest from "../../intentic-extension.json";
import { EnvironmentsOverviewSchema } from "../contract.js";
import * as server from "./server.js";

// The backend on the real backend api, with the daemon stood in for: every call it makes is judged by the manifest's
// `permissions.daemon` exactly as the daemon's grant judges it, so a route the code reaches and the manifest forgot
// fails here. A route the test does not answer is a bare 404, which is what a sandbox from before managed environments
// says to every `/deploys/*` path.

const environment = {
    repo: "shop",
    stack: "production",
    device: "z440",
    deviceId: "z440",
    mode: "images",
    triggers: [],
    secrets: [],
    ungranted: [],
    secretsChanged: [],
    state: "running",
    ownedElsewhere: false,
    problems: [],
};
const queued = {
    id: "dep-1",
    repo: "shop",
    stack: "production",
    device: "z440",
    commit: "0123456789abcdef",
    trigger: { kind: "manual" },
    outcome: "queued",
    queuedAt: "2026-11-25T10:00:00.000Z",
    secretNames: [],
};

let fake: FakeExtension | undefined;
afterEach(async () => {
    await fake?.dispose();
    fake = undefined;
});

const start = async (daemon: (request: Request) => Response | undefined | Promise<Response | undefined>): Promise<FakeExtension> => {
    // Who it is and how far it reaches: the parts of the manifest the fake judges by.
    fake = await fakeExtensionApi({ manifest: { publisher: manifest.publisher, name: manifest.name, permissions: manifest.permissions }, daemon });
    await mkdir(join(fake.api.workspaceRoot, "shop", ".git"), { recursive: true });
    await mkdir(join(fake.api.workspaceRoot, "shop", ".intentic"), { recursive: true });
    await writeFile(join(fake.api.workspaceRoot, "shop", ".intentic", "stacks.json"), JSON.stringify({ stacks: [] }));
    await mkdir(join(fake.api.workspaceRoot, "notes", ".git"), { recursive: true });
    await fake.activate(server);
    return fake;
};

describe("the backend's managed environments", () => {
    test("a sandbox from before them reads as unavailable, naming the repositories that declare stacks", async () => {
        const extension = await start(() => undefined);
        const response = await extension.route("environments");
        expect(response.status).toBe(200);
        expect(EnvironmentsOverviewSchema.parse(await response.json())).toEqual({ available: false, environments: [], manifestErrors: [], declaring: ["shop"] });
        expect(extension.calls).toEqual([{ line: "GET /deploys/environments", admitted: true }]);
    });

    test("the daemon's environments and history come through", async () => {
        const extension = await start((request) => {
            const url = new URL(request.url);
            if (url.pathname === "/deploys/environments") {
                return Response.json({ environments: [environment], manifestErrors: [] });
            }
            if (url.pathname === "/deploys/history") {
                expect(Object.fromEntries(url.searchParams)).toEqual({ repo: "shop", stack: "production", limit: "25" });
                return Response.json({ records: [queued] });
            }
            return undefined;
        });
        const overview = EnvironmentsOverviewSchema.parse(await (await extension.route("environments")).json());
        expect(overview.available).toBe(true);
        expect(overview.environments.map((entry) => entry.stack)).toEqual(["production"]);
        const history = (await (await extension.route("environments/history?repo=shop&stack=production&limit=25")).json()) as { records: { id: string }[] };
        expect(history.records.map((record) => record.id)).toEqual(["dep-1"]);
        expect(extension.calls.every((entry) => entry.admitted)).toBe(true);
    });

    test("the agent's deploy reaches the daemon's own route, naming the conversation that asked", async () => {
        const bodies: unknown[] = [];
        const extension = await start(async (request) => {
            if (new URL(request.url).pathname === "/deploys/deploy") {
                bodies.push(await request.json());
                return Response.json({ record: queued });
            }
            return undefined;
        });
        const result = (await extension.callTool("deploy_environment", { repo: "shop", stack: "production", wait: false }, undefined, { conversationId: "c-7" })) as {
            content: { text: string }[];
        };
        expect(result.content[0]?.text).toMatch(/^Queued: shop production at 01234567/u);
        expect(bodies).toEqual([{ repo: "shop", stack: "production", reason: "by the agent in conversation c-7" }]);
        expect(extension.calls).toEqual([{ line: "POST /deploys/deploy", admitted: true }]);
    });

    test("it deactivates, so the host can reload it alone", async () => {
        const extension = await start(() => undefined);
        await expect(extension.deactivate()).resolves.toBeUndefined();
        expect(extension.logs.filter((line) => /deactivat/iu.test(line))).toEqual([]);
    });

    test("its stores live in its own state directory, reading the legacy file until the first write there", async () => {
        const extension = await start(() => undefined);
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
