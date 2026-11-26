import { z } from "zod";

/* THE STACKS MANIFEST (`<repo>/.intentic/stacks.json`), the format this extension owns: compose stacks a repository
   declares, which this extension's engine deploys to the owner's paired computers and keeps running. What a stack IS
   lives in the repository, so a change to production is a reviewed land like any other change; what it RECEIVES
   (secret values) lives in the sandbox's secret store, and only the daemon ever fills a value in, under the owner's grant
   for that stack on that computer (stack-grants). The engine sends `{{secret:NAME}}` references and never holds one.

   Deploys are pulled, not pushed: CI's job passing says the images are published, and the sandbox deploys that commit.
   No deploy credential sits in CI, and the outcome goes back to the forge as a Deployment or a commit status. */

export const STACKS_MANIFEST_PATH = ".intentic/stacks.json";

// A compose project name as Docker accepts one; also the stack's folder on the computer.
export const StackNameSchema = z
    .string()
    .regex(/^[a-z0-9][a-z0-9_-]{0,62}$/u, "lowercase letters, digits, dash and underscore, starting with a letter or digit, at most 63");

// A compose file inside the repository, relative to its root: forward slashes, no `..`, no leading slash.
export const ComposeFilePathSchema = z
    .string()
    .min(1)
    .max(300)
    .regex(/^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))[A-Za-z0-9._/-]+$/u, "a path inside the repository, like docker-compose.yml or deploy/compose.yaml");

// `images` pulls what the compose file names and never builds; `build` is `up --build` from the deployed tree.
export const StackDeployModeSchema = z.enum(["images", "build"]);

// A command run by the machine's shell in the stack's folder: before compose touches a container, and once it is healthy.
export const StackHookSchema = z.string().min(1).max(4000);

// How the machine decides a deploy came up: every service running, each healthcheck healthy, each URL answering 2xx.
export const StackHealthSchema = z
    .object({
        timeoutSeconds: z.number().int().min(10).max(600).default(180),
        http: z.array(z.string().url().max(2000)).max(5).default([]),
    })
    .strict();

// An environment variable's name as compose interpolates it.
export const StackEnvKeySchema = z.string().regex(/^[A-Za-z_][A-Za-z0-9_]{0,127}$/u, "a variable name: letters, digits and underscores");

// A value: literal text, `{{secret:NAME}}` for a value from the sandbox's secret store (filled by the daemon alone), and
// `{{deploy:sha}}`, `{{deploy:sha8}}`, `{{deploy:ref}}` or `{{deploy:stack}}` for the deploy's own commit, branch and
// name (filled here). A value with lines is written into the `.env` quoted.
export const StackEnvValueSchema = z.string().max(64 * 1024);

export const StackRegistrySpecSchema = z
    .object({
        host: z.string().min(1).max(253),
        username: z.string().min(1).max(200),
        // Normally a secret reference; filled by the daemon and written nowhere but the stack's own docker config.
        password: z.string().min(1).max(1000),
    })
    .strict();

// How often a `registry` trigger looks for newer images behind the compose file's tags: 5m to 24h.
export const DeployIntervalSchema = z.string().regex(/^(\d{1,4})(m|h)$/u, "an interval like 15m or 6h");
export const deployIntervalMs = (interval: string): number => {
    const match = /^(\d{1,4})(m|h)$/u.exec(interval);
    if (match === null) {
        throw new Error(`"${interval}" is not an interval like 15m or 6h`);
    }
    const ms = Number(match[1]) * (match[2] === "h" ? 3_600_000 : 60_000);
    return Math.min(Math.max(ms, 5 * 60_000), 24 * 3_600_000);
};

// What starts a deploy by itself. Without one, a stack deploys only when asked (the board, an agent's tool).
export const DeployTriggerSchema = z.union([
    // CI passing on the branch: `job` names the job whose success means the images are published (the deploy starts the
    // moment that job ends); `workflow` narrows to one workflow (GitHub's name). Neither: the run passing. A commit older
    // than what the stack runs never replaces it.
    z
        .object({
            ci: z
                .object({ branch: z.string().min(1).max(255), workflow: z.string().min(1).max(255).optional(), job: z.string().min(1).max(255).optional() })
                .strict(),
        })
        .strict(),
    // Newer images behind the same tags: pulled every `every`, and a deploy recorded only when compose recreated one.
    z.object({ registry: z.object({ every: DeployIntervalSchema }).strict() }).strict(),
    // Promotion: deploy at the commit and image digests another stack of this repository just deployed successfully.
    z.object({ after: z.object({ stack: StackNameSchema }).strict() }).strict(),
]);
export type DeployTrigger = z.infer<typeof DeployTriggerSchema>;
export type CiTrigger = Extract<DeployTrigger, { readonly ci: unknown }>["ci"];

export const StackSpecSchema = z
    .object({
        // The compose project name on the machine, which prefixes its named volumes: keeping the name keeps the data.
        name: StackNameSchema,
        // The computer it runs on, by its device card's id in this sandbox (any case), or `<card>::<environment>`.
        device: z.string().min(1).max(200),
        compose: ComposeFilePathSchema.optional(),
        mode: StackDeployModeSchema.default("images"),
        env: z.record(StackEnvKeySchema, StackEnvValueSchema).default({}),
        registries: z.array(StackRegistrySpecSchema).max(10).default([]),
        triggers: z.array(DeployTriggerSchema).max(10).default([]),
        hooks: z.object({ preDeploy: StackHookSchema.optional(), postDeploy: StackHookSchema.optional() }).strict().default({}),
        health: StackHealthSchema.optional(),
        // A deploy that does not come up healthy: go back to what ran before (`rollback`), or leave it (`stay`).
        onFailure: z.enum(["rollback", "stay"]).default("rollback"),
        // A secret this stack received changed in the store: redeploy at what it runs, or only say so.
        onSecretChange: z.enum(["redeploy", "notify"]).default("notify"),
        description: z.string().max(500).optional(),
    })
    .strict();
export type StackSpec = z.infer<typeof StackSpecSchema>;
export type StackSpecInput = z.input<typeof StackSpecSchema>;

export const StacksManifestSchema = z
    .object({
        $schema: z.string().optional(),
        stacks: z.array(StackSpecSchema).max(50),
    })
    .strict()
    .superRefine((manifest, ctx) => {
        const seen = new Set<string>();
        for (const [index, stack] of manifest.stacks.entries()) {
            if (seen.has(stack.name)) {
                ctx.addIssue({ code: "custom", path: ["stacks", index, "name"], message: `"${stack.name}" is declared twice` });
            }
            seen.add(stack.name);
        }
        for (const [index, stack] of manifest.stacks.entries()) {
            for (const trigger of stack.triggers) {
                if ("after" in trigger && !seen.has(trigger.after.stack)) {
                    ctx.addIssue({ code: "custom", path: ["stacks", index, "triggers"], message: `"after" names "${trigger.after.stack}", which this file does not declare` });
                }
                if ("after" in trigger && trigger.after.stack === stack.name) {
                    ctx.addIssue({ code: "custom", path: ["stacks", index, "triggers"], message: "a stack cannot follow itself" });
                }
            }
        }
    });
export type StacksManifest = z.infer<typeof StacksManifestSchema>;

// The secret names a stack's entry reads (env values and registry passwords): what its grant must cover.
const SECRET_NAME = /\{\{secret:([A-Za-z0-9_./-]+)(?:\|file)?\}\}/gu;
export const stackSecretNames = (stack: Pick<StackSpec, "env" | "registries">): string[] => {
    const names = new Set<string>();
    for (const text of [...Object.values(stack.env), ...stack.registries.map((registry) => registry.password)]) {
        for (const match of text.matchAll(SECRET_NAME)) {
            names.add(match[1] ?? "");
        }
    }
    names.delete("");
    return [...names].sort();
};

// ---- what the engine sends: the deploy's own facts filled, secret references left for the daemon -------------------

export interface DeployFacts {
    readonly sha: string;
    readonly ref?: string | undefined;
    readonly stack: string;
}

const DEPLOY_REFERENCE = /\{\{deploy:([A-Za-z0-9_./-]+)\}\}/gu;

// The text with every `{{deploy:…}}` filled; an absent ref fills empty, an unknown name is left as written.
export const withDeployFacts = (text: string, facts: DeployFacts): string =>
    text.replace(DEPLOY_REFERENCE, (token, name: string) => {
        switch (name) {
            case "sha":
                return facts.sha;
            case "sha8":
                return facts.sha.slice(0, 8);
            case "ref":
                return facts.ref ?? "";
            case "stack":
                return facts.stack;
            default:
                return token;
        }
    });

// A secret written where the grant cannot see it, or as a file a `.env` has nothing to point at: refused before anything
// is sent, by where it is, never by what it holds.
export const misplacedSecrets = (spec: Pick<StackSpec, "env" | "registries">): string[] => {
    const refusals: string[] = [];
    for (const [key, value] of Object.entries(spec.env)) {
        for (const match of value.matchAll(/\{\{secret:([A-Za-z0-9_./-]+)\|file\}\}/gu)) {
            refusals.push(`${key} reads ${match[1] ?? ""} as a file, and a stack's .env has no file to point at: drop the |file, and its value is quoted into the .env with its lines.`);
        }
    }
    for (const registry of spec.registries) {
        if (registry.host.includes("{{secret:") || registry.username.includes("{{secret:")) {
            refusals.push(`The login for ${registry.host} names a secret outside its password: only a registry's password reads one.`);
        }
        if (/\{\{secret:[^}]*\|file\}\}/u.test(registry.password)) {
            refusals.push(`The login for ${registry.host} reads its password as a file, which a registry login cannot take.`);
        }
    }
    return refusals;
};
