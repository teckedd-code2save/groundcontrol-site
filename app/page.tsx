"use client";

import { useState } from "react";

const PRODUCT_URL = "https://groundcontrol.serendepify.com";
const GITHUB_URL = "https://github.com/teckedd-code2save/groundcontrol";
const BOOTSTRAP_URL =
  "https://raw.githubusercontent.com/teckedd-code2save/groundcontrol/main/scripts/bootstrap";

const commands = [
  {
    id: "remote",
    label: "Remote",
    hint: "From your computer",
    command: `curl -fsSL ${BOOTSTRAP_URL} | bash -s -- -i ~/.ssh/id_ed25519 root@YOUR_VPS_IP`,
  },
  {
    id: "guided",
    label: "Guided",
    hint: "Interactive setup",
    command: `curl -fsSL ${BOOTSTRAP_URL} | bash -s -- --interactive`,
  },
  {
    id: "local",
    label: "Local",
    hint: "Already on the VPS",
    command: `curl -fsSL ${BOOTSTRAP_URL} | bash`,
  },
] as const;

const features = [
  {
    title: "Deployments",
    copy: "Build and deploy from connected repositories to Docker Compose, static sites, k3s, Cloud Run and Terraform-backed targets.",
    meta: "Build · deploy · verify · redeploy",
  },
  {
    title: "Runtime",
    copy: "Inspect containers, services, health, logs, processes and host telemetry from the same place you deploy them.",
    meta: "Docker · services · logs · health",
  },
  {
    title: "Terminal",
    copy: "Use a real browser terminal against the VPS, including host-level commands when GroundControl itself is running in Docker.",
    meta: "Shell · host operations · AI commands",
  },
  {
    title: "Intelligence",
    copy: "Investigate broken customer journeys from live evidence, connect changes to failures and prepare the next safe action.",
    meta: "Evidence · investigation · recovery",
  },
  {
    title: "Domains & edge",
    copy: "Connect Cloudflare, provision DNS, route through Caddy and verify the public HTTPS path as part of deployment.",
    meta: "Cloudflare · Caddy · DNS · TLS",
  },
  {
    title: "Your infrastructure",
    copy: "GroundControl is self-hosted and single-tenant. Your instance, data and operational credentials stay on infrastructure you control.",
    meta: "Open source · self-hosted · single tenant",
  },
] as const;

const templates = [
  ["Existing Compose", "vps-caddy-existing-compose", "Bring a production docker-compose.yml from Git. GroundControl discovers the service graph, env requirements, ports and health checks, then publishes the selected service."],
  ["Odoo Community", "vps-caddy-odoo-community", "Deploy Odoo Community with PostgreSQL, persistent data, generated credentials, a public domain and local recovery archives."],
  ["Next.js SaaS", "nextjs-saas-postgres-redis", "Next.js with PostgreSQL and Redis for auth, queues, sessions and application state."],
  ["FastAPI + worker", "fastapi-worker-postgres-redis", "FastAPI/Uvicorn, worker, PostgreSQL and Redis with a production-shaped service layout."],
  ["Monorepo", "monorepo-web-api-worker", "Separate web and API domains with a worker, PostgreSQL and Redis behind the same deployment workflow."],
  ["Microservices + ops", "caddy-secure-microservices-observability", "Web, API, worker, PostgreSQL, Redis, object storage, logs and uptime checks in one Caddy-first stack."],
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function InstallConsole() {
  const [selected, setSelected] = useState<(typeof commands)[number]["id"]>("remote");
  const [copied, setCopied] = useState(false);
  const active = commands.find((command) => command.id === selected) ?? commands[0];

  async function copyCommand() {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(active.command);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = active.command;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="install-console">
      <div className="install-tabs" role="tablist" aria-label="Installation method">
        {commands.map((command) => (
          <button
            key={command.id}
            type="button"
            role="tab"
            aria-selected={selected === command.id}
            className={selected === command.id ? "install-tab install-tab--active" : "install-tab"}
            onClick={() => {
              setSelected(command.id);
              setCopied(false);
            }}
          >
            <span>{command.label}</span>
            <small>{command.hint}</small>
          </button>
        ))}
      </div>
      <div className="command-shell">
        <span className="prompt">$</span>
        <code>{active.command}</code>
        <button type="button" onClick={copyCommand} aria-label="Copy installation command">
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="GroundControl home">
          <span className="brand-mark" aria-hidden="true">GC</span>
          <span>GroundControl</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#product">Product</a>
          <a href="#templates">Templates</a>
          <a href="#install">Install</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
        </nav>
      </header>

      <section className="hero section-shell">
        <div className="hero-copy-block">
          <p className="eyebrow">SELF-HOSTED VPS OPERATIONS</p>
          <h1>Build, deploy and operate your VPS from the tools you already use.</h1>
          <p className="hero-copy">
            GroundControl gives people and AI agents controlled access to deployment, runtime, terminal, domains and infrastructure operations without handing the conversation your server credentials.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href={PRODUCT_URL}>Open GroundControl <Arrow /></a>
            <a className="button button--secondary" href={GITHUB_URL} target="_blank" rel="noreferrer">Star / fork on GitHub</a>
          </div>
          <div className="hero-notes" aria-label="GroundControl product highlights">
            <span>Open source</span>
            <span>Self-hosted</span>
            <span>Docker native</span>
            <span>Agent ready</span>
          </div>
        </div>

        <figure className="hero-media">
          <img
            src="/proof/chatgpt-groundcontrol.webp"
            alt="ChatGPT using GroundControl's onboard terminal while working through a deployment task"
          />
          <figcaption>
            <strong>Real session.</strong> ChatGPT authenticated to GroundControl, then used the capabilities exposed by the product while GroundControl handled the VPS connection.
          </figcaption>
        </figure>
      </section>

      <section className="proof-band">
        <div className="section-shell proof-grid">
          <p className="eyebrow">WHY GROUND CONTROL</p>
          <div>
            <h2>Authenticate once. Keep building.</h2>
            <p>
              In ChatGPT, GroundControl can surface its login flow, let you authenticate, and then expose the operational tools the session is allowed to use. From there the work can continue through deployments, the terminal, runtime inspection and verification without a local build machine or manual SSH hop for every task.
            </p>
          </div>
        </div>
      </section>

      <section className="features section-shell" id="product">
        <div className="section-heading">
          <p className="eyebrow">THE PRODUCT</p>
          <h2>One control plane for the full life of an app on your VPS.</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
              <small>{feature.meta}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="workflow-section">
        <div className="section-shell workflow-grid">
          <div className="section-heading workflow-copy">
            <p className="eyebrow">FROM REQUEST TO RUNNING SERVICE</p>
            <h2>Less tab-switching. More finished work.</h2>
            <p>
              Use the GroundControl UI directly, or let an authenticated agent work through the tools GroundControl exposes. Repositories, build context, deployment targets, live host state and the terminal meet in one operating surface.
            </p>
          </div>
          <ol className="workflow-steps">
            <li><span>01</span><div><strong>Connect</strong><p>Install GroundControl on your VPS and connect the services you actually need.</p></div></li>
            <li><span>02</span><div><strong>Describe or configure</strong><p>Choose a template, use an existing Compose file, or tell an agent what you want deployed.</p></div></li>
            <li><span>03</span><div><strong>Build and deploy</strong><p>GroundControl runs the deployment against your infrastructure and keeps the evidence visible.</p></div></li>
            <li><span>04</span><div><strong>Verify and operate</strong><p>Check the public route, inspect runtime state, use the terminal, investigate failures and redeploy.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="templates section-shell" id="templates">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">PRODUCTION TEMPLATES</p>
            <h2>Start from a real deployment shape, not an empty form.</h2>
          </div>
          <p>
            Templates encode service relationships, domains, health checks, secrets and supporting infrastructure so common production stacks can be deployed intentionally.
          </p>
        </div>
        <div className="template-grid">
          {templates.map(([name, id, copy]) => (
            <article key={id}>
              <div className="template-topline">
                <h3>{name}</h3>
                <code>{id}</code>
              </div>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ownership-section">
        <div className="section-shell ownership-grid">
          <p className="eyebrow">CAPABILITIES, NOT CREDENTIALS</p>
          <h2>Your infrastructure credentials stay with GroundControl. The client gets the operations you choose to expose.</h2>
          <p>
            GroundControl is single-tenant and self-hosted. It can run on the same VPS it manages, talk to additional hosts, and perform host-level work through its own controlled execution layer.
          </p>
        </div>
      </section>

      <section className="install-section section-shell" id="install">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">INSTALL</p>
            <h2>Put GroundControl on your VPS.</h2>
          </div>
          <p>
            Start with the installer, complete setup on your instance, then connect GitHub, Cloudflare or additional servers only when your workflow needs them.
          </p>
        </div>
        <InstallConsole />
      </section>

      <section className="final-cta section-shell">
        <p className="eyebrow">TRY IT ON YOUR OWN VPS</p>
        <h2>Build there. Deploy there. Operate there.</h2>
        <div className="hero-actions">
          <a className="button button--primary" href={PRODUCT_URL}>Open GroundControl <Arrow /></a>
          <a className="button button--secondary" href={GITHUB_URL} target="_blank" rel="noreferrer">View source</a>
        </div>
      </section>

      <footer className="section-shell">
        <a className="wordmark" href="#top"><span className="brand-mark" aria-hidden="true">GC</span><span>GroundControl</span></a>
        <p>A Serendepify product. Open source and self-hosted.</p>
        <div><a href={PRODUCT_URL}>Open product</a><a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a></div>
      </footer>
    </main>
  );
}
