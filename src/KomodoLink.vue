<script setup lang="ts">
import { Icon, ui } from "@intentic/extension-ui";

// The way through to Komodo's own page for a host or a resource: the kit's icon button, leaving in a new tab. Nothing on
// a device board, whose rows have no page elsewhere (an empty href).
defineProps<{ href: string; name: string }>();
</script>

<template>
    <a v-if="href !== ``" :href="href" target="_blank" rel="noopener" :class="ui.iconButton()" :aria-label="`Open ${name} in Komodo`" v-tooltip.top="{ title: `Open in Komodo` }">
        <Icon name="arrow-up-right" class="text-xs" />
    </a>
</template>
