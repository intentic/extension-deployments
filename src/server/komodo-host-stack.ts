import type { KomodoClient, KomodoHostStackConfig } from "./komodo-client.js";

// "Run a sandbox from a host folder": a folder already on a Komodo server's disk (what `ic sandbox compose <slug>`
// writes: compose.yaml, a 0600 .env, at-rest.key) becomes a Komodo stack with files_on_host, then is deployed. Komodo
// only reads that folder; nothing here writes into it, which is why the stack's own `environment` stays empty.

// What `ic sandbox compose` names the file; Komodo would assume the same, but saying it keeps the stack self-describing.
const COMPOSE_FILE = "compose.yaml";
const PREFIX = "intentic-";

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
    // False when a stack of that name already existed and was updated in place.
    readonly created: boolean;
}

// `~/.intentic/compose/acme/` → `intentic-acme`; a segment already carrying the prefix keeps it once. Lowercased and
// reduced to Komodo-safe characters, since the name also becomes the compose project name.
export const defaultStackName = (folder: string): string => {
    const segment = folder.replace(/\/+$/u, "").split("/").at(-1) ?? "";
    const slug = segment
        .toLowerCase()
        .replaceAll(/[^a-z0-9_-]+/gu, "-")
        .replaceAll(/^-+|-+$/gu, "");
    if (slug === "") {
        throw new Error(`can't name a stack after "${folder}": give it a name`);
    }
    return slug.startsWith(PREFIX) ? slug : `${PREFIX}${slug}`;
};

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

// Finds the stack by name and updates it, else creates it; then deploys. Running it twice is a redeploy of the same
// stack, never a second one.
export const runFromHostFolder = async (client: KomodoClient, { stack, config }: HostStackPlan): Promise<HostStackResult> => {
    const existing = (await client.listStacks()).find((item) => item.name === stack);
    if (existing === undefined) {
        await client.createStack(stack, config);
    } else {
        await client.updateStack(existing.id, config);
    }
    await client.deployStack(stack);
    return { stack, created: existing === undefined };
};
