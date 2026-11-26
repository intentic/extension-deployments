import type { DeviceRowWire } from "../../deploysWire.js";

// WHICH COMPUTER A MANIFEST'S `device` IS (GET /system/devices): a device card's id, any case, or `<card>::<environment>`
// for a side of one (a WSL distro), as the daemon keys its connections. The connection key is what every device route,
// and every grant, is addressed by.

const ENVIRONMENT_SEPARATOR = "::";
const NATIVE = "native";

export interface ResolvedDevice {
    // The connection key: the card's own id, then `::<environment>` for a side other than the metal.
    readonly id: string;
    // That connection's row, when the daemon lists it: whether it is connected, and what its agent can do.
    readonly row?: DeviceRowWire | undefined;
}

export const resolveDevice = (named: string, rows: readonly DeviceRowWire[]): ResolvedDevice | undefined => {
    const at = named.indexOf(ENVIRONMENT_SEPARATOR);
    const card = (at === -1 ? named : named.slice(0, at)).toLowerCase();
    const environment = at === -1 ? NATIVE : named.slice(at + ENVIRONMENT_SEPARATOR.length);
    const owning = rows.filter((row) => row.card?.toLowerCase() === card);
    const cardId = owning[0]?.card;
    if (cardId === undefined) {
        return undefined;
    }
    const id = environment === NATIVE ? cardId : `${cardId}${ENVIRONMENT_SEPARATOR}${environment}`;
    return { id, row: owning.find((row) => row.hostId === id) ?? (environment === NATIVE ? owning.find((row) => row.hostId === undefined) : undefined) };
};

// The device features a managed deploy needs of the computer's agent, by the words its card's update says.
export const DEVICE_FEATURE_STACKS = "stacks";
export const DEVICE_FEATURE_PROGRAMS = "programs";
export const DEVICE_FEATURE_STACKS_MANAGED = "stacks-managed";
export const DEVICE_FEATURE_HOST_STATS = "host-stats";

const NEEDED: readonly (readonly [string, string])[] = [
    [DEVICE_FEATURE_STACKS, "read or drive Docker compose stacks"],
    [DEVICE_FEATURE_PROGRAMS, "receive what this sandbox sends"],
    [DEVICE_FEATURE_STACKS_MANAGED, "take a stack this sandbox manages"],
];

// Whether the connection's agent says it can do `feature`; one that said nothing yet (offline since boot) is not known not to.
export const deviceCan = (row: DeviceRowWire | undefined, feature: string): boolean | undefined => {
    const features = row?.facts?.features;
    return features === undefined ? undefined : features.includes(feature);
};

// Why the stack's computer cannot take it now, as far as the sandbox's device list tells without asking it.
export const deviceProblems = (named: string, resolved: ResolvedDevice | undefined): string[] => {
    if (resolved === undefined) {
        return [`"${named}" is not a computer paired with this sandbox: pair it on Devices, or name another in the stacks manifest.`];
    }
    return NEEDED.filter(([feature]) => deviceCan(resolved.row, feature) === false).map(
        ([, to]) => `The agent on "${resolved.id}" is too old to ${to}: update it there (\`intentic-machine upgrade\`, or Update on its Devices card).`,
    );
};

// Whether the connection is up right now; a computer the list does not say is down counts as up, and the call says.
export const deviceOnline = (resolved: ResolvedDevice): boolean => resolved.row?.online !== false;
