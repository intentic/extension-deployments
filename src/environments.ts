import type { DeployRepoLink, DeployResource, DeployState } from "./contract";
import {
    type DeployEnvironmentWire,
    type DeployOutcomeWire,
    type DeployRecordWire,
    type DeployTriggerWire,
    isLiveOutcome,
    type ManifestErrorWire,
    type StackHealthWire,
} from "./deploysWire";

// MANAGED ENVIRONMENTS IN THE BOARD'S WORDS: pure, so both halves share them (the view's rows, the agent's tools) and
// they are tested without a daemon. What a trigger says, what a record's outcome and origin say, which state a row
// wears, and how a device board's raw stacks and repo rows give way to the environments that manage them.

// ---- triggers -------------------------------------------------------------------------------------------------------

// One trigger as a phrase: "on CI job images-platform passing on main", "pulls newer images every 15m", "after staging".
export const triggerWords = (trigger: DeployTriggerWire): string => {
    if (trigger.ci !== undefined) {
        const { branch, workflow, job } = trigger.ci;
        if (job !== undefined && workflow !== undefined) {
            return `on CI job ${job} of ${workflow} passing on ${branch}`;
        }
        if (job !== undefined) {
            return `on CI job ${job} passing on ${branch}`;
        }
        return workflow === undefined ? `on CI passing on ${branch}` : `on CI workflow ${workflow} passing on ${branch}`;
    }
    if (trigger.registry !== undefined) {
        return `pulls newer images every ${trigger.registry.every}`;
    }
    if (trigger.after !== undefined) {
        return `after ${trigger.after.stack}`;
    }
    return `on a trigger this version does not describe`;
};

// Every trigger of a stack, or that it deploys only when someone asks.
export const triggersSummary = (triggers: readonly DeployTriggerWire[]): string =>
    triggers.length === 0 ? `deploys when asked` : triggers.map(triggerWords).join(`, `);

// ---- records --------------------------------------------------------------------------------------------------------

const TRIGGER_KIND_WORDS: Readonly<Record<string, string>> = {
    manual: `by hand`,
    ci: `CI`,
    registry: `newer images`,
    after: `after another stack`,
    rollback: `rollback`,
    promote: `promotion`,
    "secret-change": `a secret changed`,
};

// What started a record, in one line: its kind in words, then the engine's own detail (who, which run, from where).
export const recordOrigin = (record: Pick<DeployRecordWire, `trigger`>): string => {
    const kind = TRIGGER_KIND_WORDS[record.trigger.kind] ?? record.trigger.kind;
    return record.trigger.detail === undefined || record.trigger.detail === `` ? kind : `${kind} · ${record.trigger.detail}`;
};

export const OUTCOME_WORDS: Readonly<Record<DeployOutcomeWire, string>> = {
    queued: `queued`,
    running: `deploying`,
    succeeded: `succeeded`,
    failed: `failed`,
    "rolled-back": `rolled back`,
    superseded: `superseded`,
    refused: `refused`,
    unknown: `unknown`,
};

const at = (iso: string | undefined): number | undefined => {
    if (iso === undefined) {
        return undefined;
    }
    const parsed = Date.parse(iso);
    return Number.isNaN(parsed) ? undefined : parsed;
};

// When a record last moved: its end, else its start, else when it was queued; epoch ms.
export const recordTime = (record: Pick<DeployRecordWire, `queuedAt` | `startedAt` | `endedAt`>): number | undefined =>
    at(record.endedAt) ?? at(record.startedAt) ?? at(record.queuedAt);

// How long it ran, in seconds, once it has both ends.
export const recordSeconds = (record: Pick<DeployRecordWire, `startedAt` | `endedAt`>): number | undefined => {
    const start = at(record.startedAt);
    const end = at(record.endedAt);
    return start === undefined || end === undefined || end < start ? undefined : Math.round((end - start) / 1000);
};

export const shortCommit = (commit: string): string => commit.slice(0, 8);

// Whether the engine is done with `id`, read off the stack's newest records: ended, and no rollback it set off still
// running (a failed deploy is written `failed` first, and `rolled-back` once the rollback after it has ended).
export const settledRecord = (id: string, records: readonly DeployRecordWire[]): DeployRecordWire | undefined => {
    const record = records.find((entry) => entry.id === id);
    if (record === undefined || isLiveOutcome(record.outcome)) {
        return undefined;
    }
    if (record.outcome === `failed`) {
        const since = at(record.queuedAt) ?? 0;
        const rollingBack = records.some(
            (entry) => entry.trigger.kind === `rollback` && isLiveOutcome(entry.outcome) && (at(entry.queuedAt) ?? 0) >= since,
        );
        if (rollingBack) {
            return undefined;
        }
    }
    return record;
};

// ---- the row's state ------------------------------------------------------------------------------------------------

// The monitor's word for the stack as a reader says it, for the row's status line.
export const HEALTH_WORDS: Readonly<Record<StackHealthWire, string>> = {
    running: `running`,
    unhealthy: `unhealthy`,
    restarting: `restarting`,
    stopped: `stopped`,
    missing: `not on the computer`,
    unreachable: `computer unreachable`,
    unknown: `not read yet`,
};

// Which of the board's five looks (stateVisual.ts) an environment wears: deploying while a deploy is going, else what the
// monitor read. A crash loop is a breakage; a stack missing from its computer, or a computer that did not answer, is
// not known to be anything.
export const environmentState = (environment: Pick<DeployEnvironmentWire, `active` | `state`>): DeployState => {
    if (environment.active !== undefined) {
        return `deploying`;
    }
    switch (environment.state) {
        case `running`:
            return `running`;
        case `unhealthy`:
        case `restarting`:
            return `unhealthy`;
        case `stopped`:
            return `stopped`;
        default:
            return `unknown`;
    }
};

// The other stacks the same repository declares, which this one can be promoted to.
export const promotionTargets = (environment: DeployEnvironmentWire, all: readonly DeployEnvironmentWire[]): DeployEnvironmentWire[] =>
    all.filter((other) => other.repo === environment.repo && other.stack !== environment.stack);

// ---- one device board, with its environments --------------------------------------------------------------------------

export interface EnvironmentsOnBoard {
    // The environments this computer runs (or whose computer does not resolve, so each is shown somewhere), in the open
    // project.
    readonly environments: readonly DeployEnvironmentWire[];
    readonly manifestErrors: readonly ManifestErrorWire[];
    // The board's raw stack rows, less those an environment manages.
    readonly resources: readonly DeployResource[];
    // The raw "deploy this repo" rows, less the repositories that declare stacks: those deploy as environments.
    readonly repos: readonly DeployRepoLink[];
    // Environments and manifest errors the open project put out of sight, for its chip.
    readonly hidden: number;
}

// Joins a device board with the workspace's environments: an environment managed on this computer replaces the raw
// stack row of the same name there (one stack, shown once), and a repository with a stacks manifest deploys through it
// rather than as a plain compose stack. `device` is the board's device card id.
export const environmentsOnBoard = (input: {
    readonly device: string;
    readonly resources: readonly DeployResource[];
    readonly repos: readonly DeployRepoLink[];
    readonly environments: readonly DeployEnvironmentWire[];
    readonly manifestErrors: readonly ManifestErrorWire[];
    readonly inProject: (repo: string) => boolean;
}): EnvironmentsOnBoard => {
    const here = input.environments.filter((environment) => environment.deviceId === input.device || environment.deviceId === undefined);
    const managed = new Set(input.environments.filter((environment) => environment.deviceId === input.device).map((environment) => environment.stack));
    const declaring = new Set([...input.environments.map((environment) => environment.repo), ...input.manifestErrors.map((error) => error.repo)]);
    const shown = here.filter((environment) => input.inProject(environment.repo));
    const errors = input.manifestErrors.filter((error) => input.inProject(error.repo));
    return {
        environments: shown,
        manifestErrors: errors,
        resources: input.resources.filter((resource) => resource.kind !== `stack` || !managed.has(resource.name)),
        repos: input.repos.filter((repo) => !declaring.has(repo.repo)),
        hidden: here.length - shown.length + (input.manifestErrors.length - errors.length),
    };
};
