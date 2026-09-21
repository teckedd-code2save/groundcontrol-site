import Link from "next/link";
import { notFound } from "next/navigation";

const SOURCE = "https://github.com/teckedd-code2save/groundcontrol";

const guides = {
  "getting-started": {
    eyebrow: "GETTING STARTED",
    title: "Install privately. Claim ownership. Connect one deployment.",
    intro: "The shortest safe path from a clean VPS to an agent-operable application.",
    sections: [
      ["1. Install on the authorized VPS", "Run the canonical installer as root. It generates secrets on the host, starts GroundControl on loopback and returns a short-lived one-time claim URL.", "curl -fsSL https://raw.githubusercontent.com/teckedd-code2save/groundcontrol/main/scripts/install | sudo bash"],
      ["2. Claim the instance", "Open the claim URL through your secure tunnel or publishing layer. Create the first administrator before connecting an agent."],
      ["3. Connect a deployment", "Add the repository, branch, Compose path, public URL and release checks. Begin with one non-critical application whose expected health is easy to verify."],
      ["4. Grant agent access", "Connect through OAuth, select the exact deployment and approve only the capabilities needed for the pilot. The agent receives no SSH key or provider credential."],
      ["5. Run the first operation", "Ask the agent to inspect and check health before allowing a redeploy. Keep the operation ID and verification evidence as the acceptance record."],
    ],
    source: "docs/ADOPTION.md",
  },
  "agent-access": {
    eyebrow: "OAUTH + MCP",
    title: "One scoped grant replaces repeated credential handoffs.",
    intro: "GroundControl gives an approved agent a narrow, typed route to operational outcomes.",
    sections: [
      ["What the operator approves", "An OAuth grant binds a client to selected deployments and named capabilities: inspect, health, logs, configuration checks, redeploy and operation status."],
      ["What the agent can see", "The agent sees only granted workloads. Unselected deployments remain invisible, and configuration checks return presence metadata rather than secret values."],
      ["What stays inside GroundControl", "SSH keys, registry credentials, provider tokens, execution policy and rollback behavior remain in the operator-owned control plane."],
      ["Why operations are durable", "A mutation returns an operation ID. GroundControl continues independently of the chat, records attempts and evidence, and lets the agent reconnect later."],
      ["The practical result", "ChatGPT can inspect, deploy, follow progress and verify the public outcome without stopping at every step to request a new credential or terminal session."],
    ],
    source: "docs/agent-native-access.md",
  },
  "deployment-automation": {
    eyebrow: "DEPLOYMENT FLOW",
    title: "Merge starts durable work. Verification finishes it.",
    intro: "A deployment is successful only when the intended revision is running and its checks pass.",
    sections: [
      ["Merge or manual request", "A signed push from an allowed repository and branch, or an authorized redeploy capability, creates an idempotent operation."],
      ["Prepare and execute", "GroundControl synchronizes the approved source, materializes configuration, validates Compose, builds or pulls images and recreates the services."],
      ["Verify the release", "The runtime is compared with the effective Compose configuration. Service health, one-shot migrations and the recorded public endpoint are checked."],
      ["Return evidence", "The caller receives status, attempts, timestamps, output and verification evidence through the durable operation."],
      ["Where Daytona fits", "Daytona is an optional isolated reproduction path for eligible code or configuration failures. It is not the production runtime or a prerequisite for deployment."],
    ],
    source: "docs/DEPLOYMENT-AUTOMATION-AND-DAYTONA.md",
  },
  distribution: {
    eyebrow: "DISTRIBUTION",
    title: "A private-first installer an operator can verify and reverse.",
    intro: "Distribution covers the whole ownership path: install, claim, publish, upgrade, roll back and uninstall.",
    sections: [
      ["Install", "The canonical script supports human-readable and structured JSON output, pinned versions and idempotent reruns. Secrets are generated on the destination host."],
      ["Claim", "Installation returns a short-lived one-time claim. A human explicitly establishes the first administrator; automation does not silently assume ownership."],
      ["Publish", "GroundControl starts on loopback. Attaching HTTPS and a domain—or keeping the instance private—is a separate operator decision."],
      ["Upgrade and roll back", "Upgrades are backup-backed and version-aware. A failed change can return to the previous known version without inventing a second installation path."],
      ["Uninstall", "Runtime resources can be removed without deleting persistent data by default. Destructive removal requires an explicit operator choice."],
      ["Acceptance evidence", "The current path was exercised on a disposable clean host: install, claim, discovery, idempotent rerun, upgrade and non-destructive uninstall."],
    ],
    source: "docs/agent-assisted-distribution.md",
  },
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({ slug }));
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides[slug as keyof typeof guides];
  if (!guide) notFound();

  return (
    <main className="reading-page">
      <header className="reading-nav">
        <Link className="wordmark" href="/"><span className="orbit-mark" aria-hidden="true"><i /></span><span>GroundControl</span></Link>
        <nav><Link href="/docs">All docs</Link><a href={SOURCE} target="_blank" rel="noreferrer">View source ↗</a></nav>
      </header>
      <article className="doc-article">
        <header><p className="eyebrow">{guide.eyebrow}</p><h1>{guide.title}</h1><p>{guide.intro}</p></header>
        <div className="doc-article-body">
          {guide.sections.map(([title, copy, command]) => (
            <section key={title}><h2>{title}</h2><p>{copy}</p>{command ? <pre><code>{command}</code></pre> : null}</section>
          ))}
        </div>
        <footer><Link href="/docs">← All documentation</Link><a href={`${SOURCE}/blob/main/${guide.source}`} target="_blank" rel="noreferrer">View this guide’s source ↗</a></footer>
      </article>
    </main>
  );
}
