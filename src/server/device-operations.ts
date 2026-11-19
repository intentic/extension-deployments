import { errorMessage } from "@intentic/base/errors";
import type { DeployOperation } from "../contract.js";

// WHAT A DEVICE BOARD HAS GOING ON A COMPUTER. A press answers at once and the work runs on here, because a pull or a
// build outlasts any request the browser can hold open (the backend's proxy gives up on headers after 20 seconds). The
// overview carries the list, so the row that asked shows "deploying" while it runs and the computer's own words if it
// failed. Kept in memory only: a backend restart forgets what it was doing, and the next read shows the stack as it is.

// Per connection, the newest first; older outcomes are nobody's business once a few newer ones exist.
const KEPT = 20;

export class OperationBusy extends Error {}

export interface DeviceOperations {
    readonly list: (connection: string) => readonly DeployOperation[];
    // Whether something is still running on that stack, which is when its state reads are mid-change.
    readonly running: (connection: string, stack: string) => boolean;
    // Starts `work` for one stack and answers at once; refuses while another operation on that stack still runs, since
    // a restart under a deploy would race it. `work`'s answer may carry the commit a deploy sent.
    readonly start: (
        connection: string,
        operation: { readonly stack: string; readonly action: string; readonly repo?: string | undefined },
        work: () => Promise<{ readonly commit?: string } | void>,
    ) => { readonly started: DeployOperation; readonly settled: Promise<DeployOperation> };
}

export const deviceOperations = (now: () => number = Date.now): DeviceOperations => {
    const byConnection = new Map<string, DeployOperation[]>();
    const replace = (connection: string, before: DeployOperation, after: DeployOperation): void => {
        byConnection.set(
            connection,
            (byConnection.get(connection) ?? []).map((entry) => (entry === before ? after : entry)),
        );
    };
    const running = (connection: string, stack: string): boolean =>
        (byConnection.get(connection) ?? []).some((entry) => entry.stack === stack && entry.finishedAt === undefined);
    return {
        list: (connection) => byConnection.get(connection) ?? [],
        running,
        start: (connection, { stack, action, repo }, work) => {
            if (running(connection, stack)) {
                throw new OperationBusy(`${stack} is still busy with what was started before; try again once it finishes`);
            }
            const started: DeployOperation = { stack, action, ...(repo === undefined ? {} : { repo }), startedAt: now() };
            byConnection.set(connection, [started, ...(byConnection.get(connection) ?? [])].slice(0, KEPT));
            // Never rejects: how it ended is the entry itself, which a caller that waits (the agent's tool) reads.
            const settled = work().then(
                (answer) => {
                    const commit = answer === undefined ? undefined : answer.commit;
                    const ended = { ...started, finishedAt: now(), ...(commit === undefined ? {} : { commit }) };
                    replace(connection, started, ended);
                    return ended;
                },
                (error: unknown) => {
                    const ended = { ...started, finishedAt: now(), error: errorMessage(error) };
                    replace(connection, started, ended);
                    return ended;
                },
            );
            return { started, settled };
        },
    };
};
