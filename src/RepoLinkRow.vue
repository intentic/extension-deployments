<script setup lang="ts">
import type { DeployRepoLink } from "./contract";
import { Button, Notice, noticeOf, Picker, type PickerGroup, Row } from "@intentic/extension-ui";
import { computed } from "vue";

// One workspace repo that ships a compose file, and the Komodo stack it deploys to, changed where it is read: the stack
// is a picker in place, with "Not linked" as its first choice. The daemon suggests a stack by name; only the owner can
// confirm it, since a silently wrong guess is worse than none, so an unlinked repo with a suggestion offers it as one
// press beside the picker.

const props = defineProps<{ link: DeployRepoLink; stacks: readonly string[]; busy: boolean; error: string | undefined }>();
const emit = defineEmits<{ link: [repo: string, stack: string] }>();

// The empty value is "not linked": the link route clears on an empty stack, so the picker's value is the wire's.
const NOT_LINKED = ``;

// Where the name came from: the compose file inside the repo, and the project it names only when that isn't the repo's
// own name again.
const source = computed(() => {
    const file = props.link.composePath.startsWith(`${props.link.repo}/`) ? props.link.composePath.slice(props.link.repo.length + 1) : props.link.composePath;
    return props.link.projectName === props.link.repo ? file : `${file} · project ${props.link.projectName}`;
});

const suggestion = computed(() => (props.link.linkedStack === undefined ? props.link.suggestions[0] : undefined));

// Suggestions first, under their own heading, then every other stack; empty groups are the picker's to drop.
// A link to a stack Komodo no longer lists stays a choice, said as such, so the picker still names what it is set to.
const options = computed<PickerGroup[]>(() => {
    const suggested = props.link.suggestions.filter((stack) => props.stacks.includes(stack));
    const linked = props.link.linkedStack;
    const gone = linked !== undefined && !props.stacks.includes(linked) ? [{ value: linked, label: linked, mono: true, description: `not in Komodo` }] : [];
    return [
        { options: [{ value: NOT_LINKED, label: `Not linked` }] },
        { label: `Looks like this repo`, options: suggested.map((stack) => ({ value: stack, label: stack, mono: true })) },
        {
            label: `Stacks`,
            options: [
                ...gone,
                ...props.stacks.filter((stack) => !suggested.includes(stack)).map((stack) => ({ value: stack, label: stack, mono: true })),
            ],
        },
    ];
});

const chosen = computed<string>({
    get: () => props.link.linkedStack ?? NOT_LINKED,
    set: (stack) => {
        if (stack !== (props.link.linkedStack ?? NOT_LINKED)) {
            emit(`link`, props.link.repo, stack);
        }
    },
});
</script>

<template>
    <Row icon="folder" :title="link.repo" :description="source">

        <template #control>
            <div class="flex shrink-0 items-center gap-2">
                <Button
                    v-if="suggestion"
                    :label="`Link to ${suggestion}`"
                    size="small"
                    tier="boring"
                    :disabled="busy"
                    @click="emit(`link`, link.repo, suggestion)"
                />
                <Picker
                    v-model="chosen"
                    :options="options"
                    variant="ghost"
                    :disabled="busy || (stacks.length === 0 && link.linkedStack === undefined)"
                    aria-label="Komodo stack"
                    :header="`Stack for ${link.repo}`"
                />
            </div>
        </template>

        <template v-if="error" #below>
            <Notice :of="noticeOf(error)" />
        </template>
    </Row>
</template>
