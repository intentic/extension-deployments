import { type IconName, type StatusVariant, type Tone, toneInk } from "@intentic/extension-ui";
import type { DeployServerState, DeployState } from "./contract";
import type { IncidentTone } from "./incidents";

// Every state's look, in one table, named by the kit's own tones (toneInk), so a deployment's "danger" is the shell's.
// `stopped` is neutral, not red, by design: most things are stopped on purpose, only `unhealthy` and an incident turn red.

export interface StateLook {
    readonly icon: IconName;
    readonly spin: boolean;
    readonly label: string;
    readonly tone: Tone;
}

export const STATE_LOOK: Record<DeployState, StateLook> = {
    running: { icon: `check-circle`, spin: false, label: `running`, tone: `success` },
    deploying: { icon: `spinner`, spin: true, label: `deploying`, tone: `info` },
    unhealthy: { icon: `exclamation-circle`, spin: false, label: `unhealthy`, tone: `danger` },
    stopped: { icon: `stop`, spin: false, label: `stopped`, tone: `neutral` },
    unknown: { icon: `question-circle`, spin: false, label: `unknown`, tone: `neutral` },
};

export const stateInk = (state: DeployState): string => toneInk(STATE_LOOK[state].tone);

// A host that answers is the default and says nothing; only a host that doesn't, or is switched off, wears a badge.
export const SERVER_BADGE: Record<DeployServerState, { readonly variant: StatusVariant; readonly label: string } | undefined> = {
    ok: undefined,
    unreachable: { variant: `danger`, label: `unreachable` },
    disabled: { variant: `neutral`, label: `disabled` },
};

// An incident's glyph by tier; the row tints it with the same tone.
export const INCIDENT_ICON: Record<IncidentTone, IconName> = {
    danger: `exclamation-circle`,
    warning: `exclamation-triangle`,
    info: `arrow-circle-up`,
};

// A host figure's tone at thresholds an operator already thinks in: quiet under 75, worth noticing past it, acting on
// past 90. Undefined is the quiet case, which reads in the line's own ink.
export const usageTone = (percent: number): Tone | undefined => {
    if (percent >= 90) {
        return `danger`;
    }
    return percent >= 75 ? `warning` : undefined;
};

// Repository's last segment and tag only: a stack's services share a long registry prefix that would otherwise bury
// what differs. Full reference moves to the tooltip.
export const imageLabel = (image: string): string => image.split(`/`).at(-1) ?? image;
