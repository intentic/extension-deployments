import { describe, expect, test } from "vitest";
import type { DeployRepoLink, DeployResource } from "./contract";
import { type DeployEnvironmentWire, type DeployRecordWire, DeployEnvironmentWireSchema, DeployRecordWireSchema } from "./deploysWire";
import {
    environmentsOnBoard,
    environmentState,
    promotionTargets,
    recordOrigin,
    recordSeconds,
    settledRecord,
    triggersSummary,
    triggerWords,
} from "./environments";

const record = (fields: Partial<Record<keyof DeployRecordWire, unknown>> = {}): DeployRecordWire =>
    DeployRecordWireSchema.parse({
        id: "dep-1",
        repo: "shop",
        stack: "production",
        device: "z440",
        commit: "0123456789abcdef",
        trigger: { kind: "manual" },
        outcome: "succeeded",
        queuedAt: "2026-11-25T10:00:00.000Z",
        ...fields,
    });

const environment = (fields: Partial<Record<keyof DeployEnvironmentWire, unknown>> = {}): DeployEnvironmentWire =>
    DeployEnvironmentWireSchema.parse({ repo: "shop", stack: "production", device: "z440", deviceId: "z440", state: "running", ...fields });

const stackRow = (name: string): DeployResource => ({ kind: "stack", id: name, name, state: "running", server: "z440", updateAvailable: false, services: [], url: "" });
const repoRow = (repo: string): DeployRepoLink => ({ repo, projectName: repo, composePath: `${repo}/compose.yaml`, suggestions: [] });

describe("triggers in words", () => {
    test("each kind says what starts it", () => {
        expect(triggerWords({ ci: { branch: "main", job: "images-platform" } })).toBe("on CI job images-platform passing on main");
        expect(triggerWords({ ci: { branch: "main", workflow: "release", job: "images" } })).toBe("on CI job images of release passing on main");
        expect(triggerWords({ ci: { branch: "main", workflow: "release" } })).toBe("on CI workflow release passing on main");
        expect(triggerWords({ ci: { branch: "develop" } })).toBe("on CI passing on develop");
        expect(triggerWords({ registry: { every: "15m" } })).toBe("pulls newer images every 15m");
        expect(triggerWords({ after: { stack: "staging" } })).toBe("after staging");
        expect(triggerWords({ webhook: { secret: "X" } } as never)).toBe("on a trigger this version does not describe");
    });

    test("a stack without triggers deploys when asked", () => {
        expect(triggersSummary([])).toBe("deploys when asked");
        expect(triggersSummary([{ ci: { branch: "main" } }, { registry: { every: "6h" } }])).toBe("on CI passing on main, pulls newer images every 6h");
    });
});

describe("records", () => {
    test("say what started them and how long they ran", () => {
        expect(recordOrigin(record({ trigger: { kind: "manual", detail: "by me@example.com" } }))).toBe("by hand · by me@example.com");
        expect(recordOrigin(record({ trigger: { kind: "promote" } }))).toBe("promotion");
        expect(recordOrigin(record({ trigger: { kind: "teleport" } }))).toBe("teleport");
        expect(recordSeconds(record({ startedAt: "2026-11-25T10:00:00.000Z", endedAt: "2026-11-25T10:01:30.000Z" }))).toBe(90);
        expect(recordSeconds(record({ startedAt: "2026-11-25T10:00:00.000Z" }))).toBeUndefined();
    });

    test("a deploy is settled once it ends, and a failed one only once the rollback after it has", () => {
        const failed = record({ id: "dep-2", outcome: "failed", queuedAt: "2026-11-25T10:00:00.000Z", endedAt: "2026-11-25T10:01:00.000Z" });
        const rollingBack = record({ id: "dep-3", outcome: "running", trigger: { kind: "rollback", detail: "after dep-2 failed" }, queuedAt: "2026-11-25T10:01:00.000Z" });
        expect(settledRecord("dep-2", [rollingBack, failed])).toBeUndefined();
        const rolledBack = { ...failed, outcome: "rolled-back" as const, rolledBackTo: "dep-1" };
        expect(settledRecord("dep-2", [{ ...rollingBack, outcome: "succeeded" as const }, rolledBack])?.outcome).toBe("rolled-back");
        // A stack that asks to stay on failure ends `failed` with no rollback after it.
        expect(settledRecord("dep-2", [failed])?.outcome).toBe("failed");
        expect(settledRecord("dep-2", [record({ id: "dep-2", outcome: "queued" })])).toBeUndefined();
        expect(settledRecord("dep-9", [failed])).toBeUndefined();
    });
});

describe("an environment's look", () => {
    test("a deploy under way wins, then what the monitor read", () => {
        expect(environmentState(environment({ active: record({ outcome: "running" }) }))).toBe("deploying");
        expect(environmentState(environment({ state: "running" }))).toBe("running");
        expect(environmentState(environment({ state: "restarting" }))).toBe("unhealthy");
        expect(environmentState(environment({ state: "stopped" }))).toBe("stopped");
        expect(environmentState(environment({ state: "missing" }))).toBe("unknown");
        expect(environmentState(environment({ state: "unreachable" }))).toBe("unknown");
    });

    test("promotes only within its own repository", () => {
        const staging = environment({ stack: "staging" });
        const production = environment({ stack: "production" });
        const other = environment({ repo: "blog", stack: "staging" });
        expect(promotionTargets(staging, [staging, production, other]).map((entry) => entry.stack)).toEqual(["production"]);
    });
});

describe("a device board with its environments", () => {
    const base = {
        device: "z440",
        resources: [stackRow("production"), stackRow("grafana"), stackRow("staging")],
        repos: [repoRow("shop"), repoRow("notes"), repoRow("blog")],
        manifestErrors: [],
        inProject: () => true,
    };

    test("a managed stack shows once, as its environment, and its repository deploys as one", () => {
        const merged = environmentsOnBoard({ ...base, environments: [environment({ stack: "production" })] });
        expect(merged.environments.map((entry) => entry.stack)).toEqual(["production"]);
        expect(merged.resources.map((resource) => resource.name)).toEqual(["grafana", "staging"]);
        expect(merged.repos.map((repo) => repo.repo)).toEqual(["notes", "blog"]);
        expect(merged.hidden).toBe(0);
    });

    test("a stack of the same name on another computer is not this one's", () => {
        const merged = environmentsOnBoard({ ...base, environments: [environment({ stack: "staging", device: "hetzner-1", deviceId: "hetzner-1" })] });
        expect(merged.environments).toEqual([]);
        expect(merged.resources.map((resource) => resource.name)).toEqual(["production", "grafana", "staging"]);
        // The repository still declares stacks, so it is not offered as a plain compose deploy here either.
        expect(merged.repos.map((repo) => repo.repo)).toEqual(["notes", "blog"]);
    });

    test("an environment whose computer does not resolve shows on every board, so its problem is seen", () => {
        const lost = environment({ stack: "edge", device: "old-box", deviceId: undefined, problems: [`"old-box" is not a computer paired with this sandbox`] });
        expect(environmentsOnBoard({ ...base, environments: [lost] }).environments).toEqual([lost]);
    });

    test("a manifest that does not parse still keeps its repository out of the plain deploys", () => {
        const merged = environmentsOnBoard({ ...base, environments: [], manifestErrors: [{ repo: "blog", error: "bad" }] });
        expect(merged.manifestErrors).toEqual([{ repo: "blog", error: "bad" }]);
        expect(merged.repos.map((repo) => repo.repo)).toEqual(["shop", "notes"]);
    });

    test("the open project narrows environments and errors, and counts what it put out of sight", () => {
        const merged = environmentsOnBoard({
            ...base,
            environments: [environment({ stack: "production" }), environment({ repo: "blog", stack: "blog" })],
            manifestErrors: [{ repo: "wiki", error: "bad" }],
            inProject: (repo) => repo === "shop",
        });
        expect(merged.environments.map((entry) => entry.stack)).toEqual(["production"]);
        expect(merged.manifestErrors).toEqual([]);
        expect(merged.hidden).toBe(2);
    });

    test("with no environments the board is exactly what it was", () => {
        const merged = environmentsOnBoard({ ...base, environments: [] });
        expect(merged.resources).toEqual(base.resources);
        expect(merged.repos).toEqual(base.repos);
        expect(merged.environments).toEqual([]);
    });
});
