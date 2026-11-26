import { DaemonRefusal, type DeployEnvironmentWire, type DeployEnvironmentsWire, type DeviceRowWire, grantDeviceOf, SANDBOX_PREDATES_MANAGED, type StackGrantWire } from "../../deploysWire.js";
import type { DeploysDaemon } from "./daemon.js";
import { deviceProblems, resolveDevice } from "./devices.js";
import type { DeploysEngine } from "./engine.js";
import { type DeclaredStack, type Git, runGit, workspaceManifests } from "./git.js";
import { stackSecretNames } from "./manifest.js";
import type { DeployRecord } from "./records.js";

// THE BOARD'S READ (the backend's `GET /environments`, and the agent's `environments` tool): every stack the workspace's
// repositories declare at HEAD, joined with its records, the owner's grant for it, what the monitor last read on its
// computer and which of its secrets changed since its last deploy, plus each reason it cannot deploy now or is not
// seen on its forge. A workspace whose repositories declare nothing asks the daemon nothing.

export interface EnvironmentsDeps {
    readonly root: string;
    readonly daemon: Pick<DeploysDaemon, "devices" | "grants">;
    readonly engine: Pick<DeploysEngine, "records" | "stackState" | "secretsChanged" | "forgeProblem">;
    readonly git?: Git | undefined;
}

const environmentOf = (
    deps: EnvironmentsDeps,
    declared: DeclaredStack,
    records: readonly DeployRecord[],
    grants: readonly StackGrantWire[] | undefined,
    rows: readonly DeviceRowWire[] | undefined,
    sandboxProblem: string | undefined,
): DeployEnvironmentWire => {
    const { repo, spec } = declared;
    const own = records.filter((record) => record.repo === repo && record.stack === spec.name);
    const secrets = stackSecretNames(spec);
    // The device list unread: the name as written, which is what the deploy will try.
    const resolved = rows === undefined ? { id: spec.device } : resolveDevice(spec.device, rows);
    const granted = grants?.find((grant) => resolved !== undefined && grant.repo === repo && grant.stack === spec.name && grant.device === grantDeviceOf(resolved.id))?.secrets ?? [];
    const state = deps.engine.stackState(repo, spec.name);
    const forge = deps.engine.forgeProblem(repo);
    const current = own.find((record) => record.outcome === "succeeded");
    const active = own.find((record) => record.outcome === "running") ?? own.find((record) => record.outcome === "queued");
    return {
        repo,
        stack: spec.name,
        device: spec.device,
        ...(resolved === undefined ? {} : { deviceId: resolved.id }),
        mode: spec.mode,
        ...(spec.description === undefined ? {} : { description: spec.description }),
        triggers: spec.triggers,
        secrets,
        ungranted: secrets.filter((name) => !granted.includes(name)),
        secretsChanged: [...deps.engine.secretsChanged(repo, spec.name)],
        ...(current === undefined ? {} : { current }),
        ...(active === undefined ? {} : { active }),
        ...(own[0] === undefined ? {} : { latest: own[0] }),
        state: state.state,
        ...(state.since === undefined ? {} : { stateSince: state.since }),
        ownedElsewhere: state.ownedElsewhere,
        problems: [...(sandboxProblem === undefined ? [] : [sandboxProblem]), ...deviceProblems(spec.device, resolved), ...(forge === undefined ? [] : [forge])],
    } as DeployEnvironmentWire;
};

export const deployEnvironments = async (deps: EnvironmentsDeps): Promise<DeployEnvironmentsWire> => {
    const manifests = await workspaceManifests(deps.root, deps.git ?? runGit);
    if (manifests.stacks.length === 0) {
        return { environments: [], manifestErrors: [...manifests.errors] };
    }
    let sandboxProblem: string | undefined;
    const [records, grants, rows] = await Promise.all([
        deps.engine.records(),
        // Display only: every deploy reads the grants again, and the daemon checks them once more before filling a value.
        deps.daemon.grants().catch((error: unknown) => {
            if (error instanceof DaemonRefusal && error.bare) {
                sandboxProblem = SANDBOX_PREDATES_MANAGED;
            }
            return undefined;
        }),
        deps.daemon.devices().catch(() => undefined),
    ]);
    return {
        environments: manifests.stacks.map((declared) => environmentOf(deps, declared, records, grants, rows, sandboxProblem)),
        manifestErrors: [...manifests.errors],
    };
};
