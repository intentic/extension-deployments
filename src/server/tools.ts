import { errorMessage } from "@intentic/base/errors";
import type { ToolDefinition } from "@intentic/extension-api";
import { DEVICE_CONNECTION_PREFIX, deviceConnection, deviceOf, stackNameFor, StackNameSchema } from "../contract.js";
import type { DeviceBoard } from "./device-board.js";
import type { DeviceDaemon } from "./device-daemon.js";
import type { KomodoStore } from "./komodo-store.js";
import { repoLinks, type RepoScanDeps } from "./komodo-repos.js";
import { stackState } from "./native-overview.js";

// THE AGENT'S DEPLOY TOOLS, one `deployments` server in every turn: what lets a fix turn redeploy its own fix, and the
// "Redeploy when CI passes" automation deploy what passed. The same deploy the board's button starts (packed from the
// repo's committed HEAD, carried by the daemon, the computer's own switches checked there), except that the tool waits
// for it to land, within the host's ten-minute tool deadline, and answers how it went.

export interface ToolDeps {
    readonly board: DeviceBoard;
    readonly daemon: DeviceDaemon;
    readonly store: KomodoStore;
    readonly scan: RepoScanDeps;
    readonly repoDirs: () => Promise<string[]>;
}

const text = (body: string, isError = false) => ({ content: [{ type: "text" as const, text: body }], ...(isError ? { isError: true } : {}) });

const stringArg = (args: Readonly<Record<string, unknown>>, key: string): string | undefined => {
    const value = args[key];
    return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
};

export const deploymentTools = (deps: ToolDeps): readonly ToolDefinition[] => [
    {
        name: "deploy_targets",
        description:
            "Which workspace repositories deploy to which Docker compose stack on which of the owner's connected computers, as the Deployments board links them (a deploy links its repo to its stack). Also lists the workspace repositories with a compose file that are not deployed anywhere yet. Read this before deploy_to_device to know the device and stack a repo goes to.",
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
            "Deploy a workspace repository to one of the owner's connected computers as a Docker compose stack, and wait for it to come up (up to ten minutes). Deploys the repository's COMMITTED HEAD as this sandbox's workspace has it, never uncommitted changes: commit first. The computer builds the images itself (`docker compose up -d --build`). A `.env` already beside the stack there is kept, never overwritten. Needs that computer's \"Run commands\" and \"Run programs this sandbox sends\" switches; a refusal names the one that is off. Answers the commit that went and the state the stack is in after it; a failed deploy answers compose's own words.",
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
