<script setup lang="ts">
import {
    Await,
    Button,
    Code,
    ConfirmDialog,
    DisclosureRow,
    formatDuration,
    formatTimestamp,
    Icon,
    Notice,
    noticeOf,
    type NoticeModel,
    OverflowActions,
    type ActionItem,
    Section,
    SkeletonRows,
    StatusBadge,
    timeAgo,
    toneInk,
} from "@intentic/extension-ui";
import { computed, ref, watch } from "vue";
import type { DeployEnvironmentWire, DeployRecordWire } from "./deploysWire";
import { environmentState, HEALTH_WORDS, recordOrigin, recordSeconds, recordTime, shortCommit, triggersSummary } from "./environments";
import { OUTCOME_LOOK, STATE_LOOK, stateInk } from "./stateVisual";
import { useEnvironmentHistory } from "./useEnvironments";

// One managed environment: a stack its repository declares in .intentic/stacks.json, which this extension deploys and keeps.
// The lead glyph is its state on the computer (or that a deploy is going); the line says what it runs and since when;
// the control is the one step it asks for (grant its secrets, else deploy HEAD); the rest (roll back, promote, its
// history, what stops it deploying) is in the drawer and the ⋯.

const props = defineProps<{
    environment: DeployEnvironmentWire;
    // The other stacks its repository declares: what it can be promoted to.
    siblings: readonly DeployEnvironmentWire[];
    busy: boolean;
    // The last refusal of a press on this row, in the engine's or the daemon's words.
    error: string | undefined;
    // Whether the person looking may grant secrets: the owner or Full access. Anyone else sees what waits on the owner.
    canGrant: boolean;
    // Opened from a link that names this stack (`?repo=&stack=`).
    focused?: boolean;
}>();
const emit = defineEmits<{
    deploy: [environment: DeployEnvironmentWire];
    rollback: [environment: DeployEnvironmentWire, to: string | undefined];
    promote: [environment: DeployEnvironmentWire, to: string];
    grant: [environment: DeployEnvironmentWire];
    revoke: [environment: DeployEnvironmentWire];
}>();

const open = ref(props.focused === true);
watch(
    () => props.focused,
    (focused) => {
        if (focused === true) {
            open.value = true;
        }
    },
);
// A refusal lands in the drawer, so a press on a closed row opens it to say what went wrong.
watch(
    () => props.error,
    (error) => {
        if (error !== undefined) {
            open.value = true;
        }
    },
);

const state = computed(() => environmentState(props.environment));
const look = computed(() => STATE_LOOK[state.value]);
const current = computed(() => props.environment.current);
const active = computed(() => props.environment.active);
const ungranted = computed(() => props.environment.ungranted);
const blocked = computed(() => props.environment.ownedElsewhere);
const secretsWord = (count: number): string => `${count} ${count === 1 ? `secret` : `secrets`}`;

// What it runs, or what is going on: the deploy under way first, then the monitor's word and the commit it runs.
const status = computed(() => {
    const going = active.value;
    if (going !== undefined) {
        return going.outcome === `queued` ? `queued ${shortCommit(going.commit)}` : `deploying ${shortCommit(going.commit)}`;
    }
    return HEALTH_WORDS[props.environment.state];
});
const ranAt = computed(() => (current.value === undefined ? undefined : recordTime(current.value)));
const activeAt = computed(() => (active.value === undefined ? undefined : recordTime(active.value)));

// The newest attempt when it went wrong and is not what runs now: said in the drawer, and marked on the row.
const latestTrouble = computed<DeployRecordWire | undefined>(() => {
    const latest = props.environment.latest;
    if (latest === undefined || latest.id === current.value?.id || latest.id === active.value?.id) {
        return undefined;
    }
    return latest.outcome === `failed` || latest.outcome === `rolled-back` || latest.outcome === `refused` ? latest : undefined;
});

// What stops it, or what it should know, as the drawer's notices: worst first.
const notices = computed<NoticeModel[]>(() => {
    const list: NoticeModel[] = [];
    const environment = props.environment;
    if (environment.ownedElsewhere) {
        list.push({
            tone: `danger`,
            title: `Another sandbox owns ${environment.stack} on ${environment.deviceId ?? environment.device}`,
            detail: `This sandbox can read nothing of it there and deploy nothing to it. Rename the stack in the manifest, or remove it from the other sandbox first.`,
        });
    }
    const trouble = latestTrouble.value;
    if (trouble !== undefined) {
        const word = OUTCOME_LOOK[trouble.outcome].label;
        list.push({
            tone: trouble.outcome === `failed` ? `danger` : `warning`,
            title: `The last deploy (${shortCommit(trouble.commit)}) ${word === `refused` ? `was refused` : word}`,
            ...(trouble.error === undefined ? {} : { detail: trouble.error }),
        });
    }
    for (const problem of environment.problems) {
        list.push({ tone: `warning`, title: problem });
    }
    if (ungranted.value.length > 0) {
        list.push({
            tone: `warning`,
            title: `It reads ${secretsWord(ungranted.value.length)} the owner has not granted it: ${ungranted.value.join(`, `)}`,
            detail: props.canGrant
                ? `A deploy is refused until they are. Granting lets this stack, on this computer, receive exactly the secrets its manifest reads.`
                : `A deploy is refused until the owner grants them.`,
        });
    }
    if (environment.secretsChanged.length > 0) {
        list.push({
            tone: `info`,
            title: `${environment.secretsChanged.join(`, `)} changed since it last deployed`,
            detail: `What runs still has the old ${environment.secretsChanged.length === 1 ? `value` : `values`}: deploy again to apply.`,
            ...(blocked.value || ungranted.value.length > 0 ? {} : { action: { label: `Deploy`, run: () => emit(`deploy`, props.environment) } }),
        });
    }
    return list;
});

// The facts line in the drawer: where it runs, how it is built, and what deploys it by itself.
const facts = computed(() => {
    const environment = props.environment;
    const where = environment.deviceId ?? environment.device;
    return `Runs on ${where} · ${environment.mode === `build` ? `built there` : `pulls its images`} · ${triggersSummary(environment.triggers)}`;
});

// The row's one step: the owner's grant while one is missing, else a deploy of HEAD.
const grantable = computed(() => ungranted.value.length > 0 && props.canGrant && !blocked.value && props.environment.deviceId !== undefined);

// ⋯: going back, and forward to the next stack.
const actions = computed<ActionItem[]>(() => {
    const items: ActionItem[] = [];
    if (current.value !== undefined && !blocked.value) {
        items.push({
            id: `rollback`,
            label: `Roll back to the deploy before`,
            icon: `undo`,
            run: () => ask({ kind: `rollback`, to: undefined }),
        });
        for (const sibling of props.siblings) {
            items.push({
                id: `promote:${sibling.stack}`,
                label: `Promote to ${sibling.stack}`,
                icon: `arrow-up-right`,
                run: () => ask({ kind: `promote`, to: sibling }),
            });
        }
    }
    items.push({ id: `history`, label: open.value ? `Hide history` : `History`, icon: `history`, run: () => (open.value = !open.value) });
    // The owner's grant, taken back: only where one covers something.
    if (props.canGrant && props.environment.deviceId !== undefined && ungranted.value.length < props.environment.secrets.length) {
        items.push({ id: `revoke`, label: `Revoke its secrets`, icon: `key`, run: () => ask({ kind: `revoke` }) });
    }
    return items;
});

// One question at a time, asked before anything that changes what runs other than a plain deploy.
type Pending = { kind: `rollback`; to: DeployRecordWire | undefined } | { kind: `promote`; to: DeployEnvironmentWire } | { kind: `grant` } | { kind: `revoke` };
const pending = ref<Pending | undefined>(undefined);
const ask = (next: Pending): void => {
    pending.value = next;
};
const question = computed(() => {
    const next = pending.value;
    const environment = props.environment;
    if (next === undefined) {
        return undefined;
    }
    if (next.kind === `grant`) {
        return {
            header: `Grant ${environment.stack} ${secretsWord(ungranted.value.length)}?`,
            description: `${environment.repo}'s ${environment.stack}, on ${environment.deviceId ?? environment.device}, will receive ${ungranted.value.join(`, `)} at each deploy, filled into its .env there by this sandbox. Nothing else, and nowhere else.`,
            confirm: `Grant`,
            icon: `key` as const,
        };
    }
    if (next.kind === `revoke`) {
        const granted = environment.secrets.filter((name) => !ungranted.value.includes(name));
        return {
            header: `Stop ${environment.stack} receiving its secrets?`,
            description: `${environment.repo}'s ${environment.stack}, on ${environment.deviceId ?? environment.device}, no longer receives ${granted.join(`, `)}: its next deploy is refused until they are granted again. What runs there now keeps its .env.`,
            confirm: `Revoke`,
            icon: `key` as const,
        };
    }
    if (next.kind === `promote`) {
        return {
            header: `Promote to ${next.to.stack}?`,
            description: `${next.to.stack} on ${next.to.deviceId ?? next.to.device} is deployed at what ${environment.stack} runs now: ${current.value === undefined ? `its commit` : shortCommit(current.value.commit)}, with the same images by digest.`,
            confirm: `Promote`,
            icon: `arrow-up-right` as const,
        };
    }
    const target = next.to;
    return {
        header: `Roll ${environment.stack} back?`,
        description:
            target === undefined
                ? `It is deployed again at its successful deploy before the current one, with the images that deploy ran.`
                : `It is deployed again at ${shortCommit(target.commit)} (${target.id}), with the images that deploy ran.`,
        confirm: `Roll back`,
        icon: `undo` as const,
    };
});
const confirm = (): void => {
    const next = pending.value;
    pending.value = undefined;
    if (next?.kind === `grant`) {
        emit(`grant`, props.environment);
    } else if (next?.kind === `revoke`) {
        emit(`revoke`, props.environment);
    } else if (next?.kind === `promote`) {
        emit(`promote`, props.environment, next.to.stack);
    } else if (next?.kind === `rollback`) {
        emit(`rollback`, props.environment, next.to?.id);
    }
};

// The history, read only while the drawer is open.
const history = useEnvironmentHistory(
    () => ({ repo: props.environment.repo, stack: props.environment.stack }),
    () => open.value,
);
const secondsOf = (record: DeployRecordWire): string | undefined => {
    const seconds = recordSeconds(record);
    return seconds === undefined ? undefined : formatDuration(seconds);
};
// A record worth going back to: one that came up, other than what runs now.
const restorable = (record: DeployRecordWire): boolean => record.outcome === `succeeded` && record.id !== current.value?.id && !blocked.value;
</script>

<template>
    <DisclosureRow body="drawer" v-model:open="open">
        <template #lead="{ iconClass }">
            <Icon :name="look.icon" :spin="look.spin" class="shrink-0" :class="[iconClass, stateInk(state)]" />
        </template>

        <template #title>
            <span class="flex min-w-0 items-center gap-2">
                <span class="truncate">{{ environment.stack }}</span>
                <StatusBadge v-if="environment.ownedElsewhere" variant="danger" size="xs" label="owned elsewhere" class="shrink-0" />
                <StatusBadge v-else-if="latestTrouble" :variant="OUTCOME_LOOK[latestTrouble.outcome].tone" size="xs" :label="`last deploy ${OUTCOME_LOOK[latestTrouble.outcome].label}`" class="shrink-0" />
                <StatusBadge v-if="environment.secretsChanged.length > 0" variant="info" size="xs" label="secrets changed" class="shrink-0" />
            </span>
        </template>

        <template #description>
            <span class="flex min-w-0 items-center gap-x-2">
                <span class="shrink-0">{{ status }}</span>
                <template v-if="active === undefined && current">
                    <span class="shrink-0 font-mono">{{ shortCommit(current.commit) }}</span>
                    <span v-if="ranAt !== undefined" class="shrink-0" v-tooltip.top="formatTimestamp(ranAt)">{{ timeAgo(ranAt) }}</span>
                </template>
                <span v-else-if="active && activeAt !== undefined" class="shrink-0" v-tooltip.top="formatTimestamp(activeAt)">{{ timeAgo(activeAt) }}</span>
                <span v-else-if="!current" class="shrink-0 text-subtle/70">never deployed from here</span>
                <span class="min-w-0 truncate text-subtle/70">{{ environment.repo }}</span>
            </span>
        </template>

        <template #control>
            <div class="flex shrink-0 items-center gap-1">
                <Button
                    v-if="grantable"
                    :label="`Grant ${secretsWord(ungranted.length)}`"
                    icon="key"
                    size="small"
                    tier="boring"
                    :loading="busy"
                    :disabled="busy"
                    @click="ask({ kind: `grant` })"
                />
                <StatusBadge v-else-if="ungranted.length > 0" variant="warning" size="xs" :label="`${secretsWord(ungranted.length)} not granted`" />
                <Button
                    v-else
                    label="Deploy"
                    size="small"
                    tier="quiet"
                    :loading="busy"
                    :disabled="busy || blocked"
                    v-tooltip.top="{ title: `Deploys its repository's last commit` }"
                    @click="emit(`deploy`, environment)"
                />
                <OverflowActions :actions="actions" :header="environment.stack" />
            </div>
        </template>

        <template #below>
            <div class="flex flex-col gap-4">
                <Notice v-if="error" :of="noticeOf(error)" />
                <Notice v-for="notice in notices" :key="notice.title" :of="notice" />

                <p class="text-xs text-muted">{{ facts }}</p>

                <!-- What compose and the hooks printed for the attempt that went wrong, when it kept any. -->
                <Code
                    v-if="latestTrouble?.outputTail"
                    :code="latestTrouble.outputTail"
                    lang="log"
                    label="Deploy output"
                    :scroll-lines="10"
                    scroll-bottom
                    tail
                />

                <Section label="History">
                    <Await :of="history" :imprint="`deployments.history:${environment.repo}:${environment.stack}`" label="Reading its deploys">
                        <template #fallback>
                            <SkeletonRows :rows="3" lead description />
                        </template>
                        <template #default="{ data }">
                            <p v-if="data.records.length === 0" class="text-xs text-muted">Not deployed from this sandbox yet.</p>
                            <ul v-else class="flex flex-col divide-y divide-line">
                                <li v-for="record in data.records" :key="record.id" class="flex min-w-0 flex-col gap-1 py-2 text-xs">
                                    <div class="flex min-w-0 items-center gap-2">
                                        <Icon
                                            :name="OUTCOME_LOOK[record.outcome].icon"
                                            :spin="OUTCOME_LOOK[record.outcome].spin"
                                            class="shrink-0"
                                            :class="toneInk(OUTCOME_LOOK[record.outcome].tone)"
                                        />
                                        <span class="shrink-0 font-mono text-content" v-tooltip.top="record.commit">{{ shortCommit(record.commit) }}</span>
                                        <span class="shrink-0 text-muted">{{ OUTCOME_LOOK[record.outcome].label }}</span>
                                        <span class="min-w-0 truncate text-subtle" v-tooltip.top="recordOrigin(record)">{{ recordOrigin(record) }}</span>
                                        <span class="ml-auto flex shrink-0 items-center gap-2 text-subtle">
                                            <span v-if="secondsOf(record)">{{ secondsOf(record) }}</span>
                                            <span v-if="recordTime(record) !== undefined" v-tooltip.top="formatTimestamp(recordTime(record) ?? 0)">{{ timeAgo(recordTime(record) ?? 0) }}</span>
                                            <a v-if="record.trigger.url" :href="record.trigger.url" target="_blank" rel="noopener" class="hover:text-content" v-tooltip.top="{ title: `What started it` }">
                                                <Icon name="external-link" />
                                            </a>
                                            <a v-if="record.forgeUrl" :href="record.forgeUrl" target="_blank" rel="noopener" class="hover:text-content" v-tooltip.top="{ title: `On the forge` }">
                                                <Icon name="arrow-up-right" />
                                            </a>
                                            <Button v-if="restorable(record)" label="Roll back to this" size="small" tier="quiet" :disabled="busy" @click="ask({ kind: `rollback`, to: record })" />
                                        </span>
                                    </div>
                                    <p v-if="record.error" class="line-clamp-3 text-muted" v-tooltip.top="record.error">{{ record.error }}</p>
                                </li>
                            </ul>
                        </template>
                    </Await>
                </Section>
            </div>
        </template>
    </DisclosureRow>
    <!-- Outside the drawer: the ⋯ and the grant ask from a closed row too. -->
    <ConfirmDialog
        :open="question !== undefined"
        :header="question?.header ?? ``"
        :description="question?.description"
        :confirm-label="question?.confirm ?? ``"
        :confirm-icon="question?.icon"
        @cancel="pending = undefined"
        @confirm="confirm"
    />
</template>
