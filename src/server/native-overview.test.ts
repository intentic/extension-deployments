import { describe, expect, test } from "vitest";
import { DeployOverviewResponseSchema } from "../contract.js";
import { incidents } from "../incidents.js";
import { type DeviceStack, deviceResources, EMPTY_MEMORY, foldStates, stackState } from "./native-overview.js";

const service = (name: string, state: string, status: string, health?: string) => ({
    service: name,
    container: `web-${name}-1`,
    image: `ghcr.io/acme/${name}:1`,
    state,
    status,
    ...(health === undefined ? {} : { health }),
});

const stack = (name: string, services: DeviceStack["services"], extra: Partial<DeviceStack> = {}): DeviceStack => ({
    name,
    status: "running(2)",
    configFiles: [`/srv/${name}/compose.yaml`],
    managed: false,
    sandbox: false,
    services,
    ...extra,
});

describe("stackState", () => {
    test("all up is running, a starting healthcheck is deploying", () => {
        expect(stackState(stack("web", [service("api", "running", "Up 2 hours")]))).toBe("running");
        expect(stackState(stack("web", [service("api", "running", "Up 3 seconds (health: starting)", "starting")]))).toBe("deploying");
    });

    test("a failing healthcheck, a crash loop or a dead container is unhealthy", () => {
        expect(stackState(stack("web", [service("api", "running", "Up 1 hour (unhealthy)", "unhealthy")]))).toBe("unhealthy");
        expect(stackState(stack("web", [service("api", "restarting", "Restarting (1) 5 seconds ago")]))).toBe("unhealthy");
        expect(stackState(stack("web", [service("api", "dead", "Dead")]))).toBe("unhealthy");
    });

    // A one-shot migration that finished is the stack working; one that failed while the rest runs is a partial outage.
    test("an exited service beside running ones counts by its exit code", () => {
        const migrated = stack("web", [service("api", "running", "Up 1 hour"), service("migrate", "exited", "Exited (0) 1 hour ago")]);
        expect(stackState(migrated)).toBe("running");
        const failed = stack("web", [service("api", "running", "Up 1 hour"), service("worker", "exited", "Exited (1) 2 minutes ago")]);
        expect(stackState(failed)).toBe("unhealthy");
    });

    // `docker stop` leaves 137 or 143 as often as 0: a whole stack down is a level, never a breakage by itself.
    test("a whole stack down is stopped whatever its exit codes", () => {
        expect(stackState(stack("web", [service("api", "exited", "Exited (137) 1 minute ago")]))).toBe("stopped");
        expect(stackState(stack("web", []))).toBe("unknown");
    });
});

describe("deviceResources", () => {
    test("maps stacks onto the board's rows and leaves sandboxes out", () => {
        const rows = deviceResources("z440", [
            stack("web", [service("api", "running", "Up 2 hours")]),
            stack("intentic-acme", [service("sandbox", "running", "Up")], { sandbox: true }),
        ]);
        expect(rows).toHaveLength(1);
        expect(rows[0]).toMatchObject({ kind: "stack", id: "web", name: "web", state: "running", server: "z440", image: "ghcr.io/acme/api:1", url: "" });
        expect(rows[0]?.services).toEqual([{ name: "api", image: "ghcr.io/acme/api:1", updateAvailable: false }]);
    });

    test("names what is wrong with which service in the status line", () => {
        const [row] = deviceResources("z440", [stack("web", [service("api", "running", "Up 1 hour (unhealthy)", "unhealthy"), service("db", "running", "Up")])]);
        expect(row?.status).toBe("api: unhealthy");
    });

    test("the rows parse as the board's own overview", () => {
        const resources = deviceResources("z440", [stack("web", [service("api", "running", "Up")])]);
        const parsed = DeployOverviewResponseSchema.parse({ source: "device", komodoUrl: "", reachable: true, resources, servers: [], alerts: [] });
        expect(parsed.operations).toEqual([]);
    });
});

describe("foldStates", () => {
    const row = (name: string, state: "running" | "unhealthy" | "stopped" | "deploying") => ({
        kind: "stack" as const,
        id: name,
        name,
        state,
        server: "z440",
        updateAvailable: false,
        services: [],
        url: "",
    });

    test("a stack breaking opens one danger incident, and coming back resolves it", () => {
        const first = foldStates(EMPTY_MEMORY, "z440", [row("web", "running")], 1000);
        expect(first.alerts).toEqual([]);
        const broke = foldStates(first, "z440", [row("web", "unhealthy")], 2000);
        expect(incidents(broke.alerts).map((incident) => [incident.tone, incident.summary])).toEqual([["danger", "web running → unhealthy on z440"]]);
        // Still broken on the next read: no second alert.
        const still = foldStates(broke, "z440", [row("web", "unhealthy")], 3000);
        expect(still.alerts).toHaveLength(1);
        const back = foldStates(still, "z440", [row("web", "running")], 4000);
        expect(incidents(back.alerts)).toEqual([]);
        expect(back.alerts[0]?.resolved).toBe(true);
    });

    test("a running stack going down is news, unless this board stopped it", () => {
        const up = foldStates(EMPTY_MEMORY, "z440", [row("web", "running"), row("api", "running")], 1000);
        const down = foldStates(up, "z440", [row("web", "stopped"), row("api", "stopped")], 2000, new Set(["api"]));
        expect(incidents(down.alerts).map((incident) => incident.summary)).toEqual(["web running → exited on z440"]);
    });

    test("the first read reports what is broken now, not what is merely down", () => {
        const first = foldStates(EMPTY_MEMORY, "z440", [row("web", "unhealthy"), row("api", "stopped")], 1000);
        expect(first.alerts.map((alert) => alert.resource)).toEqual(["web"]);
        expect(first.alerts[0]?.from).toBeUndefined();
    });

    test("a stack that disappeared resolves its alerts, and a broken one stopped is dealt with", () => {
        const broke = foldStates({ states: { web: "running", api: "running" }, alerts: [] }, "z440", [row("web", "unhealthy"), row("api", "unhealthy")], 1000);
        const after = foldStates(broke, "z440", [row("api", "stopped")], 2000);
        expect(after.alerts.every((alert) => alert.resolved)).toBe(true);
    });
});
