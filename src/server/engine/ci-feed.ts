import { errorMessage } from "@intentic/base/errors";
import { type CiFeedEventWire, CiFeedEventWireSchema, type CiRunWire, DaemonRefusal } from "../../deploysWire.js";
import type { DeploysDaemon } from "./daemon.js";
import type { Logger } from "./lanes.js";
import type { CiPass } from "./triggers.js";
import type { DeployWatchStore } from "./watch-store.js";

/* THE DAEMON'S CI FEED (GET /ci/feed, Server-Sent Events: one `data:` line a frame), read from the backend for as long
   as some manifest declares a `ci` trigger: each job that passed and each run that passed becomes a CiPass for the
   triggers (triggers.ts). A dropped stream is opened again with a growing pause; once it is open again, the runs that
   passed while it was not are caught up from GET /ci/runs (jobs missed are gone: a job trigger waits for the next one).
   The first time it ever opens there is nothing to catch up: a fresh install deploys nothing CI passed before it. */

export interface CiFeedDeps {
    readonly daemon: Pick<DeploysDaemon, "ciFeed" | "ciRuns">;
    readonly store: DeployWatchStore;
    readonly onPass: (pass: CiPass) => Promise<unknown>;
    readonly logger: Logger;
    readonly now?: () => number;
    // The pause before opening again, doubling from the floor to the cap; tests shorten it.
    readonly backoff?: { readonly floorMs: number; readonly capMs: number };
}

// A run that started up to this long before the feed was last seen may have ended after: it is caught up too. Its
// commit is deployed at most once per stack whatever is caught up twice (triggers.ts).
const CATCH_UP_SLACK_MS = 60 * 60_000;
const BACKOFF = { floorMs: 1_000, capMs: 60_000 };
// A sandbox without the feed at all is asked again this seldom.
const PREDATES_PAUSE_MS = 10 * 60_000;

export const passOfRun = (run: CiRunWire): CiPass => ({
    host: run.host,
    repo: run.repo,
    branch: run.branch,
    sha: run.sha,
    runId: run.runId,
    ...(run.workflow === undefined ? {} : { workflow: run.workflow }),
    ...(run.url === undefined ? {} : { url: run.url }),
});

// A frame as a pass, or undefined for one that is not a success.
export const passOfFrame = (frame: CiFeedEventWire): CiPass | undefined => {
    if (frame.kind === "run") {
        return frame.run.status === "success" ? passOfRun(frame.run) : undefined;
    }
    if (frame.status !== "success") {
        return undefined;
    }
    return {
        host: frame.host,
        repo: frame.repo,
        branch: frame.branch,
        sha: frame.sha,
        runId: frame.runId,
        job: frame.job,
        ...(frame.workflow === undefined ? {} : { workflow: frame.workflow }),
        ...(frame.url === undefined ? {} : { url: frame.url }),
    };
};

// Each `data:` line of an event stream, parsed, as it arrives; a line that is not a frame is skipped.
export async function* feedFrames(body: ReadableStream<Uint8Array>): AsyncGenerator<CiFeedEventWire> {
    const decoder = new TextDecoder();
    let buffered = "";
    const reader = body.getReader();
    try {
        while (true) {
            const { done, value } = await reader.read();
            buffered += done ? decoder.decode() : decoder.decode(value, { stream: true });
            const lines = buffered.split("\n");
            buffered = done ? "" : (lines.pop() ?? "");
            for (const line of lines) {
                const trimmed = line.replace(/\r$/u, "");
                if (!trimmed.startsWith("data:")) {
                    continue;
                }
                let raw: unknown;
                try {
                    raw = JSON.parse(trimmed.slice(5).trim());
                } catch {
                    continue;
                }
                const parsed = CiFeedEventWireSchema.safeParse(raw);
                if (parsed.success) {
                    yield parsed.data;
                }
            }
            if (done) {
                return;
            }
        }
    } finally {
        reader.releaseLock();
    }
}

const pause = (ms: number, signal: AbortSignal): Promise<void> =>
    new Promise((resolve) => {
        if (signal.aborted) {
            resolve();
            return;
        }
        const done = (): void => {
            clearTimeout(timer);
            signal.removeEventListener("abort", done);
            resolve();
        };
        const timer = setTimeout(done, ms);
        signal.addEventListener("abort", done, { once: true });
    });

export const createCiFeed = (deps: CiFeedDeps) => {
    const now = deps.now ?? Date.now;
    const backoff = deps.backoff ?? BACKOFF;
    let running: { readonly controller: AbortController; readonly loop: Promise<void> } | undefined;

    const noteSeen = async (): Promise<void> => {
        const at = now();
        await deps.store.update((current) => ({ ...current, feedSeenAt: at })).catch(() => undefined);
    };

    // The runs that passed since the feed was last seen, oldest first, as run passes.
    const catchUp = async (): Promise<void> => {
        const seen = (await deps.store.read()).feedSeenAt;
        if (seen === undefined) {
            return;
        }
        const runs = await deps.daemon.ciRuns();
        const missed = runs.filter((run) => run.status === "success" && (run.createdAt ?? 0) >= seen - CATCH_UP_SLACK_MS).toSorted((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
        for (const run of missed) {
            await deps.onPass(passOfRun(run));
        }
    };

    const loop = async (signal: AbortSignal): Promise<void> => {
        let wait = backoff.floorMs;
        let predatesSaid = false;
        while (!signal.aborted) {
            try {
                const response = await deps.daemon.ciFeed(signal);
                if (response.body === null) {
                    throw new Error("the CI feed answered no stream");
                }
                // Caught up once it is open, so a run that passes in between arrives on the stream or in the list.
                await catchUp().catch((error: unknown) => deps.logger.warn(`deploys: the CI runs missed while the feed was down could not be read: ${errorMessage(error)}`));
                await noteSeen();
                for await (const frame of feedFrames(response.body)) {
                    wait = backoff.floorMs;
                    const pass = passOfFrame(frame);
                    if (pass !== undefined) {
                        await deps.onPass(pass);
                    }
                }
            } catch (error) {
                if (signal.aborted) {
                    break;
                }
                if (error instanceof DaemonRefusal && error.bare) {
                    if (!predatesSaid) {
                        predatesSaid = true;
                        deps.logger.warn("deploys: this sandbox serves no CI feed (it predates managed deploys): CI triggers wait for it to be updated");
                    }
                    await pause(PREDATES_PAUSE_MS, signal);
                    continue;
                }
                deps.logger.warn(`deploys: the CI feed dropped: ${errorMessage(error)}`);
            }
            if (signal.aborted) {
                break;
            }
            await noteSeen();
            await pause(wait, signal);
            wait = Math.min(wait * 2, backoff.capMs);
        }
    };

    return {
        running: (): boolean => running !== undefined,
        start: (): void => {
            if (running !== undefined) {
                return;
            }
            const controller = new AbortController();
            running = { controller, loop: loop(controller.signal) };
        },
        // Ends the stream and waits for the loop; the moment is kept, so the next start catches up from it.
        stop: async (): Promise<void> => {
            const was = running;
            running = undefined;
            if (was === undefined) {
                return;
            }
            was.controller.abort();
            await was.loop.catch(() => undefined);
            await noteSeen();
        },
    };
};
