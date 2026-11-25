import { readFile } from "node:fs/promises";

// A store file's text: its own (in the extension's state directory), else, only while that does not exist yet, the one
// it had in the legacy bare-name directory before the daemon gave extensions a state directory of their own. Writes go
// to the new place only, so the first one ends the legacy read; a sandbox whose daemon already moved the folder finds
// its file in the new place from the start. Undefined when neither is there or readable: a store reads that as empty.
export const readStateFile = async (path: string, legacy: string | undefined): Promise<string | undefined> => {
    try {
        return await readFile(path, "utf8");
    } catch (error) {
        if (legacy === undefined || (error as NodeJS.ErrnoException).code !== "ENOENT") {
            return undefined;
        }
    }
    return readFile(legacy, "utf8").catch(() => undefined);
};
