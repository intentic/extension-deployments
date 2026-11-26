import { z } from "zod";
import type { JsonDoc } from "./doc.js";
import { StackHealthStateSchema } from "./records.js";

// WHAT THE WATCH REMEMBERS ACROSS A RESTART (`deploy-watch.json` in the extension's state directory): what the monitor
// last read of each managed stack and what the owner was last told of it, which disks and memory of each server are low
// now, when each registry trigger last pulled, the forge's deployment for each record it reported, which changed secret
// marks were already acted on, and when the CI feed was last heard. So a restart neither alerts again about a stack
// already said to be unhealthy, nor pulls every stack at once, nor deploys every run CI ever passed. Facts and keyed
// marks only: no secret, no value.

const WatchedStackSchema = z.object({
    repo: z.string(),
    stack: z.string(),
    // The last state read, since when it has read so, and how many reads in a row said it.
    state: StackHealthStateSchema,
    since: z.string(),
    reads: z.number().int().nonnegative(),
    // What the owner was last told: nothing or that it recovered (`ok`), or that it is unhealthy (`bad`).
    told: z.enum(["ok", "bad"]),
});
export type WatchedStack = z.infer<typeof WatchedStackSchema>;

const WatchedHostSchema = z.object({
    device: z.string(),
    // What is low on it now, each told once when it went low: `memory`, or `disk:<path>`.
    low: z.array(z.string()),
});
export type WatchedHost = z.infer<typeof WatchedHostSchema>;

const RegistryCheckSchema = z.object({ repo: z.string(), stack: z.string(), checkedAt: z.string() });
export type RegistryCheck = z.infer<typeof RegistryCheckSchema>;

const ForgeReportSchema = z.object({
    // The deploy record, the forge's deployment for it (GitHub's id, which each later status goes to), and the last
    // state the forge was told.
    id: z.string(),
    deployment: z.number().optional(),
    reported: z.string(),
});
export type ForgeReport = z.infer<typeof ForgeReportSchema>;

// A changed secret a stack runs with, already acted on (told, or redeployed for), by the mark of its new value.
// Kept for the deploy whose marks it was compared with: a newer successful deploy starts from nothing told.
const ToldMarksSchema = z.object({ repo: z.string(), stack: z.string(), record: z.string(), told: z.record(z.string(), z.string()) });
export type ToldMarks = z.infer<typeof ToldMarksSchema>;

export const DeployWatchFileSchema = z.object({
    stacks: z.array(WatchedStackSchema).default([]),
    hosts: z.array(WatchedHostSchema).default([]),
    registry: z.array(RegistryCheckSchema).default([]),
    forge: z.array(ForgeReportSchema).default([]),
    marks: z.array(ToldMarksSchema).default([]),
    // When the CI feed was last connected (epoch ms): a run that passed while it was not is caught up from /ci/runs.
    feedSeenAt: z.number().optional(),
});
export type DeployWatchFile = z.infer<typeof DeployWatchFileSchema>;
export const WATCH_PATH = "deploy-watch.json";

export const emptyWatch = (): DeployWatchFile => ({ stacks: [], hosts: [], registry: [], forge: [], marks: [] });

// The forge reports kept: enough for every record still live, oldest dropped first.
export const FORGE_REPORTS_KEPT = 200;

export type DeployWatchStore = JsonDoc<DeployWatchFile>;
