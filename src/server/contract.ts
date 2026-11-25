import { oc } from "@orpc/contract";
import { z } from "zod";
import {
    DeviceActionParamSchema,
    DeviceDeployParamSchema,
    DeviceEnvironmentParamSchema,
    DeviceFixParamSchema,
    DeviceLinkParamSchema,
    DeviceLogsParamSchema,
    DeviceParamSchema,
    DeployActionParamSchema,
    DeployCapabilityParamSchema,
    DeployFixParamSchema,
    DeployFixResponseSchema,
    DeployHostStackParamSchema,
    DeployHostStackResponseSchema,
    DeployLinkParamSchema,
    DeployLogsParamSchema,
    DeployLogsResponseSchema,
    DeployOverviewResponseSchema,
    DeploySeenResponseSchema,
    EnvironmentHistoryParamSchema,
    EnvironmentHistoryResponseSchema,
    EnvironmentsOverviewSchema,
} from "../contract.js";

const OkSchema = z.object({ ok: z.literal(true) });

// The Deployments rail view's whole backend, served from this extension's /x namespace (the daemon proxies, the host
// strips the prefix). Routes are keyed by capability id, since a sandbox can hold more than one Komodo connection; the
// browser never holds the API key.
export const komodoContract = {
    // One fan-out (deployments, stacks, servers, alerts); unreachable resolves `reachable: false`, not a throw.
    overview: oc
        .route({ method: "GET", path: "/komodo/{capability}/overview" })
        .input(DeployCapabilityParamSchema)
        .output(DeployOverviewResponseSchema),
    action: oc.route({ method: "POST", path: "/komodo/{capability}/action" }).input(DeployActionParamSchema).output(OkSchema),
    // Binds a repo to a stack (empty `stack` clears it); the backend suggests by name, the owner confirms.
    link: oc.route({ method: "POST", path: "/komodo/{capability}/link" }).input(DeployLinkParamSchema).output(OkSchema),
    logs: oc.route({ method: "POST", path: "/komodo/{capability}/logs" }).input(DeployLogsParamSchema).output(DeployLogsResponseSchema),
    fix: oc.route({ method: "POST", path: "/komodo/{capability}/fix" }).input(DeployFixParamSchema).output(DeployFixResponseSchema),
    // Creates or repoints a files-on-host stack at a folder on a server, then deploys it.
    hostStack: oc
        .route({ method: "POST", path: "/komodo/{capability}/host-stack" })
        .input(DeployHostStackParamSchema)
        .output(DeployHostStackResponseSchema),
    // Marks this connection read, per capability; backend's own clock, so a skewed browser can't fake it.
    seen: oc.route({ method: "POST", path: "/komodo/{capability}/seen" }).input(DeployCapabilityParamSchema).output(DeploySeenResponseSchema),
};

// The device board's routes: one of the owner's own computers, keyed by its card id, through the daemon's device-stack
// routes. Same answers as the Komodo routes above, so one view draws both. Every press answers at once; what it started
// shows in the overview's `operations`, since a pull or a build outlasts any request.
export const deviceContract = {
    deviceOverview: oc.route({ method: "GET", path: "/device/{device}/overview" }).input(DeviceParamSchema).output(DeployOverviewResponseSchema),
    deviceAction: oc.route({ method: "POST", path: "/device/{device}/action" }).input(DeviceActionParamSchema).output(OkSchema),
    deviceLink: oc.route({ method: "POST", path: "/device/{device}/link" }).input(DeviceLinkParamSchema).output(OkSchema),
    deviceLogs: oc.route({ method: "POST", path: "/device/{device}/logs" }).input(DeviceLogsParamSchema).output(DeployLogsResponseSchema),
    deviceFix: oc.route({ method: "POST", path: "/device/{device}/fix" }).input(DeviceFixParamSchema).output(DeployFixResponseSchema),
    deviceSeen: oc.route({ method: "POST", path: "/device/{device}/seen" }).input(DeviceParamSchema).output(DeploySeenResponseSchema),
    // Packs the repo's committed tree and runs it on the computer as this stack; links the repo to the stack once it went.
    deviceDeploy: oc.route({ method: "POST", path: "/device/{device}/deploy" }).input(DeviceDeployParamSchema).output(OkSchema),
    // Starts an agent turn that fills the stack's `.env` from stored secrets; answers its conversation id.
    deviceEnvironment: oc
        .route({ method: "POST", path: "/device/{device}/environment" })
        .input(DeviceEnvironmentParamSchema)
        .output(DeployFixResponseSchema),
};

// The managed environments (the daemon's `/deploys/*`), read for the board. Workspace-wide rather than per connection:
// each device board shows the ones its computer runs. Presses go from the browser to the daemon directly, as the person.
export const environmentsContract = {
    // A sandbox from before managed environments answers `available: false` rather than an error.
    environments: oc.route({ method: "GET", path: "/environments" }).output(EnvironmentsOverviewSchema),
    environmentHistory: oc
        .route({ method: "GET", path: "/environments/history" })
        .input(EnvironmentHistoryParamSchema)
        .output(EnvironmentHistoryResponseSchema),
};

export const deploymentsContract = { ...komodoContract, ...deviceContract, ...environmentsContract };
