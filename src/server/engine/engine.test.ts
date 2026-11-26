import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { daemonDeploys } from "./daemon.js";
import { memoryDoc } from "./doc.js";
import { DIGESTS, deployedAnswer, engineFixture, fakeDaemon, refusal, restack, stackRepo } from "./engine.testing.js";
import { createDeploysEngine, RESTARTED } from "./engine.js";
import type { StackSpecInput } from "./manifest.js";
import { type DeployRecord, deploysStore, type RecordsFile } from "./records.js";

// The engine against real git and a fake of the daemon's routes (engine.testing.ts): what a managed deploy sends the
// daemon and keeps on its record, how each stack's lane runs one deploy at a time and replaces the one waiting, what a
// restart leaves behind, how a failure the machine reports puts the stack back on its last good deploy with its images
// pinned, and how each refusal reads. The engine never holds a secret's value: only names, references and marks.

let root: string;

beforeEach(async () => {
    root = await mkdtemp(join(tmpdir(), "deployments-engine-"));
});

afterEach(async () => {
    await rm(root, { recursive: true, force: true });
});

const WEB: StackSpecInput = {
    name: "web",
    device: "rog",
    env: { API_TOKEN: "{{secret:API_TOKEN}}", TAG: "{{deploy:sha8}}", WHERE: "{{deploy:ref}}/{{deploy:stack}}" },
    health: { timeoutSeconds: 60, http: ["http://127.0.0.1:8080/health"] },
};

describe("a deploy", () => {
    test("sends the stack with its own facts filled and secret references left for the daemon, and keeps names and marks", async () => {
        const head = await stackRepo(root, "shop", [WEB]);
        const daemon = fakeDaemon();
        daemon.grant("shop", "web", "rog", ["API_TOKEN"]);
        const { engine } = engineFixture(root, daemon);

        const record = await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", trigger: { kind: "manual", detail: "by hand" } })).id);

        expect(record).toMatchObject({
            repo: "shop",
            stack: "web",
            device: "rog",
            deviceId: "rog",
            commit: head,
            ref: "main",
            outcome: "succeeded",
            digests: DIGESTS,
            envDigest: "e".repeat(64),
            healthySeconds: 12,
            secretNames: ["API_TOKEN"],
            secretMarks: { API_TOKEN: "mark-API_TOKEN-1" },
            outputTail: " Container web-1  Started\n",
        });
        const [sent] = daemon.deploys();
        expect(sent?.path).toBe("/system/devices/rog/stacks/web/deploy-managed");
        expect(sent?.body).toEqual({
            repo: "shop",
            commit: head,
            mode: "images",
            env: { API_TOKEN: "{{secret:API_TOKEN}}", TAG: head.slice(0, 8), WHERE: "main/web" },
            health: { timeoutSeconds: 60, http: ["http://127.0.0.1:8080/health"] },
            reason: "manual: by hand",
        });
        expect(daemon.messages.map(({ type, channelId, extra }) => ({ type, channelId, extra }))).toEqual([
            { type: "deploy_succeeded", channelId: "shop:web", extra: { id: record.id, repo: "shop", stack: "web", commit: head, device: "rog", outcome: "succeeded", trigger: "manual" } },
        ]);
    });

    test("a secret the owner has not granted is refused before anything is sent, naming every name missing", async () => {
        await stackRepo(root, "shop", [{ ...WEB, env: { ...WEB.env, DB_PASSWORD: "{{secret:DB_PASSWORD}}" } }]);
        const daemon = fakeDaemon();
        daemon.grant("shop", "web", "rog", ["API_TOKEN"]);
        const { engine } = engineFixture(root, daemon);

        const record = await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", trigger: { kind: "manual" } })).id);

        expect(record).toMatchObject({ outcome: "refused", secretNames: ["API_TOKEN", "DB_PASSWORD"], deviceId: "rog" });
        expect(record.error).toContain(`"DB_PASSWORD" is not granted to "web" on "rog"`);
        expect(record.error).toContain("secrets grant-stack shop web rog DB_PASSWORD");
        expect(daemon.deploys()).toEqual([]);
        expect(daemon.messages.map((message) => message.type)).toEqual(["deploy_refused"]);
    });

    test("the daemon's own grant refusal (403) is a refusal in its words, never a failure to roll back", async () => {
        await stackRepo(root, "shop", [WEB]);
        const daemon = fakeDaemon({ deploy: () => refusal(403, `"API_TOKEN" is not granted to "web" from "shop" on "rog".`) });
        daemon.grant("shop", "web", "rog", ["API_TOKEN"]);
        const { engine } = engineFixture(root, daemon);

        const record = await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", trigger: { kind: "manual" } })).id);

        expect(record).toMatchObject({ outcome: "refused", error: `"API_TOKEN" is not granted to "web" from "shop" on "rog".`, secretNames: ["API_TOKEN"] });
    });

    test("a bare 404 from deploy-managed is a sandbox from before managed deploys: update it", async () => {
        await stackRepo(root, "shop", [{ ...WEB, env: {} }]);
        const daemon = fakeDaemon({ deploy: () => Response.json({ error: "not found" }, { status: 404 }) });
        const { engine } = engineFixture(root, daemon);

        const record = await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", trigger: { kind: "manual" } })).id);

        expect(record.outcome).toBe("refused");
        expect(record.error).toMatch(/predates managed deploys: update it/u);
    });

    test("a computer this sandbox has not paired is refused, and one whose agent is too old says to update it", async () => {
        await stackRepo(root, "shop", [{ ...WEB, env: {}, device: "elsewhere" }, { ...WEB, name: "api", env: {} }]);
        const daemon = fakeDaemon({ devices: [{ card: "rog", hostId: "rog", online: true, facts: { features: ["stacks", "programs"] } }] });
        const { engine } = engineFixture(root, daemon);

        const unknown = await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", trigger: { kind: "manual" } })).id);
        const old = await engine.settled((await engine.enqueue({ repo: "shop", stack: "api", trigger: { kind: "manual" } })).id);

        expect(unknown).toMatchObject({ outcome: "refused", error: `"elsewhere" is not a computer paired with this sandbox: pair it on Devices, or name another in the stacks manifest.` });
        expect(old.outcome).toBe("refused");
        expect(old.error).toMatch(/The agent on "rog" is too old to take a stack this sandbox manages/u);
        expect(daemon.deploys()).toEqual([]);
    });

    test("a stack another sandbox deployed on the computer is refused; an unmanaged one of its name is adopted on the first deploy", async () => {
        await stackRepo(root, "shop", [{ ...WEB, env: {} }, { ...WEB, name: "api", env: {} }]);
        const listed = (name: string, managed: boolean, owner?: { sandbox: string; you: boolean }) => ({
            name,
            status: "exited(1)",
            configFiles: [],
            managed,
            ...(owner === undefined ? {} : { owner }),
            sandbox: false,
            services: [],
        });
        const daemon = fakeDaemon({ stacks: () => [listed("web", true, { sandbox: "https://other.example.dev", you: false }), listed("api", false)] });
        const { engine } = engineFixture(root, daemon);

        const owned = await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", trigger: { kind: "manual" } })).id);
        const adopted = await engine.settled((await engine.enqueue({ repo: "shop", stack: "api", trigger: { kind: "manual" } })).id);

        expect(owned.outcome).toBe("refused");
        expect(owned.error).toMatch(/was deployed by another sandbox \(https:\/\/other\.example\.dev\)/u);
        expect(adopted.outcome).toBe("succeeded");
        expect(daemon.deploys().map((call) => (call.body as { adopt?: boolean }).adopt)).toEqual([true]);
    });

    test("asking for a stack, a commit or a repository that is not there is refused before anything is queued", async () => {
        const head = await stackRepo(root, "shop", [WEB]);
        const daemon = fakeDaemon();
        const { engine } = engineFixture(root, daemon);
        await expect(engine.enqueue({ repo: "shop", stack: "api", trigger: { kind: "manual" } })).rejects.toMatchObject({
            code: "NOT_FOUND",
            message: `"shop" at ${head.slice(0, 12)} does not declare "api": it declares web.`,
        });
        await expect(engine.enqueue({ repo: "shop", stack: "web", commit: "abcdef1", trigger: { kind: "manual" } })).rejects.toMatchObject({
            code: "BAD_REQUEST",
            message: `"shop" has no commit abcdef1 here, and fetching its remote failed: this suite's repositories have no remote`,
        });
        await expect(engine.enqueue({ repo: "../elsewhere", stack: "web", trigger: { kind: "manual" } })).rejects.toMatchObject({ code: "BAD_REQUEST" });
        expect(await engine.records()).toEqual([]);
        expect(daemon.calls).toEqual([]);
    });
});

describe("the lanes", () => {
    test("a newer deploy replaces the one waiting, never the one running, and the stack runs one deploy at a time", async () => {
        const first = await stackRepo(root, "shop", [WEB]);
        const second = await restack(root, "shop", [WEB], "second");
        const third = await restack(root, "shop", [WEB], "third");
        let release = (): void => {};
        const held = new Promise<void>((resolve) => {
            release = resolve;
        });
        let reached = (): void => {};
        const running = new Promise<void>((resolve) => {
            reached = resolve;
        });
        let inFlight = 0;
        let overlapped = false;
        const daemon = fakeDaemon({
            deploy: async (call) => {
                inFlight += 1;
                overlapped ||= inFlight > 1;
                reached();
                await held;
                inFlight -= 1;
                return deployedAnswer(call);
            },
        });
        daemon.grant("shop", "web", "rog", ["API_TOKEN"]);
        const { engine } = engineFixture(root, daemon);

        const a = await engine.enqueue({ repo: "shop", stack: "web", commit: first, trigger: { kind: "ci" } });
        await running;
        const b = await engine.enqueue({ repo: "shop", stack: "web", commit: second, trigger: { kind: "ci" } });
        const c = await engine.enqueue({ repo: "shop", stack: "web", commit: third.slice(0, 10), trigger: { kind: "ci" } });
        expect(await engine.settled(b.id)).toMatchObject({ outcome: "superseded", error: `A newer deploy (${c.id}, at ${third.slice(0, 12)}) replaced it while it waited.` });
        release();

        expect([(await engine.settled(a.id)).outcome, (await engine.settled(c.id)).outcome]).toEqual(["succeeded", "succeeded"]);
        expect(daemon.deploys().map((call) => (call.body as { commit: string }).commit)).toEqual([first, third]);
        expect(overlapped).toBe(false);
        // A superseded deploy never ran, so nobody is told of it.
        expect(daemon.messages.map((message) => message.type)).toEqual(["deploy_succeeded", "deploy_succeeded"]);
    });

    test("after a restart a deploy left running ends failed, an older waiting one is replaced, and the newest one runs", async () => {
        const first = await stackRepo(root, "shop", [WEB]);
        const second = await restack(root, "shop", [WEB], "second");
        const third = await restack(root, "shop", [WEB], "third");
        const records = memoryDoc<RecordsFile>({});
        const left = deploysStore(records);
        const record = (id: string, commit: string, outcome: DeployRecord["outcome"], queuedAt: string): DeployRecord => ({
            id,
            repo: "shop",
            stack: "web",
            device: "rog",
            commit,
            trigger: { kind: "ci" },
            outcome,
            queuedAt,
            secretNames: [],
        });
        await left.put(record("dep-1", first, "running", "2026-11-25T10:00:00.000Z"));
        await left.put(record("dep-2", second, "queued", "2026-11-25T10:01:00.000Z"));
        await left.put(record("dep-3", third, "queued", "2026-11-25T10:02:00.000Z"));
        const daemon = fakeDaemon();
        daemon.grant("shop", "web", "rog", ["API_TOKEN"]);
        const { engine } = engineFixture(root, daemon, records);

        await engine.start();

        expect(await engine.settled("dep-3")).toMatchObject({ outcome: "succeeded", commit: third });
        expect(await engine.settled("dep-1")).toMatchObject({ outcome: "failed", error: RESTARTED });
        expect(await engine.settled("dep-2")).toMatchObject({ outcome: "superseded" });
        expect(daemon.deploys().map((call) => (call.body as { commit: string }).commit)).toEqual([third]);
        expect(daemon.messages.map((message) => `${message.type} ${String(message.extra?.["id"])}`).toSorted()).toEqual(["deploy_failed dep-1", "deploy_succeeded dep-3"]);
    });

    test("a deploy cut by the backend stopping is left running, for the next start to end as unknown", async () => {
        await stackRepo(root, "shop", [{ ...WEB, env: {} }]);
        const lifetime = new AbortController();
        let reached = (): void => {};
        const running = new Promise<void>((resolve) => {
            reached = resolve;
        });
        const daemon = fakeDaemon({
            deploy: (call) => {
                reached();
                return new Promise<Response>((_, reject) => {
                    lifetime.signal.addEventListener("abort", () => reject(new Error(`stopped ${call.path}`)));
                });
            },
        });
        const records = memoryDoc<RecordsFile>({});
        const stopping = createDeploysEngine({
            root,
            store: deploysStore(records),
            daemon: daemonDeploys(daemon.request, lifetime.signal),
            logger: { warn: () => {} },
            fetchRemote: async () => "no remote",
            lifetime: lifetime.signal,
        });
        const queued = await stopping.enqueue({ repo: "shop", stack: "web", trigger: { kind: "manual" } });
        await running;
        lifetime.abort();
        await stopping.stop();

        expect((await deploysStore(records).get(queued.id))?.outcome).toBe("running");
        expect(daemon.messages).toEqual([]);
    });
});

describe("rollback and promotion", () => {
    test("a deploy the machine says failed (422) puts the stack back on its last good commit, with that deploy's images pinned", async () => {
        const good = await stackRepo(root, "shop", [WEB]);
        const bad = await restack(root, "shop", [WEB], "breaks health");
        const daemon = fakeDaemon({
            deploy: (call) =>
                (call.body as { commit: string }).commit === bad
                    ? refusal(422, "web did not come up healthy in 60 s: GET http://127.0.0.1:8080/health answered 502 (it saw {{secret:API_TOKEN}})")
                    : deployedAnswer(call),
        });
        daemon.grant("shop", "web", "rog", ["API_TOKEN"]);
        const { engine } = engineFixture(root, daemon);
        const current = await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", commit: good, trigger: { kind: "manual" } })).id);

        const broken = await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", commit: bad, trigger: { kind: "ci" } })).id);

        expect(broken).toMatchObject({
            outcome: "rolled-back",
            rolledBackTo: current.id,
            error: "web did not come up healthy in 60 s: GET http://127.0.0.1:8080/health answered 502 (it saw {{secret:API_TOKEN}})",
        });
        const rollbacks = (await engine.history({ repo: "shop", stack: "web" })).filter((record) => record.trigger.kind === "rollback");
        expect(rollbacks).toMatchObject([{ outcome: "succeeded", commit: good, pins: DIGESTS, trigger: { kind: "rollback", detail: `after ${broken.id} failed, back to ${current.id}` } }]);
        expect(daemon.deploys().map((call) => [(call.body as { commit: string }).commit, (call.body as { pins?: unknown }).pins])).toEqual([
            [good, undefined],
            [bad, undefined],
            [good, DIGESTS],
        ]);
        // One event for the failure and its rollback together, after the rollback's own.
        expect(daemon.messages.map((message) => message.type)).toEqual(["deploy_succeeded", "deploy_succeeded", "deploy_rolled_back"]);
    });

    test("a deploy whose outcome is unknown (502) fails without a rollback, and a stack saying `stay` is left as it is", async () => {
        const good = await stackRepo(root, "shop", [{ ...WEB, env: {} }, { ...WEB, name: "api", env: {}, onFailure: "stay" }]);
        const bad = await restack(root, "shop", [{ ...WEB, env: {} }, { ...WEB, name: "api", env: {}, onFailure: "stay" }], "bad");
        const daemon = fakeDaemon({
            deploy: (call) => {
                if ((call.body as { commit: string }).commit !== bad) {
                    return deployedAnswer(call);
                }
                return call.path.includes("/web/") ? refusal(502, "the link to rog dropped during deploy_stack") : refusal(422, "api's hook failed");
            },
        });
        const { engine } = engineFixture(root, daemon);
        for (const stack of ["web", "api"]) {
            await engine.settled((await engine.enqueue({ repo: "shop", stack, commit: good, trigger: { kind: "manual" } })).id);
        }

        const lost = await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", commit: bad, trigger: { kind: "manual" } })).id);
        const stayed = await engine.settled((await engine.enqueue({ repo: "shop", stack: "api", commit: bad, trigger: { kind: "manual" } })).id);

        expect(lost).toMatchObject({ outcome: "failed", error: "the link to rog dropped during deploy_stack" });
        expect(stayed).toMatchObject({ outcome: "failed", error: "api's hook failed" });
        expect(daemon.deploys()).toHaveLength(4);
    });

    test("a manual rollback goes to the deploy before the current one, pinned; a promotion deploys at what the other stack runs", async () => {
        const STAGING: StackSpecInput = { ...WEB, name: "staging", env: {} };
        const PRODUCTION: StackSpecInput = { ...WEB, name: "production", env: {} };
        const first = await stackRepo(root, "shop", [STAGING, PRODUCTION]);
        const second = await restack(root, "shop", [STAGING, PRODUCTION], "second");
        const daemon = fakeDaemon();
        const { engine } = engineFixture(root, daemon);
        const one = await engine.settled((await engine.enqueue({ repo: "shop", stack: "staging", commit: first, trigger: { kind: "manual" } })).id);
        await engine.settled((await engine.enqueue({ repo: "shop", stack: "staging", commit: second, trigger: { kind: "manual" } })).id);

        const back = await engine.settled((await engine.rollback({ repo: "shop", stack: "staging" })).id);
        const promoted = await engine.settled((await engine.promote("shop", "staging", "production")).id);

        expect(back).toMatchObject({ commit: first, pins: DIGESTS, outcome: "succeeded", trigger: { kind: "rollback", detail: `to ${one.id}` } });
        expect(promoted).toMatchObject({ stack: "production", commit: first, pins: DIGESTS, outcome: "succeeded", trigger: { kind: "promote", detail: `from staging (${back.id})` } });
        await expect(engine.rollback({ repo: "shop", stack: "production" })).rejects.toMatchObject({ code: "CONFLICT" });
        await expect(engine.promote("shop", "missing", "production")).rejects.toMatchObject({ code: "CONFLICT" });
    });
});

describe("the dispatch", () => {
    test("each event goes to the extension's own listener route, keyed by its id so a retry is admitted once", async () => {
        await stackRepo(root, "shop", [{ ...WEB, env: {} }]);
        const daemon = fakeDaemon();
        const { engine } = engineFixture(root, daemon);

        const record = await engine.settled((await engine.enqueue({ repo: "shop", stack: "web", trigger: { kind: "manual" } })).id);

        const [call] = daemon.calls.filter((entry) => entry.path === "/listeners/deploys/dispatch");
        expect(call?.method).toBe("POST");
        expect(call?.headers["idempotency-key"]).toBe(`${record.id}:deploy_succeeded`);
        expect(call?.body).toMatchObject({
            provider: "deploys",
            type: "deploy_succeeded",
            id: `${record.id}:deploy_succeeded`,
            channelId: "shop:web",
            branch: "main",
            author: { id: "deploys", name: "Deploys" },
            content: `Deployed shop web @ ${record.commit.slice(0, 8)} on rog`,
            timestamp: expect.any(String),
        });
    });
});
