import { describe, expect, test } from "vitest";
import { EnvironmentsOverviewSchema } from "./contract";
import {
    DeployAnswerWireSchema,
    DeployEnvironmentsWireSchema,
    DeploysUnavailableError,
    deploysRefusal,
    historyPath,
    readDeploys,
} from "./deploysWire";

// What the daemon's GET /deploys/environments answers (sandbox-contract schemas/deploys.ts), with a field this version
// has never heard of on every level.
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

describe("the daemon's /deploys shapes", () => {
    test("parse what the daemon sends, keeping the fields used and tolerating ones added later", () => {
        const parsed = DeployEnvironmentsWireSchema.parse(environments);
        const [environment] = parsed.environments;
        expect(environment?.triggers).toHaveLength(3);
        expect(environment?.ungranted).toEqual(["STRIPE_KEY"]);
        expect(environment?.current?.outcome).toBe("succeeded");
        expect(environment?.current?.trigger.url).toContain("actions/runs/1");
        expect(parsed.manifestErrors).toEqual([{ repo: "blog", error: "stacks[0].device: Required" }]);
    });

    test("a word a newer daemon adds reads as unknown rather than failing the board", () => {
        const parsed = DeployEnvironmentsWireSchema.parse({
            environments: [{ ...environments.environments[0], state: "hibernating", latest: record({ outcome: "paused" }) }],
        });
        expect(parsed.environments[0]?.state).toBe("unknown");
        expect(parsed.environments[0]?.latest?.outcome).toBe("unknown");
    });

    test("what an older daemon leaves out falls to its default", () => {
        const parsed = DeployEnvironmentsWireSchema.parse({
            environments: [{ repo: "shop", stack: "production", device: "z440", state: "missing" }],
        });
        expect(parsed.environments[0]).toMatchObject({ mode: "images", triggers: [], secrets: [], ungranted: [], secretsChanged: [], ownedElsewhere: false, problems: [] });
        expect(parsed.manifestErrors).toEqual([]);
    });

    test("the board's own overview carries the daemon's environments through", () => {
        const parsed = EnvironmentsOverviewSchema.parse({ available: true, ...environments });
        expect(parsed.declaring).toEqual([]);
        expect(parsed.environments[0]?.stack).toBe("production");
    });

    test("history is asked by query string", () => {
        expect(historyPath({ repo: "apps/shop", stack: "production" }, 20)).toBe("/deploys/history?repo=apps%2Fshop&stack=production&limit=20");
        expect(historyPath({ repo: "shop", stack: "staging" })).toBe("/deploys/history?repo=shop&stack=staging");
    });
});

describe("refusals", () => {
    test("a bare 404 is a sandbox from before managed environments", () => {
        expect(deploysRefusal(404, "404 Not Found")).toBeInstanceOf(DeploysUnavailableError);
        expect(deploysRefusal(404, JSON.stringify({ error: "not found" }))).toBeInstanceOf(DeploysUnavailableError);
    });

    test("a 404 with the daemon's own sentence is that sentence, not an old sandbox", () => {
        const refusal = deploysRefusal(404, JSON.stringify({ code: "NOT_FOUND", status: 404, message: `"shop" at HEAD does not declare "prod": it declares production.` }));
        expect(refusal).not.toBeInstanceOf(DeploysUnavailableError);
        expect(refusal.message).toBe(`"shop" at HEAD does not declare "prod": it declares production.`);
    });

    test("any other refusal says what the daemon said, or the first line of what came back", () => {
        expect(deploysRefusal(400, JSON.stringify({ message: "a secret is not granted" })).message).toBe("a secret is not granted");
        expect(deploysRefusal(502, "Bad gateway\nupstream").message).toBe("Bad gateway");
        expect(deploysRefusal(500, "").message).toBe("the sandbox answered 500");
    });

    test("readDeploys parses an answer and throws a refusal", async () => {
        const ok = await readDeploys(new Response(JSON.stringify({ record: record({ outcome: "queued" }) })), DeployAnswerWireSchema);
        expect(ok.record.outcome).toBe("queued");
        await expect(readDeploys(new Response("404 Not Found", { status: 404 }), DeployAnswerWireSchema)).rejects.toBeInstanceOf(DeploysUnavailableError);
    });
});
