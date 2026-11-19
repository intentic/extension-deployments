import type { ExtensionContext, IntenticApi } from "@intentic/extension-api";
import { bindHost } from "./host";
import { deploymentsBadge, startDeployAttention, watchConnections } from "./attention";
import { deviceConnection } from "./contract";

// Binds the host, starts the badge poll, then registers the Deployments rail view. Capability-driven, not repo-driven
// (mirrors ext-pipelines): an owner who only connects Komodo, or only pairs a server, still gets a tile.
// One tile however many Komodos and computers are connected, the way one Documentation tile serves every repository: the view switches
// between connections in its header, and the badge sums what each one still owes, so reading staging never silences
// production (each connection keeps its own seen mark).
export const activate = (api: IntenticApi, context: ExtensionContext): void => {
    bindHost(api);
    // Before the registration, so a tile can badge on its first render rather than a minute later.
    context.subscriptions.push(startDeployAttention());
    context.subscriptions.push(
        api.views.register({
            id: `deployments`,
            label: `Deployments`,
            surface: `rail`,
            detect: (_repos, capabilities) => {
                // Every connected Komodo, then every computer the owner paired: a server they own is somewhere to deploy
                // to with no Komodo at all (device-board.ts), read through the agent already running there.
                const connections = [
                    ...capabilities.filter((capability) => capability.kind === `cli` && capability.config[`provider`] === `komodo`).map((capability) => capability.id),
                    ...capabilities.filter((capability) => capability.kind === `device`).map((capability) => deviceConnection(capability.id)),
                ];
                // detect() runs every facts poll, the only place that knows which Komodos are connected right now.
                watchConnections(connections);
                // Key equals the view id: a singleton, so the address is /ext/deployments with the connection in `?connection=`.
                return connections.length === 0 ? [] : [{ key: `deployments`, title: `Deployments`, icon: `box`, props: { connections } }];
            },
            // Unacknowledged incidents only: reads Komodo's alert log rather than counting what's currently down.
            badge: () => deploymentsBadge(),
            view: async () => (await import(`./DeploymentsView.vue`)).default,
        }),
    );
};
