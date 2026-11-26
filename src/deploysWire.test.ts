import { describe, expect, test } from "vitest";
import { EnvironmentsOverviewSchema } from "./contract";
import {
    CiFeedEventWireSchema,
    DaemonRefusal,
    grantDeviceOf,
    DeployAnswerWireSchema,
    DeployEnvironmentsWireSchema,
    ManagedDeployResultWireSchema,
    readAnswer,
    refusalOf,
} from "./deploysWire";
import { managedOutcomeOf } from "./server/engine/daemon";
import { feedFrames, passOfFrame } from "./server/engine/ci-feed";

// What the backend's GET /environments answers (the engine's environments, src/server/engine/environments.ts), with a
// field this version has never heard of on every level.
const record = (fields: Record<string, unknown> = {}) => ({
    id: "dep-000abc01-aa11bb",
    repo: "shop",
    stack: "production",
    device: "z440",
    commit: "0123456789abcdef0123456789abcdef01234567",
    ref: "main",
    trigger: { kind: "ci", detail: "images-platform on main", url: "https://github.com/acme/shop/actions/runs/1", runner: "new" },
    outcome: "succeeded",
    queuedAt: "2026-11-25T10:00:00.000Z",
    startedAt: "2026-11-25T10:00:01.000Z",
    endedAt: "2026-11-25T10:00:43.000Z",
    digests: { web: "ghcr.io/acme/web@sha256:abc" },
    secretNames: ["DATABASE_URL"],
    healthySeconds: 12,
    somethingNewer: true,
    ...fields,
});

const environments = {
    environments: [
        {
            repo: "shop",
            stack: "production",
            device: "z440",
            deviceId: "z440",
            mode: "images",
            triggers: [{ ci: { branch: "main", job: "images-platform" } }, { registry: { every: "15m" } }, { after: { stack: "staging" } }],
            secrets: ["DATABASE_URL", "STRIPE_KEY"],
            ungranted: ["STRIPE_KEY"],
            secretsChanged: [],
            current: record(),
            latest: record(),
            state: "running",
            stateSince: "2026-11-25T10:00:43.000Z",
            ownedElsewhere: false,
            problems: [],
            futureField: { deep: 1 },
        },
    ],
    manifestErrors: [{ repo: "blog", error: "stacks[0].device: Required" }],
};

describe("the environments' shapes", () => {
    test("parse what the backend sends, keeping the fields used and tolerating ones added later", () => {
        const parsed = DeployEnvironmentsWireSchema.parse(environments);
        const [environment] = parsed.environments;
        expect(environment?.triggers).toHaveLength(3);
        expect(environment?.ungranted).toEqual(["STRIPE_KEY"]);
        expect(environment?.current?.outcome).toBe("succeeded");
        expect(environment?.current?.trigger.url).toContain("actions/runs/1");
        expect(parsed.manifestErrors).toEqual([{ repo: "blog", error: "stacks[0].device: Required" }]);
    });

    test("a word a newer version adds reads as unknown rather than failing the board", () => {
        const parsed = DeployEnvironmentsWireSchema.parse({
            environments: [{ ...environments.environments[0], state: "hibernating", latest: record({ outcome: "paused" }) }],
        });
        expect(parsed.environments[0]?.state).toBe("unknown");
        expect(parsed.environments[0]?.latest?.outcome).toBe("unknown");
    });

    test("what an older one leaves out falls to its default", () => {
        const parsed = DeployEnvironmentsWireSchema.parse({
            environments: [{ repo: "shop", stack: "production", device: "z440", state: "missing" }],
        });
        expect(parsed.environments[0]).toMatchObject({ mode: "images", triggers: [], secrets: [], ungranted: [], secretsChanged: [], ownedElsewhere: false, problems: [] });
        expect(parsed.manifestErrors).toEqual([]);
    });

    test("the board's own overview carries the environments through", () => {
        const parsed = EnvironmentsOverviewSchema.parse(environments);
        expect(parsed.environments[0]?.stack).toBe("production");
    });
});

describe("the daemon's primitives", () => {
    test("a managed deploy's answer keeps names and marks, never needing a value", () => {
        const parsed = ManagedDeployResultWireSchema.parse({ stack: "web", commit: "a".repeat(40), path: "/s/web", output: "", secretNames: ["A"], secretMarks: { A: "m" }, later: 1 });
        expect(parsed).toMatchObject({ secretNames: ["A"], secretMarks: { A: "m" } });
        expect(ManagedDeployResultWireSchema.parse({ path: "/s/web", output: "" })).toMatchObject({ secretNames: [], secretMarks: {} });
    });

    test("deploy-managed's status says where it ended: refused, the machine's failure (the one rolled back), or unknown", () => {
        const said = (message: string) => JSON.stringify({ code: "X", message });
        expect(managedOutcomeOf(403, said(`"A" is not granted`))).toEqual({ kind: "refused", error: `"A" is not granted`, predates: false });
        expect(managedOutcomeOf(409, said("rog is offline")).kind).toBe("refused");
        expect(managedOutcomeOf(412, said("no secret named A")).kind).toBe("refused");
        expect(managedOutcomeOf(400, said("no commit")).kind).toBe("refused");
        expect(managedOutcomeOf(422, said("health failed"))).toEqual({ kind: "machine", error: "health failed" });
        expect(managedOutcomeOf(502, said("link dropped"))).toEqual({ kind: "lost", error: "link dropped" });
        expect(managedOutcomeOf(500, "")).toEqual({ kind: "lost", error: "the sandbox answered 500" });
        expect(managedOutcomeOf(404, JSON.stringify({ error: "not found" }))).toMatchObject({ kind: "refused", predates: true, error: expect.stringMatching(/update it/u) });
    });

    test("a feed frame of either kind parses, and only a success is a pass", async () => {
        const job = { kind: "job", repo: "shop", host: "github", project: "o/shop", runId: 1, job: "images", branch: "main", sha: "a".repeat(40), status: "success", url: "u" };
        const failedRun = { kind: "run", run: { repo: "shop", host: "github", project: "o/shop", runId: 2, branch: "main", sha: "b".repeat(40), status: "failed", url: "u", createdAt: 1 } };
        const chunks = [`: hello\n\ndata: ${JSON.stringify(job).slice(0, 20)}`, `${JSON.stringify(job).slice(20)}\n\n`, `data: ${JSON.stringify(failedRun)}\n\ndata: not json\n\n`];
        const encoder = new TextEncoder();
        const body = new ReadableStream<Uint8Array>({
            start: (controller) => {
                for (const chunk of chunks) {
                    controller.enqueue(encoder.encode(chunk));
                }
                controller.close();
            },
        });
        const frames = [];
        for await (const frame of feedFrames(body)) {
            frames.push(frame);
        }
        expect(frames.map((frame) => frame.kind)).toEqual(["job", "run"]);
        expect(frames.map(passOfFrame)).toEqual([{ host: "github", repo: "shop", branch: "main", sha: "a".repeat(40), runId: 1, job: "images", url: "u" }, undefined]);
        expect(CiFeedEventWireSchema.safeParse({ kind: "deploy" }).success).toBe(false);
    });
});

describe("refusals", () => {
    test("a bare 404 is a sandbox from before managed deploys", () => {
        expect(refusalOf(404, "404 Not Found")).toMatchObject({ bare: true, message: expect.stringMatching(/predates managed deploys/u) });
        expect(refusalOf(404, JSON.stringify({ error: "not found" })).bare).toBe(true);
    });

    test("a 404 with the daemon's own sentence is that sentence, not an old sandbox", () => {
        const refusal = refusalOf(404, JSON.stringify({ code: "NOT_FOUND", status: 404, message: "no computer named rog" }));
        expect(refusal).toMatchObject({ bare: false, status: 404, message: "no computer named rog" });
    });

    test("any other refusal says what the daemon said, or the first line of what came back", () => {
        expect(refusalOf(400, JSON.stringify({ message: "a secret is not granted" })).message).toBe("a secret is not granted");
        expect(refusalOf(502, "Bad gateway\nupstream").message).toBe("Bad gateway");
        expect(refusalOf(500, "").message).toBe("the sandbox answered 500");
    });

    test("readAnswer parses an answer and throws a refusal", async () => {
        const ok = await readAnswer(new Response(JSON.stringify({ record: record({ outcome: "queued" }) })), DeployAnswerWireSchema);
        expect(ok.record.outcome).toBe("queued");
        await expect(readAnswer(new Response("404 Not Found", { status: 404 }), DeployAnswerWireSchema)).rejects.toBeInstanceOf(DaemonRefusal);
    });
});

test("a grant is keyed by the device card: a WSL side shares its computer's", () => {
    expect(grantDeviceOf("z440")).toBe("z440");
    expect(grantDeviceOf("omen::wsl:archlinux")).toBe("omen");
});
