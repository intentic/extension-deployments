import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ORPCError } from "@orpc/server";
import { beforeEach, describe, expect, test } from "vitest";
import { deviceBoard } from "./device-board.js";
import type { DeviceDaemon, DeviceDeployed, StackOp } from "./device-daemon.js";
import { deviceOperations } from "./device-operations.js";
import { readFileOrUndefined } from "./discover.js";
import { fileKomodoStore } from "./komodo-store.js";
import type { DeviceStacks } from "./native-overview.js";
import { fileNativeStore } from "./native-store.js";

// A daemon whose answers the test sets, and which records what it was asked; `gate` holds a deploy until released, so
// a test can look at the board while it runs.
const fakeDaemon = () => {
    let stacks: DeviceStacks | Error = { root: "/home/me/.intentic-machine/stacks", stacks: [] };
    const ops: [string, string, StackOp][] = [];
    const deploys: [string, string, string][] = [];
    let release: (answer: DeviceDeployed | Error) => void = () => {};
    const daemon: DeviceDaemon = {
        stacks: async () => {
            if (stacks instanceof Error) {
                throw stacks;
            }
            return stacks;
        },
        op: async (device, stack, op) => {
            ops.push([device, stack, op]);
            return "done";
        },
        logs: async () => "api  | listening on :3000",
        deploy: (device, stack, repo) => {
            deploys.push([device, stack, repo]);
            return new Promise((resolve, reject) => {
                release = (answer) => (answer instanceof Error ? reject(answer) : resolve(answer));
            });
        },
    };
    return {
        daemon,
        ops,
        deploys,
        setStacks: (next: DeviceStacks | Error) => {
            stacks = next;
        },
        finishDeploy: (answer: DeviceDeployed | Error) => release(answer),
    };
};

const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("deviceBoard", () => {
    let root: string;
    let fake: ReturnType<typeof fakeDaemon>;
    let agents: { kind: string; prompt: string }[];
    let board: ReturnType<typeof deviceBoard>;

    beforeEach(async () => {
        root = await mkdtemp(join(tmpdir(), "deploy-board-"));
        await mkdir(join(root, "shop", ".git"), { recursive: true });
        await writeFile(join(root, "shop", "compose.yaml"), "name: shop\nservices:\n  web:\n    build: .\n");
        await mkdir(join(root, "notes", ".git"), { recursive: true });
        fake = fakeDaemon();
        agents = [];
        board = deviceBoard({
            daemon: fake.daemon,
            store: fileKomodoStore(join(root, "state", "komodo.json")),
            memory: fileNativeStore(join(root, "state", "native.json")),
            operations: deviceOperations(),
            scan: { root, read: readFileOrUndefined },
            repoDirs: async () => [join(root, "notes"), join(root, "shop")],
            startAgent: async (request) => {
                agents.push(request);
                return { conversationId: "c1" };
            },
            log: () => {},
        });
    });

    test("an unreachable computer degrades to a board that says why", async () => {
        fake.setStacks(new Error(`the "Run commands" switch is off on z440`));
        const overview = await board.overview("z440");
        expect(overview).toMatchObject({ source: "device", reachable: false, unreachableReason: `the "Run commands" switch is off on z440` });
        expect(overview.servers).toEqual([{ id: "z440", name: "z440", state: "unreachable", url: "" }]);
        // The repos are still there to deploy once it answers.
        expect(overview.repos.map((repo) => repo.repo)).toEqual(["shop"]);
    });

    test("a deploy answers at once, shows while it runs, links the repo and records the commit", async () => {
        await board.deploy("z440", "shop", "shop");
        expect(fake.deploys).toEqual([["z440", "shop", "shop"]]);
        const running = await board.overview("z440");
        expect(running.operations).toMatchObject([{ stack: "shop", action: "deploy", repo: "shop" }]);
        expect(running.operations[0]?.finishedAt).toBeUndefined();

        fake.finishDeploy({ stack: "shop", path: "/srv/shop", commit: "a".repeat(40), output: "Started" });
        await settle();
        await settle();
        fake.setStacks({
            root: "/srv",
            stacks: [
                {
                    name: "shop",
                    status: "running(1)",
                    configFiles: [],
                    managed: true,
                    sandbox: false,
                    services: [{ service: "web", container: "shop-web-1", image: "shop-web", state: "running", status: "Up 1 second" }],
                },
            ],
        });
        const after = await board.overview("z440");
        expect(after.operations[0]).toMatchObject({ commit: "a".repeat(40) });
        expect(after.operations[0]?.error).toBeUndefined();
        expect(after.repos.find((repo) => repo.repo === "shop")?.linkedStack).toBe("shop");
    });

    test("a second press on a busy stack is refused rather than racing it", async () => {
        await board.deploy("z440", "shop", "shop");
        await expect(board.deploy("z440", "shop", "shop")).rejects.toBeInstanceOf(ORPCError);
        fake.finishDeploy(new Error("compose: build failed"));
        await settle();
        const overview = await board.overview("z440");
        expect(overview.operations[0]?.error).toBe("compose: build failed");
    });

    test("only a workspace repo with a compose file can be deployed", async () => {
        await expect(board.deploy("z440", "notes", "notes")).rejects.toThrow(/compose file/);
        await expect(board.deploy("z440", "../etc", "etc")).rejects.toThrow(/compose file/);
        expect(fake.deploys).toEqual([]);
    });

    test("the board's verbs become compose's", async () => {
        board.action("z440", "shop", "deploy");
        await settle();
        board.action("z440", "web", "pull");
        await settle();
        expect(fake.ops).toEqual([
            ["z440", "shop", "up"],
            ["z440", "web", "pull"],
        ]);
    });

    test("an environment turn names the folder and keeps secret values out of the conversation", async () => {
        fake.setStacks({ root: "/srv", stacks: [] });
        await board.environment("z440", "shop", "shop", undefined);
        expect(agents).toHaveLength(1);
        expect(agents[0]?.kind).toBe("deploy-env");
        expect(agents[0]?.prompt).toContain("/srv/shop");
        expect(agents[0]?.prompt).toContain("{{secret:NAME}}");
    });
    test("a managed environment's fix ships through its manifest, never a hand-written .env", async () => {
        fake.setStacks({
            root: "/srv",
            stacks: [
                {
                    name: "production",
                    status: "running(1)",
                    configFiles: ["/srv/production/compose.yaml"],
                    workingDir: "/srv/production",
                    managed: true,
                    sandbox: false,
                    services: [{ service: "web", container: "production-web-1", image: "web", state: "restarting", status: "Restarting (1)" }],
                },
            ],
        });
        await board.fix("z440", "production", undefined, "shop");
        expect(agents[0]?.prompt).toContain(`deploy_environment (repo "shop", stack "production")`);
        expect(agents[0]?.prompt).toContain("Never edit its .env");
        expect(agents[0]?.prompt).not.toContain("deploy_to_device");
    });
});
