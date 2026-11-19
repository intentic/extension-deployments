# intentic-deployments

Installs as **`intentic.deployments`**, from the registry (Extensions → Browse) or by repository URL at a commit. A
first-party intentic extension that is LISTED rather than baked into the sandbox: a sandbox is itself without it,
so it arrives only where someone reaches for it. Moved out of the monorepo at `intentic/intentic@41f72ba4aae6`
(`_extensions/deployments` there; this repository is where it lives now).

What is actually running on the servers you own: read from a Komodo you already operate, or straight from a computer
you paired with Intentic, with no Komodo at all.

## Responsibilities

- Show the estate: servers, stacks, deployments, and the state each is in.
- Join a running thing back to the repository it was built from.
- Notice incidents and carry them to the rail as a badge.
- Act on what is running: deploy, restart, start, stop, pull-and-deploy, and start an agent to fix a broken one.
- Run a sandbox from a host folder: point a Komodo stack at a folder already on one of its servers (what
  `ic sandbox compose <slug> --out <dir>` writes there), with `files_on_host` and `run_directory`, created by
  name (default `intentic-<slug>`), then deployed. Running the same folder again redeploys its stack; a name another
  stack already uses (git-backed, defined in Komodo, or another folder's) is refused rather than repointed.
- Read and drive the compose stacks on a paired computer (a device card) through the daemon's device-stack routes, and
  deploy a workspace repository there: its committed HEAD is packed in the sandbox, carried over the device link and
  started with `docker compose up -d --build`. A `.env` beside the stack on the computer is never sent or overwritten;
  "Set up its .env with the agent" starts a turn that fills it from stored secrets, through the secret gates a turn has.
- Give the agent a `deployments` tool server (`deploy_targets`, `device_stacks`, `deploy_to_device`), so a fix turn can
  redeploy its own fix and the "Redeploy when CI passes" automation can ship what passed.
- Talk to Komodo itself: the extension ships its own backend, and the daemon core carries no Komodo feature.
- Own the Komodo connection: the `komodo` card on the Capabilities page, its agent skill and the deployment-alert
  automation template all come from this manifest, so connecting Komodo and getting this view are one install.

## Key files

- [src/contract.ts](src/contract.ts): the extension's OWN wire shapes, imported by both halves so their wire
  cannot drift; zod only, so the web bundle never pulls the route table in.
- [src/server/server.ts](src/server/server.ts): the backend half (`activateServer`), built to `dist/server.js`
  (`pnpm build`) and run by the daemon's backend host. Reads the Komodo credential through the daemon's
  connection route and starts fix turns through `POST /agent`: both declared in `permissions.daemon`. The daemon
  serves a connection only to the extension that contributes its card, which is why the card lives here.
- [skills/komodo/SKILL.md](skills/komodo/SKILL.md): the agent's Komodo skill, mounted with the `komodo` card.
- [src/server/komodo-client.ts](src/server/komodo-client.ts): the Komodo Core API behind one client shape.
- [src/server/komodo-host-stack.ts](src/server/komodo-host-stack.ts): "Run a sandbox from a host folder", the
  stack it writes and the create-or-update-then-deploy order; [src/HostStackDialog.vue](src/HostStackDialog.vue) asks for it.
- [src/server/komodo-overview.ts](src/server/komodo-overview.ts): Komodo's vocabulary → the view's, pure and tested.
- [src/server/komodo-repos.ts](src/server/komodo-repos.ts): which workspace repo belongs to which stack.
- [src/server/komodo-store.ts](src/server/komodo-store.ts): seen-timestamps and repo→stack links for both kinds of board,
  keyed by connection (its runtime home, `.intentic/local/runtime/extensions/deployments/komodo.json`).
- [src/server/device-board.ts](src/server/device-board.ts): the device board's backend, answering in the Komodo board's
  shapes; [src/server/device-daemon.ts](src/server/device-daemon.ts) is its client for the daemon's
  `/system/devices/{id}/stacks…` routes.
- [src/server/native-overview.ts](src/server/native-overview.ts): compose stacks → the board's rows, and the alert log a
  computer doesn't keep, built from the state moves the backend sees; pure and tested. Its memory is
  [src/server/native-store.ts](src/server/native-store.ts) (`native.json` beside `komodo.json`).
- [src/server/device-operations.ts](src/server/device-operations.ts): what a device board started and how it ended.
- [src/server/tools.ts](src/server/tools.ts): the agent's `deployments` tools.
- [src/DeployDialog.vue](src/DeployDialog.vue) and [src/DeviceRepoRow.vue](src/DeviceRepoRow.vue): deploying a repo to a computer.
- [src/useDeploymentBoard.ts](src/useDeploymentBoard.ts), the board's data: what is running, where, and how it is doing.
- [src/incidents.ts](src/incidents.ts): what counts as an incident rather than as noise.
- [src/stateVisual.ts](src/stateVisual.ts): one mapping from a state to how it reads, so nothing invents its own colour.
- [src/RepoLinkRow.vue](src/RepoLinkRow.vue): the join from a deployment back to a repo.
- [src/extension.ts](src/extension.ts): activation, and why it is one tile however many Komodos are connected.

## How it fits

Capability-driven, not repo-driven: the same shape as `ext-pipelines`, for the same reason. Gating on the
intent and desired-state repos would mean someone who simply connects a Komodo they already run gets nothing.

**Two kinds of connection, one board.** A connection is a Komodo capability (`komodo/<id>/…` on the wire) or a paired
computer, `device:<card id>` in the picker and `device/<card id>/…` on the wire (`connectionRoutes` in
[src/contract.ts](src/contract.ts)). Both answer `DeployOverviewResponse`, with `source` saying which; the view hides
what only a Komodo has (its links, host-folder stacks) and shows what only a computer has (deploy, `.env`).

A computer keeps no alert log, so the device board makes one: the backend remembers each stack's last state and turns a
move into `unhealthy`, or a running stack going down, into an alert, resolved when it is back up. A stack the board
itself stopped going down is not news. A stack that is merely down is a level, never a breakage: `docker stop` leaves
exit codes 137 and 143 as often as 0. Intentic sandboxes' own compose projects never appear; the Devices view drives them.

Every press on a device board answers at once and runs on in the backend (`operations` in the overview), since a pull
or a build outlasts the backend proxy's 20 second wait for headers. The agent's `deploy_to_device` waits for its
deploy instead, inside the host's ten-minute tool deadline.

The computer checks its own switches: reading and driving stacks needs "Run commands", deploying also needs "Run
programs this sandbox sends". A refusal reaches the board in the computer's words, and a device whose agent predates
stacks (no `stacks` feature) says to update it.

**One tile, a switcher for connections.** Several Komodos share the one Deployments tile, the way Documentation
serves every repository from one: the header's picker chooses the connection (`?connection=`, remembered per
browser) and is absent over a single one. Two Komodos are still two production estates, so each keeps its own seen
mark: the tile's badge adds up what every connection still owes, and looking at staging never silences production.

**The repo rows narrow to the open project.** The board comes from the Komodo routes, not from
`api.workspace.repos()`, so the "Repositories" group filters itself with `api.workspace.inProject` and wears the
shared `ProjectChip`. Stacks, servers and incidents are the estate's and stay whole.

## Conventions & gotchas

- On a Komodo, this reads an estate and acts on what is in it; the one thing it writes to Komodo is the host-folder
  stack, whose folder the owner put on the server. It never writes into that folder, and it leaves the stack's
  `environment` empty so Komodo writes no `.env` over the folder's own.
- On a computer, nothing here removes a stack or a volume: the verbs are up, pull, restart, start and stop. A deploy
  copies files over the stack's folder and never deletes one, so data bind-mounted inside it survives a redeploy.
- The device routes ship with a sandbox newer than `engines` says; an older one answers 404, which the board reads as
  "update this sandbox" rather than as a computer that is down.

## Building and publishing

```sh
pnpm install     # pnpm, not npm: pnpm-workspace.yaml carries the build approvals the install needs
pnpm build       # dist/ — the UI bundle the host blob-imports, the backend bundle the daemon's backend host runs
pnpm typecheck
pnpm test        # the source (vitest), then the manifest and the BUILT bundle against a host stub (node --test)
```

`dist/` **is committed**: there is no build step at install time, so the sha you publish is literally the code
that runs in the owner's browser. Build before the commit, or a stale `dist` publishes stale behaviour under a
sha whose source says otherwise; `test/activate.test.mjs` runs against `dist/`, never `src/`, for that reason.

Publishing is a commit on `main` and a pull request against
[`intentic/registry`](https://github.com/intentic/registry) moving this extension's listing to the new sha. The
listing pins a commit, so fixing the code and leaving the listing is the one failure that reaches nobody but the
installer: **bumping `engines` means opening the listing pull request in the same sitting.**

The bundle inlines `@intentic/sandbox-contract` and `@intentic/extension-manifest` (and zod with them), since the host
publishes only `vue`, `@tanstack/vue-query`, `@intentic/extension-api` and `@intentic/extension-ui` to an installed
bundle. Narrowing the routes this extension reads to a `wire.ts` of its own, the way `intentic/extension-logs`
did, is the follow-up that makes it a version boundary rather than a coincidence.
