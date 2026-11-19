import type { AgentRunChoice } from "@intentic/extension-ui";
import { runPickOf } from "@intentic/sandbox-contract";
import {
    connectionRoutes,
    type DeployAction,
    type DeployFixResponse,
    DeployFixResponseSchema,
    type DeployHostStackResponse,
    DeployHostStackResponseSchema,
    type DeployLogsResponse,
    DeployLogsResponseSchema,
    type DeployOverviewResponse,
    DeployOverviewResponseSchema,
    type DeployResource,
} from "./contract";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { computed, type Ref } from "vue";
import { host } from "./host";

// One connection's board, a Komodo's or a computer's, via the extension's own routes (`komodo/…` or `device/…`): the
// browser never holds the Komodo API key or reaches a computer itself, which is why these routes exist. Read through `api.sandbox.query`, so the view draws its wait,
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
            DeployOverviewResponseSchema.parse(await api.backend.json(`${connectionRoutes(capability.value)}/overview`)),
        refetchInterval: POLL_MS,
    });
    const invalidate = (): Promise<void> => queryClient.invalidateQueries({ queryKey: queryKey.value });

    const act = useMutation({
        mutationFn: (input: { resource: DeployResource; action: DeployAction }) =>
            api.backend.json(
                `${connectionRoutes(capability.value)}/action`,
                post({ kind: input.resource.kind, id: input.resource.id, action: input.action }),
            ),
        // Execute returns as soon as accepted; the refetch may briefly show stale state until the next poll.
        onSuccess: invalidate,
    });

    // Binds a repo to a stack (empty `stack` unlinks); invalidates since the overview carries the link back.
    const link = useMutation({
        mutationFn: (input: { repo: string; stack: string }) => api.backend.json(`${connectionRoutes(capability.value)}/link`, post(input)),
        onSuccess: invalidate,
    });

    // Starts an isolated agent seeded with the resource and its logs; resolves to the conversation/card id.
    const fix = useMutation({
        mutationFn: async ({ resource, pick }: { resource: DeployResource; pick?: AgentRunChoice | undefined }): Promise<DeployFixResponse> =>
            DeployFixResponseSchema.parse(
                await api.backend.json(
                    `${connectionRoutes(capability.value)}/fix`,
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

    // Points a stack at a folder on a server's disk (created, or redeployed when it is already that folder's stack) and deploys it.
    const hostStack = useMutation({
        mutationFn: async (input: { server: string; folder: string; name?: string | undefined }): Promise<DeployHostStackResponse> =>
            DeployHostStackResponseSchema.parse(await api.backend.json(`komodo/${capability.value}/host-stack`, post(input))),
        onSuccess: invalidate,
    });

    // Device boards: packs the repo's committed tree and runs it there as `stack`. Answers once started; the overview's
    // `operations` says how it went, so it refetches at once to show it running.
    const deploy = useMutation({
        mutationFn: (input: { repo: string; stack: string }) => api.backend.json(`${connectionRoutes(capability.value)}/deploy`, post(input)),
        onSuccess: invalidate,
    });

    // Device boards: an agent turn that fills a stack's `.env` from stored secrets; resolves to its conversation id.
    const environment = useMutation({
        mutationFn: async (input: { stack: string; repo?: string | undefined; pick?: AgentRunChoice | undefined }): Promise<DeployFixResponse> =>
            DeployFixResponseSchema.parse(
                await api.backend.json(
                    `${connectionRoutes(capability.value)}/environment`,
                    post({ stack: input.stack, ...(input.repo === undefined ? {} : { repo: input.repo }), ...(input.pick === undefined ? {} : { pick: runPickOf(input.pick) }) }),
                ),
            ),
    });

    return {
        deploy,
        environment,
        // What the view has of the board, for <Await :of>: waiting (including while the sandbox wakes), ready, or failed.
        loaded,
        // The last answer, for what sits outside the awaited region (the title row's link, the strips).
        board: computed(() => query.data.value),
        refetch: query.refetch,
        act,
        link,
        fix,
        hostStack,
    };
}

// One resource's log tail, read only while its row is open and followed while it stays open.
export function useResourceLogs(capability: () => string, resource: () => DeployResource, open: () => boolean) {
    const api = host();
    const { loaded } = api.sandbox.query({
        queryKey: computed(() => api.sandbox.key(`komodo-logs`, capability(), resource().kind, resource().id)),
        queryFn: async (): Promise<DeployLogsResponse> =>
            DeployLogsResponseSchema.parse(
                await api.backend.json(`${connectionRoutes(capability())}/logs`, post({ kind: resource().kind, id: resource().id })),
            ),
        enabled: open,
        refetchInterval: LOG_POLL_MS,
    });
    return loaded;
}
