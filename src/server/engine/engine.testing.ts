import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { CiFeedEventWire, CiRunWire, DeviceRowWire, HostStatsWire, ListenerMessageWire, StackGrantWire } from "../../deploysWire.js";
import type { DeviceStack } from "../native-overview.js";
import { daemonDeploys } from "./daemon.js";
import { memoryDoc } from "./doc.js";
import { createDeploysEngine } from "./engine.js";
import { runGit } from "./git.js";
import { STACKS_MANIFEST_PATH, type StackSpecInput } from "./manifest.js";
import { deploysStore, type RecordsFile } from "./records.js";
import { createDeployWatch } from "./watch.js";
import { emptyWatch } from "./watch-store.js";

// THE ENGINE OVER A FAKE DAEMON: a workspace of real git repositories under `root`, and the daemon's primitives
// (deploy-managed, the device lists, stack grants, the CI feed and runs, forge reports, secret marks, listener dispatch)
// stood in for at the HTTP level, so the engine's own client (daemon.ts) is what calls them. Every call is kept for the
// suite to read. Not part of the build.

const writeFiles = async (dir: string, files: Readonly<Record<string, string>>): Promise<void> => {
    for (const [path, body] of Object.entries(files)) {
        await mkdir(dirname(join(dir, path)), { recursive: true });
        await writeFile(join(dir, path), body);
    }
};

const git = (dir: string, ...args: string[]): Promise<string> => runGit(dir, args).then((out) => out.trim());

const commitAll = async (dir: string, message = "work"): Promise<string> => {
    await git(dir, "add", "-A");
    await git(dir, "-c", "user.name=t", "-c", "user.email=t@t", "-c", "commit.gpgsign=false", "commit", "-q", "--allow-empty", "-m", message);
    return await git(dir, "rev-parse", "HEAD");
};

// A repository at `<root>/<name>` on `main`, holding a compose file and a stacks manifest declaring `stacks`; its HEAD.
export const stackRepo = async (root: string, name: string, stacks: readonly StackSpecInput[]): Promise<string> => {
    const dir = join(root, name);
    await mkdir(dir, { recursive: true });
    await git(dir, "init", "-q", "-b", "main");
    await writeFiles(dir, { "compose.yaml": "services:\n  web:\n    image: ghcr.io/o/web:main\n", [STACKS_MANIFEST_PATH]: JSON.stringify({ stacks }) });
    return await commitAll(dir);
};

// A later commit with the manifest declaring `stacks` (and a marker, so each commit differs); its sha.
export const restack = async (root: string, name: string, stacks: readonly StackSpecInput[], marker: string): Promise<string> => {
    await writeFiles(join(root, name), { [STACKS_MANIFEST_PATH]: JSON.stringify({ stacks }), "marker.txt": marker });
    return await commitAll(join(root, name), marker);
};

// A commit on a branch off `from` that `main` does not hold; HEAD goes back to main.
export const sideCommit = async (root: string, name: string, from: string, marker: string): Promise<string> => {
    const dir = join(root, name);
    await git(dir, "checkout", "-q", "-b", `side-${marker}`, from);
    await writeFiles(dir, { "side.txt": marker });
    const sha = await commitAll(dir, marker);
    await git(dir, "checkout", "-q", "main");
    return sha;
};

export const DIGESTS = { web: "ghcr.io/o/web@sha256:1111111111111111111111111111111111111111111111111111111111111111" };

// The computer the manifests name: a card `rog`, connected, with an agent that manages stacks and reports its fill.
export const ROG: DeviceRowWire = { key: "rog", label: "rog", card: "rog", hostId: "rog", online: true, facts: { features: ["stacks", "programs", "stacks-managed", "host-stats"] } };

export interface DaemonCall {
    readonly method: string;
    readonly path: string;
    readonly query: Readonly<Record<string, string>>;
    readonly headers: Readonly<Record<string, string>>;
    readonly body: unknown;
}

// What a deploy-managed call answers: the default comes up with DIGESTS and a mark per secret named in its body.
export type DeployAnswer = (call: DaemonCall) => Response | Promise<Response>;

export const deployedAnswer = (call: DaemonCall, extra: Readonly<Record<string, unknown>> = {}, marks: Readonly<Record<string, string>> = {}): Response => {
    const body = call.body as { commit: string; env?: Record<string, string>; registries?: { password: string }[] };
    const texts = [...Object.values(body.env ?? {}), ...(body.registries ?? []).map((registry) => registry.password)];
    const names = [...new Set(texts.flatMap((text) => [...text.matchAll(/\{\{secret:([A-Za-z0-9_./-]+)\}\}/gu)].map((match) => match[1] ?? "")))].sort();
    return Response.json({
        stack: call.path.split("/")[5],
        commit: body.commit,
        path: "/home/me/.intentic/stacks/web",
        output: " Container web-1  Started\n",
        digests: DIGESTS,
        envDigest: "e".repeat(64),
        healthySeconds: 12,
        secretNames: names,
        secretMarks: Object.fromEntries(names.map((name) => [name, marks[name] ?? `mark-${name}-1`])),
        ...extra,
    });
};

export const refusal = (status: number, message: string): Response => Response.json({ defined: false, code: "X", status, message }, { status });

export interface FakeDaemonOptions {
    readonly devices?: DeviceRowWire[];
    readonly grants?: StackGrantWire[];
    readonly stacks?: (id: string) => readonly DeviceStack[];
    readonly deploy?: DeployAnswer;
    readonly op?: (id: string, name: string, op: string) => string;
    readonly hostStats?: (id: string) => HostStatsWire;
    // Secret name → its mark in the store now; a name absent holds no value.
    readonly marks?: Record<string, string>;
    readonly runs?: CiRunWire[];
    readonly report?: (body: unknown) => Response;
    // Anything else: answered here, else a bare 404 (a route this sandbox does not serve).
    readonly other?: (call: DaemonCall) => Response | undefined;
}

// A feed the suite writes frames into; each GET /ci/feed opens the next stream.
const feedStream = () => {
    const encoder = new TextEncoder();
    let controller: ReadableStreamDefaultController<Uint8Array> | undefined;
    let opened: () => void = () => {};
    let openedOnce = new Promise<void>((resolve) => {
        opened = resolve;
    });
    let opens = 0;
    return {
        opens: () => opens,
        response: (signal: AbortSignal | null | undefined): Response => {
            opens += 1;
            const body = new ReadableStream<Uint8Array>({
                start: (held) => {
                    controller = held;
                    held.enqueue(encoder.encode(": connected\n\n"));
                    opened();
                },
            });
            signal?.addEventListener("abort", () => {
                try {
                    controller?.error(new Error("aborted"));
                } catch {
                    // Already closed.
                }
            });
            return new Response(body, { headers: { "content-type": "text/event-stream" } });
        },
        // Resolves once a stream is open.
        opened: () => openedOnce,
        push: (frame: CiFeedEventWire | Readonly<Record<string, unknown>>): void => {
            controller?.enqueue(encoder.encode(`data: ${JSON.stringify(frame)}\n\n`));
        },
        drop: (): void => {
            const held = controller;
            controller = undefined;
            openedOnce = new Promise<void>((resolve) => {
                opened = resolve;
            });
            held?.close();
        },
    };
};

export const fakeDaemon = (options: FakeDaemonOptions = {}) => {
    const calls: DaemonCall[] = [];
    const messages: ListenerMessageWire[] = [];
    const grants: StackGrantWire[] = options.grants ?? [];
    const marks: Record<string, string> = options.marks ?? {};
    const runs: CiRunWire[] = options.runs ?? [];
    const devices = options.devices ?? [ROG];
    const feed = feedStream();
    const request = async (path: string, init: RequestInit = {}): Promise<Response> => {
        const url = new URL(path, "http://daemon.fake");
        const text = typeof init.body === "string" ? init.body : undefined;
        const call: DaemonCall = {
            method: (init.method ?? "GET").toUpperCase(),
            path: url.pathname,
            query: Object.fromEntries(url.searchParams),
            headers: Object.fromEntries(new Headers(init.headers).entries()),
            body: text === undefined ? undefined : JSON.parse(text),
        };
        calls.push(call);
        const line = `${call.method} ${call.path}`;
        if (line === "GET /system/devices") {
            return Response.json({ devices });
        }
        if (line === "GET /stack-grants") {
            return Response.json({ grants });
        }
        if (line === "POST /secrets/marks") {
            const names = (call.body as { names: string[] }).names;
            return Response.json({ marks: Object.fromEntries(names.flatMap((name) => (marks[name] === undefined ? [] : [[name, marks[name]]]))) });
        }
        if (line === "GET /ci/runs") {
            return Response.json({ repos: [], runs });
        }
        if (line === "GET /ci/feed") {
            return feed.response(init.signal);
        }
        if (line === "POST /ci/deployments") {
            return options.report?.(call.body) ?? refusal(404, "no CI connection maps this repository");
        }
        if (line === "POST /listeners/deploys/dispatch") {
            messages.push(call.body as ListenerMessageWire);
            return Response.json({ ok: true });
        }
        const device = /^\/system\/devices\/([^/]+)\/(stacks|host-stats)(?:\/([^/]+)\/(deploy-managed|ops\/[a-z]+))?$/u.exec(call.path);
        if (device !== null) {
            const id = decodeURIComponent(device[1] ?? "");
            if (device[2] === "host-stats") {
                return options.hostStats === undefined ? refusal(409, "unknown tool host_stats") : Response.json(options.hostStats(id));
            }
            if (device[3] === undefined) {
                return Response.json({ root: "/home/me/.intentic/stacks", stacks: options.stacks?.(id) ?? [] });
            }
            if (device[4] === "deploy-managed") {
                return await (options.deploy ?? ((asked: DaemonCall) => deployedAnswer(asked, {}, marks)))(call);
            }
            return Response.json({ output: options.op?.(id, device[3], (device[4] ?? "").slice(4)) ?? "" });
        }
        return options.other?.(call) ?? Response.json({ error: "not found" }, { status: 404 });
    };
    return {
        request,
        calls,
        messages,
        grants,
        marks,
        runs,
        feed,
        client: daemonDeploys(request),
        // The deploy-managed calls, as sent.
        deploys: () => calls.filter((call) => call.path.endsWith("/deploy-managed")),
        grant: (repo: string, stack: string, device: string, secrets: readonly string[]): void => {
            grants.push({ repo, stack, device, secrets: [...secrets] });
        },
    };
};

export type FakeDaemon = ReturnType<typeof fakeDaemon>;

export const NO_REMOTE = async (): Promise<string> => "this suite's repositories have no remote";

// The engine over a fake daemon, its records in memory (shared by a second engine, for a restart).
export const engineFixture = (root: string, daemon: FakeDaemon, records = memoryDoc<RecordsFile>({})) => {
    const logged: string[] = [];
    const engine = createDeploysEngine({
        root,
        store: deploysStore(records),
        daemon: daemon.client,
        logger: { warn: (message) => logged.push(message), info: (message) => logged.push(message) },
        fetchRemote: NO_REMOTE,
    });
    return { engine, records, logged };
};

// The engine and its watch, the watch's memory in memory too; passes are driven by hand (`watch.pass`).
export const watchFixture = (root: string, daemon: FakeDaemon, over: { readonly now?: () => number; readonly publicUrl?: string } = {}) => {
    const fixture = engineFixture(root, daemon);
    const store = memoryDoc(emptyWatch());
    const watch = createDeployWatch({
        root,
        engine: fixture.engine,
        daemon: daemon.client,
        store,
        logger: { warn: (message) => fixture.logged.push(message), info: (message) => fixture.logged.push(message) },
        fetchRemote: NO_REMOTE,
        publicUrl: () => over.publicUrl,
        // Passes by hand only: the timer is a day away, and the feed's pause after a drop is short.
        everyMs: 24 * 3_600_000,
        feedBackoff: { floorMs: 10, capMs: 50 },
        ...(over.now === undefined ? {} : { now: over.now }),
    });
    return { ...fixture, watch, store };
};

// Resolves when `check` holds, looking every few milliseconds; fails after `ms`.
export const eventually = async (check: () => boolean | Promise<boolean>, ms = 5_000): Promise<void> => {
    const until = Date.now() + ms;
    while (!(await check())) {
        if (Date.now() > until) {
            throw new Error("the condition never held");
        }
        await new Promise((resolve) => setTimeout(resolve, 5));
    }
};
