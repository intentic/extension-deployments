<script setup lang="ts">
import type { DeployServer } from "./contract";
import { StatusBadge, toneInk } from "@intentic/extension-ui";
import { computed } from "vue";
import { SERVER_BADGE, usageTone } from "./stateVisual";

// What one host says about itself, as a line of figures: a badge only when it is not answering or switched off, then its
// three readings. A reading past a threshold takes its tone, so a filling disk is the one thing on the line in colour.

const { server } = defineProps<{ server: DeployServer }>();

const badge = computed(() => SERVER_BADGE[server.state]);
const figures = computed(() =>
    [
        { label: `cpu`, value: server.cpuPercent },
        { label: `mem`, value: server.memPercent },
        { label: `disk`, value: server.diskPercent },
    ].flatMap((figure) => {
        if (figure.value === undefined) {
            return [];
        }
        const tone = usageTone(figure.value);
        return [{ label: figure.label, value: `${figure.value}%`, ink: tone === undefined ? `text-muted` : toneInk(tone) }];
    }),
);
</script>

<template>
    <span class="flex flex-wrap items-center gap-x-3 gap-y-1 text-2xs">
        <StatusBadge v-if="badge" :variant="badge.variant" :label="badge.label" size="xs" dot />
        <span v-for="figure in figures" :key="figure.label" class="inline-flex items-baseline gap-1">
            <span class="text-subtle">{{ figure.label }}</span>
            <span class="tabular-nums" :class="figure.ink">{{ figure.value }}</span>
        </span>
    </span>
</template>
