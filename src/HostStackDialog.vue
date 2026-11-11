<!-- "Run a sandbox from a host folder": a folder already on one of this Komodo's servers becomes a stack and is deployed. -->
<script setup lang="ts">
import { errorMessage } from "@intentic/base/errors";
import { Button, Modal, Notice, noticeOf, Picker, type PickerOption, ui } from "@intentic/extension-ui";
import { computed, ref, watch } from "vue";
import type { DeployServer } from "./contract";
import { defaultStackName } from "./server/komodo-host-stack";

const { servers, run } = defineProps<{
    servers: readonly DeployServer[];
    // Resolves to the stack's name once Komodo accepted the deploy; throws with Komodo's words otherwise.
    run: (input: { server: string; folder: string; name?: string | undefined }) => Promise<{ stack: string }>;
}>();
const open = defineModel<boolean>({ required: true });

// Where `ic sandbox compose <slug>` puts it by default; the owner's home on the server, so it is an example, not a value.
const EXAMPLE = `/home/you/.intentic/compose/<slug>`;

const server = ref<string | undefined>(undefined);
const folder = ref(``);
const name = ref(``);
const failure = ref<string | undefined>(undefined);

const serverOptions = computed<PickerOption[]>(() => servers.map((entry) => ({ value: entry.id, label: entry.name, icon: `server`, mono: true })));

watch(
    open,
    (value) => {
        if (value) {
            failure.value = undefined;
            // A lone server is the only answer; several are the owner's to pick.
            server.value = servers.length === 1 ? servers[0]?.id : server.value;
        }
    },
    { immediate: true },
);

// What the name will be when left blank, said as the field's placeholder rather than prefilled, so a changed folder
// keeps it in step.
const derived = computed(() => {
    try {
        return folder.value.trim() === `` ? `intentic-<slug>` : defaultStackName(folder.value.trim());
    } catch {
        return ``;
    }
});

const ready = computed(() => server.value !== undefined && folder.value.trim().startsWith(`/`));

const start = async (): Promise<void> => {
    if (server.value === undefined) {
        return;
    }
    failure.value = undefined;
    try {
        await run({ server: server.value, folder: folder.value.trim(), ...(name.value.trim() === `` ? {} : { name: name.value.trim() }) });
        open.value = false;
    } catch (cause) {
        failure.value = errorMessage(cause);
    }
};
</script>

<template>
    <Modal v-model:open="open" size="md" header="Run a sandbox from a host folder">
        <div class="flex flex-col gap-4">
            <p class="text-sm text-muted">
                Point a Komodo stack at a folder on the server's own disk, the one <code>ic sandbox compose &lt;slug&gt; --out &lt;dir&gt;</code> wrote
                there, and deploy it. A stack of the same name is updated in place rather than duplicated.
            </p>

            <label class="flex flex-col gap-1.5 text-sm">
                <span>Server</span>
                <Picker v-model="server" :options="serverOptions" aria-label="Server" placeholder="Choose a server" />
            </label>

            <label class="flex flex-col gap-1.5 text-sm">
                <span>Folder on that server</span>
                <input v-model="folder" type="text" :placeholder="EXAMPLE" autocomplete="off" spellcheck="false" :class="ui.input(`w-full font-mono`)" />
            </label>

            <label class="flex flex-col gap-1.5 text-sm">
                <span>Stack name</span>
                <input v-model="name" type="text" :placeholder="derived" autocomplete="off" spellcheck="false" :class="ui.input(`w-full font-mono`)" />
            </label>

            <p class="text-2xs text-muted">
                The compose file's volumes are external: the sandbox's named volumes must already exist on that server.
            </p>

            <Notice v-if="failure" :of="noticeOf(failure)" />
        </div>

        <template #footer>
            <Button severity="secondary" text label="Cancel" @click="open = false" />
            <!-- A promise-returning handler locks the button and shows its wait. -->
            <Button label="Create and deploy" :disabled="!ready" @click="start" />
        </template>
    </Modal>
</template>
