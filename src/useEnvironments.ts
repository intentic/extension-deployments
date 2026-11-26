import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import { type EnvironmentHistoryResponse, EnvironmentHistoryResponseSchema, type EnvironmentsOverview, EnvironmentsOverviewSchema } from "./contract";
import {
    DeployAnswerWireSchema,
    type DeployEnvironmentWire,
    type DeployRecordWire,
    ENVIRONMENT_PATHS,
    grantDeviceOf,
    readAnswer,
    refusalOf,
    STACK_GRANTS_PATHS,
    type StackGrantSetWire,
    StackGrantsWireSchema,
    type StackRefWire,
} from "./deploysWire";
import { host } from "./host";

// The managed environments on the board: read and pressed (deploy, roll back, promote) through this extension's
// backend, whose engine deploys them (src/server/engine/). A GRANT is the one press that goes straight to the daemon AS
// THE PERSON PRESSING, through `api.sandbox` (the manifest's `permissions.sandbox`): it is the owner's (or Full
// access's, or whoever holds the Secrets right), which no extension token can lift, so it is only ever a person's press.

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

// What a press on "Grant" asks the daemon for: the stack's ungranted names, on its device card; nothing when there is
// nothing to grant, or no computer the manifest's name resolves to.
export const grantOf = (environment: DeployEnvironmentWire): StackGrantSetWire | undefined =>
    environment.deviceId === undefined || environment.ungranted.length === 0
        ? undefined
        : { repo: environment.repo, stack: environment.stack, device: grantDeviceOf(environment.deviceId), secrets: [...environment.ungranted] };

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
        (await readAnswer(await api.backend.request(path, post(payload)), DeployAnswerWireSchema)).record;

    // The repository's committed HEAD; the engine queues it and answers its record at once.
    const deploy = useMutation({
        mutationFn: (ref: StackRefWire) => press(ENVIRONMENT_PATHS.deploy, { repo: ref.repo, stack: ref.stack }),
        onSuccess: invalidate,
    });
    // To the deploy before the current one, or to the record named.
    const rollback = useMutation({
        mutationFn: (input: StackRefWire & { readonly to?: string | undefined }) => press(ENVIRONMENT_PATHS.rollback, { repo: input.repo, stack: input.stack, to: input.to }),
        onSuccess: invalidate,
    });
    const promote = useMutation({
        mutationFn: (input: { readonly repo: string; readonly from: string; readonly to: string }) => press(ENVIRONMENT_PATHS.promote, input),
        onSuccess: invalidate,
    });
    // Exactly the names the stack reads and is not granted yet, on the computer its manifest names (its device card).
    const grant = useMutation({
        mutationFn: async (environment: DeployEnvironmentWire) => {
            const set = grantOf(environment);
            if (set === undefined) {
                throw new Error(`"${environment.device}" is not a computer paired with this sandbox, so there is nothing to grant it on yet.`);
            }
            return readAnswer(await api.sandbox.request(STACK_GRANTS_PATHS.grant, post({ ...set })), StackGrantsWireSchema);
        },
        onSuccess: invalidate,
    });
    // The grant taken back, on every name it held for the stack on that computer.
    const revoke = useMutation({
        mutationFn: async (environment: DeployEnvironmentWire) => {
            if (environment.deviceId === undefined) {
                throw new Error(`"${environment.device}" is not a computer paired with this sandbox, so it holds no grant here.`);
            }
            const ref = { repo: environment.repo, stack: environment.stack, device: grantDeviceOf(environment.deviceId) };
            const response = await api.sandbox.request(STACK_GRANTS_PATHS.revoke, post(ref));
            if (!response.ok) {
                throw refusalOf(response.status, await response.text());
            }
        },
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
        revoke,
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
