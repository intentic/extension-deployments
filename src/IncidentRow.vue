<script setup lang="ts">
import { AgentRunButton, formatTimestamp, Notice, noticeOf, Row, timeAgo, type AgentRunChoice, type ButtonTier, useAgentRunPick } from "@intentic/extension-ui";
import type { DeployResource } from "./contract";
import { host } from "./host";
import type { Incident } from "./incidents";
import { INCIDENT_ICON } from "./stateVisual";

// One open incident: what moved, where and when, and the button to put an agent on it. A component because each row's
// model pick must be independent in the parent's v-for. The button matters because it can choose what it spends; a
// shortcut that couldn't wouldn't save the trip to the board.

const { incident, resource, tier } = defineProps<{
    incident: Incident;
    // Alert's named resource, when it's on this board; absent means the line states the problem with no button.
    resource: DeployResource | undefined;
    failure: string | undefined;
    // The fix's tier: the step asked of the reader on a lone breakage, quiet when it repeats down a list of them.
    tier: ButtonTier;
}>();
const emit = defineEmits<{ fix: [resource: DeployResource, pick: AgentRunChoice | undefined] }>();

const fixModel = useAgentRunPick(() => host().models, `deployment-fix`);
const startFix = (): void => {
    if (resource !== undefined) {
        emit(`fix`, resource, fixModel.overridden.value ? fixModel.model.value : undefined);
        fixModel.clear();
    }
};
</script>

<template>
    <Row :icon="INCIDENT_ICON[incident.tone]" :tone="incident.tone">
        <!-- A slot, not the prop: the summary is the whole point of the row, so on a narrow pane it wraps rather than truncates. -->
        <template #title>{{ incident.summary }}</template>
        <template #description>
            <span v-tooltip.top="formatTimestamp(incident.alert.ts)">{{ timeAgo(incident.alert.ts) }}</span>
        </template>
        <template v-if="resource" #control>
            <AgentRunButton label="Ask the agent" icon="sparkles" size="small" :tier="tier" :picker="fixModel" @run="startFix" />
        </template>
        <template v-if="failure" #below>
            <Notice :of="noticeOf(failure)" />
        </template>
    </Row>
</template>
