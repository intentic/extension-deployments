<script setup lang="ts">
import { Button, formatTimestamp, Notice, noticeOf, Row, StatusBadge, timeAgo } from "@intentic/extension-ui";
import { computed } from "vue";
import type { DeployOperation, DeployRepoLink } from "./contract";

// One workspace repo with a compose file, on a computer's board: where it is deployed there, how the last deploy went,
// and the press that deploys it. No picker of stacks, unlike the Komodo board's row: here a deploy IS the link, since
// the stack is made from the repo rather than found already running somewhere.

const props = defineProps<{
    link: DeployRepoLink;
    // This repo's newest deploy started from this board, if any.
    operation: DeployOperation | undefined;
    busy: boolean;
    error: string | undefined;
}>();
const emit = defineEmits<{ deploy: [link: DeployRepoLink] }>();

const running = computed(() => props.operation !== undefined && props.operation.finishedAt === undefined);
const failed = computed(() => props.operation?.error);

// Where it goes, then where the compose file is: the stack name is what the reader looks for on the board above.
const description = computed(() => {
    const file = props.link.composePath.startsWith(`${props.link.repo}/`) ? props.link.composePath.slice(props.link.repo.length + 1) : props.link.composePath;
    return props.link.linkedStack === undefined ? `${file} · not deployed here` : `${file} · stack ${props.link.linkedStack}`;
});

// The last deploy that went, as a short sha and when: what the reader checks against the commit they meant to ship.
const landed = computed(() => {
    const operation = props.operation;
    if (operation === undefined || operation.finishedAt === undefined || operation.error !== undefined || operation.commit === undefined) {
        return undefined;
    }
    return { sha: operation.commit.slice(0, 7), at: operation.finishedAt };
});
</script>

<template>
    <Row icon="folder" :title="link.repo" :description="description">
        <!-- Straight into the row's control cluster, which already lays these out in a line, centred, a gap-2 apart. -->
        <template #control>
            <StatusBadge v-if="running" variant="info" size="xs" label="deploying" dot />
            <span v-else-if="landed" class="text-2xs text-muted" v-tooltip.top="formatTimestamp(landed.at)">
                <span class="font-mono">{{ landed.sha }}</span> {{ timeAgo(landed.at) }}
            </span>
            <Button
                :label="link.linkedStack === undefined ? `Deploy` : `Redeploy`"
                size="small"
                :tier="link.linkedStack === undefined ? `boring` : `quiet`"
                :disabled="busy || running"
                @click="emit(`deploy`, link)"
            />
        </template>

        <template v-if="error || failed" #below>
            <Notice :of="noticeOf(error ?? `The last deploy failed: ${failed}`)" />
        </template>
    </Row>
</template>
