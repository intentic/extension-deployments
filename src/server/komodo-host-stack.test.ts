import { describe, expect, test } from "vitest";
import { type FetchFn, komodoClient } from "./komodo-client.js";
import { defaultStackName, planHostStack, runFromHostFolder } from "./komodo-host-stack.js";

const BASE = "https://komodo.example.com";
const connection = { capability: "komodo", baseUrl: BASE, apiKey: "key", apiSecret: "secret" };

interface Sent {
    readonly path: string;
    readonly body: unknown;
    readonly headers: Record<string, string>;
}

// A Komodo that answers by path, recording every call in order; anything unscripted is a 404 so a stray call fails.
const fakeKomodo = (answers: Record<string, unknown>, status: Record<string, number> = {}): { fetch: FetchFn; sent: Sent[] } => {
    const sent: Sent[] = [];
    const fetchFn = (async (url: string | URL | Request, init?: RequestInit) => {
        const path = String(url).slice(BASE.length);
        sent.push({ path, body: JSON.parse(String(init?.body ?? "{}")), headers: init?.headers as Record<string, string> });
        const code = status[path] ?? (path in answers ? 200 : 404);
        return new Response(JSON.stringify(answers[path] ?? { error: "no such route" }), { status: code });
    }) as FetchFn;
    return { fetch: fetchFn, sent };
};

describe("defaultStackName", () => {
    test("the folder's last segment, prefixed once", () => {
        expect(defaultStackName("/home/me/.intentic/compose/acme")).toBe("intentic-acme");
        expect(defaultStackName("/home/me/.intentic/compose/acme/")).toBe("intentic-acme");
        expect(defaultStackName("/srv/intentic-acme")).toBe("intentic-acme");
    });

    test("reduced to characters a stack and a compose project can carry", () => {
        expect(defaultStackName("/srv/My Sandbox!")).toBe("intentic-my-sandbox");
    });

    test("a folder with no usable segment asks for a name rather than inventing one", () => {
        expect(() => defaultStackName("/")).toThrow(/give it a name/);
    });
});

describe("planHostStack", () => {
    test("a files-on-host stack running compose.yaml from the folder, writing no env file over the folder's own", () => {
        expect(planHostStack({ server: "sv1", folder: "/srv/compose/acme/" })).toEqual({
            stack: "intentic-acme",
            config: { server_id: "sv1", files_on_host: true, run_directory: "/srv/compose/acme", file_paths: ["compose.yaml"], environment: "" },
        });
    });

    test("a given name wins over the derived one; a blank one does not", () => {
        expect(planHostStack({ server: "sv1", folder: "/srv/acme", name: " sandbox-prod " }).stack).toBe("sandbox-prod");
        expect(planHostStack({ server: "sv1", folder: "/srv/acme", name: "  " }).stack).toBe("intentic-acme");
    });

    // `~` would expand to the periphery agent's home and a relative path to its working directory: neither is the owner's.
    test("a path that isn't absolute on the server is refused before Komodo hears of it", () => {
        expect(() => planHostStack({ server: "sv1", folder: "~/.intentic/compose/acme" })).toThrow(/absolute path/);
        expect(() => planHostStack({ server: "sv1", folder: "compose/acme" })).toThrow(/absolute path/);
        expect(() => planHostStack({ server: " ", folder: "/srv/acme" })).toThrow(/server/);
    });
});

describe("runFromHostFolder", () => {
    const plan = planHostStack({ server: "sv1", folder: "/srv/compose/acme" });

    test("no stack of that name: CreateStack on /write, then DeployStack on /execute", async () => {
        const komodo = fakeKomodo({
            "/read/ListStacks": [{ id: "s9", name: "other", info: {} }],
            "/write/CreateStack": { _id: { $oid: "s1" }, name: "intentic-acme" },
            "/execute/DeployStack": { _id: { $oid: "u1" } },
        });
        const result = await runFromHostFolder(komodoClient(connection, komodo.fetch), plan);
        expect(result).toEqual({ stack: "intentic-acme", created: true });
        expect(komodo.sent.map((call) => call.path)).toEqual(["/read/ListStacks", "/write/CreateStack", "/execute/DeployStack"]);
        // The params are the whole body: Komodo wraps them as {type, params} itself.
        expect(komodo.sent[1]?.body).toEqual({ name: "intentic-acme", config: plan.config });
        expect(komodo.sent[2]?.body).toEqual({ stack: "intentic-acme" });
        expect(komodo.sent[1]?.headers["x-api-key"]).toBe("key");
    });

    test("a stack of that name already: UpdateStack by its id, never a second stack", async () => {
        const komodo = fakeKomodo({
            "/read/ListStacks": [{ id: "s1", name: "intentic-acme", info: {} }],
            "/write/UpdateStack": { _id: { $oid: "s1" }, name: "intentic-acme" },
            "/execute/DeployStack": {},
        });
        const result = await runFromHostFolder(komodoClient(connection, komodo.fetch), plan);
        expect(result).toEqual({ stack: "intentic-acme", created: false });
        expect(komodo.sent.map((call) => call.path)).toEqual(["/read/ListStacks", "/write/UpdateStack", "/execute/DeployStack"]);
        expect(komodo.sent[1]?.body).toEqual({ id: "s1", config: plan.config });
    });

    test("a refused write stops before the deploy and carries Komodo's own words", async () => {
        const komodo = fakeKomodo({ "/read/ListStacks": [], "/write/CreateStack": { error: "user lacks Create permission" } }, { "/write/CreateStack": 403 });
        await expect(runFromHostFolder(komodoClient(connection, komodo.fetch), plan)).rejects.toThrow(
            /Komodo write\/CreateStack failed \(403\).*lacks Create permission/,
        );
        expect(komodo.sent.map((call) => call.path)).not.toContain("/execute/DeployStack");
    });
});
