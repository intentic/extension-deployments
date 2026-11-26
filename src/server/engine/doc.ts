import type { ExtensionServerApi, StoredJson } from "@intentic/extension-api";
import type { z } from "zod";

// A JSON document the engine keeps: read whole, changed by a function, one change at a time. `api.document` (a file in
// the extension's own state directory) in the backend, `memoryDoc` in a test; the engine sees no difference.
export interface JsonDoc<T> {
    readonly read: () => Promise<T>;
    readonly update: (change: (current: T) => T) => Promise<T>;
}

// A document in the extension's state directory, parsed by `schema`; a file this version cannot read is left alone and
// read as `fallback` (api.document refuses to write over it, so nothing it holds is lost to a downgrade).
export const stateDoc = <T>(api: Pick<ExtensionServerApi, "document">, path: string, schema: z.ZodType<T>, fallback: () => T): JsonDoc<T> => {
    const document = api.document<T>(path, {
        parse: (raw: StoredJson) => {
            const parsed = schema.safeParse(raw);
            return parsed.success ? parsed.data : undefined;
        },
        fallback,
    });
    return { read: () => document.read(), update: (change) => document.update(change) };
};

// The same in memory, serialised like the file: what a suite (and a restart within one) shares.
export const memoryDoc = <T>(initial: T): JsonDoc<T> & { readonly peek: () => T } => {
    let value = initial;
    let queue: Promise<unknown> = Promise.resolve();
    return {
        peek: () => value,
        read: async () => value,
        update: (change) => {
            const next = queue.then(() => {
                value = change(value);
                return value;
            });
            queue = next.catch(() => undefined);
            return next;
        },
    };
};
