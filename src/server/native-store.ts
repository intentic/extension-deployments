import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { extensionRuntimeDir } from "@intentic/sandbox-contract";
import { z } from "zod";
import { DeployAlertSchema, DeployStateSchema } from "../contract.js";
import { EMPTY_MEMORY, type NativeMemory } from "./native-overview.js";

// What a device board remembers between reads (native-overview.ts's NativeMemory): each stack's last state and the alert
// log made from its moves, per connection. Beside komodo.json, written the same way: tolerant read (a mangled file reads
// as nothing remembered, which costs at most one re-opened alert), one write queue, atomic rename. Seen marks and
// repo→stack links stay in the Komodo store, keyed by the `device:<id>` connection, so both boards keep them alike.

const MemorySchema = z.object({
    states: z.record(z.string(), DeployStateSchema),
    alerts: z.array(DeployAlertSchema),
});
const NativeStateSchema = z.object({ memory: z.record(z.string(), MemorySchema) });
type NativeState = z.infer<typeof NativeStateSchema>;

export interface NativeStore {
    readonly memory: (connection: string) => Promise<NativeMemory>;
    readonly remember: (connection: string, memory: NativeMemory) => Promise<void>;
}

export const nativeStorePath = (workspaceRoot: string): string => join(workspaceRoot, extensionRuntimeDir("deployments"), "native.json");

export const fileNativeStore = (path: string): NativeStore => {
    const read = async (): Promise<NativeState> => {
        try {
            return NativeStateSchema.safeParse(JSON.parse(await readFile(path, "utf8"))).data ?? { memory: {} };
        } catch {
            return { memory: {} };
        }
    };
    let queue: Promise<unknown> = Promise.resolve();
    return {
        memory: async (connection) => (await read()).memory[connection] ?? EMPTY_MEMORY,
        remember: (connection, memory) => {
            const next = queue.then(async () => {
                const state = await read();
                const written: NativeState = { memory: { ...state.memory, [connection]: { states: { ...memory.states }, alerts: [...memory.alerts] } } };
                await mkdir(dirname(path), { recursive: true });
                const staging = `${path}.tmp`;
                await writeFile(staging, `${JSON.stringify(written, undefined, 4)}\n`);
                await rename(staging, path);
            });
            // The queue survives a failed write; the failure still reaches the caller.
            queue = next.catch(() => {});
            return next;
        },
    };
};
