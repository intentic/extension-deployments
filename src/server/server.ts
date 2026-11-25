import { errorMessage } from "@intentic/base/errors";
import type { ExtensionServerApi, ExtensionServerContext, ServerActivation } from "@intentic/extension-api";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { implement, ORPCError } from "@orpc/server";
import { type DeployResource, deviceConnection } from "../contract.js";
import { startAgentTurn } from "./agent-turn.js";
import { deploymentsContract } from "./contract.js";
import { deviceBoard } from "./device-board.js";
import { daemonDevices } from "./device-daemon.js";
import { deviceOperations } from "./device-operations.js";
import { DeploysUnavailableError } from "../deploysWire.js";
import { daemonDeploys, declaringRepos } from "./deploys-daemon.js";
import { discoverRepoDirs, readFileOrUndefined } from "./discover.js";
import { type FetchFn, komodoClient, type KomodoConnection } from "./komodo-client.js";
import { HostStackConflict, planHostStack, runFromHostFolder } from "./komodo-host-stack.js";
import { deployAlerts, deploymentResource, serverEntry, stackResource } from "./komodo-overview.js";
import { repoLinks } from "./komodo-repos.js";
import { fileKomodoStore, komodoStorePath, legacyKomodoStorePath } from "./komodo-store.js";
import { fileNativeStore, legacyNativeStorePath, nativeStorePath } from "./native-store.js";
import { deploymentTools } from "./tools.js";
import { plainText } from "@intentic/base/plain-text";

// Deployments backend for one connected komodo capability. The credential never reaches the browser: the backend reads
// it through the daemon's connection route and dials Komodo from inside the sandbox. The two halves fail differently,
// on purpose:
// overview degrades: an unreachable Komodo resolves `reachable: false`, rendered as a state, not an error
// actions propagate: a refused action becomes a BAD_GATEWAY carrying Komodo's own words

// Inline log tail length; Komodo caps at 5000, 200 is enough to see a crash without a huge response.
const LOG_TAIL = 200;
// Log tail bytes sent into a fix conversation: enough to see the error, small enough to stay about fixing.
const FIX_LOG_BYTES = 24_000;

const upstream = async <T>(action: Promise<T>): Promise<T> => {
    try {
        return await action;
    } catch (error) {
        throw new ORPCError("BAD_GATEWAY", { message: errorMessage(error) });
    }
};

// Komodo operation per action and kind; `pull` is the only composite, pull then deploy in order.
const OPERATIONS = {
    deployment: {
        deploy: ["Deploy"],
        restart: ["RestartDeployment"],
        start: ["StartDeployment"],
        stop: ["StopDeployment"],
        pull: ["PullDeployment", "Deploy"],
    },
    stack: {
        deploy: ["DeployStack"],
        restart: ["RestartStack"],
        start: ["StartStack"],
        stop: ["StopStack"],
        pull: ["PullStack", "DeployStack"],
    },
} as const;

export const activateServer = (api: ExtensionServerApi, _context: ExtensionServerContext, fetchFn: FetchFn = fetch): ServerActivation => {
    const i = implement(deploymentsContract);
    // Ended by `deactivate`: every wait a tool holds on a deploy stops with it, and its timer with it.
    const lifetime = new AbortController();
    const store = fileKomodoStore(komodoStorePath(api.stateDir), legacyKomodoStorePath(api.workspaceRoot));
    const scan = { root: api.workspaceRoot, read: readFileOrUndefined };
    const repoDirs = () => discoverRepoDirs(api.workspaceRoot);
    const devices = daemonDevices(api);
    const deploys = daemonDeploys(api);
    const board = deviceBoard({
        daemon: devices,
        store,
        memory: fileNativeStore(nativeStorePath(api.stateDir), legacyNativeStorePath(api.workspaceRoot)),
        operations: deviceOperations(),
        scan,
        repoDirs,
        startAgent: (request) => startAgentTurn(api, request),
        log: api.log,
    });

    // Resolved per call so a rotated key applies immediately. Kind and provider are re-checked here, since the route
    // hands back whatever capability the id names, and a non-Komodo one holds someone else's credential.
    const connect = async (capability: string): Promise<KomodoConnection> => {
        // The daemon's refusal is kept for the message: it serves a connection only to the extension that contributes
        // its card, and a bare "not connected" hid that the last time the card moved.
        let refusal: string | undefined;
        const connection = await api.daemon
            .json<{ kind: string; config: Record<string, string | undefined> }>(`/capabilities/${encodeURIComponent(capability)}/connection`)
            .catch((error: unknown) => {
                refusal = errorMessage(error);
                return undefined;
            });
        const { provider, url, apiKey, apiSecret } = connection?.config ?? {};
        if (connection?.kind !== "cli" || provider !== "komodo" || url === undefined || apiKey === undefined || apiSecret === undefined) {
            const why = refusal === undefined ? "" : ` (${refusal})`;
            throw new ORPCError("NOT_FOUND", { message: `no connected Komodo capability "${capability}"${why}` });
        }
        return { capability, baseUrl: url.replace(/\/+$/, ""), apiKey, apiSecret };
    };

    // Re-resolves per call rather than trusting the id a card rendered with, so a stale card can't act on something
    // deleted or renamed. Also hands every action and the fix prompt the resource's live name and state for free.
    const resolve = async (capability: string, kind: "deployment" | "stack", id: string): Promise<[KomodoConnection, DeployResource]> => {
        const connection = await connect(capability);
        const client = komodoClient(connection, fetchFn);
        const resources =
            kind === "stack"
                ? (await upstream(client.listStacks())).map((item) => stackResource(connection.baseUrl, item))
                : (await upstream(client.listDeployments())).map((item) => deploymentResource(connection.baseUrl, item));
        const resource = resources.find((candidate) => candidate.id === id);
        if (resource === undefined) {
            throw new ORPCError("NOT_FOUND", { message: `Komodo has no ${kind} "${id}" any more` });
        }
        return [connection, resource];
    };

    const router = i.router({
        overview: i.overview.handler(async ({ input }) => {
            const connection = await connect(input.capability);
            const client = komodoClient(connection, fetchFn);
            const seenAt = await store.seenAt(input.capability);
            const seen = seenAt === undefined ? {} : { seenAt };
            // Computed outside the try, so it survives an unreachable Komodo (with no suggestions, since there are no
            // stack names to draw from): a repo with nothing linked yet is exactly when the owner needs to see this
            // section most.
            const links = await store.links(input.capability);
            const dirs = await repoDirs();
            try {
                // One fan-out: five independent reads in parallel, so one slow call bounds the response, not the sum.
                const [viewer, deployments, stacks, servers, alerts] = await Promise.all([
                    client.whoami(),
                    client.listDeployments(),
                    client.listStacks(),
                    client.listServers(),
                    client.listAlerts(),
                ]);
                return {
                    komodoUrl: connection.baseUrl,
                    reachable: true,
                    viewer,
                    repos: await repoLinks(
                        scan,
                        dirs,
                        stacks.map((item) => item.name),
                        links,
                    ),
                    resources: [
                        ...stacks.map((item) => stackResource(connection.baseUrl, item)),
                        ...deployments.map((item) => deploymentResource(connection.baseUrl, item)),
                    ],
                    servers: servers.map((item) => serverEntry(connection.baseUrl, item)),
                    alerts: deployAlerts(alerts),
                    ...seen,
                };
            } catch (error) {
                // Degrades, doesn't throw: an unreachable Komodo can only say so by still rendering the view.
                const reason = errorMessage(error);
                api.log(`overview unreachable for "${input.capability}": ${reason}`);
                return {
                    komodoUrl: connection.baseUrl,
                    reachable: false,
                    unreachableReason: reason,
                    repos: await repoLinks(scan, dirs, [], links),
                    resources: [],
                    servers: [],
                    alerts: [],
                    ...seen,
                };
            }
        }),
        link: i.link.handler(async ({ input }) => {
            await store.link(input.capability, input.repo, input.stack);
            return { ok: true as const };
        }),
        // Backend's clock, not the browser's, or a fast client clock could stamp itself past breakages that haven't
        // happened yet.
        seen: i.seen.handler(async ({ input }) => {
            const at = Date.now();
            await store.markSeen(input.capability, at);
            return { seenAt: at };
        }),
        action: i.action.handler(async ({ input }) => {
            const [connection, resource] = await resolve(input.capability, input.kind, input.id);
            const client = komodoClient(connection, fetchFn);
            // `pull`'s two operations run in order to avoid racing the image; the param key is `deployment` or `stack`.
            for (const operation of OPERATIONS[input.kind][input.action]) {
                await upstream(client.execute(operation, { [input.kind]: resource.name }));
            }
            return { ok: true as const };
        }),
        hostStack: i.hostStack.handler(async ({ input }) => {
            // Checked before Komodo is dialled: a relative path is the owner's to fix, not Komodo's refusal.
            let plan;
            try {
                plan = planHostStack(input);
            } catch (error) {
                throw new ORPCError("BAD_REQUEST", { message: errorMessage(error) });
            }
            const connection = await connect(input.capability);
            try {
                return await runFromHostFolder(komodoClient(connection, fetchFn), plan);
            } catch (error) {
                // A name already taken by another stack is the owner's to resolve, not a Komodo failure.
                throw error instanceof HostStackConflict
                    ? new ORPCError("CONFLICT", { message: error.message })
                    : new ORPCError("BAD_GATEWAY", { message: errorMessage(error) });
            }
        }),
        logs: i.logs.handler(async ({ input }) => {
            const [connection, resource] = await resolve(input.capability, input.kind, input.id);
            return upstream(komodoClient(connection, fetchFn).logs(input.kind, resource.name, LOG_TAIL));
        }),
        fix: i.fix.handler(async ({ input }) => {
            const [connection, resource] = await resolve(input.capability, input.kind, input.id);
            // Best-effort: the broken resource is often the one whose logs can't be read; still worth starting the
            // turn.
            const log = await komodoClient(connection, fetchFn)
                .logs(input.kind, resource.name, LOG_TAIL)
                .catch(() => ({ stdout: "", stderr: "" }));
            // Reduced to plain text before the cap, so the byte budget buys failure detail, not terminal escape codes.
            const tail = plainText(`${log.stdout}\n${log.stderr}`).trim().slice(-FIX_LOG_BYTES);
            const where = resource.server === undefined ? "" : ` on ${resource.server}`;
            const prompt = [
                `The Komodo ${input.kind} "${resource.name}"${where} is ${resource.state}${resource.status === undefined ? "" : ` (${resource.status})`}. Investigate and fix it.`,
                `Its image is ${resource.image ?? "not recorded"}. Komodo is at ${connection.baseUrl} and you have it as a capability: use it to read state and logs, and to redeploy once you have a fix.`,
                `Find the cause in this workspace's source where it is a code or config problem, fix it there, and say plainly when the cause is outside the workspace (a bad env var, a full disk, an unreachable dependency) rather than inventing a code change. You are in an isolated worktree: commit your fix and it goes through review.`,
                ...(tail !== "" ? [`--- container log tail ---\n${tail}`] : []),
            ].join("\n\n");
            return startAgentTurn(api, {
                kind: "deploy-fix",
                name: resource.name,
                title: `Fix deployment: ${resource.name}`,
                prompt,
                ...(input.pick === undefined ? {} : { pick: input.pick }),
            });
        }),
        // One of the owner's own computers, through the daemon's device-stack routes (device-board.ts).
        deviceOverview: i.deviceOverview.handler(({ input }) => board.overview(input.device)),
        deviceAction: i.deviceAction.handler(({ input }) => board.action(input.device, input.id, input.action)),
        deviceLink: i.deviceLink.handler(async ({ input }) => {
            await store.link(deviceConnection(input.device), input.repo, input.stack);
            return { ok: true as const };
        }),
        deviceLogs: i.deviceLogs.handler(({ input }) => board.logs(input.device, input.id)),
        // A managed environment's stack is fixed and shipped through its repository's manifest, not as a plain stack.
        deviceFix: i.deviceFix.handler(async ({ input }) => {
            const managed = await deploys
                .environments()
                .then((read) => read.environments.find((environment) => environment.deviceId === input.device && environment.stack === input.id)?.repo)
                // allow(silent-catch): an older sandbox, or one that cannot read them now, has no managed stack to point the fix at
                .catch(() => undefined);
            return board.fix(input.device, input.id, input.pick, managed);
        }),
        deviceSeen: i.deviceSeen.handler(async ({ input }) => {
            const at = Date.now();
            await store.markSeen(deviceConnection(input.device), at);
            return { seenAt: at };
        }),
        deviceDeploy: i.deviceDeploy.handler(({ input }) => board.deploy(input.device, input.repo, input.stack)),
        deviceEnvironment: i.deviceEnvironment.handler(({ input }) => board.environment(input.device, input.stack, input.repo, input.pick)),
        // The managed environments (deploys-daemon.ts). A sandbox from before them is a state the board draws, not an
        // error: it says "update this sandbox" only when a repository here declares stacks it would run.
        environments: i.environments.handler(async ({ signal }) => {
            try {
                const read = await deploys.environments(signal);
                return { available: true, environments: read.environments, manifestErrors: read.manifestErrors, declaring: [] };
            } catch (error) {
                if (error instanceof DeploysUnavailableError) {
                    return { available: false, environments: [], manifestErrors: [], declaring: await declaringRepos(api.workspaceRoot, await repoDirs(), scan.read) };
                }
                throw new ORPCError("BAD_GATEWAY", { message: errorMessage(error) });
            }
        }),
        environmentHistory: i.environmentHistory.handler(async ({ input, signal }) => ({
            records: await upstream(deploys.history({ repo: input.repo, stack: input.stack }, input.limit, signal)),
        })),
    });

    // The agent's `deployments` server (tools.ts): what lets a fix turn deploy its fix.
    api.tools.serve(() => deploymentTools({ board, daemon: devices, deploys, store, scan, repoDirs, lifetime: lifetime.signal }));

    const handler = new OpenAPIHandler(router);
    api.routes.mount(async (request) => {
        const { matched, response } = await handler.handle(request, { prefix: "/" });
        return matched ? response : undefined;
    });

    // Lets the host reload this extension alone (a rebuild, an update, a toggle) rather than restarting every backend.
    return {
        deactivate: () => {
            lifetime.abort();
        },
    };
};
