<script setup lang="ts">
import { errorMessage } from "@intentic/base/errors";
import type { DeployAction, DeployResource, DeployServer } from "./contract";
import { host } from "./host.js";
import {
    Await,
    Notice,
    noticeOf,
    type NoticeModel,
    PageAction,
    ProjectChip,
    Row,
    RowGroup,
    SkeletonRows,
    SplitView,
    StatusTally,
    type AgentRunChoice,
    type TallyItem,
    ui,
} from "@intentic/extension-ui";
import { computed, onBeforeUnmount, onMounted, ref, toRef } from "vue";
import { markDeploymentsSeen } from "./attention";
import { incidents, topTier } from "./incidents";
import IncidentRow from "./IncidentRow.vue";
import KomodoLink from "./KomodoLink.vue";
import RepoLinkRow from "./RepoLinkRow.vue";
import ResourceRow from "./ResourceRow.vue";
import ServerMeta from "./ServerMeta.vue";
import { useDeploymentBoard } from "./useDeploymentBoard";

// Is what's running healthy, and what changed: a different question from Live status's drift-against-declared-state;
// gated on the Komodo connection rather than a repo. Reading order is worst-first:
// 1. what needs you, as its own group headed in its state's ink
// 2. one tally on the title row
// 3. resources grouped by host
// 4. the repo → stack links (setup, not operations)

const props = defineProps<{ capability?: string }>();
// Rail passes the capability id via props; a directly-mounted view with none falls back to the default id.
const capability = computed(() => props.capability ?? `komodo`);
const { loaded, board, act, link, fix, refetch } = useDeploymentBoard(toRef(capability));

// Opening the view counts as reading it; only on mount, or a background poll would swallow a new breakage.
onMounted(() => void markDeploymentsSeen(capability.value));

const open = computed(() => topTier(incidents(board.value?.alerts ?? [])));
// topTier returns one tier; undefined when nothing is open, which also hides the group.
const worst = computed(() => open.value[0]?.tone);
// A group that IS a state heads itself in that state's ink; an image update is news, not a breakage, so it stays neutral.
const openLabel = computed(() => (worst.value === `info` ? `Updates available` : `Needs you`));
const openTone = computed(() => (worst.value === `danger` || worst.value === `warning` ? worst.value : undefined));
// The fix is the step asked of the reader on a lone breakage; repeated down a list of them it is quiet.
const fixTier = computed(() => (worst.value === `danger` && open.value.length === 1 ? `accent` : `quiet`));

const resources = computed(() => board.value?.resources ?? []);
const servers = computed(() => board.value?.servers ?? []);
// The open project's repositories only (api.workspace.inProject): the board comes from the Komodo routes, not from
// repos(), so the view narrows its repo rows itself and says on its chip how many it put out of sight.
const api = host();
const allRepos = computed(() => board.value?.repos ?? []);
const repos = computed(() => allRepos.value.filter((entry) => api.workspace.inProject(entry.repo)));
const projectHidden = computed(() => allRepos.value.length - repos.value.length);
const stackNames = computed(() => resources.value.filter((resource) => resource.kind === `stack`).map((resource) => resource.name));

// Links to Komodo's stacks list: the level this view is really about, same route family as each row's link.
const stacksUrl = computed(() => (board.value === undefined ? undefined : `${board.value.komodoUrl}/stacks`));

// Empty resources doesn't mean an empty Komodo: a permission-less key gets an empty array from Komodo too. `viewer`
// absent might just mean an older daemon, so that gets its own case rather than assuming emptiness. The two that are a
// key's problem are a notice with what to change; a Komodo that really is empty is the list's own empty state.
const emptyReason = computed<{ readonly notice?: NoticeModel; readonly empty?: string } | undefined>(() => {
    if (resources.value.length > 0 || board.value === undefined || !board.value.reachable) {
        return undefined;
    }
    const viewer = board.value.viewer;
    if (viewer === undefined) {
        return {
            notice: {
                tone: `warning`,
                title: `Komodo returned nothing`,
                detail:
                    `If you expect stacks or deployments here, the API key's user most likely has no permissions on them: Komodo ` +
                    `answers every list with nothing rather than refusing. Check that user in Komodo, or use a key made on an admin account.`,
            },
        };
    }
    if (!viewer.admin) {
        return {
            notice: {
                tone: `warning`,
                title: `This API key can't see anything in Komodo`,
                detail:
                    `The key acts as "${viewer.username}", which is not an admin and has no permissions on any resource. Grant that ` +
                    `user access in Komodo (Settings → Users → ${viewer.username}), or replace the key with one made on an admin account.`,
            },
        };
    }
    return { empty: `Komodo has no stacks or deployments yet. Once you add one there, it appears here.` };
});

// Orientation tally: `running` always shows, even at zero, since an entirely silent tally reads as broken; the other
// three stay hidden until there's something to say.
const counts = computed<TallyItem[]>(() => {
    const tally = { running: 0, stopped: 0, unhealthy: 0, updates: 0 };
    for (const resource of resources.value) {
        if (resource.state === `running`) {
            tally.running++;
        } else if (resource.state === `unhealthy`) {
            tally.unhealthy++;
        } else if (resource.state === `stopped`) {
            tally.stopped++;
        }
        if (resource.updateAvailable) {
            tally.updates++;
        }
    }
    return [
        { label: `unhealthy`, value: tally.unhealthy, variant: `danger` },
        { label: `running`, value: tally.running, variant: `success`, always: true },
        { label: `stopped`, value: tally.stopped, variant: `neutral` },
        { label: tally.updates === 1 ? `update available` : `updates available`, value: tally.updates, variant: `info` },
    ];
});

// Host groups, then anything Komodo hasn't placed; an unknown-server resource must still appear on the board.
const UNPLACED = `Not on a server`;
interface ServerGroup {
    readonly label: string;
    readonly server: DeployServer | undefined;
    readonly resources: readonly DeployResource[];
}

const groups = computed<ServerGroup[]>(() => {
    const byServer = new Map<string, DeployResource[]>();
    for (const resource of resources.value) {
        const key = resource.server ?? UNPLACED;
        byServer.set(key, [...(byServer.get(key) ?? []), resource]);
    }
    const known = new Set(servers.value.map((server) => server.name));
    return [
        ...servers.value.map((server) => ({ label: server.name, server, resources: byServer.get(server.name) ?? [] })),
        ...[...byServer.entries()].filter(([name]) => !known.has(name)).map(([name, list]) => ({ label: name, server: undefined, resources: list })),
    ];
});

// An empty host gets one row, not a group of its own, or several empty hosts read as walls of "nothing deployed".
const carrying = computed(() => groups.value.filter((group) => group.resources.length > 0));
const idle = computed(() => groups.value.flatMap((group) => (group.resources.length === 0 && group.server !== undefined ? [group.server] : [])));

// What the title row's strips say: a poll that failed under a board still shown, and a Komodo that didn't answer. The
// latter is a warning, not an error: not seeing Komodo isn't the same as it being down, and red would cry wolf on every blip.
const strips = computed<NoticeModel[]>(() => {
    const notices: NoticeModel[] = [];
    if (loaded.value.state === `ready` && loaded.value.refreshError !== undefined) {
        notices.push(noticeOf(loaded.value.refreshError));
    }
    if (board.value !== undefined && !board.value.reachable) {
        notices.push({
            tone: `warning`,
            title: `Can't reach Komodo at ${board.value.komodoUrl}`,
            detail: board.value.unreachableReason ?? `Nothing here is current. This is not a report that your deployments are down, only that we couldn't ask.`,
            action: { label: `Try again`, run: () => void refetch() },
        });
    }
    return notices;
});

// Row currently mid-action; its buttons disable without freezing the rest of the board.
const busyId = ref<string | undefined>(undefined);

// Failures keyed by what failed (resource id, repo dir, incident id) so each shows at the row that caused it, not as a
// page-wide banner. Komodo's own refusal reaches the operator via the daemon's BAD_GATEWAY passthrough.
const failures = ref(new Map<string, string>());
const clearFailure = (key: string): void => {
    const next = new Map(failures.value);
    next.delete(key);
    failures.value = next;
};
const recordFailure = (key: string, cause: unknown): void => {
    failures.value = new Map(failures.value).set(key, errorMessage(cause));
};

const runAction = async (resource: DeployResource, action: DeployAction): Promise<void> => {
    busyId.value = resource.id;
    clearFailure(resource.id);
    try {
        await act.mutateAsync({ resource, action });
    } catch (cause) {
        recordFailure(resource.id, cause);
    } finally {
        busyId.value = undefined;
    }
};

// The board was left while a fix was starting: its answer then starts the agent without pulling the reader back here.
let left = false;
onBeforeUnmount(() => {
    left = true;
});

// `key` is where the failure lands: the row if the press came from the board, the incident if from the group above it.
const askAgent = async (resource: DeployResource, key: string, pick?: AgentRunChoice | undefined): Promise<void> => {
    busyId.value = resource.id;
    clearFailure(key);
    try {
        const { conversationId } = await fix.mutateAsync({ resource, pick });
        // The conversation id is the fleet card id, so this lands the board on the card that just started.
        if (!left) {
            api.navigate(`/agents?focus=${encodeURIComponent(conversationId)}`);
        }
    } catch (cause) {
        recordFailure(key, cause);
    } finally {
        busyId.value = undefined;
    }
};

// Resolves the alert's named resource, when it's on the board, for the incident's fix button.
const resourceFor = (name: string | undefined): DeployResource | undefined =>
    name === undefined ? undefined : resources.value.find((resource) => resource.name === name);

const linking = ref<string | undefined>(undefined);
const setLink = async (repo: string, stack: string): Promise<void> => {
    linking.value = repo;
    clearFailure(repo);
    try {
        await link.mutateAsync({ repo, stack });
    } catch (cause) {
        recordFailure(repo, cause);
    } finally {
        linking.value = undefined;
    }
};
</script>

<template>
    <!-- `scroll="page"`: a report read top-down, with nothing beside it worth keeping a place in. -->
    <SplitView title="Deployments" scroll="page" :scroll-key="capability">
        <template #info>
            <!-- Not drawn from guesses while the first read is in flight: "0 running" would be a claim the list is about to
                 contradict. Absent for a board that never answered, which its body says. -->
            <Await v-if="loaded.state !== `failed`" :of="loaded" imprint="deployments.tally">
                <StatusTally v-if="board?.reachable && resources.length > 0" :items="counts" class="ml-2" />
                <template #fallback><StatusTally :skeleton="2" class="ml-2" /></template>
            </Await>
        </template>

        <template #actions>
            <!-- The open project, and the way out of it: the same scope every other area narrows by. -->
            <ProjectChip :project="api.workspace.project()" :hidden="projectHidden" noun="repositories" @clear="api.workspace.setProject(undefined)" />
            <PageAction v-if="stacksUrl !== undefined" icon="box" label="Open Komodo stacks" :href="stacksUrl" />
        </template>

        <template v-if="strips.length > 0" #strips>
            <Notice v-for="notice in strips" :key="notice.title" :of="notice" />
        </template>

        <template #detail>
            <!-- Also covers the window before the sandbox handshake unblocks the read; a read that failed outright says so
                 here in the kit's words, with its retry. -->
            <Await :of="loaded" imprint="deployments.board" label="Reading this Komodo">
                <template #fallback>
                    <RowGroup role="status" aria-busy="true">
                        <template #label><span class="skeleton block h-2.5 w-28" aria-hidden="true" /></template>
                        <SkeletonRows :rows="4" lead description control />
                    </RowGroup>
                </template>

                <div class="flex flex-col gap-6">
                    <!-- 1. Only when something is open: its own group, first, headed in the state it reports. -->
                    <RowGroup v-if="worst" :label="openLabel" :tone="openTone">
                        <IncidentRow
                            v-for="incident in open"
                            :key="incident.alert.id"
                            :incident="incident"
                            :resource="resourceFor(incident.alert.resource)"
                            :failure="failures.get(incident.alert.id)"
                            :tier="fixTier"
                            @fix="(resource, pick) => askAgent(resource, incident.alert.id, pick)"
                        />
                    </RowGroup>

                    <Notice v-if="emptyReason?.notice" :of="emptyReason.notice" />
                    <p v-else-if="emptyReason?.empty" :class="ui.emptyState(`py-6`)">{{ emptyReason.empty }}</p>

                    <!-- 3. Grouped by host, each headed by its name and its figures. -->
                    <RowGroup v-for="group in carrying" :key="group.label" :label="group.label">
                        <template v-if="group.server" #info>
                            <ServerMeta :server="group.server" />
                        </template>
                        <template v-if="group.server" #actions>
                            <KomodoLink :href="group.server.url" :name="group.server.name" />
                        </template>

                        <ResourceRow
                            v-for="resource in group.resources"
                            :key="resource.id"
                            :capability="capability"
                            :resource="resource"
                            :busy="busyId === resource.id"
                            :error="failures.get(resource.id)"
                            @act="runAction"
                            @fix="(resource, pick) => askAgent(resource, resource.id, pick)"
                        />
                    </RowGroup>

                    <!-- Empty hosts: one shared list, still carrying the state and figures that make an empty box worth knowing. -->
                    <RowGroup v-if="idle.length > 0" label="Hosts with nothing deployed">
                        <Row v-for="server in idle" :key="server.id" icon="server" :title="server.name">
                            <template #control>
                                <div class="flex shrink-0 items-center gap-2">
                                    <ServerMeta :server="server" />
                                    <KomodoLink :href="server.url" :name="server.name" />
                                </div>
                            </template>
                        </Row>
                    </RowGroup>

                    <!-- 4. Setup, not operations; still drawn with no resources, since that's when linking matters most. -->
                    <RowGroup v-if="repos.length > 0" label="Repositories">
                        <RepoLinkRow
                            v-for="repoLink in repos"
                            :key="repoLink.repo"
                            :link="repoLink"
                            :stacks="stackNames"
                            :busy="linking === repoLink.repo"
                            :error="failures.get(repoLink.repo)"
                            @link="setLink"
                        />
                    </RowGroup>
                </div>
            </Await>
        </template>
    </SplitView>
</template>
