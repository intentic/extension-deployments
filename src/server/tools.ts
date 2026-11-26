import { errorMessage } from "@intentic/base/errors";
import type { ToolCallContext, ToolDefinition } from "@intentic/extension-api";
import { DEVICE_CONNECTION_PREFIX, deviceConnection, deviceOf, stackNameFor, StackNameSchema } from "../contract.js";
import { CommitWireSchema, type DeployEnvironmentsWire, type DeployEnvironmentWire, type DeployRecordWire, type StackRefWire } from "../deploysWire.js";
import { HEALTH_WORDS, OUTCOME_WORDS, recordOrigin, recordSeconds, shortCommit, triggersSummary } from "../environments.js";
import type { DeviceBoard } from "./device-board.js";
import type { DeviceDaemon } from "./device-daemon.js";
import type { KomodoStore } from "./komodo-store.js";
import { repoLinks, type RepoScanDeps } from "./komodo-repos.js";
import { stackState } from "./native-overview.js";

// THE AGENT'S DEPLOY TOOLS, one `deployments` server in every turn: what lets a fix turn redeploy its own fix. Two kinds:
// - MANAGED ENVIRONMENTS (`environments`, `deploy_environment`, `rollback_environment`, `promote_environment`,
//   `environment_history`): the stacks a repository declares in `.intentic/stacks.json`, deployed by this backend's own
//   engine (engine/) with their secrets filled by the daemon under the owner's grant, kept in a history and rolled back.
//   A deploy is queued and then waited for, within the host's ten-minute tool deadline; one that outlasts it answers
//   that it is still running and names its record rather than failing, since it carries on regardless.
// - A PLAIN COMPOSE STACK (`deploy_targets`, `device_stacks`, `deploy_to_device`): a repository without a stacks manifest,
//   packed from its committed HEAD and started on a computer, the same deploy the board's button starts.

// The managed environments as the tools (and the board's routes) reach them: the engine's own calls (server.ts).
export interface EnvironmentsService {
    readonly environments: () => Promise<DeployEnvironmentsWire>;
    readonly history: (ref: StackRefWire, limit?: number) => Promise<readonly DeployRecordWire[]>;
    readonly deploy: (request: StackRefWire & { readonly commit?: string | undefined; readonly reason?: string | undefined }) => Promise<DeployRecordWire>;
    readonly rollback: (request: StackRefWire & { readonly to?: string | undefined; readonly reason?: string | undefined }) => Promise<DeployRecordWire>;
    readonly promote: (request: { readonly repo: string; readonly from: string; readonly to: string; readonly reason?: string | undefined }) => Promise<DeployRecordWire>;
    // The record once the engine is done with it (a rollback it set off included); rejects when `signal` ends the wait.
    readonly settled: (id: string, signal?: AbortSignal) => Promise<DeployRecordWire>;
}

export interface ToolDeps {
    readonly board: DeviceBoard;
    readonly daemon: DeviceDaemon;
    readonly environments: EnvironmentsService;
    readonly store: KomodoStore;
    readonly scan: RepoScanDeps;
    readonly repoDirs: () => Promise<string[]>;
    // How long a waiting tool waits for a deploy; tests shorten it.
    readonly wait?: { readonly deadlineMs: number };
    // Aborted when the backend deactivates, so no wait outlives it.
    readonly lifetime?: AbortSignal;
}

// Under the host's ten-minute deadline for one tool call, with room for the queueing call before it and the answer after.
const WAIT_DEADLINE_MS = 9 * 60_000;
// The end of what compose and the hooks printed, as much as a tool answer carries.
const OUTPUT_TAIL = 4_000;

const text = (body: string, isError = false) => ({ content: [{ type: "text" as const, text: body }], ...(isError ? { isError: true } : {}) });

const stringArg = (args: Readonly<Record<string, unknown>>, key: string): string | undefined => {
    const value = args[key];
    return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
};

// `wait` defaults to true: a deploy the agent started is one it wants the end of.
const waitArg = (args: Readonly<Record<string, unknown>>): boolean => args["wait"] !== false;

const WAIT_PROPERTY = {
    type: "boolean",
    description: "Wait for it to end (up to about nine minutes) and answer how it went. Default true. False answers once it is queued.",
};

// Who asked, for the record's one line, since the daemon sees this backend's token rather than the turn.
const askedBy = (reason: string | undefined, context: ToolCallContext | undefined): string => {
    const turn = context?.conversationId === undefined ? "by the agent" : `by the agent in conversation ${context.conversationId}`;
    return reason === undefined ? turn : `${reason} (${turn})`;
};

const what = (record: DeployRecordWire): string => `${record.repo} ${record.stack} at ${shortCommit(record.commit)} on ${record.device}`;

const tailOf = (record: DeployRecordWire): string =>
    record.outputTail === undefined || record.outputTail.trim() === "" ? "" : `\n\n--- output tail ---\n${record.outputTail.slice(-OUTPUT_TAIL)}`;

// A record as the answer to the call that started it: how it ended, or that it carries on.
export const recordAnswer = (record: DeployRecordWire, settled: boolean, waited: boolean) => {
    const id = `record ${record.id}`;
    if (!waited) {
        return text(`Queued: ${what(record)} (${id}). It runs on its own; environment_history shows how it ends.`);
    }
    if (!settled) {
        return text(
            `Still ${OUTCOME_WORDS[record.outcome]}: ${what(record)} (${id}). It carries on without this call; read environment_history for how it ends.`,
        );
    }
    switch (record.outcome) {
        case "succeeded": {
            const healthy = record.healthySeconds === undefined ? "" : `, healthy after ${Math.round(record.healthySeconds)}s`;
            const took = recordSeconds(record);
            return text(`Deployed ${what(record)} (${id})${healthy}${took === undefined ? "" : `; it took ${took}s`}.`);
        }
        case "rolled-back":
            return text(
                `The deploy of ${what(record)} failed and the stack was put back on ${record.rolledBackTo ?? "its previous deploy"} (${id}): ${record.error ?? "no reason given"}${tailOf(record)}`,
                true,
            );
        case "refused":
            return text(`The deploy of ${what(record)} was refused (${id}): ${record.error ?? "no reason given"}`, true);
        case "superseded":
            return text(`The deploy of ${what(record)} never ran: ${record.error ?? "a newer one replaced it while it waited"} (${id}).`);
        default:
            return text(`The deploy of ${what(record)} ${OUTCOME_WORDS[record.outcome]} (${id}): ${record.error ?? "no reason given"}${tailOf(record)}`, true);
    }
};

// One environment as the agent reads it: compact, every field a sentence or a fact it can act on.
const environmentFacts = (environment: DeployEnvironmentWire) => ({
    repo: environment.repo,
    stack: environment.stack,
    device: environment.deviceId ?? environment.device,
    state: HEALTH_WORDS[environment.state],
    ...(environment.current === undefined
        ? { runs: "nothing deployed from here yet" }
        : { runs: { commit: environment.current.commit, record: environment.current.id, since: environment.current.endedAt ?? environment.current.queuedAt } }),
    ...(environment.active === undefined
        ? {}
        : { deploying: { commit: environment.active.commit, record: environment.active.id, outcome: environment.active.outcome, origin: recordOrigin(environment.active) } }),
    ...(environment.latest === undefined || environment.latest.id === environment.current?.id || environment.latest.id === environment.active?.id
        ? {}
        : {
              latest: {
                  commit: environment.latest.commit,
                  record: environment.latest.id,
                  outcome: environment.latest.outcome,
                  ...(environment.latest.error === undefined ? {} : { error: environment.latest.error }),
              },
          }),
    triggers: triggersSummary(environment.triggers),
    ...(environment.ungranted.length === 0 ? {} : { ungrantedSecrets: environment.ungranted }),
    ...(environment.secretsChanged.length === 0 ? {} : { secretsChangedSinceDeploy: environment.secretsChanged }),
    ...(environment.ownedElsewhere ? { ownedElsewhere: true } : {}),
    ...(environment.problems.length === 0 ? {} : { problems: environment.problems }),
});

const STACK_REF_PROPERTIES = {
    repo: { type: "string", description: "The repository that declares the stack, workspace-relative, as `environments` names it." },
    stack: { type: "string", description: "The stack's name in that repository's .intentic/stacks.json." },
};

// How a queued record came out: the record as the engine left it (`settled`), or as it stands when the wait ran out.
export const awaitRecord = async (
    environments: Pick<EnvironmentsService, "settled" | "history">,
    queued: DeployRecordWire,
    signal: AbortSignal,
): Promise<{ readonly record: DeployRecordWire; readonly settled: boolean }> => {
    try {
        return { record: await environments.settled(queued.id, signal), settled: true };
    } catch {
        // The wait ended (its deadline, the call's own signal, the backend stopping); the deploy carries on.
        const now = await environments.history(queued, 20).catch((): readonly DeployRecordWire[] => []);
        return { record: now.find((record) => record.id === queued.id) ?? queued, settled: false };
    }
};

export const deploymentTools = (deps: ToolDeps): readonly ToolDefinition[] => {
    const deadlineMs = deps.wait?.deadlineMs ?? WAIT_DEADLINE_MS;
    // Queues with `enqueue`, then waits for the record when asked to, inside the call's own deadline.
    const run = async (enqueue: () => Promise<DeployRecordWire>, wait: boolean, context: ToolCallContext | undefined) => {
        try {
            const queued = await enqueue();
            if (!wait) {
                return recordAnswer(queued, false, false);
            }
            const signals = [AbortSignal.timeout(deadlineMs), context?.signal, deps.lifetime].filter((signal): signal is AbortSignal => signal !== undefined);
            const { record, settled } = await awaitRecord(deps.environments, queued, AbortSignal.any(signals));
            return recordAnswer(record, settled, true);
        } catch (error) {
            return text(errorMessage(error), true);
        }
    };
    return [...environmentTools(deps, run), ...composeTools(deps)];
};

type Runner = (enqueue: () => Promise<DeployRecordWire>, wait: boolean, context: ToolCallContext | undefined) => Promise<ReturnType<typeof text>>;

const environmentTools = (deps: ToolDeps, run: Runner): readonly ToolDefinition[] => [
    {
        name: "environments",
        description:
            "The managed environments: every Docker compose stack the workspace's repositories declare in their .intentic/stacks.json, which this sandbox deploys to the owner's computers itself, with secrets rendered from its store. Per stack: the computer, its state there, the commit it runs and since when, a deploy running or queued, the latest attempt's outcome and error, its triggers in words, secrets the owner has not granted it yet, secrets changed since it last deployed, and problems that stop it deploying. Also every stacks manifest that does not parse. Read this before deploy_environment.",
        effect: "read",
        inputSchema: {
            type: "object",
            properties: { repo: { type: "string", description: "Only this repository's stacks (workspace-relative). Omit for all." } },
            additionalProperties: false,
        },
        call: async (args, context) => {
            const repo = stringArg(args, "repo");
            try {
                const read = await deps.environments.environments();
                const environments = read.environments.filter((environment) => repo === undefined || environment.repo === repo).map(environmentFacts);
                const manifestErrors = read.manifestErrors.filter((error) => repo === undefined || error.repo === repo);
                if (environments.length === 0 && manifestErrors.length === 0) {
                    return text(
                        repo === undefined
                            ? "No repository in this workspace declares stacks (.intentic/stacks.json). A repository without one deploys as a plain compose stack: deploy_targets and deploy_to_device."
                            : `"${repo}" declares no stacks (.intentic/stacks.json).`,
                    );
                }
                return text(JSON.stringify({ environments, ...(manifestErrors.length === 0 ? {} : { manifestErrors }) }, undefined, 2));
            } catch (error) {
                return text(errorMessage(error), true);
            }
        },
    },
    {
        name: "deploy_environment",
        description:
            "Deploy a managed environment (a stack its repository declares in .intentic/stacks.json) at a commit: the repository's COMMITTED HEAD as this workspace has it when none is named, so commit first. The sandbox fills the stack's secrets under the owner's grant, runs it on its computer, checks it comes up healthy and rolls it back by itself when the manifest says so. One deploy runs per stack; a newer one queued behind it replaces an older one still waiting. Refused, with the reason, when a secret it reads is not granted yet (ask the owner with `secrets grant-stack <repo> <stack> <device> NAME...`, which puts a card in front of them) or its computer cannot take it. Waits for the end by default and answers how it went, with compose's output on a failure.",
        effect: "write",
        inputSchema: {
            type: "object",
            properties: {
                ...STACK_REF_PROPERTIES,
                commit: { type: "string", description: "A full or abbreviated commit of the repository (lowercase hex). Omit for its committed HEAD." },
                reason: { type: "string", description: "One line on why, kept on the deploy's record." },
                wait: WAIT_PROPERTY,
            },
            required: ["repo", "stack"],
            additionalProperties: false,
        },
        call: (args, context) => {
            const repo = stringArg(args, "repo");
            const stack = stringArg(args, "stack");
            const commit = stringArg(args, "commit");
            if (repo === undefined || stack === undefined) {
                return text("name the repo and the stack", true);
            }
            if (commit !== undefined && !CommitWireSchema.safeParse(commit).success) {
                return text(`"${commit}" is not a commit: 7 to 64 lowercase hex characters`, true);
            }
            return run(() => deps.environments.deploy({ repo, stack, commit, reason: askedBy(stringArg(args, "reason"), context) }), waitArg(args), context);
        },
    },
    {
        name: "rollback_environment",
        description:
            "Put a managed environment back on an earlier successful deploy: that deploy's commit, with its images pinned to the digests it ran. The successful deploy before the current one when no record is named; environment_history lists the records. Waits for the end by default.",
        effect: "write",
        inputSchema: {
            type: "object",
            properties: {
                ...STACK_REF_PROPERTIES,
                to: { type: "string", description: "The record id of a successful deploy to go back to. Omit for the one before the current one." },
                wait: WAIT_PROPERTY,
            },
            required: ["repo", "stack"],
            additionalProperties: false,
        },
        call: (args, context) => {
            const repo = stringArg(args, "repo");
            const stack = stringArg(args, "stack");
            if (repo === undefined || stack === undefined) {
                return text("name the repo and the stack", true);
            }
            return run(() => deps.environments.rollback({ repo, stack, to: stringArg(args, "to"), reason: askedBy(undefined, context) }), waitArg(args), context);
        },
    },
    {
        name: "promote_environment",
        description:
            "Deploy one managed environment at exactly what another stack of the same repository runs now: its commit and its images by digest (staging, then production). Waits for the end by default.",
        effect: "write",
        inputSchema: {
            type: "object",
            properties: {
                repo: STACK_REF_PROPERTIES.repo,
                from: { type: "string", description: "The stack whose current deploy is promoted." },
                to: { type: "string", description: "The stack deployed at it." },
                wait: WAIT_PROPERTY,
            },
            required: ["repo", "from", "to"],
            additionalProperties: false,
        },
        call: (args, context) => {
            const repo = stringArg(args, "repo");
            const from = stringArg(args, "from");
            const to = stringArg(args, "to");
            if (repo === undefined || from === undefined || to === undefined) {
                return text("name the repo, the stack to promote from and the stack to promote to", true);
            }
            return run(() => deps.environments.promote({ repo, from, to, reason: askedBy(undefined, context) }), waitArg(args), context);
        },
    },
    {
        name: "environment_history",
        description:
            "One managed environment's deploys, newest first: each record's id, commit, what started it, outcome, how long it took, its error, the end of compose's output for one that failed, and where the forge shows it. Read it to see why a deploy failed, or to pick a record to roll back to.",
        effect: "read",
        inputSchema: {
            type: "object",
            properties: {
                ...STACK_REF_PROPERTIES,
                limit: { type: "number", description: "How many records, newest first. Default 10, at most 200." },
            },
            required: ["repo", "stack"],
            additionalProperties: false,
        },
        call: async (args, context) => {
            const repo = stringArg(args, "repo");
            const stack = stringArg(args, "stack");
            if (repo === undefined || stack === undefined) {
                return text("name the repo and the stack", true);
            }
            const asked = typeof args["limit"] === "number" && Number.isFinite(args["limit"]) ? Math.trunc(args["limit"]) : 10;
            try {
                const records = await deps.environments.history({ repo, stack }, Math.min(Math.max(asked, 1), 200));
                if (records.length === 0) {
                    return text(`${repo} ${stack} has not been deployed from this sandbox yet.`);
                }
                const listed = records.map((record) => {
                    const seconds = recordSeconds(record);
                    const failed = record.outcome === "failed" || record.outcome === "rolled-back" || record.outcome === "refused";
                    return {
                        id: record.id,
                        commit: record.commit,
                        ...(record.ref === undefined ? {} : { ref: record.ref }),
                        outcome: record.outcome,
                        origin: recordOrigin(record),
                        queuedAt: record.queuedAt,
                        ...(seconds === undefined ? {} : { seconds }),
                        ...(record.rolledBackTo === undefined ? {} : { rolledBackTo: record.rolledBackTo }),
                        ...(record.error === undefined ? {} : { error: record.error }),
                        ...(failed && record.outputTail !== undefined ? { outputTail: record.outputTail.slice(-OUTPUT_TAIL) } : {}),
                        ...(record.trigger.url === undefined ? {} : { triggerUrl: record.trigger.url }),
                        ...(record.forgeUrl === undefined ? {} : { forgeUrl: record.forgeUrl }),
                    };
                });
                return text(JSON.stringify(listed, undefined, 2));
            } catch (error) {
                return text(errorMessage(error), true);
            }
        },
    },
];

const composeTools = (deps: ToolDeps): readonly ToolDefinition[] => [
    {
        name: "deploy_targets",
        description:
            "Which workspace repositories deploy as plain Docker compose stacks to which of the owner's connected computers, as the Deployments board links them (a deploy links its repo to its stack). Also lists the workspace repositories with a compose file that are not deployed anywhere yet. Read this before deploy_to_device to know the device and stack a repo goes to. A repository with .intentic/stacks.json is a managed environment instead: read `environments`.",
        effect: "read",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        call: async () => {
            const links = await deps.store.allLinks();
            const deployed = Object.entries(links)
                .filter(([connection]) => connection.startsWith(DEVICE_CONNECTION_PREFIX))
                .flatMap(([connection, repos]) => Object.entries(repos).map(([repo, stack]) => ({ repo, device: deviceOf(connection), stack })));
            const deployable = (await repoLinks(deps.scan, await deps.repoDirs(), [], {})).map((entry) => ({
                repo: entry.repo,
                composeFile: entry.composePath,
                suggestedStack: stackNameFor(entry.projectName),
            }));
            return text(JSON.stringify({ deployed, deployable }, undefined, 2));
        },
    },
    {
        name: "device_stacks",
        description:
            "The Docker compose stacks running on one of the owner's connected computers: each stack's state (running, unhealthy, stopped), compose's status and its services. Needs that computer's \"Run commands\" switch; a refusal names the switch.",
        effect: "read",
        inputSchema: {
            type: "object",
            properties: { device: { type: "string", description: "The computer, by its card id (as the devices tools name it)." } },
            required: ["device"],
            additionalProperties: false,
        },
        call: async (args) => {
            const device = stringArg(args, "device");
            if (device === undefined) {
                return text("name the device", true);
            }
            try {
                const listed = await deps.daemon.stacks(device);
                const stacks = listed.stacks
                    .filter((stack) => !stack.sandbox)
                    .map((stack) => ({
                        name: stack.name,
                        state: stackState(stack),
                        status: stack.status,
                        workingDir: stack.workingDir,
                        services: stack.services.map((service) => `${service.service}: ${service.status}`),
                    }));
                return text(JSON.stringify({ root: listed.root, stacks }, undefined, 2));
            } catch (error) {
                return text(errorMessage(error), true);
            }
        },
    },
    {
        name: "deploy_to_device",
        description:
            "Deploy a workspace repository WITHOUT a stacks manifest to one of the owner's connected computers as a plain Docker compose stack, and wait for it to come up (up to ten minutes). A repository with .intentic/stacks.json deploys through deploy_environment instead, which renders its secrets, keeps its history and rolls it back. Deploys the repository's COMMITTED HEAD as this sandbox's workspace has it, never uncommitted changes: commit first. The computer builds the images itself (`docker compose up -d --build`). A `.env` already beside the stack there is kept, never overwritten. Needs that computer's \"Run commands\" and \"Run programs this sandbox sends\" switches; a refusal names the one that is off. Answers the commit that went and the state the stack is in after it; a failed deploy answers compose's own words.",
        effect: "write",
        inputSchema: {
            type: "object",
            properties: {
                device: { type: "string", description: "The computer, by its card id (as the devices tools name it)." },
                repo: { type: "string", description: "The workspace repository directory, relative to the workspace root, as deploy_targets names it." },
                stack: {
                    type: "string",
                    description: "The stack's name there (lowercase letters, digits, dash, underscore). Omit to use the stack this repo is linked to on that device, else one named after its compose project.",
                },
            },
            required: ["device", "repo"],
            additionalProperties: false,
        },
        call: async (args) => {
            const device = stringArg(args, "device");
            const repo = stringArg(args, "repo");
            if (device === undefined || repo === undefined) {
                return text("name the device and the repo", true);
            }
            try {
                const linked = (await deps.store.links(deviceConnection(device)))[repo];
                const project = (await repoLinks(deps.scan, await deps.repoDirs(), [], {})).find((entry) => entry.repo === repo)?.projectName;
                const stack = stringArg(args, "stack") ?? linked ?? (project === undefined ? undefined : stackNameFor(project));
                if (stack === undefined || !StackNameSchema.safeParse(stack).success) {
                    return text(`"${repo}" is not a workspace repository with a compose file at its root, or "${stack ?? ""}" is not a stack name`, true);
                }
                const { settled } = await deps.board.startDeploy(device, repo, stack);
                const ended = await settled;
                if (ended.error !== undefined) {
                    return text(`The deploy of ${repo} to ${stack} on ${device} failed: ${ended.error}`, true);
                }
                const listed = await deps.daemon.stacks(device).catch(() => undefined);
                const now = listed?.stacks.find((entry) => entry.name === stack);
                const state = now === undefined ? "not listed yet" : `${stackState(now)} (${now.status})`;
                return text(`Deployed ${repo} at ${ended.commit ?? "its HEAD"} to the stack "${stack}" on ${device}; it is ${state}.`);
            } catch (error) {
                return text(errorMessage(error), true);
            }
        },
    },
];
