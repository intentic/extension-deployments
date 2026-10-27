import type { IntenticApi } from "@intentic/extension-api";
import { computed, nextTick, ref, watchEffect } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { resetSandboxScope } from "@intentic/extension-api";
import { deployBadge, deploymentsBadge, watchConnections } from "./attention";
import { bindHost } from "./host";

// Pins that watchConnections (called from detect(), inside the host's render computed) must not leave that computed
// depending on its own writes, or a self-dirtying reactive list loops until Vue gives up and hangs the shell.
describe(`watchConnections`, () => {
    // watched/boards are module state; reset before each test so one test's connections don't leak into the next.
    beforeEach(resetSandboxScope);

    it(`leaves the computed that called it with no dependency on its own bookkeeping`, async () => {
        let passes = 0;
        // Stand-in for whatever else the real computed reads; nudging it is what starts and re-triggers the loop.
        const elsewhere = ref(0);
        // Stands in for the rail's `tiles`; detect() returns a fresh array each pass, same as the real one.
        const activations = computed(() => {
            passes += 1;
            void elsewhere.value;
            const connections = [`production`, `staging`];
            watchConnections(connections);
            return [...connections];
        });
        const stop = watchEffect(() => void activations.value);
        await nextTick();

        elsewhere.value += 1;
        // Vue throws in dev when it aborts the flush for the loop; caught so the assertion is on the pass count.
        await nextTick().catch(() => undefined);
        stop();

        expect(passes).toBe(2);
    });

    it(`polls a newly seen connection at once, so its tile badges on first render`, async () => {
        const asked: string[] = [];
        bindHost({
            sandbox: { reachable: () => true },
            backend: {
                json: (path: string) => {
                    asked.push(path);
                    return Promise.resolve({ reachable: true, alerts: [], resources: [], servers: [] });
                },
            },
        } as unknown as IntenticApi);

        watchConnections([`production`]);
        await vi.waitFor(() => expect(asked).toHaveLength(1));

        expect(asked[0]).toBe(`komodo/production/overview`);
        expect(deployBadge(`production`)).toBeUndefined();

        // Same connection again: already watched, so no second round trip.
        watchConnections([`production`]);
        await nextTick();
        expect(asked).toHaveLength(1);
    });
});

// One tile for every Komodo: its badge must sum what each still owes, in one tier, and say whose it is.
describe(`deploymentsBadge`, () => {
    beforeEach(resetSandboxScope);

    const down = (id: string, resource: string, ts = 2) => ({
        id,
        type: `ContainerStateChange`,
        level: `critical`,
        resolved: false,
        ts,
        resource,
        to: `exited`,
    });
    const update = (id: string, resource: string) => ({ id, type: `StackImageUpdateAvailable`, level: `ok`, resolved: false, ts: 2, resource });
    const board = (alerts: unknown[], extra: Record<string, unknown> = {}) => ({
        komodoUrl: `https://komodo.example`,
        reachable: true,
        alerts,
        resources: [],
        servers: [],
        ...extra,
    });

    const serve = async (boards: Record<string, unknown>): Promise<void> => {
        bindHost({
            sandbox: { reachable: () => true },
            backend: { json: (path: string) => Promise.resolve(boards[path.split(`/`)[1] ?? ``]) },
        } as unknown as IntenticApi);
        watchConnections(Object.keys(boards));
        // One poll reads every connection before it publishes, so the first badge already covers them all.
        await vi.waitFor(() => expect(deploymentsBadge()).toBeDefined());
    };

    it(`adds the worst tier across connections and names both`, async () => {
        await serve({
            production: board([down(`a`, `api`)]),
            staging: board([down(`b`, `web`), update(`c`, `db`)]),
        });
        expect(deploymentsBadge()).toEqual({ count: 2, tone: `danger`, tooltip: `2 needing you on production, staging` });
    });

    it(`names the one connection the trouble is on`, async () => {
        await serve({
            production: board([down(`a`, `api`)]),
            staging: board([update(`c`, `db`)]),
        });
        expect(deploymentsBadge()).toEqual({ count: 1, tone: `danger`, tooltip: `production: api exited` });
    });

    it(`keeps a single connection's words as they were`, async () => {
        await serve({ komodo: board([down(`a`, `api`)]) });
        expect(deploymentsBadge()).toEqual({ count: 1, tone: `danger`, tooltip: `api exited` });
    });

    it(`does not let reading one connection silence another`, async () => {
        await serve({
            production: board([down(`a`, `api`)]),
            staging: board([down(`b`, `web`)], { seenAt: 5 }),
        });
        expect(deploymentsBadge()).toEqual({ count: 1, tone: `danger`, tooltip: `production: api exited` });
    });
});
