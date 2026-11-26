import { errorMessage } from "@intentic/base/errors";
import { plainText } from "@intentic/base/plain-text";
import type { AgentRunPick } from "@intentic/sandbox-contract";
import { ORPCError } from "@orpc/server";
import { type DeployAction, type DeployOverviewResponse, type DeployResource, deviceConnection } from "../contract.js";
import type { DeviceDaemon, StackOp } from "./device-daemon.js";
import type { DeviceOperations } from "./device-operations.js";
import type { KomodoStore } from "./komodo-store.js";
import { repoLinks, type RepoScanDeps } from "./komodo-repos.js";
import { type DeviceStack, deviceResources, deviceServer, foldStates } from "./native-overview.js";
import type { NativeStore } from "./native-store.js";

// The device board's backend: one of the owner's own computers read and driven through the daemon's device-stack routes,
// with no Komodo between. Answers in the Komodo board's shapes, so the view is one view. The two halves fail as the
// Komodo board's do: the overview degrades (a computer that is asleep, too old or has its switch off reads as
// unreachable, with the daemon's sentence), and a press propagates its refusal to the row that pressed.

const LOG_TAIL = 200;
// Log bytes a fix conversation is seeded with: enough to see the error, small enough to stay about fixing.
const FIX_LOG_BYTES = 24_000;

// The board's verbs, as compose spells them on a computer: Redeploy re-applies the files, Update pulls first.
const OPS: Readonly<Record<DeployAction, StackOp>> = { deploy: "up", pull: "pull", restart: "restart", start: "start", stop: "stop" };

export interface DeviceBoardDeps {
    readonly daemon: DeviceDaemon;
    readonly store: KomodoStore;
    readonly memory: NativeStore;
    readonly operations: DeviceOperations;
    readonly scan: RepoScanDeps;
    readonly repoDirs: () => Promise<string[]>;
    readonly startAgent: (request: { kind: string; name: string; title: string; prompt: string; pick?: AgentRunPick | undefined }) => Promise<{ conversationId: string }>;
    readonly log: (message: string) => void;
    readonly now?: () => number;
}

const conflict = (error: unknown): never => {
    throw new ORPCError("CONFLICT", { message: errorMessage(error) });
};

const gateway = <T>(action: Promise<T>): Promise<T> =>
    action.catch((error: unknown) => {
        throw new ORPCError("BAD_GATEWAY", { message: errorMessage(error) });
    });

export const deviceBoard = (deps: DeviceBoardDeps) => {
    const now = deps.now ?? Date.now;

    // A workspace repo as the rest of the app names it (its directory, relative to the root), and only one that holds a
    // compose file the board found: a deploy may pack nothing the board did not offer.
    const offeredRepo = async (device: string, repo: string): Promise<void> => {
        const offered = await repoLinks(deps.scan, await deps.repoDirs(), [], await deps.store.links(deviceConnection(device)));
        if (!offered.some((entry) => entry.repo === repo)) {
            throw new ORPCError("BAD_REQUEST", { message: `"${repo}" is not a workspace repository with a compose file at its root` });
        }
    };

    const findStack = async (device: string, name: string): Promise<DeviceStack> => {
        const stacks = await gateway(deps.daemon.stacks(device));
        const stack = stacks.stacks.find((entry) => entry.name === name && !entry.sandbox);
        if (stack === undefined) {
            throw new ORPCError("NOT_FOUND", { message: `${device} has no stack "${name}" any more` });
        }
        return stack;
    };

    const overview = async (device: string): Promise<DeployOverviewResponse> => {
        const connection = deviceConnection(device);
        const seenAt = await deps.store.seenAt(connection);
        const links = await deps.store.links(connection);
        const repoDirs = await deps.repoDirs();
        const operations = [...deps.operations.list(connection)];
        const remembered = await deps.memory.memory(connection);
        const common = { source: "device" as const, komodoUrl: "", operations, ...(seenAt === undefined ? {} : { seenAt }) };
        let listed;
        try {
            listed = await deps.daemon.stacks(device);
        } catch (error) {
            const reason = errorMessage(error);
            deps.log(`device board unreachable for "${device}": ${reason}`);
            return {
                ...common,
                reachable: false,
                unreachableReason: reason,
                repos: await repoLinks(deps.scan, repoDirs, [], links),
                resources: [],
                servers: [deviceServer(device, false)],
                alerts: [...remembered.alerts],
            };
        }
        const resources = deviceResources(device, listed.stacks);
        // A stack mid-operation is mid-change: its passing states are not news, so the memory keeps what it had before.
        const observed = resources.map((resource) => {
            const before = remembered.states[resource.name];
            return deps.operations.running(connection, resource.name) && before !== undefined ? { ...resource, state: before } : resource;
        });
        // A stack this board stopped went down because it was asked to: its own last word says so.
        const latest = new Map<string, (typeof operations)[number]>();
        for (const operation of operations) {
            if (!latest.has(operation.stack)) {
                latest.set(operation.stack, operation);
            }
        }
        const quiet = new Set(
            [...latest.values()].filter((operation) => operation.action === "stop" && operation.error === undefined).map((operation) => operation.stack),
        );
        const memory = foldStates(remembered, device, observed, now(), quiet);
        await deps.memory.remember(connection, memory).catch((error: unknown) => deps.log(`could not record ${device}'s stack states: ${errorMessage(error)}`));
        // What the reader sees mid-operation is that it is happening, whatever the containers say this second.
        const shown: DeployResource[] = resources.map((resource) =>
            deps.operations.running(connection, resource.name) ? { ...resource, state: "deploying" } : resource,
        );
        return {
            ...common,
            deviceRoot: listed.root,
            reachable: true,
            repos: await repoLinks(
                deps.scan,
                repoDirs,
                shown.map((resource) => resource.name),
                links,
            ),
            resources: shown,
            servers: [deviceServer(device, true)],
            alerts: [...memory.alerts],
        };
    };

    const action = (device: string, stack: string, verb: DeployAction): { ok: true } => {
        try {
            deps.operations.start(deviceConnection(device), { stack, action: OPS[verb] }, async () => {
                await deps.daemon.op(device, stack, OPS[verb]);
            });
        } catch (error) {
            conflict(error);
        }
        return { ok: true };
    };

    const logs = async (device: string, stack: string): Promise<{ stdout: string; stderr: string }> => ({
        stdout: await gateway(deps.daemon.logs(device, stack, LOG_TAIL)),
        stderr: "",
    });

    // Deploys and links in one: a repo deployed to a stack IS that stack's repo, so the owner never links by hand here.
    const deployNow = async (device: string, repo: string, stack: string) => {
        const deployed = await deps.daemon.deploy(device, stack, repo);
        await deps.store.link(deviceConnection(device), repo, stack);
        return deployed;
    };

    // Started like any press, so the board shows it whoever asked; the agent's tool waits on `settled`, the board doesn't.
    const startDeploy = async (device: string, repo: string, stack: string) => {
        await offeredRepo(device, repo);
        try {
            return deps.operations.start(deviceConnection(device), { stack, action: "deploy", repo }, async () => {
                const deployed = await deployNow(device, repo, stack);
                return { commit: deployed.commit };
            });
        } catch (error) {
            return conflict(error);
        }
    };

    const deploy = async (device: string, repo: string, stack: string): Promise<{ ok: true }> => {
        await startDeploy(device, repo, stack);
        return { ok: true };
    };

    // The repo a stack was deployed from, as linked: what a fix or an environment turn is pointed at.
    const repoOf = async (device: string, stack: string): Promise<string | undefined> =>
        Object.entries(await deps.store.links(deviceConnection(device))).find(([, linked]) => linked === stack)?.[0];

    // `managed` names the repository when the stack is a managed environment (engine/): its fix ships through
    // a managed deploy, and its `.env` is filled by the daemon at each deploy, never a hand edit.
    const fix = async (device: string, stack: string, pick: AgentRunPick | undefined, managed?: string): Promise<{ conversationId: string }> => {
        const found = await findStack(device, stack);
        const [resource] = deviceResources(device, [found]);
        const repo = managed ?? (await repoOf(device, stack));
        // Best-effort: the broken stack is often the one whose log can't be read; still worth starting the turn.
        const log = await deps.daemon.logs(device, stack, LOG_TAIL).catch(() => "");
        const tail = plainText(log).trim().slice(-FIX_LOG_BYTES);
        const files = found.configFiles.length === 0 ? "compose no longer knows its files" : `its compose files are ${found.configFiles.join(", ")}`;
        const prompt = [
            `The Docker compose stack "${stack}" on the computer "${device}" is ${resource?.state ?? "unknown"}${resource?.status === undefined ? "" : ` (${resource.status})`}. Investigate and fix it.`,
            `It runs from ${found.workingDir ?? "a folder compose did not record"} on ${device}; ${files}. Reach ${device} with the devices tools: run_command there with \`docker compose -p ${stack} ps\`, \`logs\` and the like.`,
            managed !== undefined
                ? `It is a managed environment the workspace repository "${managed}" declares in .intentic/stacks.json. Read its deploys with the deployments server's environment_history tool (repo "${managed}", stack "${stack}"). Find the cause in that repository when it is a code or config problem, fix it and commit it, then redeploy with deploy_environment (repo "${managed}", stack "${stack}"). Say plainly when the cause is outside the workspace (a full disk, an unreachable dependency) rather than inventing a code change.`
                : repo === undefined
                  ? `It was not deployed from this workspace, so a fix is made on ${device} itself (its files, its .env) or said plainly when it is outside your reach.`
                  : `It was deployed from the workspace repository "${repo}" (its committed HEAD). Find the cause there when it is a code or config problem, fix it and commit it, then redeploy with the deployments server's deploy_to_device tool (device "${device}", repo "${repo}", stack "${stack}"). Say plainly when the cause is outside the workspace (a missing variable in its .env, a full disk, an unreachable dependency) rather than inventing a code change.`,
            managed !== undefined
                ? `Never edit its .env on ${device}: the daemon renders it at each deploy from the secrets the owner granted the stack, and refuses to overwrite one changed by hand. A variable it lacks goes into the manifest's \`env\` (as \`{{secret:NAME}}\` for a secret), and a secret nobody stored is asked of the owner with \`secrets ask NAME --why "…"\`.`
                : `Never put a secret's value into the conversation: a variable it is missing goes into the .env beside its compose file on ${device}, written from the sandbox's stored secrets (a \`{{secret:NAME}}\` reference in the Bash tool, then \`devices copy\` to ${device}).`,
            ...(tail === "" ? [] : [`--- stack log tail ---\n${tail}`]),
        ].join("\n\n");
        return deps.startAgent({ kind: "deploy-fix", name: stack, title: `Fix ${stack} on ${device}`, prompt, ...(pick === undefined ? {} : { pick }) });
    };

    // The environment a stack reads: which variables its compose file and code expect, filled into the `.env` beside it
    // on the computer from the sandbox's stored secrets. A turn rather than a form, because it passes the secret gates a
    // button cannot, and because finding which variables matter is reading code.
    const environment = async (device: string, stack: string, given: string | undefined, pick: AgentRunPick | undefined): Promise<{ conversationId: string }> => {
        const listed = await gateway(deps.daemon.stacks(device));
        const repo = given ?? (await repoOf(device, stack));
        const folder = listed.stacks.find((entry) => entry.name === stack)?.workingDir ?? `${listed.root}/${stack}`;
        const prompt = [
            `Set up the environment of the Docker compose stack "${stack}" on the computer "${device}". It runs from ${folder} there, and compose reads the \`.env\` in that folder.`,
            repo === undefined
                ? `Read its compose file there (devices tools, run_command on ${device}) to see which variables it expects.`
                : `It is deployed from the workspace repository "${repo}": read its compose file and code to see which variables it expects and which are secrets.`,
            `Write the .env WITHOUT ever showing a secret's value in this conversation: build the file in the Bash tool with \`{{secret:NAME}}\` references (they are replaced with the stored values when the command runs) into a private temporary file, then \`devices copy\` it to ${device}:${folder}/.env and delete the temporary file. List the stored secrets with \`secrets list\`; for one that is missing, ask the owner with \`secrets ask NAME --why "…"\` rather than inventing a value. Keep any variable the .env there already has unless it is wrong.`,
            `Then apply it: run_command on ${device} with \`docker compose -p ${stack} up -d\` in that folder, and check its services come up.`,
        ].join("\n\n");
        return deps.startAgent({ kind: "deploy-env", name: stack, title: `Environment for ${stack} on ${device}`, prompt, ...(pick === undefined ? {} : { pick }) });
    };

    return { overview, action, logs, deploy, startDeploy, fix, environment, repoOf };
};

export type DeviceBoard = ReturnType<typeof deviceBoard>;
