<script setup lang="ts">
import type { DeployAction, DeployResource } from "./contract";
import {
    AgentRunButton,
    Await,
    Button,
    Code,
    ConfirmDialog,
    DisclosureRow,
    Icon,
    Notice,
    noticeOf,
    Section,
    StatusBadge,
    type AgentRunChoice,
    useAgentRunPick,
} from "@intentic/extension-ui";
import { host } from "./host";
import KomodoLink from "./KomodoLink.vue";
import { computed, ref, watch } from "vue";
import { imageLabel, STATE_LOOK, stateInk } from "./stateVisual";
import { useResourceLogs } from "./useDeploymentBoard";

// One row for both a deployment and a stack, so an operator scanning for what's down sees one list. The lead glyph and
// its tone carry the state; the row's verbs are the two a state calls for (bring it up to date or redeploy it; restart
// it or start it), and the drawer holds the rest: the stack's services, the agent, Stop, and the live log tail.

const props = defineProps<{
    capability: string;
    resource: DeployResource;
    busy: boolean;
    // Last failure from an action on this row, shown here rather than a page banner.
    error: string | undefined;
}>();
const emit = defineEmits<{
    act: [resource: DeployResource, action: DeployAction];
    fix: [resource: DeployResource, pick: AgentRunChoice | undefined];
}>();

// Model this row's fix will spend; asked of the host so the button and the daemon can't disagree.
const fixModel = useAgentRunPick(() => host().models, `deployment-fix`);
const startFix = (): void => {
    emit(`fix`, props.resource, fixModel.overridden.value ? fixModel.model.value : undefined);
    fixModel.clear();
};

const look = computed(() => STATE_LOOK[props.resource.state]);
const open = ref(false);

// A refusal lands in the drawer, so a press on a closed row opens it to say what went wrong, with the log beside it.
watch(
    () => props.error,
    (error) => {
        if (error !== undefined) {
            open.value = true;
        }
    },
);

// Read only while open, and followed while it stays open; closing stops the reads.
const logs = useResourceLogs(
    () => props.capability,
    () => props.resource,
    () => open.value,
);
const logText = (log: { stdout: string; stderr: string }): string =>
    [log.stdout, log.stderr].filter((part) => part.trim() !== ``).join(`\n`);

// Row's primary verb: `pull` wins over `deploy` whenever a newer image exists, since Redeploy would otherwise quietly
// ship the image already running. Nothing while mid-deploy, since the state is about to change on its own.
const primary = computed<{ action: DeployAction; label: string } | undefined>(() => {
    if (props.resource.state === `deploying`) {
        return undefined;
    }
    if (props.resource.updateAvailable) {
        return { action: `pull`, label: `Update` };
    }
    return { action: `deploy`, label: `Redeploy` };
});

// The recovery verb beside it: bring it back if it is down, bounce it if it is up.
const secondary = computed<{ action: DeployAction; label: string } | undefined>(() => {
    if (props.resource.state === `running` || props.resource.state === `unhealthy`) {
        return { action: `restart`, label: `Restart` };
    }
    return props.resource.state === `stopped` ? { action: `start`, label: `Start` } : undefined;
});

// A stack says so, with how many services it runs; a deployment's image already says what it is, so it says nothing more.
const stackNote = computed(() => {
    if (props.resource.kind !== `stack`) {
        return undefined;
    }
    const count = props.resource.services.length;
    return count === 0 ? `Stack` : `Stack · ${count} ${count === 1 ? `service` : `services`}`;
});

// Stopping takes a running service down, so it asks first; the question names what goes down.
const confirmingStop = ref(false);
const stop = (): void => {
    confirmingStop.value = false;
    emit(`act`, props.resource, `stop`);
};
</script>

<template>
    <DisclosureRow body="drawer" v-model:open="open">
        <template #lead="{ iconClass }">
            <Icon :name="look.icon" :spin="look.spin" class="shrink-0" :class="[iconClass, stateInk(resource.state)]" />
        </template>

        <template #title>
            <span class="flex min-w-0 items-center gap-2">
                <span class="truncate">{{ resource.name }}</span>
                <StatusBadge v-if="resource.updateAvailable" variant="info" size="xs" label="new image" class="shrink-0" />
            </span>
        </template>

        <template #description>
            <span class="flex min-w-0 items-center gap-x-2">
                <span class="shrink-0">{{ resource.status ?? look.label }}</span>
                <span v-if="stackNote" class="shrink-0 text-subtle/70">{{ stackNote }}</span>
                <span v-if="resource.image" class="min-w-0 truncate font-mono" v-tooltip.top="resource.image">{{ imageLabel(resource.image) }}</span>
            </span>
        </template>

        <template #control>
            <div class="flex shrink-0 items-center gap-1">
                <Button
                    v-if="primary"
                    :label="primary.label"
                    size="small"
                    tier="quiet"
                    :loading="busy"
                    :disabled="busy"
                    @click="emit(`act`, resource, primary.action)"
                />
                <Button
                    v-if="secondary"
                    :label="secondary.label"
                    size="small"
                    tier="quiet"
                    :disabled="busy"
                    @click="emit(`act`, resource, secondary.action)"
                />
                <KomodoLink :href="resource.url" :name="resource.name" />
            </div>
        </template>

        <template #below>
            <div class="flex flex-col gap-4">
                <!-- Whatever Komodo refused, at the row that asked. -->
                <Notice v-if="error" :of="noticeOf(error)" />

                <!-- The one thing this surface can do that Komodo's own UI cannot: put an agent on it with the repo that
                     holds the bug already open. The step asked of the reader only when the resource is unhealthy. -->
                <div class="flex flex-wrap items-center gap-2">
                    <AgentRunButton
                        label="Ask the agent to fix"
                        icon="sparkles"
                        size="small"
                        :tier="resource.state === `unhealthy` ? `accent` : `boring`"
                        :picker="fixModel"
                        :loading="busy"
                        :disabled="busy"
                        @run="startFix"
                    />
                    <Button
                        v-if="resource.state !== `stopped`"
                        label="Stop"
                        size="small"
                        tier="quiet"
                        tone="danger"
                        :disabled="busy"
                        @click="confirmingStop = true"
                    />
                </div>

                <!-- Services ride the list response already, no extra call; the image's long registry prefix moves to its tooltip. -->
                <Section v-if="resource.services.length > 0" label="Services" class="@container">
                    <div class="grid gap-x-6 gap-y-1 @lg:grid-cols-2">
                        <div v-for="service in resource.services" :key="service.name" class="flex min-w-0 items-baseline gap-2 text-xs">
                            <span class="shrink-0 font-medium text-content">{{ service.name }}</span>
                            <span class="truncate font-mono text-subtle" v-tooltip.top="service.image">{{ imageLabel(service.image) }}</span>
                            <Icon v-if="service.updateAvailable" name="arrow-circle-up" class="shrink-0 text-info" v-tooltip.top="`Newer image`" />
                        </div>
                    </div>
                </Section>

                <Await :of="logs" label="Reading the log">
                    <template #fallback>
                        <!-- Shaped like the log block it stands in for, so nothing below jumps when the tail lands. -->
                        <div class="flex flex-col gap-1.5 rounded-md border border-line bg-canvas px-3 py-2.5" role="status" aria-busy="true">
                            <span v-for="width in [`w-11/12`, `w-3/5`, `w-3/4`, `w-2/5`, `w-5/6`]" :key="width" class="skeleton h-2.5" :class="width"></span>
                        </div>
                    </template>
                    <template #default="{ data }">
                        <Code
                            v-if="logText(data) !== ``"
                            :code="logText(data)"
                            lang="log"
                            label="Container log"
                            :scroll-lines="14"
                            scroll-bottom
                            tail
                        />
                        <p v-else class="text-xs text-muted">No log output yet.</p>
                    </template>
                </Await>
            </div>

            <ConfirmDialog
                :open="confirmingStop"
                :header="`Stop ${resource.name}?`"
                description="It stays down until someone starts it again, here or in Komodo."
                confirm-label="Stop"
                confirm-icon="stop"
                @cancel="confirmingStop = false"
                @confirm="stop"
            />
        </template>
    </DisclosureRow>
</template>
