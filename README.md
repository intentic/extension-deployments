# intentic-deployments

Installs as **`intentic.deployments`**, from the registry (Extensions → Browse) or by repository URL at a commit. A
first-party intentic extension that is LISTED rather than baked into the sandbox: a sandbox is itself without it,
so it arrives only where someone reaches for it. Moved out of the monorepo at `intentic/intentic@41f72ba4aae6`
(`_extensions/deployments` there; this repository is where it lives now).

What is actually running on the servers you own: read from a Komodo you already operate, or straight from a computer
you paired with Intentic, with no Komodo at all; and the managed environments the sandbox itself deploys there, the
stacks your repositories declare in `.intentic/stacks.json`.

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
- Show and drive the managed environments: the compose stacks a repository declares in `.intentic/stacks.json`, which
  the daemon's deploys engine renders secrets for, deploys to a paired computer, keeps history of, rolls back and deploys
  by itself on CI. On a computer's board, each stack it runs: its state, the commit it runs and since when, a deploy
  under way, the last outcome and its error, its triggers in words, secrets not granted yet (the owner grants them here),
  secrets changed since it deployed, and what stops it deploying; Deploy, Roll back, Promote and its history.
- Give the agent a `deployments` tool server: `environments`, `deploy_environment`, `rollback_environment`,
  `promote_environment` and `environment_history` for managed environments, and `deploy_targets`, `device_stacks` and
  `deploy_to_device` for a repository without a stacks manifest, so a fix turn can redeploy its own fix.
- Offer two automations on the daemon's `deploys` events, neither of which deploys: "Investigate a failed deploy or an
  unhealthy stack" and "Low disk or memory on a server". CI deploys by itself through a manifest's `ci` trigger, with no
  model, so there is no "redeploy on green" template any more.
- Talk to Komodo itself: the extension ships its own backend, and the daemon core carries no Komodo feature.
- Own the Komodo connection: the `komodo` card on the Capabilities page, its agent skill and the deployment-alert
  automation template all come from this manifest, so connecting Komodo and getting this view are one install.

## Key files

- [src/contract.ts](src/contract.ts): the extension's OWN wire shapes, imported by both halves so their wire
  cannot drift; zod only, so the web bundle never pulls the route table in.
- [src/deploysWire.ts](src/deploysWire.ts): the daemon's `/deploys/*` shapes as this extension reads them (the published
  sandbox contract predates them), loose so a newer daemon's fields never drop the board, and how a refusal reads: a bare
  404 is a sandbox from before managed environments.
- [src/environments.ts](src/environments.ts): managed environments in the board's words, pure and tested: triggers in
  words, a record's origin and end, the row's state, and how a computer's board gives way to the environments on it.
- [src/useEnvironments.ts](src/useEnvironments.ts) and [src/EnvironmentRow.vue](src/EnvironmentRow.vue): the board's
  Environments group, its presses and one stack's history.
- [src/server/deploys-daemon.ts](src/server/deploys-daemon.ts): the backend's client for `/deploys/*`, and the wait on a
  queued record that the agent's tools hold.
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
  keyed by connection, in the extension's own state directory (`api.stateDir`); a file still in the legacy bare-name
  folder (`.intentic/local/runtime/extensions/deployments/`) is read until the first write lands in the new place
  ([src/server/state-file.ts](src/server/state-file.ts)).
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

**Managed environments on a computer's board.** The stacks a repository declares in `.intentic/stacks.json` are the
daemon's (`/deploys/*`, sandbox-contract `deploys.contract.ts`): it reads the manifests, renders secrets under the
owner's grant, runs one deploy per stack at a time and keeps the records. A computer's board shows an "Environments"
group of those it runs (and of any whose computer does not resolve, so its problem is seen somewhere), narrowed to the
open project; a raw stack row of the same name on that computer gives way to it, and a repository with a manifest is no
longer offered as a plain compose deploy. A workspace whose repositories declare nothing sees no change at all.

The board READS them through its backend (`/environments`, `/environments/history`), which also serves the agent's
tools. A PRESS (deploy HEAD, roll back, promote, grant) goes from the browser straight to the daemon as the person
pressing (`permissions.sandbox`): the record names them, and the daemon holds them to their own role. A grant above all:
`/deploys/grants/grant` is closed to every machine credential, an extension's included, so "Grant 3 secrets" is offered
to the owner and Full access only, and anyone else sees what waits on them. An agent asks for a grant on a card of its
own; a deploy refused for one raises that card by itself.

The agent's environment tools queue a deploy and then follow its record through the stack's history, about nine
minutes at most, under the host's ten-minute deadline: one that outlasts that answers that it is still running, with its
record id, since it carries on regardless. A failed deploy the engine rolls back reads as settled only once the rollback
after it has ended. A link `/ext/deployments?repo=<repo>&stack=<stack>` (what a forge's deployment points back to)
switches the board to the computer that stack runs on and opens its row.

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
  "update this sandbox" rather than as a computer that is down. The same goes for `/deploys/*`: a bare 404 (no oRPC
  `message`) is a sandbox from before managed environments, said on the board only when a repository here declares
  stacks; a 404 WITH a message is the daemon's own refusal (a stack the manifest does not declare) and is shown as one.
- `activateServer` hands back a `deactivate` (ending any wait a tool holds on a deploy), so the host reloads this
  backend alone on a rebuild, an update or a toggle.

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
bundle. The `/deploys/*` routes are already read through a wire file of this extension's own
([src/deploysWire.ts](src/deploysWire.ts)), since the published contract predates them; narrowing the rest of what this
extension reads the same way, as `intentic/extension-logs` did, is the follow-up that makes it a version boundary
rather than a coincidence.
