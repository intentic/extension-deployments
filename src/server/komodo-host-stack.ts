import { defaultStackName } from "../contract.js";
import type { KomodoClient, KomodoHostStackConfig } from "./komodo-client.js";

// "Run a sandbox from a host folder": a folder already on a Komodo server's disk (what `ic sandbox compose <slug>`
// writes: compose.yaml, a 0600 .env, at-rest.key) becomes a Komodo stack with files_on_host, then is deployed. Komodo
// only reads that folder; nothing here writes into it, which is why the stack's own `environment` stays empty.

// What `ic sandbox compose` names the file; Komodo would assume the same, but saying it keeps the stack self-describing.
const COMPOSE_FILE = "compose.yaml";

export interface HostStackInput {
    // Komodo's server id, as ListServers gives it.
    readonly server: string;
    // Absolute path on that server, not in this sandbox.
    readonly folder: string;
    // Absent or blank: derived from the folder's last segment.
    readonly name?: string | undefined;
}

export interface HostStackResult {
    readonly stack: string;
    // False when the same host-folder stack already existed and was redeployed.
    readonly created: boolean;
}

// Komodo runs the stack on the server, so the folder is that server's path: `~` would expand to the periphery agent's
// home, not the owner's, and a relative path to wherever the agent was started. Both are refused rather than guessed.
const checkedFolder = (folder: string): string => {
    const trimmed = folder.trim().replace(/(?<=.)\/+$/u, "");
    if (!trimmed.startsWith("/")) {
        throw new Error(`the folder must be an absolute path on the server, not "${folder}"`);
    }
    return trimmed;
};

export const hostStackConfig = (server: string, folder: string): KomodoHostStackConfig => ({
    server_id: server,
    files_on_host: true,
    run_directory: folder,
    file_paths: [COMPOSE_FILE],
    environment: "",
});

export interface HostStackPlan {
    readonly stack: string;
    readonly config: KomodoHostStackConfig;
}

// The input checked and resolved before anything reaches Komodo, so a bad path is the owner's to fix (a 400), not
// Komodo's refusal (a 502).
export const planHostStack = (input: HostStackInput): HostStackPlan => {
    if (input.server.trim() === "") {
        throw new Error("choose the server the folder is on");
    }
    const folder = checkedFolder(input.folder);
    const named = input.name?.trim() ?? "";
    return { stack: named === "" ? defaultStackName(folder) : named, config: hostStackConfig(input.server, folder) };
};

const sameFolder = (a: string | undefined, b: string): boolean => a !== undefined && a.replace(/(?<=.)\/+$/u, "") === b;

// Creates the stack, else redeploys it when one of that name is already this very host-folder stack (files on host, the
// same folder, the same server); then deploys. Any other stack of that name (git-backed, defined in Komodo's UI, owned
// by a resource sync, or a host stack for another folder) is refused: updating it would repoint it here and wipe its
// environment. Running it twice is a redeploy of the same stack, never a second one.
export const runFromHostFolder = async (client: KomodoClient, { stack, config }: HostStackPlan): Promise<HostStackResult> => {
    const existing = (await client.listStacks()).find((item) => item.name === stack);
    if (existing === undefined) {
        await client.createStack(stack, config);
    } else {
        const current = (await client.getStack(existing.id)).config ?? {};
        const ours = current.files_on_host === true && current.server_id === config.server_id && sameFolder(current.run_directory, config.run_directory);
        if (!ours) {
            throw new HostStackConflict(stack, config.run_directory);
        }
        await client.updateStack(existing.id, config);
    }
    await client.deployStack(stack);
    return { stack, created: existing === undefined };
};

// The owner's to resolve (pick another name), so the route answers it as a conflict rather than Komodo's failure.
export class HostStackConflict extends Error {
    constructor(stack: string, folder: string) {
        super(
            `Komodo already has a stack named "${stack}" that isn't a host-folder stack for ${folder} on that server; ` +
                `it was left untouched. Give this one another name.`,
        );
        this.name = "HostStackConflict";
    }
}
