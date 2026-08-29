"use client";

import Image from "next/image";
import { useState } from "react";

const PRODUCT_URL = "https://groundcontrol.serendepify.com";
const GITHUB_URL = "https://github.com/teckedd-code2save/groundcontrol";
const BOOTSTRAP_URL =
  "https://raw.githubusercontent.com/teckedd-code2save/groundcontrol/main/scripts/bootstrap";

const commands = [
  { id: "remote", label: "Remote", hint: "From your computer", command: `curl -fsSL ${BOOTSTRAP_URL} | bash -s -- -i ~/.ssh/id_ed25519 root@YOUR_VPS_IP` },
  { id: "guided", label: "Guided", hint: "Interactive setup", command: `curl -fsSL ${BOOTSTRAP_URL} | bash -s -- --interactive` },
  { id: "local", label: "Local", hint: "Already on the VPS", command: `curl -fsSL ${BOOTSTRAP_URL} | bash` },
] as const;

const features = [
  { title: "Deployments", copy: "Enrol, deploy, verify and redeploy Docker and Compose workloads from connected repositories.", meta: "Build · deploy · verify · redeploy" },
  { title: "Runtime", copy: "Inspect containers, services, health, logs, processes and host telemetry from the same place you deploy them.", meta: "Docker · services · logs · health" },
  { title: "Terminal", copy: "Use a real browser terminal against the VPS, with visible capabilities and deliberate access to host operations.", meta: "Shell · host operations · AI commands" },
  { title: "Intelligence", copy: "Trace broken public routes to live runtime evidence, preserve uncertainty and prepare the next safe recovery action.", meta: "Evidence · investigation · recovery" },
  { title: "Domains & edge", copy: "Connect Cloudflare, provision DNS, route through Caddy and verify the public HTTPS path as part of deployment.", meta: "Cloudflare · Caddy · DNS · TLS" },
  { title: "Your infrastructure", copy: "GroundControl is self-hosted and single-tenant. Your instance, data and operational credentials stay on infrastructure you control.", meta: "Open source · self-hosted · single tenant" },
] as const;

const templates = [
  ["Existing Compose", "vps-caddy-existing-compose", "Bring a production docker-compose.yml from Git. GroundControl discovers the service graph, env requirements, ports and health checks, then publishes the selected service."],
  ["Odoo Community", "vps-caddy-odoo-community", "Deploy Odoo Community with PostgreSQL, persistent data, generated credentials, a public domain and local recovery archives."],
  ["Next.js SaaS", "nextjs-saas-postgres-redis", "Next.js with PostgreSQL and Redis for auth, queues, sessions and application state."],
  ["FastAPI + worker", "fastapi-worker-postgres-redis", "FastAPI/Uvicorn, worker, PostgreSQL and Redis with a production-shaped service layout."],
  ["Monorepo", "monorepo-web-api-worker", "Separate web and API domains with a worker, PostgreSQL and Redis behind the same deployment workflow."],
  ["Microservices + ops", "caddy-secure-microservices-observability", "Web, API, worker, PostgreSQL, Redis, object storage, logs and uptime checks in one Caddy-first stack."],
] as const;

function Arrow() { return <span aria-hidden="true">↗</span>; }

function InstallConsole() {
  const [selected, setSelected] = useState<(typeof commands)[number]["id"]>("remote");
  const [copied, setCopied] = useState(false);
  const active = commands.find((command) => command.id === selected) ?? commands[0];

  async function copyCommand() {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(active.command);
    else {
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
          <button key={command.id} type="button" role="tab" aria-selected={selected === command.id}
            className={selected === command.id ? "install-tab install-tab--active" : "install-tab"}
            onClick={() => { setSelected(command.id); setCopied(false); }}>
            <span>{command.label}</span><small>{command.hint}</small>
          </button>
        ))}
      </div>
      <div className="command-shell">
        <span className="prompt">$</span><code>{active.command}</code>
        <button type="button" onClick={copyCommand} aria-label="Copy installation command">{copied ? "COPIED" : "COPY"}</button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="GroundControl home"><span className="brand-mark" aria-hidden="true">GC</span><span>GroundControl</span></a>
        <nav aria-label="Primary navigation">
          <a href="#product">Product</a><a href="#templates">Templates</a><a href="#install">Install</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
        </nav>
      </header>

      <section className="hero section-shell">
        <div className="hero-copy-block">
          <p className="eyebrow">SELF-HOSTED OPERATIONS FOR LEAN TEAMS</p>
          <h1>Run your VPS without becoming your own SRE team.</h1>
          <p className="hero-copy">Build with your team or coding agents in the tools they already use. Then you—or an approved agent—use GroundControl to deploy, inspect, manage and recover the product on infrastructure you own, without pasting VPS credentials into the conversation.</p>
          <div className="hero-actions">
            <a className="button button--primary" href={PRODUCT_URL}>Open GroundControl <Arrow /></a>
            <a className="button button--secondary" href={GITHUB_URL} target="_blank" rel="noreferrer">Star / fork on GitHub</a>
          </div>
          <div className="hero-notes"><span>Open source</span><span>Self-hosted</span><span>Compose native</span><span>Controlled actions</span></div>
        </div>

        <figure className="hero-media">
          <Image src="/product/assistant-health-check.webp" alt="GroundControl AI Co-Pilot returning live container health, image and port evidence" width={1363} height={936} priority sizes="(max-width: 980px) 100vw, 46vw" />
          <figcaption><strong>Ask once. Get exact operational evidence.</strong> The Co-Pilot inspected the running GroundControl service and returned its image, status and published port.</figcaption>
        </figure>
      </section>

      <section className="proof-band"><div className="section-shell proof-grid"><p className="eyebrow">WHY GROUND CONTROL</p><div><h2>From repository to verified public service—without blind scripts.</h2><p>GroundControl keeps the source, inferred configuration, runtime state, public-route checks and recovery evidence in one place. You can see what it found, what it changed and what still needs attention.</p></div></div></section>

      <section className="evidence-section section-shell" id="proof">
        <div className="section-heading section-heading--split"><div><p className="eyebrow">DEPLOYMENT → OPERATIONS</p><h2>Everything you need once the code is ready.</h2></div><p>Bring the repository. GroundControl gives you and approved agents one surface to validate the source, configure the deployment, inspect runtime, route domains and recover when something breaks.</p></div>
        <figure className="evidence-feature">
          <Image src="/product/existing-compose-flow.webp" alt="GroundControl repository validation, inferred Compose configuration and verified deployment stages" width={1353} height={929} unoptimized sizes="(max-width: 720px) 100vw, 92vw" />
          <figcaption><span>01 · Existing Compose</span><strong>Validate the repository, discover the service and carry its configuration into deployment.</strong><small>Source → configuration → verified deployment.</small></figcaption>
        </figure>
        <div className="evidence-grid">
          <figure className="evidence-card">
            <Image src="/product/runtime-inventory.webp" alt="GroundControl Runtime listing live containers, health, ports, CPU and memory" width={1353} height={929} sizes="(max-width: 720px) 100vw, 46vw" />
            <figcaption><span>02 · Runtime</span><strong>See what is actually running.</strong><small>Container health, published ports and resources stay close to the deployment.</small></figcaption>
          </figure>
          <figure className="evidence-card">
            <Image src="/product/intelligence-recovery.webp" alt="GroundControl Intelligence tracing a failed endpoint to an unreachable upstream and proposing a safe recovery" width={1353} height={929} sizes="(max-width: 720px) 100vw, 46vw" />
            <figcaption><span>03 · Intelligence</span><strong>Move from failure to a specific next action.</strong><small>Problem, evidence, uncertainty, recovery and verification remain explicit.</small></figcaption>
          </figure>
        </div>
      </section>

      <section className="features section-shell" id="product">
        <div className="section-heading"><p className="eyebrow">THE PRODUCT</p><h2>One control plane for the full life of an app on your VPS.</h2></div>
        <div className="feature-grid">{features.map((feature) => <article key={feature.title}><h3>{feature.title}</h3><p>{feature.copy}</p><small>{feature.meta}</small></article>)}</div>
      </section>

      <section className="workflow-section"><div className="section-shell workflow-grid">
        <div className="section-heading workflow-copy"><p className="eyebrow">YOUR TEAM OR AGENTS</p><h2>Build where you build. Operate through GroundControl.</h2><p>Your team or coding agents create the product in whatever tools they use. From the repository onward, you or your approved agents use GroundControl to deploy, inspect, manage and recover it on infrastructure you own.</p><figure className="workflow-media"><Image src="/product/deployment-verified.webp" alt="A successful Ghana Health AI deployment inside GroundControl" width={1353} height={929} sizes="(max-width: 980px) 100vw, 42vw" /><figcaption>Ghana Health AI · two running services · release verified.</figcaption></figure></div>
        <ol className="workflow-steps">
          <li><span>01</span><div><strong>Build with your team or agents</strong><p>Create the product in the coding environment or agent workflow you already use.</p></div></li>
          <li><span>02</span><div><strong>Bring the repository</strong><p>In GroundControl, connect the source and choose a template or existing Compose workflow.</p></div></li>
          <li><span>03</span><div><strong>Deploy through GroundControl</strong><p>You or an approved agent configure and launch the service while the deployment evidence stays visible.</p></div></li>
          <li><span>04</span><div><strong>Manage through GroundControl</strong><p>Inspect runtime, use the terminal, route domains, investigate failures, recover and verify.</p></div></li>
        </ol>
      </div></section>

      <section className="templates section-shell" id="templates">
        <div className="section-heading section-heading--split"><div><p className="eyebrow">PRODUCTION TEMPLATES</p><h2>Start from a real deployment shape, not an empty form.</h2></div><p>Templates encode service relationships, domains, health checks, secrets and supporting infrastructure so common production stacks can be deployed intentionally.</p></div>
        <figure className="template-capture"><Image src="/product/template-catalogue.webp" alt="GroundControl production template catalogue" width={1353} height={929} sizes="(max-width: 720px) 100vw, 92vw" /><figcaption><strong>Deployment workflows, already shaped.</strong> Existing Compose, Odoo, static sites, k3s and production proxy patterns include validation—not loose boilerplate.</figcaption></figure>
        <div className="template-grid">{templates.map(([name, id, copy]) => <article key={id}><div className="template-topline"><h3>{name}</h3><code>{id}</code></div><p>{copy}</p></article>)}</div>
      </section>

      <section className="ownership-section"><div className="section-shell ownership-grid"><div className="ownership-copy"><p className="eyebrow">CAPABILITIES, NOT CREDENTIALS</p><h2>Your infrastructure credentials stay with GroundControl.</h2><p>An approved agent gets only the operational capabilities you expose through GroundControl—not your raw VPS credentials. You remain in control, with direct access and a full terminal when you need it.</p></div><figure className="terminal-capture"><Image src="/product/terminal-docker-ps.webp" alt="GroundControl terminal running docker ps on the active host" width={1353} height={929} sizes="(max-width: 980px) 100vw, 52vw" /><figcaption><strong>Host-level control when you need it.</strong> Run a scoped <code>docker ps</code> check against the active host without moving credentials into an agent conversation.</figcaption></figure></div></section>

      <section className="install-section section-shell" id="install">
        <div className="section-heading section-heading--split"><div><p className="eyebrow">INSTALL</p><h2>Put GroundControl on your VPS.</h2></div><p>Start with the installer, complete setup on your instance, then connect GitHub, Cloudflare or additional servers only when your workflow needs them.</p></div>
        <InstallConsole />
      </section>

      <section className="final-cta section-shell"><p className="eyebrow">YOUR TEAM OR AGENTS AT THE CONTROLS</p><h2>Build with your agents. Deploy and manage with GroundControl.</h2><p className="final-cta-copy">You or your approved agents stay in control. GroundControl provides the deployment, runtime, domain, terminal, recovery and verification tools.</p><div className="hero-actions"><a className="button button--primary" href={PRODUCT_URL}>Open GroundControl <Arrow /></a><a className="button button--secondary" href={GITHUB_URL} target="_blank" rel="noreferrer">View source</a></div></section>

      <footer className="section-shell"><a className="wordmark" href="#top"><span className="brand-mark" aria-hidden="true">GC</span><span>GroundControl</span></a><p>A Serendepify product. Open source and self-hosted.</p><div><a href={PRODUCT_URL}>Open product</a><a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a></div></footer>
    </main>
  );
}
