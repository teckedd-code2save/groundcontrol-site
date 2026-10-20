import Link from "next/link";
import type { Guide } from "./guides";
import { Check, Note, Table } from "./guide-parts";
import Capture from "@/app/components/Capture";
import CodeBlock from "@/app/components/CodeBlock";

export const setupGuides: Record<string, Guide> = {
  "getting-started": {
    title: "Start GroundControl from your computer",
    description: "Choose this computer or an existing Linux server. The launcher prepares the instance and prints a private link for setup or login.",
    outcome: "A private GroundControl workspace, your owner account and a clear next step for your first project.",
    sections: [
      { id: "before-you-start", title: "Choose where it runs", body: <>
        <Table headers={["Destination", "What you need"]} rows={[
          ["This computer", "macOS or Linux with Docker Desktop / Docker Engine running Linux containers. Windows uses a WSL terminal with Docker integration."],
          ["Remote Linux server", "An AMD64 Linux server and OpenSSH access from your computer. Use your existing SSH alias or user@host; the account needs root or passwordless sudo."],
          ["Apple Silicon", "The published image currently uses AMD64 emulation in Docker Desktop. A native ARM image is not yet provided."],
        ]} />
        <p>Local GroundControl manages Docker workloads. It does not manage native Mac or Windows services. On a server, GroundControl is a privileged host operations tool; install it on infrastructure you intend it to manage.</p>
      </> },
      { id: "install", title: "1. Run the launcher on your computer", body: <>
        <CodeBlock label="On your computer · Terminal or WSL" code={"curl -fsSL https://raw.githubusercontent.com/teckedd-code2save/groundcontrol/main/scripts/start -o groundcontrol-start\nbash groundcontrol-start"} />
        <p>Choose <strong>this computer</strong> or <strong>a remote server</strong> when prompted. Local setup uses Docker. Remote setup connects through SSH, installs GroundControl on the server and opens the private tunnel for you.</p>
        <p>You can also choose the destination directly:</p>
        <CodeBlock label="Local Docker" code="bash groundcontrol-start --local" />
        <CodeBlock label="Remote server · use your own SSH destination" code="bash groundcontrol-start --remote your-user@your-server" />
        <Check><p>The launcher prints a link on <code>127.0.0.1</code>. A new instance opens setup; an instance you already own opens login. Local setup writes its configuration to <code>.groundcontrol-desktop</code> in the current folder by default. Retain that folder and the Docker database volume.</p></Check>
      </> },
      { id: "tunnel", title: "2. Open your private setup link", body: <>
        <p>Open the complete link printed by the launcher in your browser on the same computer. Its one-time claim token establishes ownership; keep the link private.</p>
        <Table headers={["Installation", "While you use GroundControl"]} rows={[
          ["Local", "Keep Docker running. You can close the launcher after setup finishes."],
          ["Remote", "Leave the launcher terminal open: it carries your SSH tunnel. Run the same launcher command again to reconnect later."],
        ]} />
        <p>The remote server stays private unless you deliberately publish it. Rerunning the launcher reconnects to an existing installation; it does not upgrade it.</p>
      </> },
      { id: "claim", title: "3. Create your owner account", body: <>
        <p>On <strong>Claim GroundControl</strong>, enter an administrator username and a password with at least 12 characters, upper and lower case letters, a number and a symbol. This account belongs to your own instance.</p>
        <p>A claim link is single-use and expires after 30 minutes by default. Rerun the launcher for a fresh link if the unclaimed instance’s link expires. An already-claimed instance uses your existing login.</p>
        <Check><p>The local Docker workspace or destination Linux host is connected automatically. Continue setup to review it; you do not need to add that same host a second time.</p></Check>
      </> },
      { id: "verify", title: "4. Verify and add your first project", body: <>
        <p>Use the private verification step, then review the onboarding summary. On a desktop, the Linux environment belongs to the container; it is not the operating system of your Mac or Windows PC.</p>
        <p>Open <strong>Projects → Add project</strong>. Pick a folder or a GitHub repository, then connect an existing deployment or launch a new one. Follow the <Link href="/docs/projects">projects and deployments guide</Link>.</p>
        <Note><p>A local-only address is for you on this computer. Remote MCP clients need a reachable HTTPS endpoint. The server installation supports <Link href="/docs/publishing">publishing over HTTPS</Link>; desktop onboarding stays private.</p></Note>
      </> },
      { id: "on-host", title: "Advanced: install directly on a Linux server", body: <>
        <p>If you are already working in the destination server’s shell, use the canonical installer. Unlike the computer launcher, this command does not open an SSH tunnel on your computer.</p>
        <CodeBlock label="On the Linux server" code="curl -fsSL https://raw.githubusercontent.com/teckedd-code2save/groundcontrol/main/scripts/install | sudo bash" />
        <p>Add <code>-s -- --json</code> after <code>bash</code> for structured installer output. From your computer, forward the default management port with:</p>
        <CodeBlock label="On your computer · advanced manual tunnel" code="ssh -N -L 3003:127.0.0.1:3003 your-user@your-server" />
        <p>Open the server installer’s complete claim link through that tunnel. Server installations live under <code>/opt/groundcontrol</code> by default and use persistent Docker database storage. See <Link href="/docs/distribution">upgrade and recovery</Link> for maintenance.</p>
      </> },
    ],
  },
  projects: {
    title: "Your project, from source to deployments",
    description: "Bring a folder or GitHub repository into GroundControl, then connect the instances of that application running on your infrastructure.",
    outcome: "One project with its source and explicitly selected deployment instances, each with its own host and environment.",
    sections: [
      { id: "model", title: "A project is the application you are building", body: <>
        <p>A project gives your application or product a home. Its source can be a local folder or a GitHub repository. Its deployments are instances of that application—for example, development on your computer and production on a Linux server.</p>
        <Table headers={["Item", "Example", "Purpose"]} rows={[
          ["Project", "Weekend planner", "The application and its shared context."],
          ["Source", "A folder or GitHub repository", "Where the application’s code lives."],
          ["Deployment", "weekend-production", "A running or configured instance on a particular host, with an environment and runtime identity."],
          ["Service", "web, api, postgres", "A component inside a deployment. A Compose stack can contain several services."],
        ]} />
        <p>A project does not require a Compose file. Compose is one runtime method, alongside a standalone container. Registering source does not automatically build or start an application.</p>
      </> },
      { id: "sources", title: "1. Pick a folder or GitHub repository", body: <>
        <Capture file="project-import-2026-10-20.png" alt="Add project with folder and GitHub source choices" caption="Current project import interface · isolated demo · 20 October 2026" />
        <ol>
          <li>Open <strong>Projects → Add project</strong>.</li>
          <li>Choose <strong>Folder</strong> to browse the host’s available locations and select your project folder. You do not need to type a path. For a local desktop install, use the Home, Workspace or Drives locations offered by the picker.</li>
          <li>Or choose <strong>GitHub</strong>, select a repository and confirm the project details. Public repositories can be found by owner; private repositories require a GitHub connection with access. GroundControl retains the repository’s default branch.</li>
          <li>Review the name and source, then add the project.</li>
        </ol>
        <Check><p>Adding source records the project’s identity. It does not move your files or restart existing deployments. Removing a source link does not delete the original folder or repository.</p></Check>
        <Note><p>The picker browses the selected host. A remote server’s filesystem is different from your computer’s. If Docker Desktop cannot read a local folder, allow that location in Docker Desktop’s file-sharing settings and select a smaller accessible folder. Windows users browse locations available to WSL and Docker.</p></Note>
      </> },
      { id: "deployments", title: "2. Connect an existing app or launch an instance", body: <>
        <Capture file="project-deployments-2026-10-20.png" alt="Connect an existing deployment or launch a new instance" caption="Current deployment choice · example project · 20 October 2026" />
        <p>Open the project and select <strong>Add deployment</strong>. Choose the host, give the instance a useful name and set its environment.</p>
        <Table headers={["Path", "What happens"]} rows={[
          ["Connect existing", "Select an existing Compose workload or container. Review its runtime identity, then connect it to the project. Registration leaves the existing runtime and files in place."],
          ["Launch new · local Docker", "Launch a container image as a new instance. The current local launcher is for a single image using its default command, without custom environment variables. It does not build arbitrary project source."],
          ["Launch new · Linux server", "Continue through Templates to select a supported deployment recipe, verify the source and review configuration before creating the runtime."],
        ]} />
        <p>Multiple instances may share source while running in different environments. A source folder alone is not a deployment and is not offered as a running workload to agents.</p>
        <p>Follow <Link href="/docs/first-deployment">existing app enrollment</Link> or <Link href="/docs/new-deployment">new deployment setup</Link> for the remaining runtime-specific steps.</p>
      </> },
      { id: "discovery", title: "3. Keep discovery useful", body: <>
        <p>Discovery suggests workloads on the selected host. Compose services from the same stack appear together, and GroundControl excludes its own helper containers.</p>
        <p>Use <strong>Dismiss</strong> to hide a suggestion you do not want. <strong>Undo</strong> or <strong>Restore hidden</strong> brings it back. Dismissing a suggestion does not stop or remove the underlying workload.</p>
        <p>Projects without Compose can still be added through the folder or GitHub flow. Their runtime becomes a deployment only when you explicitly connect or launch an instance.</p>
      </> },
      { id: "operate", title: "4. Work from a known deployment", body: <>
        <p>Confirm the instance’s host, environment, services and public URL before operating it. Existing deployments, their configuration and their recorded history remain available when you organize them into projects.</p>
        <p>For an external agent, <Link href="/docs/agent-access">authorize OAuth access</Link> to the specific deployments and capabilities it needs. Adding a project or connecting a runtime does not grant external-agent access on its own.</p>
      </> },
    ],
  },
};
