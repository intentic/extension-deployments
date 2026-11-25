import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import { type EnvironmentHistoryResponse, EnvironmentHistoryResponseSchema, type EnvironmentsOverview, EnvironmentsOverviewSchema } from "./contract";
import {
    DeployAnswerWireSchema,
    DeployGrantsWireSchema,
    type DeployRecordWire,
    DEPLOYS_PATHS,
    readDeploys,
    type StackRefWire,
} from "./deploysWire";
import { host } from "./host";

// The managed environments on the board: read through this extension's backend (which says "update this sandbox" for
// one that predates them, and only when a repository here declares stacks), and pressed straight at the daemon AS THE
// PERSON PRESSING, through `api.sandbox` (the manifest's `permissions.sandbox`): the deploy's record names them, and
// the daemon holds them to their own role. A grant above all: it is the owner's (or Full access's, or whoever holds the
// Secrets right), which no extension token can lift, so it is only ever a person's press here.

// Polls fast while something is deploying, so its row moves when it lands; slowly otherwise.
const POLL_MS = 15_000;
const ACTIVE_POLL_MS = 4_000;
const HISTORY_POLL_MS = 10_000;
const HISTORY_LIMIT = 25;

const post = (payload: Readonly<Record<string, unknown>>): RequestInit => ({
    method: `POST`,
    headers: { "content-type": `application/json` },
    body: JSON.stringify(Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined))),
});

export function useEnvironments(enabled: () => boolean) {
    const api = host();
    const queryClient = useQueryClient();
    const queryKey = computed(() => api.sandbox.key(`deploy-environments`));

    const { query, loaded } = api.sandbox.query({
        queryKey,
        queryFn: async (): Promise<EnvironmentsOverview> => EnvironmentsOverviewSchema.parse(await api.backend.json(`environments`)),
        enabled,
        refetchInterval: (entry) => (entry.state.data?.environments.some((environment) => environment.active !== undefined) === true ? ACTIVE_POLL_MS : POLL_MS),
    });
    // History rows belong to the same stacks, so a press refreshes them too.
    const invalidate = (): Promise<void> => queryClient.invalidateQueries({ queryKey: api.sandbox.key(`deploy-environments`) });

    const press = async (path: string, payload: Readonly<Record<string, unknown>>): Promise<DeployRecordWire> =>
        (await readDeploys(await api.sandbox.request(path, post(payload)), DeployAnswerWireSchema)).record;

    // The repository's committed HEAD; the daemon queues it and answers its record at once.
    const deploy = useMutation({
        mutationFn: (ref: StackRefWire) => press(DEPLOYS_PATHS.deploy, { repo: ref.repo, stack: ref.stack }),
        onSuccess: invalidate,
    });
    // To the deploy before the current one, or to the record named.
    const rollback = useMutation({
        mutationFn: (input: StackRefWire & { readonly to?: string | undefined }) => press(DEPLOYS_PATHS.rollback, { repo: input.repo, stack: input.stack, to: input.to }),
        onSuccess: invalidate,
    });
    const promote = useMutation({
        mutationFn: (input: { readonly repo: string; readonly from: string; readonly to: string }) => press(DEPLOYS_PATHS.promote, input),
        onSuccess: invalidate,
    });
    // Exactly the secrets the stack's manifest reads at HEAD, on the computer it names.
    const grant = useMutation({
        mutationFn: async (ref: StackRefWire) => readDeploys(await api.sandbox.request(DEPLOYS_PATHS.grant, post({ repo: ref.repo, stack: ref.stack })), DeployGrantsWireSchema),
        onSuccess: invalidate,
    });

    return {
        loaded,
        overview: computed(() => query.data.value),
        refetch: query.refetch,
        deploy,
        rollback,
        promote,
        grant,
    };
}

// One stack's deploys, read only while its row is open and followed while it stays open.
export function useEnvironmentHistory(ref: () => StackRefWire, open: () => boolean) {
    const api = host();
    const { loaded } = api.sandbox.query({
        // Under the environments' key, so a press that invalidates them refreshes an open history as well.
        queryKey: computed(() => [...api.sandbox.key(`deploy-environments`), `history`, ref().repo, ref().stack]),
        queryFn: async (): Promise<EnvironmentHistoryResponse> => {
            const query = new URLSearchParams({ repo: ref().repo, stack: ref().stack, limit: String(HISTORY_LIMIT) });
            return EnvironmentHistoryResponseSchema.parse(await api.backend.json(`environments/history?${query.toString()}`));
        },
        enabled: open,
        refetchInterval: HISTORY_POLL_MS,
    });
    return loaded;
}
