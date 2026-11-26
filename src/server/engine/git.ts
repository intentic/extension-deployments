import { execFile } from "node:child_process";
import { access, realpath } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { errorMessage } from "@intentic/base/errors";
import { ORPCError } from "@orpc/server";
import type { z } from "zod";
import { discoverRepoDirs } from "../discover.js";
import { STACKS_MANIFEST_PATH, type StackSpec, type StacksManifest, StacksManifestSchema } from "./manifest.js";

// THE WORKSPACE'S REPOSITORIES THROUGH GIT, as the engine reads them: every manifest off a COMMIT, never the working
// tree (the board lists what HEAD declares, and a deploy reads the manifest of the very commit it deploys, so what runs
// is what was reviewed and landed with it), the commits a deploy names, fetched from the remote when the checkout lacks
// one, and whether one commit holds another. Run in `api.workspaceRoot`, the same checkout the daemon packs from.

export type Git = (dir: string, args: readonly string[]) => Promise<string>;

// git's stderr on a failure, as the error's message; its exit code on `code`.
export class GitFailed extends Error {
    constructor(
        message: string,
        readonly code: number | undefined,
    ) {
        super(message);
        this.name = "GitFailed";
    }
}

// No prompt can ever answer from a backend, so git is told never to ask.
const QUIET_ENV = { ...process.env, GIT_TERMINAL_PROMPT: "0", GIT_ASKPASS: "echo", LC_ALL: "C" };

export const runGit: Git = (dir, args) =>
    new Promise((resolve, reject) => {
        execFile("git", [...args], { cwd: dir, env: QUIET_ENV, maxBuffer: 16 * 1024 * 1024, timeout: 120_000 }, (error, stdout, stderr) => {
            if (error === null) {
                resolve(stdout);
                return;
            }
            const code = typeof error.code === "number" ? error.code : undefined;
            reject(new GitFailed(stderr.trim() === "" ? error.message : stderr.trim(), code));
        });
    });

// The workspace root's own repository, as the daemon names it on the wire.
export const ROOT_REPO = "root";

const refused = (message: string): ORPCError<"BAD_REQUEST", unknown> => new ORPCError("BAD_REQUEST", { message });

const hasGitEntry = async (dir: string): Promise<boolean> =>
    access(join(dir, ".git")).then(
        () => true,
        () => false,
    );

const REPO_ID = /^(?!.*(?:^|\/)\.\.?(?:\/|$))[A-Za-z0-9][A-Za-z0-9._/-]*$/u;

// The repository's folder, refused when it is not a repository of this workspace.
export const repoFolder = async (root: string, repo: string): Promise<string> => {
    if (repo !== ROOT_REPO && !REPO_ID.test(repo)) {
        throw refused(`"${repo}" is not a repository in this workspace: name it by its folder under the workspace, like my-app or apps/web`);
    }
    const [real, realRoot] = await Promise.all([realpath(repo === ROOT_REPO ? root : join(root, repo)).catch(() => undefined), realpath(root)]);
    if (real === undefined) {
        throw refused(`there is no folder "${repo}" in this workspace`);
    }
    if (real !== realRoot && !real.startsWith(`${realRoot}${sep}`)) {
        throw refused(`"${repo}" leads outside this workspace`);
    }
    if (!(await hasGitEntry(real))) {
        throw refused(`"${repo}" is not a git repository: a deploy carries a commit, so the folder must be a repository's own top`);
    }
    return real;
};

export type ManifestRead =
    | { readonly kind: "absent" }
    | { readonly kind: "read"; readonly manifest: StacksManifest }
    | { readonly kind: "broken"; readonly error: string };

const issuesOf = (error: z.ZodError): string =>
    error.issues.map((issue) => `${issue.path.length === 0 ? "the file" : issue.path.join(".")}: ${issue.message}`).join("; ");

// The manifest as `rev` holds it. A repository with no commits, or a commit without the file, declares nothing.
export const manifestAt = async (dir: string, rev: string, git: Git = runGit): Promise<ManifestRead> => {
    const spot = `${rev}:${STACKS_MANIFEST_PATH}`;
    const kind = await git(dir, ["cat-file", "-t", spot]).then(
        (stdout) => stdout.trim(),
        // git's only answer for a path a commit lacks (or a HEAD not there yet) is a failure: it declares nothing.
        () => undefined,
    );
    if (kind !== "blob") {
        return { kind: "absent" };
    }
    const text = await git(dir, ["cat-file", "blob", spot]);
    let raw: unknown;
    try {
        raw = JSON.parse(text);
    } catch (error) {
        return { kind: "broken", error: `${STACKS_MANIFEST_PATH} is not JSON: ${errorMessage(error)}` };
    }
    const parsed = StacksManifestSchema.safeParse(raw);
    return parsed.success ? { kind: "read", manifest: parsed.data } : { kind: "broken", error: `${STACKS_MANIFEST_PATH}: ${issuesOf(parsed.error)}` };
};

export interface DeclaredStack {
    readonly repo: string;
    readonly spec: StackSpec;
}

export interface WorkspaceManifests {
    readonly stacks: readonly DeclaredStack[];
    readonly errors: readonly { readonly repo: string; readonly error: string }[];
}

// Every repository in the workspace, as workspace-relative ids: the root's own first when it is one.
export const workspaceRepos = async (root: string): Promise<string[]> => [
    ...((await hasGitEntry(root)) ? [ROOT_REPO] : []),
    ...(await discoverRepoDirs(root)).map((dir) => relative(root, dir).split(sep).join("/")),
];

const repoDir = (root: string, repo: string): string => (repo === ROOT_REPO ? root : join(root, repo));

// What every repository's HEAD declares, and which manifests could not be read; one broken file hides nothing else.
export const workspaceManifests = async (root: string, git: Git = runGit): Promise<WorkspaceManifests> => {
    const repos = await workspaceRepos(root);
    const read = await Promise.all(
        repos.map(async (repo) => ({
            repo,
            read: await manifestAt(repoDir(root, repo), "HEAD", git).catch((error: Error): ManifestRead => ({ kind: "broken", error: error.message })),
        })),
    );
    return {
        stacks: read.flatMap(({ repo, read: found }) => (found.kind === "read" ? found.manifest.stacks.map((spec) => ({ repo, spec })) : [])),
        errors: read.flatMap(({ repo, read: found }) => (found.kind === "broken" ? [{ repo, error: found.error }] : [])),
    };
};

// HEAD's full sha, or the refusal saying why there is none.
export const headCommit = async (dir: string, repo: string, git: Git = runGit): Promise<string> =>
    (
        await git(dir, ["rev-parse", "--verify", "--quiet", "HEAD^{commit}"]).catch((error: Error) => {
            // `--quiet` keeps a missing HEAD to a bare exit 1; anything else is another failure, in git's words.
            const missing = error instanceof GitFailed && error.code === 1;
            throw refused(missing ? `"${repo}" has no commits yet: commit what should run, then deploy` : `could not read "${repo}"'s last commit: ${error.message}`);
        })
    ).trim();

// The branch HEAD is on, or undefined when it is detached.
export const branchOf = async (dir: string, git: Git = runGit): Promise<string | undefined> =>
    git(dir, ["symbolic-ref", "--quiet", "--short", "HEAD"]).then(
        (stdout) => stdout.trim() || undefined,
        // A detached HEAD is git failing to name a branch, which is the answer: none.
        () => undefined,
    );

const resolvedCommit = async (dir: string, wanted: string, git: Git): Promise<string | undefined> =>
    git(dir, ["rev-parse", "--verify", "--quiet", `${wanted}^{commit}`]).then(
        (stdout) => stdout.trim() || undefined,
        () => undefined,
    );

// The remote a commit is fetched from: `origin`, else the first one the repository names.
const remoteOf = async (dir: string, git: Git): Promise<string | undefined> => {
    const remotes = (await git(dir, ["remote"])).split("\n").map((line) => line.trim()).filter((line) => line !== "");
    return remotes.includes("origin") ? "origin" : remotes[0];
};

// Brings what the repository's remote holds; answers why it could not, or nothing.
export const fetchRemote = async (dir: string, git: Git = runGit): Promise<string | undefined> => {
    try {
        const remote = await remoteOf(dir, git);
        if (remote === undefined) {
            return "it has no remote";
        }
        await git(dir, ["fetch", "--quiet", "--no-tags", remote]);
        return undefined;
    } catch (error) {
        return errorMessage(error);
    }
};

// The full sha of a commit the request names, fetched from the remote first when the checkout lacks it.
export const exactCommit = async (dir: string, repo: string, wanted: string, fetch: () => Promise<string | undefined>, git: Git = runGit): Promise<string> => {
    if (!/^[0-9a-f]{7,64}$/u.test(wanted)) {
        throw refused(`"${wanted}" is not a commit: name one by its sha, full or abbreviated`);
    }
    const local = await resolvedCommit(dir, wanted, git);
    if (local !== undefined) {
        return local;
    }
    const failed = await fetch();
    const fetched = await resolvedCommit(dir, wanted, git);
    if (fetched !== undefined) {
        return fetched;
    }
    throw refused(
        failed === undefined
            ? `"${repo}" has no commit ${wanted}, here or on its remote: push it, or name a commit that exists`
            : `"${repo}" has no commit ${wanted} here, and fetching its remote failed: ${failed}`,
    );
};

// Whether `descendant` holds `ancestor`: git answers 0 for yes, 1 for no; anything else (a commit it cannot place) is
// not known to hold it, so the caller goes ahead and the deploy says what is missing.
export const holds = async (dir: string, descendant: string, ancestor: string, git: Git = runGit): Promise<boolean | "unknown"> => {
    if (descendant === ancestor) {
        return true;
    }
    return await git(dir, ["merge-base", "--is-ancestor", ancestor, descendant]).then(
        () => true,
        (error: Error) => (error instanceof GitFailed && error.code === 1 ? false : "unknown"),
    );
};
