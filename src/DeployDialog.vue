<!-- Deploy a workspace repo to one of the owner's computers as a compose stack: the name it runs under there, said with
     where it lands, and what is and isn't sent. -->
<script setup lang="ts">
import { errorMessage } from "@intentic/base/errors";
import { Button, Modal, Notice, noticeOf, toneInk, ui } from "@intentic/extension-ui";
import { computed, ref, watch } from "vue";
import { type DeployRepoLink, stackNameFor, StackNameSchema } from "./contract";

const { device, root, link, run, environment } = defineProps<{
    device: string;
    // Where stacks land on that computer, when the board has read it.
    root: string | undefined;
    link: DeployRepoLink | undefined;
    // Resolves once the deploy has started; throws with the refusal otherwise.
    run: (input: { repo: string; stack: string }) => Promise<unknown>;
    // Starts the agent turn that fills the stack's .env from stored secrets.
    environment: (input: { repo: string; stack: string }) => Promise<unknown>;
}>();
const open = defineModel<boolean>({ required: true });

const stack = ref(``);
const failure = ref<string | undefined>(undefined);

// The linked stack when there is one (a redeploy goes where the last one went), else one named after the project.
watch(
    [open, () => link],
    ([isOpen]) => {
        if (isOpen && link !== undefined) {
            stack.value = link.linkedStack ?? stackNameFor(link.projectName);
            failure.value = undefined;
        }
    },
    { immediate: true },
);

const valid = computed(() => StackNameSchema.safeParse(stack.value.trim()).success);
const where = computed(() => (root === undefined ? undefined : `${root}/${stack.value.trim() || `<name>`}`));

const start = async (): Promise<void> => {
    if (link === undefined) {
        return;
    }
    failure.value = undefined;
    try {
        await run({ repo: link.repo, stack: stack.value.trim() });
        open.value = false;
    } catch (cause) {
        failure.value = errorMessage(cause);
    }
};

const setUpEnvironment = async (): Promise<void> => {
    if (link === undefined) {
        return;
    }
    failure.value = undefined;
    try {
        await environment({ repo: link.repo, stack: stack.value.trim() });
        open.value = false;
    } catch (cause) {
        failure.value = errorMessage(cause);
    }
};
</script>

<template>
    <Modal v-model:open="open" size="md" :header="link === undefined ? `Deploy` : `Deploy ${link.repo} to ${device}`">
        <div class="flex flex-col gap-4">
            <p class="text-sm text-muted">
                The repository's last commit is packed here, carried to {{ device }} and started there with
                <code>docker compose up -d --build</code>. Uncommitted changes are not sent: commit first.
            </p>

            <label class="flex flex-col gap-1.5 text-sm">
                Stack name on {{ device }}
                <input v-model="stack" type="text" autocomplete="off" spellcheck="false" :class="ui.input(`w-full font-mono`)" />
                <span v-if="!valid && stack.trim() !== ``" class="text-2xs" :class="toneInk(`danger`)">Lowercase letters, digits, dash and underscore, starting with a letter or digit.</span>
                <span v-else-if="where" class="text-2xs text-muted">Runs from <code>{{ where }}</code>; deploying again replaces its files, never its data.</span>
            </label>

            <p class="text-2xs text-muted">
                Secrets are never sent with a deploy. A <code>.env</code> beside the stack on {{ device }} is kept as it is; the agent can fill it from your
                stored secrets without the values appearing anywhere.
            </p>

            <Notice v-if="failure" :of="noticeOf(failure)" />
        </div>

        <template #footer>
            <Button severity="secondary" text label="Cancel" @click="open = false" />
            <Button severity="secondary" label="Set up its .env with the agent" :disabled="!valid" @click="setUpEnvironment" />
            <!-- A promise-returning handler locks the button and shows its wait. -->
            <Button label="Deploy" :disabled="!valid" @click="start" />
        </template>
    </Modal>
</template>
