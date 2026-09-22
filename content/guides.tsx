import type { ReactNode } from "react";
import { Check, Note, Table } from "./guide-parts";
import { journeyGuides } from "./journey-guides";
import Link from "next/link";
import CodeBlock from "@/app/components/CodeBlock";
import Capture from "@/app/components/Capture";
import EndpointBuilder from "@/app/docs/_components/EndpointBuilder";
export type Guide = {
  title: string;
  description: string;
  outcome: string;
  sections: { id: string; title: string; body: ReactNode }[];
};
const install =
  "https://raw.githubusercontent.com/teckedd-code2save/groundcontrol/main/scripts/install";
export const guides: Record<string, Guide> = {
  ...journeyGuides,
  "getting-started": {
    title: "Install GroundControl and claim your instance",
    description:
      "Start on a Linux VPS, reach the private installer through an SSH tunnel, and create your administrator account.",
    outcome:
      "A claimed, healthy GroundControl instance with its local server enrolled.",
    sections: [
      {
        id: "before-you-start",
        title: "What you need",
        body: (
          <>
            <Table
              headers={["Requirement", "Why it is needed"]}
              rows={[
                [
                  "A Linux host you administer",
                  "The installer runs on the destination server using root or sudo.",
                ],
                [
                  "curl, a working Docker daemon and Compose",
                  "The installer can install Docker when it is missing and runs with root; Compose must be available.",
                ],
                [
                  "SSH access from your computer",
                  "You will use a local tunnel to claim the private instance.",
                ],
                [
                  "A hostname for the next step",
                  "A stable HTTPS address is the documented route for connecting a remote agent.",
                ],
              ]}
            />
            <p>
              GroundControl is a privileged host operations tool. Its canonical
              Compose file mounts the Docker socket and host directories such as{" "}
              <code>/opt</code>, <code>/etc</code> and <code>/var/www</code>.
              Install it on a host you intend it to manage. The MCP grant later
              exposes a much narrower set of operations to an agent.
            </p>
          </>
        ),
      },
      {
        id: "install",
        title: "1. Run the installer on the VPS",
        body: (
          <>
            <p>
              SSH into your VPS, then run this there. The script downloads the
              published image, writes installation files under{" "}
              <code>/opt/groundcontrol</code>, creates persistent database
              storage and starts the container on <code>127.0.0.1:3003</code>.
            </p>
            <CodeBlock
              code={`curl -fsSL ${install} | sudo bash`}
              label="On your VPS"
            />
            <p>For an agent or script that needs structured output, use:</p>
            <CodeBlock
              code={`curl -fsSL ${install} | sudo bash -s -- --json`}
              label="On your VPS · JSON output"
            />
            <Check>
              <p>
                Look for <code>claim_required</code>, healthy container checks,
                a <code>claimUrl</code> and its expiry. The claim is single-use
                and lasts 30 minutes by default. Keep its token private.
              </p>
            </Check>
          </>
        ),
      },
      {
        id: "tunnel",
        title: "2. Open the private instance from your computer",
        body: (
          <>
            <p>
              In a second terminal on your own computer, open a tunnel. Replace{" "}
              <code>YOUR_USER</code> and <code>YOUR_VPS_IP</code> with the SSH
              account and address you normally use.
            </p>
            <CodeBlock
              code="ssh -N -L 3003:127.0.0.1:3003 YOUR_USER@YOUR_VPS_IP"
              label="On your computer"
            />
            <p>
              Leave that terminal running. Open the installer’s full{" "}
              <code>http://127.0.0.1:3003/claim#token=…</code> URL in your
              computer’s browser. The URL reaches the VPS through your tunnel;
              it is not a public management endpoint.
            </p>
            <Note>
              <p>
                If local port 3003 is occupied, use{" "}
                <code>
                  ssh -N -L 13003:127.0.0.1:3003 YOUR_USER@YOUR_VPS_IP
                </code>{" "}
                and change only the port in the claim URL to <code>13003</code>.
              </p>
            </Note>
          </>
        ),
      },
      {
        id: "claim",
        title: "3. Create the owner account",
        body: (
          <>
            <p>
              On <strong>Claim GroundControl</strong>, enter an administrator
              username, a password and its confirmation. The password requires
              at least 12 characters with upper and lower case letters, a number
              and a symbol. The installing agent should not retain it.
            </p>
            <p>
              The claim code is read from the URL fragment. Submit the form to
              establish ownership. If the claim expired before you used it,
              rerun the installer on that still-unclaimed instance for a new
              claim; an already-claimed instance uses its existing login.
            </p>
            <Check>
              <p>
                Onboarding opens after claim. The local host should already be
                enrolled. You do not need to paste its SSH private key back into
                GroundControl. Additional remote servers can be added separately
                through <strong>Add server</strong>.
              </p>
            </Check>
          </>
        ),
      },
      {
        id: "verify",
        title: "4. Verify the installation",
        body: (
          <>
            <p>
              Run these read-only checks on the VPS. Replace the port if you
              changed it during installation.
            </p>
            <CodeBlock
              label="On your VPS · read-only checks"
              code={
                "docker inspect --format '{{.State.Health.Status}}' groundcontrol-web\ndocker port groundcontrol-web\ncurl -fsS http://127.0.0.1:3003/api/auth/claim"
              }
            />
            <Table
              headers={["Check", "Expected result"]}
              rows={[
                ["Container health", "healthy"],
                ["Port mapping", "127.0.0.1:3003, rather than a public bind"],
                ["Claim status", "claimed: true after you finish claiming"],
              ]}
            />
            <p>
              Continue with{" "}
              <Link href="/docs/after-install">After installation</Link> to
              review the host scan and choose your first application. Remote
              agents need{" "}
              <Link href="/docs/publishing">a reachable HTTPS address</Link>;{" "}
              for a private evaluation, keep using the tunnel.
            </p>
          </>
        ),
      },
    ],
  },
  publishing: {
    title: "Give your instance a stable HTTPS address",
    description:
      "Publish the control plane from onboarding, then verify the address your agent client will use for MCP and OAuth.",
    outcome:
      "An HTTPS origin that serves your login and advertises OAuth for /mcp.",
    sections: [
      {
        id: "choose",
        title: "1. Choose how to publish",
        body: (
          <>
            <p>
              After claim, continue to the onboarding step titled{" "}
              <strong>Publish this GroundControl instance</strong>. Choose a
              method appropriate for the host and DNS you control.
            </p>
            <Table
              headers={["Option in GroundControl", "Use it when", "Result"]}
              rows={[
                [
                  "I have a domain",
                  "Your hostname resolves to this VPS and Caddy can serve it",
                  "A durable HTTPS origin",
                ],
                [
                  "Use Cloudflare Tunnel",
                  "Your domain is on Cloudflare and you want a private origin",
                  "A named outbound tunnel",
                ],
                [
                  "No domain yet",
                  "You need a temporary evaluation endpoint",
                  "A temporary trycloudflare.com URL",
                ],
                [
                  "Keep it private",
                  "You only need local or SSH access",
                  "No externally reachable MCP endpoint",
                ],
              ]}
            />
            <Note>
              <p>
                The named-domain routes are the durable setup. A temporary
                tunnel hostname can change, requiring you to reconnect the MCP
                client. The clean-host acceptance test covers private
                installation; it does not certify every DNS and tunnel provider.
              </p>
            </Note>
          </>
        ),
      },
      {
        id: "domain",
        title: "2. Publish with your domain",
        body: (
          <>
            <ol>
              <li>
                Select <strong>I have a domain</strong>.
              </li>
              <li>
                Enter your hostname, for example <code>gc.example.com</code>, in{" "}
                <strong>GroundControl hostname</strong>.
              </li>
              <li>
                Choose <strong>Publish &amp; verify</strong>. If DNS is not
                ready, the page shows the exact A record to create with your DNS
                provider.
              </li>
              <li>
                Add that record, wait for it to resolve, then choose{" "}
                <strong>Publish &amp; verify</strong> again.
              </li>
              <li>
                Open the returned <strong>Management URL</strong> and confirm
                that your GroundControl login loads over HTTPS.
              </li>
            </ol>
            <p>
              On hosts with an existing proxy, review who already owns ports 80
              and 443 before choosing the Caddy route. An existing reverse proxy
              can forward the hostname to the loopback service. Do not start a
              second edge proxy on those ports.
            </p>
          </>
        ),
      },
      {
        id: "cloudflare",
        title: "Or use a Cloudflare Tunnel",
        body: (
          <>
            <ol>
              <li>
                Select <strong>Use Cloudflare Tunnel</strong> and enter the
                hostname.
              </li>
              <li>
                If the connector is not configured, provide a Cloudflare API
                token with Tunnel and DNS access in the product’s password
                field. Supply the account ID if the token can access more than
                one account.
              </li>
              <li>
                Choose <strong>Publish &amp; verify</strong>. GroundControl
                creates or reuses a named tunnel and updates the DNS route.
              </li>
              <li>
                Open the resulting Management URL. The host’s management port
                remains on loopback.
              </li>
            </ol>
            <p>
              To evaluate without a domain, choose{" "}
              <strong>No domain yet → Create temporary HTTPS</strong>. Treat
              that URL as temporary identity, not a permanent OAuth issuer.
            </p>
          </>
        ),
      },
      {
        id: "discovery",
        title: "3. Verify OAuth discovery",
        body: (
          <>
            <p>
              Replace the example host below with your actual HTTPS origin. Run
              this from a machine outside the VPS so you test the public path.
            </p>
            <CodeBlock
              label="From your computer"
              code={
                "curl -fsS https://gc.example.com/.well-known/oauth-protected-resource\ncurl -fsS https://gc.example.com/.well-known/oauth-authorization-server"
              }
            />
            <Check>
              <p>
                Both requests should return JSON, not a login page or proxy
                error. The resource should identify your HTTPS <code>/mcp</code>{" "}
                endpoint; issuer and authorization URLs should use the same
                public host. A bare unauthenticated request to <code>/mcp</code>{" "}
                may return 401 to start discovery. That response alone does not
                indicate a fault.
              </p>
            </Check>
            <p>
              If you see HTTP, localhost, or an old hostname in metadata, fix
              public-origin/proxy configuration before adding the plugin.
              Continue to{" "}
              <Link href="/docs/first-deployment">connect one deployment</Link>.
            </p>
          </>
        ),
      },
    ],
  },
  "first-deployment": {
    title: "Enrol an existing application",
    description:
      "Start with an existing Docker Compose application. Give GroundControl an explicit workload identity before granting an agent access.",
    outcome:
      "A tracked workload whose source, containers and public identity you have checked.",
    sections: [
      {
        id: "enroll",
        title: "1. Find and enroll the workload",
        body: (
          <>
            <p>
              Open <strong>Deployments</strong> in your instance and choose{" "}
              <strong>Scan host</strong>. Existing workloads appear under{" "}
              <strong>Discovered on this host</strong>. Select{" "}
              <strong>Enrol deployment</strong> for the intended Compose
              project. Existing enrolled workloads can be opened directly by
              name.
            </p>
            <p>
              A discovered candidate is read-only until enrollment. Confirm the
              host, source path and Compose identity correspond to your
              application before allowing mutations. Begin with an application
              you can redeploy and recover safely.
            </p>
            <p>
              If the application is missing, use the{" "}
              <Link href="/docs/discovery#missing">discovery checks</Link>{" "}
              first. Enrollment registers its host, source or container and
              optional Compose path. It does not move its files, restart
              containers or deploy a new release.
            </p>
            <Check>
              <p>
                The workload appears under <strong>Enrolled deployments</strong>
                . Its <strong>Manage</strong> tab lists the expected containers.
                An agent grant will select this enrolled workload, not every
                container on the host.
              </p>
            </Check>
          </>
        ),
      },
      {
        id: "project",
        title: "2. Group it into a project, if useful",
        body: (
          <>
            <p>
              <strong>Enrol deployment</strong> adds the candidate without a
              project group. To group it immediately, open its options menu and
              choose <strong>Enrol into project</strong> or{" "}
              <strong>Create project and enrol</strong>. Selecting a project
              completes that enrollment; there is no separate final submit
              button in the selection dialog.
            </p>
            <Capture
              file="enrollment-desktop.jpg"
              alt="The GroundControl Enrol into a project dialog with existing projects and Create and link"
              caption="Actual enrollment dialog. The project groups deployments; it does not relocate their folders or change their runtime."
            />
            <p>
              You can change this later with the enrolled workload’s{" "}
              <strong>Move to project</strong> action. Several environments or
              applications can share a group while retaining distinct deployment
              identities.
            </p>
          </>
        ),
      },
      {
        id: "management-mode",
        title: "3. Understand tracking and management mode",
        body: (
          <>
            <p>
              Enrollment from the discovery UI normally creates a{" "}
              <code>track</code> record with an initial <code>observed</code>{" "}
              status. A deployment created through Templates is enrolled as{" "}
              <code>managed</code>. Applications already known to GroundControl
              can also be reconciled into its managed inventory.
            </p>
            <Table
              headers={["State", "What it means"]}
              rows={[
                [
                  "Discovered candidate",
                  "A host finding. It is not yet an enrolled deployment or an external-agent grant.",
                ],
                [
                  "Enrolled / track",
                  "GroundControl has a persistent workload identity. Available operator and agent actions have their own permissions and runtime requirements.",
                ],
                [
                  "Managed",
                  "Eligible for managed source deployment when source, configuration and repository requirements are met.",
                ],
                [
                  "Agent-authorized",
                  "A separate OAuth grant permits named capabilities on the selected enrolled deployment.",
                ],
              ]}
            />
            <Note>
              <p>
                There is currently no general “promote tracked workload to
                managed” control in this UI. Saving a GitHub URL does not
                perform that conversion. A disabled{" "}
                <strong>Autopilot after merge</strong> switch may mean the
                workload is not managed or the explicit repository is not
                linked. Do not change database flags or create a duplicate
                production stack to bypass that requirement.
              </p>
            </Note>
            <p>
              Tracking mode is not a guarantee that every action is read-only.
              For an external agent, inspect the OAuth scopes and selected
              workload. Start with inspection and health before any authorized
              runtime action.
            </p>
          </>
        ),
      },
      {
        id: "source",
        title: "4. Record source and public identity",
        body: (
          <>
            <p>
              Open the deployment’s <strong>Configure</strong> tab. In{" "}
              <strong>Source identity</strong>, complete the following and
              choose <strong>Save source</strong>.
            </p>
            <Table
              headers={["Field", "What to enter"]}
              rows={[
                [
                  "Public URL",
                  "The real customer endpoint, such as https://app.example.com",
                ],
                [
                  "GitHub repository",
                  "Select the linked repository or enter its full URL",
                ],
                [
                  "Default branch",
                  "The branch you intend to deploy, usually main",
                ],
                [
                  "Deployed commit",
                  "The revision actually running, not an arbitrary latest commit",
                ],
                [
                  "Repository path",
                  "Monorepo subdirectory, or leave empty for repository root",
                ],
              ]}
            />
            <Capture
              file="configure-desktop.jpg"
              alt="RentAWeekend Configure tab showing repository, branch, public URL and Autopilot after merge"
              caption="Actual GroundControl desktop capture, 22 September 2026. RentAWeekend is an enrolled example; use your own repository and URL."
            />
            <p>
              For private repositories, use{" "}
              <strong>Settings → Connectors</strong> to connect GitHub and grant
              repository access, then return and select the explicit repository.
              Keep <strong>Autopilot after merge</strong> off until a manual
              deployment has been verified.
            </p>
          </>
        ),
      },
      {
        id: "configuration",
        title: "5. Check configuration and runtime",
        body: (
          <>
            <p>
              Use <strong>Manage → View compose</strong> to inspect the Compose
              configuration. Check required variables in the{" "}
              <strong>Environment</strong> tab. Credentials belong in your
              instance’s configuration controls, not in a conversation or
              screenshot.
            </p>
            <p>
              Check the expected web, API and dependency containers. A running
              container alone does not prove the customer route works. Open{" "}
              <strong>Open live</strong> and test a meaningful route.
            </p>
            <Check>
              <p>
                You can explain which repository and revision correspond to the
                running services, and which public URL must pass after
                deployment. If those identities disagree, resolve them before
                enabling automation.
              </p>
            </Check>
          </>
        ),
      },
      {
        id: "agent-next",
        title: "6. Connect your agent to this workload",
        body: (
          <>
            <p>
              Go to <Link href="/docs/agent-access">Connect your agent</Link>.
              During OAuth consent, select this deployment. After connection,
              ask the agent to inspect it and run a health check. Follow{" "}
              <Link href="/docs/deployment-automation">
                Deploy &amp; automate
              </Link>{" "}
              for the first controlled redeploy. Enrollment does not grant an
              external agent any access by itself.
            </p>
            <p>
              To remove a workload from the inventory, its actions menu offers{" "}
              <strong>Stop tracking</strong>. This removes the enrollment
              record; it does not remove the application’s files or containers.
              Review any dependent grants and records before using it.
            </p>
          </>
        ),
      },
    ],
  },
  "agent-access": {
    title: "Connect an agent through OAuth and MCP",
    description:
      "Authorize a compatible MCP client to use your GroundControl instance. Follow the shared setup and the ChatGPT example below.",
    outcome:
      "Your agent can list a granted deployment, inspect it and return a health result.",
    sections: [
      {
        id: "client",
        title: "Choose your MCP client",
        body: (
          <>
            <p>
              GroundControl exposes its agent tools through MCP and authorizes
              clients through OAuth. Choose a client that supports remote HTTP
              MCP connections, OAuth discovery and browser sign-in. Each client
              receives its own grant with selected capabilities and deployments.
            </p>
            <Table
              headers={["Connection setting", "Use this"]}
              rows={[
                [
                  "Server URL",
                  "Your GroundControl HTTPS origin followed by /mcp",
                ],
                [
                  "Authentication",
                  "OAuth, using the instance’s discovery metadata",
                ],
                [
                  "Authorization",
                  "Sign in to GroundControl and select the workloads",
                ],
                [
                  "First check",
                  "List deployments, then inspect one and check its health",
                ],
              ]}
            />
            <p>
              The walkthrough uses ChatGPT as a tested client. For another
              compatible client, add the same endpoint in its MCP server
              settings and complete the GroundControl consent flow. The
              endpoint, deployment scope and operation records belong to your
              instance.
            </p>
          </>
        ),
      },
      {
        id: "requirements",
        title: "Before you connect",
        body: (
          <>
            <ul>
              <li>
                You have claimed GroundControl and can sign in as its
                administrator.
              </li>
              <li>
                Your instance has a reachable HTTPS address and passing{" "}
                <Link href="/docs/publishing#discovery">OAuth discovery</Link>.
              </li>
              <li>
                At least one application is{" "}
                <Link href="/docs/first-deployment">
                  enrolled as a deployment
                </Link>
                .
              </li>
              <li>
                Your client or workspace permits custom MCP connections.
                Availability and approval requirements depend on the client and
                workspace policy.
              </li>
            </ul>
            <p>
              For a self-hosted instance, the connection starts from its MCP
              URL. OAuth is built into GroundControl; there is no separate OAuth
              package to install on the VPS. Add your instance as a remote MCP
              server in the client you use.
            </p>
          </>
        ),
      },
      {
        id: "endpoint",
        title: "1. Copy your MCP endpoint",
        body: (
          <>
            <p>
              In GroundControl, open <strong>Agents</strong>. Under{" "}
              <strong>MCP endpoint</strong>, choose <strong>Copy</strong>. The
              URL ends in <code>/mcp</code>. Use your instance’s domain, not
              this documentation site or the example operator’s domain.
            </p>
            <EndpointBuilder />
            <Capture
              file="agents-desktop.jpg"
              alt="GroundControl Agents workspace with the MCP endpoint and an active ChatGPT grant"
              caption="Agents workspace, 22 September 2026. This instance has a ChatGPT grant; each connected client appears with its own scope."
            />
          </>
        ),
      },
      {
        id: "add-plugin",
        title: "2. Add the connection in ChatGPT",
        body: (
          <>
            <p>
              This example uses ChatGPT on the web. Your account or workspace
              must allow custom MCP connections.
            </p>
            <ol>
              <li>
                In ChatGPT on the web, open{" "}
                <strong>Settings → Security and login</strong> and enable{" "}
                <strong>Developer mode</strong>, if available.
              </li>
              <li>
                Open <strong>Plugins</strong> and select the <strong>+</strong>{" "}
                button to add a connection.
              </li>
              <li>
                Name it <strong>GroundControl</strong> and add a description
                such as “Operate my approved deployments.”
              </li>
              <li>
                Under <strong>Connection</strong>, enter the copied HTTPS MCP
                server URL, including <code>/mcp</code>.
              </li>
              <li>
                Create the connection and review the discovered tools. Use OAuth
                when asked to choose authentication.
              </li>
            </ol>
            <Table
              headers={["Connection field", "Value"]}
              rows={[
                ["Name", "GroundControl"],
                ["MCP server URL", "https://YOUR-GROUNDCONTROL-HOST/mcp"],
                ["Authentication, if shown", "OAuth"],
                [
                  "Infrastructure credentials",
                  "Never paste SSH keys or registry credentials here",
                ],
              ]}
            />
            <p className="small">
              ChatGPT navigation was checked against{" "}
              <a
                href="https://developers.openai.com/plugins/deploy/connect-chatgpt"
                target="_blank"
                rel="noreferrer"
              >
                OpenAI’s connection guide
              </a>{" "}
              on 22 September 2026. Older interfaces may call this{" "}
              <strong>Apps</strong> or <strong>Connectors</strong>. If custom
              connections are unavailable, check account and workspace policy.
            </p>
          </>
        ),
      },
      {
        id: "consent",
        title: "3. Sign in and approve the exact workload",
        body: (
          <>
            <p>
              The connection redirects to your GroundControl instance. Sign in
              there as the operator. On the consent page, review{" "}
              <strong>Requested capabilities</strong> and select the intended
              workload under <strong>Allowed deployments</strong>, then choose{" "}
              <strong>Authorize</strong> for the selected deployment count.
            </p>
            <div
              className="scope-map"
              aria-label="How OAuth limits agent access"
            >
              <div>
                <span>WHO</span>
                <strong>Authorized client</strong>
                <small>Your connected agent</small>
              </div>
              <div>
                <span>WHAT</span>
                <strong>Named capabilities</strong>
                <small>Read, health, logs, redeploy</small>
              </div>
              <div>
                <span>WHERE</span>
                <strong>Selected deployments</strong>
                <small>Unselected workloads stay invisible</small>
              </div>
            </div>
            <p>
              The consent page lists scopes requested by the client; it is not a
              catalogue of every possible tool. Several tools can share one
              scope, which is why a five-scope grant can expose more than five
              tool names.
            </p>
            <Table
              headers={["Scope", "What it allows"]}
              rows={[
                ["deployment:read", "deployment.list and deployment.inspect"],
                ["deployment:health", "deployment.health"],
                ["deployment:logs", "deployment.logs"],
                [
                  "deployment:redeploy",
                  "deployment.redeploy, which changes the workload",
                ],
                [
                  "operation:read",
                  "operation.get for recorded progress and evidence",
                ],
              ]}
            />
            <p>
              If the client requests redeploy access, treat that as a write
              permission. Use a client-configured read-only scope where
              available, or select only a workload whose redeployment you intend
              to authorize. Do not assume the consent screen offers a scope
              editor.
            </p>
            <Check>
              <p>
                Return to <strong>Agents</strong> in GroundControl. Under{" "}
                <strong>Authorized clients</strong>, your client should be
                active and the correct deployment slugs should be listed.
              </p>
            </Check>
          </>
        ),
      },
      {
        id: "first-call",
        title: "4. Make the first read-only call",
        body: (
          <>
            <p>
              Open a new session with the GroundControl connection enabled. In
              ChatGPT, select it from the conversation’s tools menu. Send this
              first:
            </p>
            <CodeBlock
              label="First agent request"
              code="Use GroundControl to list the deployments available to you. Do not change anything."
            />
            <p>
              Then replace <code>YOUR_DEPLOYMENT_SLUG</code> with a slug
              returned by that call:
            </p>
            <CodeBlock
              label="Health-check prompt"
              code="Inspect YOUR_DEPLOYMENT_SLUG and check its health through GroundControl. Report the recorded source revision, container states and public HTTP result. Do not redeploy."
            />
            <Check>
              <p>
                Your agent should call GroundControl and report tool evidence.
                If it only explains how you could run Docker yourself, check
                that the plugin is enabled in this conversation. A configured
                public URL should produce an explicit public check; a skipped
                check is not proof of HTTP health.
              </p>
            </Check>
            <p>
              Compare with the{" "}
              <Link href="/docs/evidence">recorded RentAWeekend result</Link>,
              then use the{" "}
              <Link href="/docs/deployment-automation">
                first redeploy walkthrough
              </Link>
              .
            </p>
          </>
        ),
      },
      {
        id: "reconnect",
        title: "5. Reconnect or revoke access",
        body: (
          <>
            <p>
              If the client reports an expired or missing refresh token, use its
              reconnect/sign-in action and complete OAuth again. GroundControl
              supports rotating refresh tokens when the client requests{" "}
              <code>offline_access</code>. A grant reduces repeated credential
              handoffs; it does not remove client confirmation rules or the need
              to reauthenticate when access expires.
            </p>
            <p>
              To end access, open{" "}
              <strong>
                GroundControl → Agents → Authorized clients → Revoke
              </strong>{" "}
              for the intended client. This revokes current tokens and cancels
              queued operations that have not started. An operation already
              executing continues recording its outcome rather than being
              force-killed.
            </p>
          </>
        ),
      },
    ],
  },
  "deployment-automation": {
    title: "Run a deployment and verify its outcome",
    description:
      "Follow one controlled redeploy to completion, then decide whether to enable merge-triggered automation for that workload.",
    outcome:
      "A durable operation ID and evidence for service state and the public customer endpoint.",
    sections: [
      {
        id: "manual",
        title: "1. Run a controlled redeploy",
        body: (
          <>
            <p>
              Complete the{" "}
              <Link href="/docs/agent-access#first-call">
                read-only connection checks
              </Link>{" "}
              first. Choose an enrolled, managed workload with a known recovery
              path. The grant must include <code>deployment:redeploy</code> and{" "}
              <code>operation:read</code>.
            </p>
            <CodeBlock
              label="Prompt for an authorized redeploy"
              code="Redeploy YOUR_DEPLOYMENT_SLUG through GroundControl using one idempotency key for this request. Return the operation ID, follow it until terminal status, and report runtime and public verification. If a call times out, retrieve that same operation before attempting another redeploy."
            />
            <p>
              The tool returns an operation immediately. Keep that ID: it is how
              the conversation reconnects to work that continues independently.
              The client may still ask you to confirm the write action.
            </p>
          </>
        ),
      },
      {
        id: "status",
        title: "2. Follow the operation, not the chat connection",
        body: (
          <>
            <Table
              headers={["State", "What to do"]}
              rows={[
                [
                  "pending / running / verifying",
                  "Keep reading the same operation ID. Do not submit a duplicate request.",
                ],
                [
                  "success",
                  "Read its verification evidence; check the public outcome.",
                ],
                [
                  "failed",
                  "Read the recorded error and failed stage before choosing recovery.",
                ],
                [
                  "uncertain",
                  "Inspect actual runtime and evidence. A restart may have interrupted tracking after an external action began.",
                ],
              ]}
            />
            <p>
              A network timeout is not proof that a deploy failed. Reuse the
              original idempotency key if retrying the same request, and
              retrieve the existing operation before starting a new one.
            </p>
            <CodeBlock
              label="Resume prompt"
              code="Read operation OPERATION_ID through GroundControl and report its current status, attempts, error and verification evidence. Do not start another deployment."
            />
          </>
        ),
      },
      {
        id: "verification",
        title: "3. Inspect the result in GroundControl",
        body: (
          <>
            <p>
              Open{" "}
              <strong>
                Deployments → your application → Deploy → View evidence
              </strong>
              . Review the Compose validation, runtime recreation, service
              verification and public checks. <strong>Releases</strong> retains
              release records; the deploy view shows execution evidence.
            </p>
            <Capture
              file="verification-desktop.jpg"
              alt="GroundControl deployment logs showing matching runtime images and an HTTP 200 public verification"
              caption="Actual RentAWeekend evidence opened on 22 September 2026 for its 21 September deployment. Service checks and public verification are visible together."
            />
            <Check>
              <p>
                Confirm every intended long-running service is healthy, one-shot
                migrations exited successfully, and the configured public check
                passed. Compare the recorded source revision with the actual
                image identity; those are distinct evidence fields.
              </p>
            </Check>
          </>
        ),
      },
      {
        id: "merge",
        title: "4. Enable deployment-scoped automation",
        body: (
          <>
            <p>
              For a supported managed Compose deployment with an explicitly
              linked GitHub repository, open{" "}
              <strong>Configure → Source identity</strong>.
            </p>
            <ol>
              <li>
                Confirm the selected GitHub installation repository, default
                branch, public URL and deployed revision.
              </li>
              <li>
                Check the GitHub connector has working signed webhook delivery.
                A pasted repository URL alone does not establish that
                connection.
              </li>
              <li>
                Verify the environment and Compose contract, release checks,
                build location and recovery plan.
              </li>
              <li>
                Enable <strong>Autopilot after merge</strong>, then select{" "}
                <strong>Save source</strong>.
              </li>
              <li>
                Send a small approved test change through the normal
                review/merge path. Verify a new operation and public result
                before relying on the flow.
              </li>
            </ol>
            <p>
              The checkbox is disabled when the deployment is not managed or no
              linked repository is selected. Enabling it does not grant all
              repositories or all hosts autonomy.
            </p>
            <Note>
              <p>
                Current source-deploy evidence includes a build on the
                deployment host. Do not assume turning on this option moves
                builds into CI. Confirm the chosen path and host capacity; an
                isolated CI builder is the preferred production architecture.
              </p>
            </Note>
          </>
        ),
      },
      {
        id: "daytona",
        title: "Where Daytona fits",
        body: (
          <>
            <p>
              Daytona is an optional, early-access workbench for reproducing
              eligible source/configuration failures. In{" "}
              <strong>Configure → Repair workbench</strong>, a deployment can
              select <strong>Use Daytona for source repairs</strong> and provide
              focused validation and regression commands. Connector credentials
              live in <strong>Settings → Connectors</strong>.
            </p>
            <p>
              The intended flow checks out the exact revision in an isolated
              sandbox, validates a candidate fix, then proposes a reviewable
              change. A sandbox setup failure is not evidence that the
              application is broken. Daytona is not required to connect an agent
              or perform a standard redeploy.
            </p>
            <p>
              GroundControl’s own releases still use its repository-owned GitHub
              Actions pipeline. The managed-application webhook flow is a
              separate path.
            </p>
          </>
        ),
      },
    ],
  },
  distribution: {
    title: "Upgrade, recover and uninstall",
    description:
      "Use the same installer for maintenance, with an explicit preview and a database/configuration backup before upgrade.",
    outcome:
      "A verified version change, or an explicitly reported recovery to the previous version.",
    sections: [
      {
        id: "preview",
        title: "1. Preview the target version",
        body: (
          <>
            <p>
              Run this on the VPS that already hosts GroundControl. Replace{" "}
              <code>YOUR_TAG</code> with the published version or image tag you
              want. Use the same <code>--dir</code> and <code>--port</code>{" "}
              options if your original install used custom values.
            </p>
            <CodeBlock
              label="On your VPS · preview"
              code={`curl -fsSL ${install} \\\n  | sudo bash -s -- --preview --version YOUR_TAG --json`}
            />
            <p>
              The preview checks the container, persistent storage and target
              image without replacing the instance.
            </p>
            <Check>
              <p>
                Current image, storage and target-image checks are ready. If
                persistent storage cannot be identified, resolve that before
                upgrading.
              </p>
            </Check>
          </>
        ),
      },
      {
        id: "upgrade",
        title: "2. Apply the guarded upgrade",
        body: (
          <>
            <CodeBlock
              label="On your VPS · upgrade"
              code={`curl -fsSL ${install} \\\n  | sudo bash -s -- --upgrade --version YOUR_TAG --json`}
            />
            <p>
              The installer briefly stops GroundControl for a consistent SQLite
              and configuration backup, resolves the new image, starts it, and
              checks container health. Backups live under the installation
              directory’s <code>backups/</code> folder. The default is{" "}
              <code>/opt/groundcontrol/backups/</code>.
            </p>
            <Table
              headers={["Returned stage", "Meaning"]}
              rows={[
                [
                  "upgrade_complete",
                  "Requested version passed startup/health verification.",
                ],
                [
                  "upgrade_rolled_back",
                  "New version failed; previous database/image/configuration were restored and healthy. The command exits nonzero because the upgrade failed.",
                ],
                [
                  "rollback_failed",
                  "Both upgrade and recovery failed. Preserve the backup and failed-upgrade log for manual recovery.",
                ],
              ]}
            />
          </>
        ),
      },
      {
        id: "confirm",
        title: "3. Confirm from outside the container",
        body: (
          <>
            <p>
              Open your public instance URL and sign in. Confirm the enrolled
              deployments and agent grant are present. Ask your agent for a new
              health check. A successful startup gate is necessary, but it is
              not a substitute for checking your publishing route and plugin
              connection.
            </p>
            <p>
              Keep off-host backups appropriate to your deployment. An installer
              backup on the same VPS cannot recover from loss of that VPS.
            </p>
          </>
        ),
      },
      {
        id: "uninstall",
        title: "4. Remove the runtime while preserving data",
        body: (
          <>
            <p>
              Use this only when you intend to stop this GroundControl instance.
              It removes the runtime and preserves the database volume and
              installation files for recovery.
            </p>
            <CodeBlock
              label="On your VPS · uninstall"
              code={`curl -fsSL ${install} | sudo bash -s -- --uninstall --json`}
            />
            <Check>
              <p>
                The result reports <code>dataPreserved: true</code>. Keep the
                saved data and files until you have verified your recovery or
                migration. The default path does not delete application data
                volumes.
              </p>
            </Check>
          </>
        ),
      },
      {
        id: "acceptance",
        title: "What the clean-host test covers",
        body: (
          <>
            <p>
              The distribution acceptance run passed install, claim, loopback
              binding, host execution, PTY, MCP/OAuth discovery, idempotent
              rerun, a guarded same-image upgrade and data-preserving uninstall.
              It does not prove an arbitrary cross-version migration, a
              failed-upgrade rollback or every public publishing provider.
            </p>
            <p>
              Read the{" "}
              <Link href="/docs/evidence#distribution">
                acceptance evidence
              </Link>{" "}
              for exact scope and the original run.
            </p>
          </>
        ),
      },
    ],
  },
  troubleshooting: {
    title: "Find the failed boundary",
    description:
      "Start with the symptom you actually see. Each check below narrows the problem without blindly repeating a deployment.",
    outcome:
      "A concrete next check for installation, connection, authorization or verification errors.",
    sections: [
      {
        id: "bootstrap",
        title: "The claim page will not open",
        body: (
          <>
            <p>
              Confirm the SSH tunnel is running on your computer and the
              installer’s remote port is correct. On the VPS, inspect container
              health and read the last startup logs:
            </p>
            <CodeBlock
              label="On your VPS · inspect startup"
              code="docker ps --filter name=groundcontrol-web\ndocker logs --tail 100 groundcontrol-web"
            />
            <p>
              If the page opens but the claim expired, rerun the installer on
              the unclaimed instance. If the instance is already claimed, use
              its login rather than trying to establish another first owner.
            </p>
          </>
        ),
      },
      {
        id: "plugin",
        title: "The custom plugin option is missing",
        body: (
          <>
            <p>
              Use ChatGPT on the web. Check{" "}
              <strong>Settings → Security and login → Developer mode</strong>{" "}
              and your workspace’s policy for custom connections. Older
              interfaces may use Apps or Connectors. The GroundControl installer
              cannot enable a ChatGPT account feature. See the{" "}
              <a href="https://developers.openai.com/plugins/deploy/connect-chatgpt">
                current OpenAI setup reference
              </a>
              .
            </p>
          </>
        ),
      },
      {
        id: "discovery",
        title: "ChatGPT cannot connect or discovery fails",
        body: (
          <>
            <ol>
              <li>
                Check the URL is the HTTPS origin of your own instance plus{" "}
                <code>/mcp</code>.
              </li>
              <li>
                Open the{" "}
                <Link href="/docs/publishing#discovery">two metadata URLs</Link>
                . Expect JSON with the same public issuer.
              </li>
              <li>
                Check the proxy forwards MCP requests and does not replace
                responses with a sign-in page.
              </li>
              <li>
                Use a stable hostname. A changed temporary tunnel URL means the
                old connection points to the wrong server.
              </li>
            </ol>
            <p>
              A 401 from a protected endpoint can be expected before OAuth. A
              repeated 401 after consent calls for reconnection or token
              diagnosis, not disabling authentication.
            </p>
          </>
        ),
      },
      {
        id: "empty",
        title: "No deployments appear, or a tool is missing",
        body: (
          <>
            <Table
              headers={["Symptom", "Next check"]}
              rows={[
                [
                  "Empty list",
                  "Is the workload enrolled, and did consent select it?",
                ],
                [
                  "Another workload is invisible",
                  "That is expected if it was not included in this grant.",
                ],
                [
                  "403 for a mutation",
                  "Check the granted capability and workload scope, plus management/policy readiness.",
                ],
                [
                  "A new tool is absent",
                  "Refresh the connection metadata in ChatGPT and start a new conversation.",
                ],
                [
                  "Only five capabilities at consent",
                  "Scopes and tools are different: one read scope can authorize both list and inspect.",
                ],
              ]}
            />
            <p>
              Open <strong>GroundControl → Agents</strong> to see the active
              client’s actual scopes and workload slugs. For more access,
              deliberately reauthorize the intended scope rather than assuming a
              broad grant.
            </p>
          </>
        ),
      },
      {
        id: "reauth",
        title: "The connection asks for authentication again",
        body: (
          <>
            <p>
              A revoked grant, expired session or missing refresh token can
              require sign-in again. Use the client’s reconnect action and
              complete the same OAuth consent flow. <code>offline_access</code>{" "}
              is needed for refresh access; not every client requests it.
            </p>
            <p>
              The streamlined path avoids giving ChatGPT infrastructure
              credentials. It does not bypass workspace approval policies or
              client prompts for write actions.
            </p>
          </>
        ),
      },
      {
        id: "timeout",
        title: "A redeploy timed out",
        body: (
          <>
            <p>
              Read the operation ID already returned by GroundControl before
              starting another request. Inspect{" "}
              <strong>Deploy → View evidence</strong> and actual runtime. Work
              can continue after the caller disconnects.
            </p>
            <CodeBlock
              label="Recovery prompt"
              code="Check operation OPERATION_ID. If it is still running or verifying, keep following it. If it is uncertain or failed, report its evidence and current deployment health. Do not queue another redeploy."
            />
            <p>
              Inspect CPU, memory and disk pressure if the host itself is
              unresponsive. The RentAWeekend investigation found heavy builds
              competing with production workloads. Move or schedule build work
              appropriately; retries can make contention worse.
            </p>
          </>
        ),
      },
      {
        id: "public",
        title: "Containers are running but the public check fails",
        body: (
          <>
            <p>
              Read the failed URL, HTTP status and phase. Check application
              readiness, the proxy upstream, domain/DNS and configured release
              checks. An HTTP 502 is a failed customer outcome even when the web
              container is “running.”
            </p>
            <p>
              Use a known-good artifact and the deployment’s recovery procedure
              if the release cannot pass. Do not report an automatic application
              rollback unless the operation actually records that it happened.
            </p>
          </>
        ),
      },
    ],
  },
  evidence: {
    title: "Inspect the evidence behind the claims",
    description:
      "Real product captures and tool results from an operator-owned VPS, with the boundaries of each result made explicit.",
    outcome:
      "You can distinguish a screenshot, a current health snapshot and a recorded deployment operation.",
    sections: [
      {
        id: "grant",
        title: "An active ChatGPT grant",
        body: (
          <>
            <Capture
              file="agents-desktop.jpg"
              alt="The active ChatGPT OAuth grant in GroundControl with five scopes and eight allowed workloads"
              caption="Captured from the actual Agents workspace on 22 September 2026. It shows an active ChatGPT client, five scopes and eight selected workloads."
            />
            <p>
              This proves the grant exists and is scoped. It is not itself proof
              that every permitted action has been executed.
            </p>
          </>
        ),
      },
      {
        id: "health",
        title: "A fresh MCP health read",
        body: (
          <>
            <p>
              On 22 September, ChatGPT called <code>deployment.health</code> for{" "}
              <code>rentaweekend</code> through the Ground Control connection.
              The response reported four healthy containers and a checked public
              endpoint with HTTP 200. It is a dated snapshot, not a live status
              widget.
            </p>
            <CodeBlock
              label="Selected fields from the observed response"
              copy={false}
              code={
                '{\n  "deployment": "rentaweekend",\n  "runtime": { "healthy": true },\n  "public": { "checked": true, "status": 200, "healthy": true },\n  "healthy": true\n}'
              }
            />
            <p>
              <a href="/evidence/rentaweekend-health-2026-09-22.json" download>
                Download the captured health response (JSON) ↓
              </a>
            </p>
          </>
        ),
      },
      {
        id: "operation",
        title: "The recorded merge-triggered operation",
        body: (
          <>
            <p>
              ChatGPT retrieved the following existing operation with{" "}
              <code>operation.get</code>. Its trigger was a signed GitHub push;
              it should not be described as a new agent-issued redeploy.
            </p>
            <Table
              headers={["Evidence", "Recorded value"]}
              rows={[
                ["Operation", "cmubbc14l0002tjpa0r56r1sm"],
                ["Type", "deployment.source.deploy"],
                ["Created", "2026-09-21T14:00:45.238Z"],
                ["Finished", "2026-09-21T14:03:16.791Z"],
                ["Result", "success · 1 attempt · error: null"],
                ["Source commit", "468acf8d69821cf2c83af1629ee853325354a306"],
                [
                  "Runtime image tag (web/API)",
                  "0661793317ffeafd5b6740ee3bea0884336a0d26",
                ],
                [
                  "Verification",
                  "Service images/states matched Compose; public HTTP 200 passed",
                ],
              ]}
            />
            <Capture
              file="verification-desktop.jpg"
              alt="Recorded RentAWeekend runtime and public verification log"
              caption="Desktop capture of that release’s recorded evidence, opened 22 September 2026."
            />
            <p>
              <a
                href="/evidence/rentaweekend-operation-2026-09-21.json"
                download
              >
                Download the operation fields and exact log excerpts (JSON) ↓
              </a>
            </p>
            <Note>
              <p>
                The source revision and runtime image tag differ. The record
                proves source synchronization and runtime/Compose consistency,
                not that those images were freshly built from that source
                revision. It also records a host build. Exact immutable artifact
                provenance and off-host building need their own verification.
              </p>
            </Note>
          </>
        ),
      },
      {
        id: "distribution",
        title: "Clean-host distribution acceptance",
        body: (
          <>
            <p>
              <a
                href="https://github.com/teckedd-code2save/groundcontrol/actions/runs/35617805067"
                target="_blank"
                rel="noreferrer"
              >
                Distribution Acceptance #7
              </a>{" "}
              passed on a disposable Linux runner against GroundControl revision{" "}
              <code>e27dddec3bdf5944de7ca7317b1bbbf32b203953</code>.
            </p>
            <Table
              headers={["Proven by that run", "Outside its scope"]}
              rows={[
                [
                  "Install, owner claim and private loopback binding",
                  "Every VPS operating-system combination",
                ],
                [
                  "Persistent storage, host execution, PTY, MCP and OAuth discovery",
                  "Caddy and Cloudflare public routes",
                ],
                [
                  "Idempotent rerun and same-image guarded upgrade",
                  "Every cross-version migration or failed-upgrade rollback",
                ],
                [
                  "Runtime uninstall with data preserved",
                  "Off-host disaster recovery",
                ],
              ]}
            />
            <p>
              The full procedure is in{" "}
              <Link href="/docs/distribution">Upgrade &amp; recover</Link>. You
              do not need to read GitHub to follow the setup; the run link is
              the underlying test record.
            </p>
          </>
        ),
      },
    ],
  },
};
