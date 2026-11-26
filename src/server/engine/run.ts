import { errorMessage } from "@intentic/base/errors";
import { DaemonRefusal, grantDeviceOf, type ManagedDeployInputWire, SANDBOX_PREDATES_MANAGED } from "../../deploysWire.js";
import { type DeploysDaemon, stackOwner } from "./daemon.js";
import { deviceProblems, resolveDevice, type ResolvedDevice } from "./devices.js";
import { type Git, manifestAt, repoFolder, runGit } from "./git.js";
import { misplacedSecrets, STACKS_MANIFEST_PATH, type StackSpec, stackSecretNames, withDeployFacts } from "./manifest.js";
import type { DeployRecord } from "./records.js";

// ONE ATTEMPT AT ONE DEPLOY RECORD (engine.ts runs them, one per stack at a time): the commit's own manifest, the
// computer it names, the owner's grant for it there, what the computer already runs under that name, and then the
// daemon's managed deploy, which fills the secret references, packs the commit, carries it and waits for health. Every
// step that finds something a person must change answers `refused` in words they can act on, before anything reaches
// the stack; past that, the answer is the machine's. Nothing here writes a record: the engine does, with what this answers.

export interface RunDeps {
    readonly root: string;
    readonly daemon: Pick<DeploysDaemon, "devices" | "grants" | "stacks" | "deployManaged">;
    readonly git?: Git | undefined;
    // Ended when the backend stops: a deploy cut by it is left `running`, for the next start to end as unknown.
    readonly lifetime?: AbortSignal | undefined;
}

// How an attempt came out: the fields the record ends with, the stack as its commit declares it (once read), and
// whether the stack is known broken on the machine, the one case a rollback mends. `interrupted`: the backend stopped
// under it, and the record is left as it stands.
export interface Attempted {
    readonly fields: Pick<DeployRecord, "outcome"> &
        Partial<Pick<DeployRecord, "error" | "digests" | "envDigest" | "healthySeconds" | "outputTail" | "secretNames" | "secretMarks" | "deviceId">>;
    readonly spec?: StackSpec | undefined;
    readonly brokenOnMachine: boolean;
    readonly interrupted?: boolean;
}

// The record's caps: an error's head, an output's tail.
const ERROR_MAX = 4000;
const OUTPUT_MAX = 20_000;
const clipped = (text: string): string => (text.length > ERROR_MAX ? `${text.slice(0, ERROR_MAX - 1)}…` : text);
const tailOf = (text: string): string => (text.length > OUTPUT_MAX ? text.slice(-OUTPUT_MAX) : text);

const refusedWith = (error: string, spec?: StackSpec, secretNames?: readonly string[], deviceId?: string): Attempted => ({
    fields: {
        outcome: "refused",
        error: clipped(error),
        ...(secretNames === undefined ? {} : { secretNames: [...secretNames] }),
        ...(deviceId === undefined ? {} : { deviceId }),
    },
    spec,
    brokenOnMachine: false,
});

// "A", "A and B", "A, B and C", each quoted.
export const listedNames = (names: readonly string[]): string => {
    const quoted = names.map((name) => `"${name}"`);
    return quoted.length <= 1 ? (quoted[0] ?? "") : `${quoted.slice(0, -1).join(", ")} and ${quoted.at(-1) ?? ""}`;
};

// The stack as the record's commit declares it, or the refusal saying why there is none.
type Declared = { readonly spec: StackSpec } | { readonly refusal: string };
const declaredAt = async (deps: Pick<RunDeps, "root" | "git">, record: DeployRecord): Promise<Declared> => {
    const at = `"${record.repo}" at ${record.commit.slice(0, 12)}`;
    let dir: string;
    try {
        dir = await repoFolder(deps.root, record.repo);
    } catch (error) {
        return { refusal: errorMessage(error) };
    }
    const read = await manifestAt(dir, record.commit, deps.git ?? runGit).catch((error: Error) => ({ kind: "broken" as const, error: error.message }));
    if (read.kind === "absent") {
        return { refusal: `${at} has no ${STACKS_MANIFEST_PATH}: nothing there declares "${record.stack}".` };
    }
    if (read.kind === "broken") {
        return { refusal: `${at}: ${read.error}` };
    }
    const spec = read.manifest.stacks.find((declared) => declared.name === record.stack);
    return spec === undefined ? { refusal: `${at} does not declare "${record.stack}" in ${STACKS_MANIFEST_PATH}.` } : { spec };
};

// The computer the manifest names, as the daemon keys it; the name as written when the daemon's list cannot be read, so
// the deploy route itself says what is wrong with it.
const placedOn = async (deps: Pick<RunDeps, "daemon">, spec: StackSpec): Promise<ResolvedDevice | undefined> => {
    try {
        return resolveDevice(spec.device, await deps.daemon.devices());
    } catch {
        return { id: spec.device };
    }
};

// What the computer's stack list says of the stack before anything is sent: owned by another sandbox (refused), or a
// compose project no deploy put there, which the first deploy from here takes over (`adopt`; the machine still refuses
// while any of its containers runs). A list refused is refused in its words; one the link drops fails.
type Listed = { readonly kind: "ok"; readonly unmanaged: boolean } | { readonly kind: "refused" | "failed"; readonly error: string };
const listedOn = async (deps: Pick<RunDeps, "daemon">, id: string, spec: StackSpec): Promise<Listed> => {
    try {
        const found = (await deps.daemon.stacks(id)).stacks.find((stack) => stack.name === spec.name);
        const owner = found === undefined ? undefined : stackOwner(found);
        if (owner !== undefined && !owner.you) {
            return {
                kind: "refused",
                error: `"${spec.name}" on "${spec.device}" was deployed by another sandbox (${owner.sandbox}): only that one may deploy it. Deploy it under another name, or have it taken down there first.`,
            };
        }
        return { kind: "ok", unmanaged: found !== undefined && !found.managed };
    } catch (error) {
        if (error instanceof DaemonRefusal && error.status !== 502 && error.status < 500) {
            return { kind: "refused", error: error.bare ? SANDBOX_PREDATES_MANAGED : error.message };
        }
        return { kind: "failed", error: errorMessage(error) };
    }
};

// The names the grant for this stack on this computer does not cover; undefined when the grants cannot be read (the
// daemon checks them again in any case, and refuses).
const ungrantedOf = async (deps: Pick<RunDeps, "daemon">, record: DeployRecord, id: string, names: readonly string[]): Promise<readonly string[] | "predates" | undefined> => {
    if (names.length === 0) {
        return [];
    }
    try {
        const grant = (await deps.daemon.grants()).find((entry) => entry.repo === record.repo && entry.stack === record.stack && entry.device === grantDeviceOf(id));
        return names.filter((name) => !(grant?.secrets ?? []).includes(name));
    } catch (error) {
        return error instanceof DaemonRefusal && error.bare ? "predates" : undefined;
    }
};

// What `deploy-managed` is sent: each part the stack declares and nothing it does not, the deploy's own facts filled in
// and every secret reference left for the daemon.
const inputOf = (spec: StackSpec, record: DeployRecord, adopt: boolean): ManagedDeployInputWire => {
    const facts = { sha: record.commit, ref: record.ref, stack: spec.name };
    const env = Object.fromEntries(Object.entries(spec.env).map(([key, value]) => [key, withDeployFacts(value, facts)]));
    const registries = spec.registries.map((registry) => ({
        host: withDeployFacts(registry.host, facts),
        username: withDeployFacts(registry.username, facts),
        password: withDeployFacts(registry.password, facts),
    }));
    const hooks = spec.hooks.preDeploy !== undefined || spec.hooks.postDeploy !== undefined ? spec.hooks : undefined;
    const reason = `${record.trigger.kind}${record.trigger.detail === undefined ? "" : `: ${record.trigger.detail}`}`.slice(0, 200);
    return {
        repo: record.repo,
        commit: record.commit,
        ...(spec.compose === undefined ? {} : { composeFile: spec.compose }),
        mode: spec.mode,
        ...(Object.keys(env).length === 0 ? {} : { env }),
        ...(registries.length === 0 ? {} : { registries }),
        ...(hooks === undefined ? {} : { hooks }),
        ...(spec.health === undefined ? {} : { health: spec.health }),
        ...(record.pins === undefined ? {} : { pins: record.pins }),
        ...(adopt ? { adopt: true } : {}),
        reason,
    };
};

// The attempt. `firstHere`: no deploy of this stack from this sandbox has succeeded yet, which is when an unmanaged
// project of its name is taken over rather than refused.
export const attemptDeploy = async (deps: RunDeps, record: DeployRecord, firstHere: boolean): Promise<Attempted> => {
    const declared = await declaredAt(deps, record);
    if ("refusal" in declared) {
        return refusedWith(declared.refusal);
    }
    const { spec } = declared;
    const secretNames = stackSecretNames(spec);
    const resolved = await placedOn(deps, spec);
    const problems = deviceProblems(spec.device, resolved);
    if (resolved === undefined || problems.length > 0) {
        return refusedWith(problems.join(" "), spec, undefined, resolved?.id);
    }
    const { id } = resolved;
    const misplaced = misplacedSecrets(spec);
    if (misplaced.length > 0) {
        return refusedWith(misplaced.join(" "), spec, secretNames, id);
    }
    const ungranted = await ungrantedOf(deps, record, id, secretNames);
    if (ungranted === "predates") {
        return refusedWith(SANDBOX_PREDATES_MANAGED, spec, secretNames, id);
    }
    if (ungranted !== undefined && ungranted.length > 0) {
        return refusedWith(
            `${listedNames(ungranted)} ${ungranted.length === 1 ? "is" : "are"} not granted to "${spec.name}" on "${id}": only the owner lets a stack receive a secret (Grant on the Deployments board, or an agent's \`secrets grant-stack ${record.repo} ${spec.name} ${id} ${ungranted.join(" ")}\` asks them on a card).`,
            spec,
            secretNames,
            id,
        );
    }
    const listed = await listedOn(deps, id, spec);
    if (listed.kind !== "ok") {
        return listed.kind === "refused"
            ? refusedWith(listed.error, spec, secretNames, id)
            : { fields: { outcome: "failed", error: clipped(listed.error), deviceId: id }, spec, brokenOnMachine: false };
    }
    const outcome = await deps.daemon.deployManaged(id, spec.name, inputOf(spec, record, firstHere && listed.unmanaged), deps.lifetime);
    if (deps.lifetime?.aborted === true && outcome.kind !== "deployed") {
        return { fields: { outcome: "running" }, spec, brokenOnMachine: false, interrupted: true };
    }
    switch (outcome.kind) {
        case "deployed": {
            const { result } = outcome;
            return {
                fields: {
                    outcome: "succeeded",
                    deviceId: id,
                    secretNames: result.secretNames.length > 0 ? [...result.secretNames].sort() : secretNames,
                    ...(Object.keys(result.secretMarks).length === 0 ? {} : { secretMarks: { ...result.secretMarks } }),
                    ...(result.digests === undefined ? {} : { digests: result.digests }),
                    ...(result.envDigest === undefined ? {} : { envDigest: result.envDigest }),
                    ...(result.healthySeconds === undefined ? {} : { healthySeconds: result.healthySeconds }),
                    outputTail: tailOf(result.output),
                },
                spec,
                brokenOnMachine: false,
            };
        }
        case "refused":
            return refusedWith(outcome.predates ? SANDBOX_PREDATES_MANAGED : outcome.error, spec, secretNames, id);
        default:
            return {
                fields: { outcome: "failed", error: clipped(outcome.error), secretNames, deviceId: id },
                spec,
                brokenOnMachine: outcome.kind === "machine",
            };
    }
};
