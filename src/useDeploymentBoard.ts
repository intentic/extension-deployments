import type { AgentRunChoice } from "@intentic/extension-ui";
import { runPickOf } from "@intentic/sandbox-contract";
import {
    type DeployAction,
    type DeployFixResponse,
    DeployFixResponseSchema,
    type DeployLogsResponse,
    DeployLogsResponseSchema,
    type DeployOverviewResponse,
    DeployOverviewResponseSchema,
    type DeployResource,
} from "./contract";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { computed, type Ref } from "vue";
import { host } from "./host";

// One Komodo connection's board, via the extension's own /komodo routes: the browser never holds the API key, which is
// why these routes exist instead of calling Komodo directly. Read through `api.sandbox.query`, so the view draws its wait,
// its answer and its failure with the kit's <Await> rather than from raw flags. Polls faster than the rail's own badge,
// for someone actually watching a deploy land.
const POLL_MS = 10_000;
// An open log tail follows the container, like a terminal; a closed one is not read at all.
const LOG_POLL_MS = 5_000;

const post = (payload: Record<string, unknown>): RequestInit => ({
    method: `POST`,
    headers: { "content-type": `application/json` },
    body: JSON.stringify(payload),
});

export function useDeploymentBoard(capability: Ref<string>) {
    const api = host();
    const queryClient = useQueryClient();
    const queryKey = computed(() => api.sandbox.key(`komodo-overview`, capability.value));

    const { query, loaded } = api.sandbox.query({
        queryKey,
        queryFn: async (): Promise<DeployOverviewResponse> =>
            DeployOverviewResponseSchema.parse(await api.backend.json(`komodo/${capability.value}/overview`)),
        refetchInterval: POLL_MS,
    });
    const invalidate = (): Promise<void> => queryClient.invalidateQueries({ queryKey: queryKey.value });

    const act = useMutation({
        mutationFn: (input: { resource: DeployResource; action: DeployAction }) =>
            api.backend.json(
                `komodo/${capability.value}/action`,
                post({ kind: input.resource.kind, id: input.resource.id, action: input.action }),
            ),
        // Execute returns as soon as accepted; the refetch may briefly show stale state until the next poll.
        onSuccess: invalidate,
    });

    // Binds a repo to a stack (empty `stack` unlinks); invalidates since the overview carries the link back.
    const link = useMutation({
        mutationFn: (input: { repo: string; stack: string }) => api.backend.json(`komodo/${capability.value}/link`, post(input)),
        onSuccess: invalidate,
    });

    // Starts an isolated agent seeded with the resource and its logs; resolves to the conversation/card id.
    const fix = useMutation({
        mutationFn: async ({ resource, pick }: { resource: DeployResource; pick?: AgentRunChoice | undefined }): Promise<DeployFixResponse> =>
            DeployFixResponseSchema.parse(
                await api.backend.json(
                    `komodo/${capability.value}/fix`,
                    post({
                        kind: resource.kind,
                        id: resource.id,
                        // The knobs ride with the pair: the daemon fills a pinned entry's in only for a run that
                        // named no model, so a pick without them drops to the provider's own defaults.
                        ...(pick === undefined ? {} : { pick: runPickOf(pick) }),
                    }),
                ),
            ),
    });

    return {
        // What the view has of the board, for <Await :of>: waiting (including while the sandbox wakes), ready, or failed.
        loaded,
        // The last answer, for what sits outside the awaited region (the title row's link, the strips).
        board: computed(() => query.data.value),
        refetch: query.refetch,
        act,
        link,
        fix,
    };
}

// One resource's log tail, read only while its row is open and followed while it stays open.
export function useResourceLogs(capability: () => string, resource: () => DeployResource, open: () => boolean) {
    const api = host();
    const { loaded } = api.sandbox.query({
        queryKey: computed(() => api.sandbox.key(`komodo-logs`, capability(), resource().kind, resource().id)),
        queryFn: async (): Promise<DeployLogsResponse> =>
            DeployLogsResponseSchema.parse(
                await api.backend.json(`komodo/${capability()}/logs`, post({ kind: resource().kind, id: resource().id })),
            ),
        enabled: open,
        refetchInterval: LOG_POLL_MS,
    });
    return loaded;
}
