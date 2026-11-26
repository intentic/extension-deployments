import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import type { CiFeedEventWire, CiRunWire } from "../../deploysWire.js";
import type { DeviceStack } from "../native-overview.js";
import { DIGESTS, deployedAnswer, eventually, fakeDaemon, refusal, restack, ROG, sideCommit, stackRepo, watchFixture } from "./engine.testing.js";
import type { StackSpecInput } from "./manifest.js";
import { hostStepped, stackHealthOf } from "./monitor.js";
import { imagesMoved } from "./registry.js";

// The watch over the same fake daemon: the CI feed's frames starting deploys (a job by name, the run when no job is
// named, once per commit, never an older commit than the stack runs), promotion with `after`, newer images behind a
// tag, the monitor's two-read debounce and the servers' hysteresis, secrets changed under a running stack (by keyed
// marks, both policies), each deploy told to the forge, and a workspace without manifests asking the daemon nothing.

let root: string;
let stopWatch: (() => Promise<void>) | undefined;

beforeEach(async () => {
    root = await mkdtemp(join(tmpdir(), "deployments-watch-"));
});

afterEach(async () => {
    await stopWatch?.();
    stopWatch = undefined;
    await rm(root, { recursive: true, force: true });
});

const STACK: StackSpecInput = { name: "web", device: "rog" };

const jobFrame = (sha: string, job: string, fields: Partial<Extract<CiFeedEventWire, { kind: "job" }>> = {}): CiFeedEventWire => ({
    kind: "job",
    repo: "shop",
    host: "github",
    project: "o/shop",
    runId: 7,
    workflow: "release",
    job,
    branch: "main",
    sha,
    status: "success",
    url: "https://github.com/o/shop/actions/runs/7",
    ...fields,
});

const run = (sha: string, fields: Partial<CiRunWire> = {}): CiRunWire => ({
    repo: "shop",
    host: "github",
    project: "o/shop",
    runId: 9,
    workflow: "release",
    branch: "main",
    sha,
    status: "success",
    url: "https://github.com/o/shop/actions/runs/9",
    createdAt: Date.now(),
    ...fields,
});

const service = (state: string, fields: Partial<DeviceStack["services"][number]> = {}): DeviceStack["services"][number] => ({
    service: "web",
    container: "web-1",
    image: "ghcr.io/o/web:main",
    state,
    status: state === "running" ? "Up 3 minutes" : "Exited (1) 1 minute ago",
    ...fields,
});

const listed = (name: string, services: DeviceStack["services"]): DeviceStack => ({
    name,
    status: "running(1)",
    configFiles: [],
    managed: true,
    owner: { sandbox: "https://me.example.dev", you: true },
    sandbox: false,
    services,
} as DeviceStack);

describe("CI", () => {
    test("a job frame on the feed deploys the stacks that name it, once, and the run frame does not deploy it again", async () => {
        const head = await stackRepo(root, "shop", [
            { ...STACK, triggers: [{ ci: { branch: "main", job: "images" } }] },
            { ...STACK, name: "docs", triggers: [{ ci: { branch: "main" } }] },
            { ...STACK, name: "other", triggers: [{ ci: { branch: "main", job: "lint" } }] },
        ]);
        const daemon = fakeDaemon();
        const { watch, engine } = watchFixture(root, daemon);
        stopWatch = watch.stop;
        await watch.start();
        await daemon.feed.opened();
        expect(watch.feedOpen()).toBe(true);

        daemon.feed.push(jobFrame(head, "images"));
        daemon.feed.push(jobFrame(head, "images"));
        daemon.feed.push(jobFrame(head, "images", { status: "failed", runId: 8 }));
        daemon.feed.push({ kind: "run", run: run(head, { runId: 7 }) });
        await eventually(async () => (await engine.records()).filter((record) => record.outcome === "succeeded").length === 2);

        const records = await engine.records();
        expect(records.map((record) => [record.stack, record.trigger.kind, record.commit, record.ref]).toSorted()).toEqual([
            ["docs", "ci", head, "main"],
            ["web", "ci", head, "main"],
        ]);
        expect(records.find((record) => record.stack === "web")?.trigger).toEqual({
            kind: "ci",
            detail: `job "images" of "release" passed on main (run 7)`,
            url: "https://github.com/o/shop/actions/runs/7",
        });
        // The run passing names the same commit: CI deploys a commit to a stack once.
        daemon.feed.push({ kind: "run", run: run(head, { runId: 10 }) });
        await watch.ciPassed({ host: "github", repo: "shop", branch: "main", sha: head, runId: 11, job: "images", workflow: "release" });
        expect(daemon.deploys()).toHaveLength(2);
    });

    test("a trigger narrows on branch and workflow; a commit older than what the stack runs is skipped", async () => {
        const older = await stackRepo(root, "shop", [{ ...STACK, triggers: [{ ci: { branch: "main", workflow: "release", job: "images" } }] }]);
        const newer = await restack(root, "shop", [{ ...STACK, triggers: [{ ci: { branch: "main", workflow: "release", job: "images" } }] }], "newer");
        const daemon = fakeDaemon();
        const { watch, engine } = watchFixture(root, daemon);

        expect(await watch.ciPassed({ host: "github", repo: "shop", branch: "dev", sha: newer, runId: 1, job: "images", workflow: "release" })).toEqual([]);
        expect(await watch.ciPassed({ host: "github", repo: "shop", branch: "main", sha: newer, runId: 2, job: "images", workflow: "nightly" })).toEqual([]);
        const [deployed] = await watch.ciPassed({ host: "github", repo: "shop", branch: "main", sha: newer, runId: 3, job: "images", workflow: "release" });
        await engine.settled(deployed?.id ?? "");

        expect(await watch.ciPassed({ host: "github", repo: "shop", branch: "main", sha: older, runId: 4, job: "images", workflow: "release" })).toEqual([]);
        // GitLab names no workflow, so there a trigger naming one is not narrowed by it.
        const side = await sideCommit(root, "shop", newer, "gitlab");
        const [gitlab] = await watch.ciPassed({ host: "gitlab", repo: "shop", branch: "main", sha: side, runId: 5, job: "images" });
        expect(gitlab?.commit).toBe(side);
        await engine.settled(gitlab?.id ?? "");
        expect(daemon.deploys().map((call) => (call.body as { commit: string }).commit)).toEqual([newer, side]);
    });

    test("after the feed drops, the runs that passed meanwhile are caught up from /ci/runs; the first ever start catches up nothing", async () => {
        const head = await stackRepo(root, "shop", [{ ...STACK, triggers: [{ ci: { branch: "main" } }] }]);
        // Started long before the feed was ever seen: not caught up on the first start, nor on a reconnect.
        const daemon = fakeDaemon({ runs: [run(head, { runId: 1, createdAt: Date.now() - 3 * 3_600_000 })] });
        const { watch, engine, store } = watchFixture(root, daemon);
        stopWatch = watch.stop;
        await watch.start();
        await daemon.feed.opened();
        await eventually(async () => (await store.read()).feedSeenAt !== undefined);
        expect(await engine.records()).toEqual([]);

        const next = await restack(root, "shop", [{ ...STACK, triggers: [{ ci: { branch: "main" } }] }], "next");
        daemon.runs.push(run(next, { runId: 2, createdAt: Date.now() }));
        daemon.feed.drop();
        await daemon.feed.opened();
        await eventually(async () => (await engine.records()).some((record) => record.commit === next && record.outcome === "succeeded"));

        expect(daemon.feed.opens()).toBe(2);
        expect((await engine.records()).map((record) => record.commit)).toEqual([next]);
    });

    test("no stack with a ci trigger, no feed; a stack that follows another deploys at its commit and images", async () => {
        const head = await stackRepo(root, "shop", [
            { ...STACK, name: "staging" },
            { ...STACK, name: "production", triggers: [{ after: { stack: "staging" } }] },
        ]);
        const daemon = fakeDaemon();
        const { watch, engine } = watchFixture(root, daemon);
        stopWatch = watch.stop;
        await watch.start();
        expect(watch.feedOpen()).toBe(false);

        const staged = await engine.settled((await engine.enqueue({ repo: "shop", stack: "staging", trigger: { kind: "manual" } })).id);
        await eventually(async () => (await engine.records()).some((record) => record.stack === "production" && record.outcome === "succeeded"));

        expect((await engine.records()).find((record) => record.stack === "production")).toMatchObject({
            commit: head,
            pins: DIGESTS,
            trigger: { kind: "after", detail: `after staging (${staged.id})` },
        });
        expect(daemon.calls.some((call) => call.path === "/ci/feed")).toBe(false);
    });
});

describe("registry", () => {
    test("a pull that recreated a container records a deploy at the commit the stack runs; one that brought nothing records nothing", async () => {
        await stackRepo(root, "shop", [{ ...STACK, triggers: [{ registry: { every: "5m" } }] }]);
        let output = " Container web-1  Running\n";
        let clock = Date.now();
        const daemon = fakeDaemon({ op: () => output });
        const { watch, engine } = watchFixture(root, daemon, { now: () => clock });
        const first = await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", trigger: { kind: "manual" } })).id);

        await watch.pass();
        expect(daemon.calls.filter((call) => call.path.endsWith("/ops/pull"))).toEqual([]);

        clock += 6 * 60_000;
        await watch.pass();
        expect(daemon.calls.filter((call) => call.path === "/system/devices/rog/stacks/web/ops/pull")).toHaveLength(1);
        expect((await engine.records()).map((record) => record.id)).toEqual([first.id]);

        clock += 6 * 60_000;
        output = " Container web-1  Recreate\n Container web-1  Recreated\n Container web-1  Started\n";
        await watch.pass();
        const [registry] = (await engine.records()).filter((record) => record.trigger.kind === "registry");
        expect(registry).toMatchObject({ commit: first.commit, trigger: { kind: "registry", detail: "newer images behind its tags (pulled every 5m)" } });
        expect(imagesMoved(" Container web-1  Running\n")).toBe(false);
        expect(imagesMoved(" Container web-2  Created\n")).toBe(true);
    });
});

describe("the monitor", () => {
    test("a stack that came up is told unhealthy after two reads, never while deploying, and recovered after two more", async () => {
        await stackRepo(root, "shop", [STACK]);
        let services = [service("running")];
        const daemon = fakeDaemon({ stacks: () => [listed("web", services)] });
        const { watch, engine } = watchFixture(root, daemon);
        await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", trigger: { kind: "manual" } })).id);
        daemon.messages.length = 0;

        await watch.pass();
        services = [service("running", { health: "unhealthy" })];
        await watch.pass();
        expect(daemon.messages).toEqual([]);
        await watch.pass();
        expect(daemon.messages.map((message) => [message.type, message.channelId])).toEqual([["stack_unhealthy", "shop:web"]]);
        await watch.pass();
        expect(daemon.messages).toHaveLength(1);
        expect(engine.stackState("shop", "web").state).toBe("unhealthy");

        services = [service("running")];
        await watch.pass();
        await watch.pass();
        expect(daemon.messages.map((message) => message.type)).toEqual(["stack_unhealthy", "stack_recovered"]);
    });

    test("a computer that is not connected reads unreachable and tells nothing", async () => {
        await stackRepo(root, "shop", [STACK]);
        const daemon = fakeDaemon({ devices: [{ ...ROG, online: false }] });
        const { watch, engine } = watchFixture(root, daemon);
        await watch.pass();
        await watch.pass();
        expect(engine.stackState("shop", "web").state).toBe("unreachable");
        expect(daemon.calls.filter((call) => call.path.endsWith("/stacks"))).toEqual([]);
        expect(daemon.messages).toEqual([]);
    });

    test("a server is told low once per episode, and again only after it was clear", async () => {
        const GIB = 1024 ** 3;
        let free = 3 * GIB;
        await stackRepo(root, "shop", [STACK]);
        const daemon = fakeDaemon({
            hostStats: () => ({
                disks: [
                    { role: "docker", path: "/var/lib/docker", totalBytes: 100 * GIB, freeBytes: free },
                    { role: "stacks", path: "/home/me/.intentic/stacks", totalBytes: 100 * GIB, freeBytes: free },
                ],
                memory: { totalBytes: 16 * GIB, availableBytes: 8 * GIB },
            }),
        });
        const { watch } = watchFixture(root, daemon);

        await watch.pass({ hosts: true });
        await watch.pass({ hosts: true });
        expect(daemon.messages.map((message) => [message.type, message.extra?.["what"]])).toEqual([["host_low_disk", "/var/lib/docker"]]);
        free = 11 * GIB;
        await watch.pass({ hosts: true });
        free = 13 * GIB;
        await watch.pass({ hosts: true });
        free = 4 * GIB;
        await watch.pass({ hosts: true });
        expect(daemon.messages.map((message) => message.type)).toEqual(["host_low_disk", "host_low_disk"]);
        expect(hostStepped("rog", ["memory"], { disks: [], memory: { totalBytes: 100, availableBytes: 6 } })).toEqual({ low: ["memory"], events: [] });
    });

    test("a stack's state reads off its containers", () => {
        expect(stackHealthOf(undefined)).toBe("missing");
        expect(stackHealthOf(listed("web", [service("running"), service("exited", { status: "Exited (0) 1 minute ago" })]))).toBe("running");
        expect(stackHealthOf(listed("web", [service("running"), service("exited")]))).toBe("unhealthy");
        expect(stackHealthOf(listed("web", [service("restarting")]))).toBe("restarting");
        expect(stackHealthOf(listed("web", [service("exited")]))).toBe("stopped");
    });
});

describe("secrets changed under a running stack", () => {
    const SECRET_STACK: StackSpecInput = { ...STACK, env: { API_TOKEN: "{{secret:API_TOKEN}}" } };

    test("`notify` tells the owner once per change, by marks only, and the board says which changed", async () => {
        await stackRepo(root, "shop", [SECRET_STACK]);
        const daemon = fakeDaemon({ marks: { API_TOKEN: "mark-API_TOKEN-1" }, stacks: () => [listed("web", [service("running")])] });
        daemon.grant("shop", "web", "rog", ["API_TOKEN"]);
        const { watch, engine } = watchFixture(root, daemon);
        await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", trigger: { kind: "manual" } })).id);
        daemon.messages.length = 0;

        await watch.pass();
        expect(engine.secretsChanged("shop", "web")).toEqual([]);
        daemon.marks["API_TOKEN"] = "mark-API_TOKEN-2";
        await watch.pass();
        await watch.pass();

        expect(engine.secretsChanged("shop", "web")).toEqual(["API_TOKEN"]);
        expect(daemon.messages.map((message) => [message.type, message.extra?.["secrets"]])).toEqual([["secrets_changed", ["API_TOKEN"]]]);
        expect(daemon.calls.filter((call) => call.path === "/secrets/marks").map((call) => call.body)).toContainEqual({ names: ["API_TOKEN"] });
        // Removed from the store is a change too, and a new one.
        delete daemon.marks["API_TOKEN"];
        await watch.pass();
        expect(daemon.messages).toHaveLength(2);
    });

    test("`redeploy` queues the stack again at the commit and images it runs, once", async () => {
        await stackRepo(root, "shop", [{ ...SECRET_STACK, onSecretChange: "redeploy" }]);
        const daemon = fakeDaemon({ marks: { API_TOKEN: "mark-API_TOKEN-1" }, stacks: () => [listed("web", [service("running")])] });
        daemon.grant("shop", "web", "rog", ["API_TOKEN"]);
        const { watch, engine } = watchFixture(root, daemon);
        const first = await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", trigger: { kind: "manual" } })).id);

        daemon.marks["API_TOKEN"] = "mark-API_TOKEN-2";
        await watch.pass();
        const [queued] = (await engine.records()).filter((record) => record.trigger.kind === "secret-change");
        await engine.settled(queued?.id ?? "");
        await watch.pass();

        const again = (await engine.records()).filter((record) => record.trigger.kind === "secret-change");
        expect(again).toHaveLength(1);
        expect(again[0]).toMatchObject({ commit: first.commit, outcome: "succeeded", secretMarks: { API_TOKEN: "mark-API_TOKEN-2" }, trigger: { detail: "API_TOKEN changed in the secret store" } });
        // The new deploy runs the new value: nothing reads as changed any more.
        expect(engine.secretsChanged("shop", "web")).toEqual([]);
    });
});

describe("the forge", () => {
    test("each deploy is reported as it starts and ends, the deployment's id passed back, and its page kept on the record", async () => {
        const head = await stackRepo(root, "shop", [{ ...STACK, health: { http: ["https://shop.example.com/health", "http://127.0.0.1/x"] } }]);
        const reports: unknown[] = [];
        const daemon = fakeDaemon({
            report: (body) => {
                reports.push(body);
                return Response.json({ deploymentId: 42, url: "https://github.com/o/shop/deployments/web" });
            },
        });
        const { watch, engine } = watchFixture(root, daemon, { publicUrl: "https://me.example.dev" });
        stopWatch = watch.stop;
        await watch.start();
        const record = await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", trigger: { kind: "manual" } })).id);
        await eventually(() => reports.length === 2);

        const common = {
            repo: "shop",
            sha: head,
            environment: "web",
            production: true,
            environmentUrl: "https://shop.example.com",
            logUrl: "https://me.example.dev/ext/deployments?repo=shop&stack=web",
        };
        expect(reports).toEqual([
            { ...common, state: "in_progress", description: `Deploying ${head.slice(0, 8)} by Intentic` },
            { ...common, state: "success", description: "Deploy succeeded", deploymentId: 42 },
        ]);
        await eventually(async () => (await engine.history({ repo: "shop", stack: "web" }))[0]?.forgeUrl !== undefined);
        expect((await engine.history({ repo: "shop", stack: "web" }))[0]).toMatchObject({ id: record.id, forgeUrl: "https://github.com/o/shop/deployments/web" });
    });

    test("a token without the scope is a problem on the environment until a report works; no CI connection is left alone", async () => {
        await stackRepo(root, "shop", [STACK]);
        let answer = refusal(403, "Resource not accessible by integration");
        const daemon = fakeDaemon({ report: () => answer.clone() });
        const { watch, engine } = watchFixture(root, daemon);
        stopWatch = watch.stop;
        await watch.start();
        await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", trigger: { kind: "manual" } })).id);
        await eventually(() => engine.forgeProblem("shop") !== undefined);
        expect(engine.forgeProblem("shop")).toBe("The forge refused this repository's deploy reports: Resource not accessible by integration");

        answer = Response.json({});
        await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", trigger: { kind: "manual" } })).id);
        await eventually(() => engine.forgeProblem("shop") === undefined);
    });
});

describe("a workspace without manifests", () => {
    test("asks the daemon nothing: no feed, no lists, no marks", async () => {
        const daemon = fakeDaemon();
        const { watch, engine } = watchFixture(root, daemon);
        stopWatch = watch.stop;
        await watch.start();
        await engine.start();
        await watch.pass({ hosts: true });
        expect(daemon.calls).toEqual([]);
        expect(watch.feedOpen()).toBe(false);
    });
});

describe("a deploy answered by an old daemon field set", () => {
    test("a result without marks or digests still records what it can", async () => {
        await stackRepo(root, "shop", [STACK]);
        const daemon = fakeDaemon({ deploy: (call) => deployedAnswer(call, { digests: undefined, secretMarks: undefined }) });
        const { engine } = watchFixture(root, daemon);
        const record = await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", trigger: { kind: "manual" } })).id);
        expect(record.outcome).toBe("succeeded");
        expect(record.secretMarks).toBeUndefined();
    });
});
