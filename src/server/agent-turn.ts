import { errorMessage } from "@intentic/base/errors";
import type { ExtensionServerApi } from "@intentic/extension-api";
import type { AgentRunPick } from "@intentic/sandbox-contract";
import { ORPCError } from "@orpc/server";

// Starting an isolated agent turn from a board button: both boards' "Ask the agent to fix" and the device board's
// "set its environment" go through here, so they mint ids and spend the owner's model list the same way.

const TITLE_MAX = 80;

// Mirrors the scheduler's conversation id recipe: bounded, charset-safe, unique per process.
let seq = 0;
const mintConversationId = (kind: string, name: string, now: number): string =>
    `${kind}-${name.replaceAll(/[^a-zA-Z0-9-]/g, "-").slice(0, 32)}-${now.toString(36)}${(seq++).toString(36)}`;

export interface AgentTurnRequest {
    // The id's prefix, which also says what started it on the fleet board ("deploy-fix", "deploy-env").
    readonly kind: string;
    readonly name: string;
    readonly title: string;
    readonly prompt: string;
    readonly pick?: AgentRunPick | undefined;
}

// A detached run with a fleet card; `unattended` defers to the default list unless a pick overrides it. A refusal (no
// model to run on, the owner's limits) is the caller's CONFLICT, in the daemon's words.
export const startAgentTurn = async (api: ExtensionServerApi, request: AgentTurnRequest): Promise<{ conversationId: string }> => {
    const conversationId = mintConversationId(request.kind, request.name, Date.now());
    await api.daemon
        .json(`/agent`, {
            method: "POST",
            body: JSON.stringify({
                prompt: request.prompt,
                conversationId,
                isolated: true,
                unattended: true,
                // Which of the owner's model lists pays for it (Sandbox ▸ Agent ▸ Models).
                runRole: `deployment-fix`,
                // Spread verbatim: AgentRunPick's fields ARE the turn's, so nothing is translated here
                // and nothing can be left behind (contract AgentRunPickSchema).
                ...request.pick,
                title: request.title.slice(0, TITLE_MAX),
            }),
        })
        .catch((error: unknown) => {
            throw new ORPCError("CONFLICT", { message: errorMessage(error) });
        });
    return { conversationId };
};
