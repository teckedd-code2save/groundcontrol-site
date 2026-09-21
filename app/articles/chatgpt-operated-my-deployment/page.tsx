import Link from "next/link";

export const metadata = {
  title: "How ChatGPT deployed a real app without SSH | GroundControl",
  description: "The technical story behind GroundControl's scoped OAuth and MCP deployment proof.",
};

export default function ArticlePage() {
  return (
    <main className="reading-page">
      <header className="reading-nav">
        <Link className="wordmark" href="/">
          <span className="orbit-mark" aria-hidden="true"><i /></span>
          <span>GroundControl</span>
        </Link>
        <nav>
          <Link href="/docs">Docs</Link>
          <a href="https://github.com/teckedd-code2save/groundcontrol" target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
      </header>

      <article className="article-shell">
        <header className="article-header">
          <p className="eyebrow">ENGINEERING · AGENTIC DEPLOYMENT</p>
          <h1>How ChatGPT deployed a real app without receiving SSH access</h1>
          <p className="article-deck">
            GroundControl gives software agents narrow deployment capabilities through OAuth and
            MCP, while credentials, policy, execution and verification remain inside the
            operator-owned control plane.
          </p>
          <div className="article-meta">
            <span>Edward Kwabena Twumasi</span>
            <span>September 2026</span>
            <span>8 minute read</span>
          </div>
        </header>

        <div className="article-body">
          <p>
            ChatGPT deployed a real production application for me. It inspected the deployment,
            followed the work and confirmed that the public application was healthy.
          </p>
          <p>
            It did this without repeatedly stopping to ask for permission, without asking me to
            paste credentials, and without receiving an SSH key. One scoped OAuth grant gave it a
            smooth operational path; GroundControl made every action bounded and observable.
          </p>

          <h2>The test</h2>
          <p>
            I connected ChatGPT to a self-hosted GroundControl instance through MCP and OAuth. The
            grant exposed only selected deployments and typed capabilities to inspect deployment
            identity, read health and logs, confirm named configuration without exposing values,
            start a durable redeploy, and retrieve operation evidence.
          </p>
          <p>
            ChatGPT never received the VPS SSH key, provider credentials or unrestricted terminal
            access.
          </p>

          <div className="article-evidence">
            <span>PRODUCTION PROOF</span>
            <strong>RentAWeekend</strong>
            <dl>
              <div><dt>Trigger</dt><dd>Signed push to the allowed main branch</dd></div>
              <div><dt>Operation</dt><dd>cmubbc14l0002tjpa0r56r1sm</dd></div>
              <div><dt>Attempts</dt><dd>1</dd></div>
              <div><dt>Runtime</dt><dd>Web, API, PostgreSQL and Redis healthy</dd></div>
              <div><dt>Public check</dt><dd>HTTP 200 · approximately 99 ms</dd></div>
            </dl>
          </div>

          <h2>Why durable operations matter</h2>
          <p>
            A chat request is temporary. Deployment work is not. GroundControl returns an
            operation ID, continues independently of the conversation, records each stage and lets
            the agent reconnect later. A disconnected chat does not leave production in an
            ambiguous state.
          </p>
          <p>
            The model can explain the result, but it does not decide whether it may mutate the
            host. Deterministic policy checks the deployment scope, typed action, allowed repository
            and branch, idempotency, execution budget, verification and rollback.
          </p>

          <h2>The distribution also needed proof</h2>
          <p>
            A disposable clean-host run installed the current digest, bound GroundControl to
            loopback, completed the one-time ownership claim, verified persistent storage and
            MCP/OAuth discovery, reran idempotently, performed a backup-backed upgrade and removed
            the runtime without deleting its data.
          </p>
          <p>
            This matters because open source adoption begins before the dashboard. The first trust
            decision is the installation itself.
          </p>

          <h2>What GroundControl is</h2>
          <p>
            GroundControl is an open-source, self-hosted agentic deployment and operations tool for
            applications running on infrastructure you own. It builds on Docker Compose, Caddy or
            Nginx, GitHub Actions and container registries instead of replacing them.
          </p>
          <blockquote>
            Give agents infrastructure capabilities, not infrastructure credentials.
          </blockquote>

          <div className="article-cta">
            <div>
              <span className="eyebrow">TRY THE PROVEN PATH</span>
              <h2>Install privately and connect one deployment.</h2>
            </div>
            <Link className="button button--primary" href="/docs">Open the adoption guide ↗</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
