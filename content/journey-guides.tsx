import Link from "next/link";
import type { Guide } from "./guides";
import { Check, Note, Table } from "./guide-parts";
import Capture from "@/app/components/Capture";
import NextSteps from "@/app/components/NextSteps";
import WorkloadModel from "@/app/components/WorkloadModel";
import CodeBlock from "@/app/components/CodeBlock";

export const journeyGuides: Record<string, Guide> = {
  philosophy: {
    title: "The GroundControl approach",
    description:
      "Understand the product, the things it manages, and how an agent gets a useful but bounded role in operating them.",
    outcome:
      "A clear model of hosts, projects, deployments, services, agent grants and recorded operations.",
    sections: [
      {
        id: "purpose",
        title: "Help the conversation follow through",
        body: (
          <>
            <p>
              You should be able to ask an agent what is happening with your
              application and have it work from real state. GroundControl
              provides that connection. It runs on infrastructure you own,
              understands the selected workload, and exposes specific operations
              through MCP and OAuth.
            </p>
            <p>
              The operator establishes access and approves the workload scope.
              Within that grant, an agent can inspect deployments, check health,
              read logs and request supported actions without asking you to
              supply infrastructure credentials at each step. Client
              confirmations and expired grants still need attention.
            </p>
            <p>
              The starting point is a founder or small team running applications
              with Docker Compose on a VPS. GroundControl also has human
              controls for runtime, logs, environment, proxy configuration and
              terminal access. You can begin using those before connecting an
              external agent.
            </p>
          </>
        ),
      },
      {
        id: "entities",
        title: "Know what you are looking at",
        body: (
          <>
            <WorkloadModel />
            <Table
              headers={["Term", "What it means in GroundControl"]}
              rows={[
                [
                  "Host / VPS",
                  "The server being inspected or operated. The canonical installer connects its own host; remote servers are explicit connections.",
                ],
                [
                  "Project",
                  "An optional group of related deployments. Moving a deployment between project groups changes organization, not its files or runtime.",
                ],
                [
                  "Deployment",
                  "The enrolled application identity: host, source or container, Compose identity, repository, public URL and recorded releases where available.",
                ],
                [
                  "Service / container",
                  "A component of a deployment, such as web, API, PostgreSQL or Redis. A single deployment can have several containers.",
                ],
                [
                  "Public route",
                  "The customer address and its proxy/upstream relationship. Its reachability is checked separately from container state.",
                ],
                [
                  "Agent grant",
                  "The OAuth client’s approved capabilities and selected deployments. Enrollment alone creates no external-agent permission.",
                ],
                [
                  "Operation",
                  "A request with an ID, progress, attempts, result and evidence. Use that ID to follow durable agent work.",
                ],
                [
                  "Release",
                  "A recorded deployment execution with source/runtime identity and verification evidence where available.",
                ],
              ]}
            />
            <p>
              A project group in GroundControl is also different from a Docker
              Compose project name. The former organizes applications in the UI;
              the latter identifies a stack in Docker.
            </p>
          </>
        ),
      },
      {
        id: "boundaries",
        title: "Make each boundary explicit",
        body: (
          <>
            <ol>
              <li>
                <strong>Discover:</strong> find evidence on the active host. A
                candidate is a finding to inspect.
              </li>
              <li>
                <strong>Enrol:</strong> register the workload you want
                GroundControl to track, preserving its location.
              </li>
              <li>
                <strong>Configure:</strong> confirm source, runtime, environment
                and the public address. Management mode affects which automation
                is eligible.
              </li>
              <li>
                <strong>Authorize:</strong> decide which external agent can use
                which capabilities on which enrolled workloads.
              </li>
              <li>
                <strong>Operate and verify:</strong> follow the specific
                request, inspect its evidence, and check the public result.
              </li>
            </ol>
            <Note>
              <p>
                Tracking mode is not a universal read-only security boundary.
                Source deployment and merge automation require managed mode, but
                other available actions have their own checks. OAuth scopes and
                deployment selection determine the external client’s
                permissions.
              </p>
            </Note>
          </>
        ),
      },
      {
        id: "principles",
        title: "The principles behind the controls",
        body: (
          <>
            <div className="principle-list">
              <div>
                <span>01</span>
                <h3>Begin with the infrastructure you own.</h3>
                <p>
                  Discover existing applications in place. The operator chooses
                  enrollment and keeps control of the instance, credentials and
                  workload scope.
                </p>
              </div>
              <div>
                <span>02</span>
                <h3>Ask for an outcome and retain the evidence.</h3>
                <p>
                  The agent requests a supported operation. GroundControl owns
                  execution and records the result. A chat timeout should lead
                  back to the same operation ID.
                </p>
              </div>
              <div>
                <span>03</span>
                <h3>Verify what the customer can reach.</h3>
                <p>
                  Container state, health checks and public HTTP results answer
                  different questions. A process running successfully does not
                  establish that an entire customer journey works.
                </p>
              </div>
              <div>
                <span>04</span>
                <h3>Earn automation one workload at a time.</h3>
                <p>
                  Establish identity, test a manual deployment, then enable the
                  specific automation you intend. A model’s confidence does not
                  expand its grant.
                </p>
              </div>
            </div>
          </>
        ),
      },
      {
        id: "loop",
        title: "Where intelligence and Daytona fit",
        body: (
          <>
            <p>
              Loop is GroundControl’s intelligence and recovery engine. Its
              current workspace relates host, runtime and public-route evidence,
              records changes and supports investigations. The direction is to
              understand failures and prepare the least disruptive recovery with
              evidence.
            </p>
            <p>
              Daytona is an optional, early-access path for reproducing eligible
              code or configuration failures in isolation. Production still runs
              on your VPS. A merge-triggered source deployment is a separate
              capability from autonomous incident recovery.
            </p>
            <p>
              Authenticated browser journeys, durable intelligence memory across
              process restarts and generally enabled autonomous recovery are not
              established by the current public evidence. The{" "}
              <Link href="/docs/evidence">evidence guide</Link> states what has
              actually been checked.
            </p>
          </>
        ),
      },
      {
        id: "start",
        title: "Put the model to work",
        body: (
          <p>
            Start with <Link href="/docs/getting-started">installation</Link> if
            you have not installed GroundControl. If your instance is already
            claimed, follow{" "}
            <Link href="/docs/after-install">After installation</Link> to choose
            your first workload.
          </p>
        ),
      },
    ],
  },
  "after-install": {
    title: "GroundControl is installed. What next?",
    description:
      "Go from a claimed instance to one understood workload and a verified agent connection.",
    outcome:
      "You know your active host, have chosen an existing or new application, and can verify the next step.",
    sections: [
      {
        id: "starting-point",
        title: "First, know what installation completed",
        body: (
          <>
            <p>
              The canonical installer starts GroundControl privately, creates
              persistent storage and connects the VPS it is running on as a
              local host. Claim establishes your administrator account. You do
              not need to add that same host again using SSH.
            </p>
            <p>
              After claim, onboarding asks how to publish the control plane.
              Choose a stable HTTPS origin for remote MCP clients, or keep it
              private while evaluating. On completion, GroundControl probes the
              host and shows its findings.
            </p>
            <Table
              headers={["Already done", "Still your decision"]}
              rows={[
                [
                  "GroundControl is running and claimed",
                  "Which existing applications to enroll, or which new application to deploy",
                ],
                [
                  "The local host is connected",
                  "Whether to add another remote server",
                ],
                [
                  "Onboarding can inspect host state",
                  "Whether the detected paths and proxy match your actual setup",
                ],
                [
                  "OAuth and MCP are built into the instance",
                  "Which client gets access, to which workloads and capabilities",
                ],
              ]}
            />
          </>
        ),
      },
      {
        id: "scan-review",
        title: "Review the onboarding scan",
        body: (
          <>
            <p>
              The scan looks for the operating system, Docker, containers,
              reverse proxy and existing application folders. It can ask you to
              clarify an unknown proxy, a missing proxy configuration path,
              containers without Compose labels, or a Compose project without
              running containers.
            </p>
            <p>
              Answer from your real setup. A detected file or route is an
              observation, not a health result. If your app lives outside the
              configured discovery paths, it may appear in the broader
              onboarding findings but be missing from the deployment inventory.
              Adjust <strong>Settings → Layout</strong> and rescan.
            </p>
            <Check>
              <p>
                You recognize the active server and can identify where one
                application lives. If the probe failed, resolve the host
                connection before treating an empty list as an empty server.
              </p>
            </Check>
          </>
        ),
      },
      {
        id: "choose-path",
        title: "Choose your first application",
        body: (
          <>
            <NextSteps />
            <p>
              For existing software, start in <strong>Deployments</strong>. For
              a new workload, start in <strong>Templates</strong>. A template
              deployment creates runtime resources and registers the result;
              discovery and enrollment describe software already present.
            </p>
          </>
        ),
      },
      {
        id: "workspaces",
        title: "Know where to go in the product",
        body: (
          <>
            <Table
              headers={["Workspace", "Use it for"]}
              rows={[
                [
                  "Overview",
                  "Orientation to the selected host, its condition and the applications running there.",
                ],
                [
                  "Deployments",
                  "Scan candidates, enroll a workload, and open its Manage, Deploy, Environment and Configure controls.",
                ],
                [
                  "Projects",
                  "Organize related deployments. Grouping does not relocate application files.",
                ],
                [
                  "Runtime",
                  "Inspect containers and their state when you need the lower-level picture.",
                ],
                [
                  "Templates",
                  "Choose, validate, configure, review and deploy a new workload.",
                ],
                [
                  "Intelligence / Alerts",
                  "Follow failures and investigate the runtime and public-route evidence.",
                ],
                [
                  "Agents",
                  "Copy the MCP endpoint and review or revoke authorized clients.",
                ],
                [
                  "Settings → VPS / Layout",
                  "Manage host connections and confirm where GroundControl looks for workloads.",
                ],
                [
                  "Terminal",
                  "Use the human operator shell for work that requires direct host access.",
                ],
              ]}
            />
          </>
        ),
      },
      {
        id: "first-success",
        title: "Finish with a small, observable success",
        body: (
          <>
            <p>
              Open your enrolled application, confirm its source and containers,
              and record the real public URL. Connect ChatGPT only after you can
              identify that workload. Start with a read-only request:
            </p>
            <CodeBlock
              label="First request to your connected agent"
              code="Use GroundControl to list my available deployments. Inspect the one I select and check its runtime and public health. Show what you verified and what is still unknown. Do not change anything."
            />
            <Check>
              <p>
                The agent calls GroundControl, sees only granted deployments,
                and returns actual tool evidence. A public check may be skipped
                when no public URL exists; that is not proof that the customer
                endpoint works.
              </p>
            </Check>
            <p>
              Move to a{" "}
              <Link href="/docs/deployment-automation">
                controlled redeploy
              </Link>{" "}
              when the identity and recovery plan are understood. Enable merge
              automation only after its managed-mode and repository requirements
              are met.
            </p>
          </>
        ),
      },
    ],
  },
  discovery: {
    title: "Discover what is running on your VPS",
    description:
      "Understand where GroundControl looks, what a discovered candidate means, and how to resolve missing or unexpected results.",
    outcome:
      "One candidate whose host, folder or container, Compose identity and supporting evidence you recognize.",
    sections: [
      {
        id: "locations",
        title: "1. Check the active host and scan locations",
        body: (
          <>
            <p>
              Use <strong>Settings → VPS</strong> to confirm the active
              connection. Open{" "}
              <strong>Settings → Layout → Deployment discovery</strong> and
              review these two fields:
            </p>
            <Table
              headers={["Field", "Meaning"]}
              rows={[
                [
                  "Look for existing workloads in",
                  "The root scanned for existing Compose folders. The default configuration uses /opt.",
                ],
                [
                  "Create template deployments in",
                  "Where new template deployments are created. This root is also scanned. The default configuration uses /srv/groundcontrol/deployments; check your saved value.",
                ],
              ]}
            />
            <Capture
              file="layout-desktop.jpg"
              alt="GroundControl Settings Layout with existing workload and template deployment paths"
              caption="The actual Layout controls. Your saved paths may differ from this operator instance."
            />
            <p>
              Save a path change with <strong>Save host configuration</strong>,
              then return to Deployments. A scan location is not an ownership
              rule: it does not move folders or automatically enroll all
              applications beneath it.
            </p>
          </>
        ),
      },
      {
        id: "scan",
        title: "2. Run Scan host and read the findings",
        body: (
          <>
            <p>
              Open <strong>Deployments → Scan host</strong>. Previously enrolled
              workloads remain in <strong>Enrolled deployments</strong>. New
              candidates appear under <strong>Discovered on this host</strong>.
            </p>
            <Capture
              file="discovery-desktop.jpg"
              alt="GroundControl discovery candidates showing Compose paths, component counts and enrollment buttons"
              caption="Actual discovery results, 22 September 2026. Candidates include Compose folders and a standalone container."
            />
            <Table
              headers={["Evidence shown", "How to use it"]}
              rows={[
                [
                  "Compose folder and path",
                  "Compare the absolute source and Compose paths with the application you operate.",
                ],
                [
                  "Compose component count",
                  "Check whether the expected web, API and dependency services belong to this stack.",
                ],
                [
                  "Git repository",
                  "A repository was detected in the folder. Confirm the actual repository and deployed revision separately.",
                ],
                [
                  "Container, image and service label",
                  "Use these to identify a runtime candidate and distinguish application containers from helpers or infrastructure.",
                ],
                [
                  "Route or domain hint",
                  "Treat it as a proposed relationship until its public URL and upstream are verified.",
                ],
              ]}
            />
            <p>
              Only enroll candidates you intend to track. A host can contain
              temporary helper containers, old releases and infrastructure
              services as well as customer applications.
            </p>
          </>
        ),
      },
      {
        id: "how-it-finds",
        title: "How the inventory is assembled",
        body: (
          <>
            <ol>
              <li>
                Search the configured existing-workload and template roots for{" "}
                <code>docker-compose.yml</code>,{" "}
                <code>docker-compose.yaml</code>, <code>compose.yml</code> and{" "}
                <code>compose.yaml</code>. The inventory scanner uses a bounded
                search, currently up to three levels.
              </li>
              <li>
                Read Compose services and useful metadata, and note Git presence
                alongside the file.
              </li>
              <li>
                Read Docker containers and Compose labels, including the working
                directory, project, service and configuration file paths where
                present.
              </li>
              <li>
                Match already enrolled paths and containers so they are not
                offered again as new candidates. A matching Compose folder
                usually supplies the application-level candidate.
              </li>
              <li>Show unmatched folders or containers for operator review.</li>
            </ol>
            <p>
              Onboarding has a broader probe across common application
              directories. Deployment inventory uses the saved discovery roots
              and Docker evidence. These are different views, so their counts
              can differ. GroundControl also reconciles applications it already
              knows from earlier managed deployments.
            </p>
          </>
        ),
      },
      {
        id: "missing",
        title: "If the application is missing or appears twice",
        body: (
          <>
            <Table
              headers={["Symptom", "Next check"]}
              rows={[
                [
                  "Nothing appears",
                  "Confirm the active host, connection health and saved Layout roots. Check for a scan error before concluding the host is empty.",
                ],
                [
                  "Onboarding found it, Deployments did not",
                  "The broader probe may have searched another location. Set the inventory root to the application's parent directory and scan again.",
                ],
                [
                  "The folder is present but not discovered",
                  "Check the supported Compose filename, read permissions and nesting depth. A plain folder without Compose is not an inventory candidate by itself.",
                ],
                [
                  "Only individual containers appear",
                  "Compose labels may be missing, or their working directory may not match a scanned folder. Inspect the runtime identity before enrollment.",
                ],
                [
                  "Several candidates seem to be the same app",
                  "Compare Compose project, source path and container labels. Choose the complete application identity rather than enrolling duplicates.",
                ],
                [
                  "An enrolled workload needs attention",
                  "Its saved identity may not match a present runtime. Inspect the workload before starting or recreating anything.",
                ],
              ]}
            />
            <CodeBlock
              label="Optional read-only checks on the active VPS"
              code={
                'docker compose ls\ndocker ps -a --format "table {{.Names}}\\t{{.Image}}\\t{{.Status}}"'
              }
            />
            <p>
              A non-Compose application may be visible elsewhere in the host
              tools without being a supported folder candidate here. Do not
              invent a Compose identity to make it appear.
            </p>
          </>
        ),
      },
      {
        id: "next",
        title: "3. Enrol the intended workload",
        body: (
          <>
            <p>
              When the evidence matches, follow{" "}
              <Link href="/docs/first-deployment">
                Enroll an existing application
              </Link>
              . That guide explains what enrollment changes, how project
              grouping works, and why a tracked workload is not automatically
              eligible for source deployment.
            </p>
          </>
        ),
      },
    ],
  },
  "new-deployment": {
    title: "Deploy a new application from a template",
    description:
      "Use GroundControl’s Choose, Source, Config, Review and Deploy workflow to create and enroll a workload.",
    outcome:
      "A new deployment with its runtime, source identity and public verification result recorded in GroundControl.",
    sections: [
      {
        id: "choose",
        title: "1. Choose the deployment shape",
        body: (
          <>
            <p>
              Open <strong>Templates</strong> and choose a template that matches
              the repository, runtime and proxy you intend to use. For a
              repository that already owns its Docker Compose topology, the
              current catalogue includes{" "}
              <strong>VPS Caddy Existing Compose</strong>.
            </p>
            <p>
              That template deploys repository-owned Compose, attaches the
              selected published service to Caddy and can configure Cloudflare
              DNS. It creates a managed deployment. It does not silently adopt
              an existing running stack in place.
            </p>
            <Note>
              <p>
                If the application already runs on this VPS, begin with
                discovery and enrollment. Creating a second stack with the same
                ports, domains or data paths can conflict with the first one.
                Plan any migration separately.
              </p>
            </Note>
          </>
        ),
      },
      {
        id: "source",
        title: "2. Supply and verify the source",
        body: (
          <>
            <p>
              In <strong>Source</strong>, choose one of the source types
              supported by that template: GitHub, GHCR or Local. For GitHub, use{" "}
              <strong>Choose from GitHub</strong> or enter the repository, set
              the branch and select <strong>Verify source</strong>.
            </p>
            <p>
              Use <strong>Settings → Connectors</strong> to connect GitHub for
              private or installation-scoped repositories. Registry access and
              repository access are separate capabilities. Verify the one your
              deployment actually requires.
            </p>
            <Table
              headers={["Repository Compose field", "What to establish"]}
              rows={[
                [
                  "Repository Compose file",
                  "The file in your source repository, commonly docker-compose.yml.",
                ],
                [
                  "Public Compose service",
                  "The application entrypoint, such as web or gateway.",
                ],
                [
                  "Published host port",
                  "The host port the selected service exposes for the proxy.",
                ],
                [
                  "Public verification path",
                  "A real route whose expected result establishes useful application health.",
                ],
              ]}
            />
          </>
        ),
      },
      {
        id: "review",
        title: "3. Configure and review before execution",
        body: (
          <>
            <p>
              In <strong>Config</strong>, supply the deployment identity, domain
              and template inputs. Configure required environment values through
              the product controls. Choose the correct Cloudflare zone or saved
              tunnel when that path is used.
            </p>
            <p>
              Select <strong>Preview →</strong> to enter <strong>Review</strong>
              . Read the generated or selected Compose configuration and proxy
              plan. Check the application services, public entrypoint, ports,
              networks and persistent volumes.
            </p>
            <Check>
              <p>
                You can explain what will be created, which hostname will point
                to it, how configuration reaches the services and where data
                persists. Resolve port or domain conflicts before pressing
                Deploy.
              </p>
            </Check>
          </>
        ),
      },
      {
        id: "verify",
        title: "4. Deploy, inspect the evidence and open the workload",
        body: (
          <>
            <p>
              Select <strong>Deploy</strong> and follow the stage output. The
              workflow creates the runtime and automatically enrolls the result
              as a managed deployment. Use <strong>Open Deployments</strong> to
              find it afterward.
            </p>
            <p>
              Read runtime and public checks separately. The UI can report{" "}
              <strong>Deployed, public route needs attention</strong>; treat
              that as unfinished public verification. Inspect the failure
              evidence and route before retrying.
            </p>
            <p>
              Once the application is verified,{" "}
              <Link href="/docs/agent-access">connect an agent</Link>. Configure{" "}
              <Link href="/docs/deployment-automation#merge">
                merge automation
              </Link>{" "}
              only after linking the explicit repository and verifying the
              normal deployment path.
            </p>
          </>
        ),
      },
    ],
  },
};
