import Link from "next/link";

const SOURCE = "https://github.com/teckedd-code2save/groundcontrol";

const guides = [
  {
    label: "START HERE",
    title: "Adopt GroundControl",
    copy: "Install privately, claim the instance, connect one deployment, grant an agent scoped access and run a safe first pilot.",
    href: "/docs/getting-started",
  },
  {
    label: "DEPLOYMENT",
    title: "Deployment automation and Daytona",
    copy: "Understand the merge-to-deploy contract, durable operations, verification boundary and isolated reproduction path.",
    href: "/docs/deployment-automation",
  },
  {
    label: "DISTRIBUTION",
    title: "Agent-assisted distribution",
    copy: "Review private-first installation, one-time ownership claim, publishing, upgrades, rollback and uninstall.",
    href: "/docs/distribution",
  },
  {
    label: "EVIDENCE",
    title: "Agent access with OAuth and MCP",
    copy: "See how grants bind typed capabilities to selected deployments while infrastructure credentials stay private.",
    href: "/docs/agent-access",
  },
] as const;

export const metadata = {
  title: "GroundControl Docs — Install, connect and deploy with agents",
  description: "Technical documentation for adopting GroundControl and giving agents scoped deployment access through MCP and OAuth.",
};

export default function DocsPage() {
  return (
    <main className="reading-page">
      <header className="reading-nav">
        <Link className="wordmark" href="/">
          <span className="orbit-mark" aria-hidden="true"><i /></span>
          <span>GroundControl</span>
        </Link>
        <nav>
          <Link href="/articles/chatgpt-operated-my-deployment">Article</Link>
          <a href={SOURCE} target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
      </header>

      <section className="reading-hero">
        <p className="eyebrow">TECHNICAL DOCUMENTATION</p>
        <h1>Install it. Connect one deployment. Give an agent only the access it needs.</h1>
        <p>
          GroundControl is an open-source, self-hosted agentic deployment tool for Docker Compose
          applications. Agents connect through OAuth and MCP. GroundControl keeps infrastructure
          credentials, enforces policy and records verification evidence.
        </p>
      </section>

      <section className="doc-grid" aria-label="GroundControl documentation">
        {guides.map((guide, index) => (
          <Link key={guide.title} href={guide.href}>
            <span>0{index + 1} · {guide.label}</span>
            <h2>{guide.title}</h2>
            <p>{guide.copy}</p>
            <strong>Read guide →</strong>
          </Link>
        ))}
      </section>

      <section className="reading-callout">
        <p className="eyebrow">QUICK START</p>
        <h2>Private by default.</h2>
        <pre><code>{`curl -fsSL https://raw.githubusercontent.com/teckedd-code2save/groundcontrol/main/scripts/install | sudo bash`}</code></pre>
        <p>
          The installer binds to loopback and returns a short-lived, one-time claim URL. Publishing
          the control plane is a separate operator decision.
        </p>
      </section>
    </main>
  );
}
