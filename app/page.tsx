"use client";

import Image from "next/image";
import { useState } from "react";

const GITHUB_URL = "https://github.com/teckedd-code2save/groundcontrol";
const INSTALL_URL =
  "https://raw.githubusercontent.com/teckedd-code2save/groundcontrol/main/scripts/install";

const commands = [
  {
    id: "human",
    label: "On your VPS",
    hint: "Human-readable install",
    command: `curl -fsSL ${INSTALL_URL} | sudo bash`,
  },
  {
    id: "agent",
    label: "Agent",
    hint: "Structured JSON result",
    command: `curl -fsSL ${INSTALL_URL} | sudo bash -s -- --json`,
  },
  {
    id: "pinned",
    label: "Pinned",
    hint: "Choose an image tag",
    command: `curl -fsSL ${INSTALL_URL} | sudo bash -s -- --version YOUR_TAG --json`,
  },
] as const;

const features = [
  {
    title: "Agent-native operations",
    copy: "Connect ChatGPT or another MCP client through OAuth. Agents receive scoped deployment capabilities, not your SSH keys or provider secrets.",
    meta: "MCP · OAuth · resource scopes",
  },
  {
    title: "Durable deployment work",
    copy: "Redeployments return operation IDs, continue after the chat disconnects, verify the result, and preserve evidence for the next agent session.",
    meta: "Idempotent · resumable · verifiable",
  },
  {
    title: "Connector capability health",
    copy: "GitHub, GHCR and Daytona are checked capability by capability so configured never masquerades as healthy.",
    meta: "Healthy · degraded · missing scope",
  },
  {
    title: "Native terminal",
    copy: "Operators get a real xterm + PTY with Tab, Ctrl+C, history, ANSI output and persistent shell state when direct access is appropriate.",
    meta: "PTY · SSH · host bridge",
  },
  {
    title: "Deployment evidence",
    copy: "Inspect runtime containers, routes, health, releases, source identity and public verification from one operational record.",
    meta: "Runtime · source · verification",
  },
  {
    title: "Single-tenant by design",
    copy: "Every installation is your own control plane. The public site never doubles as a shared dashboard and your instance keeps its credentials locally.",
    meta: "Self-hosted · private · open source",
  },
] as const;

const agentTools = [
  ["deployment.list", "See only the workloads the grant allows."],
  ["deployment.inspect", "Read source, target, release and runtime identity."],
  ["deployment.health", "Check containers and the public endpoint."],
  ["deployment.config.check", "Confirm named config keys without returning secret values."],
  ["deployment.redeploy", "Start an idempotent durable redeploy operation."],
  ["operation.get", "Return later and read final status + evidence."],
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function scrollToInstall() {
  document.getElementById("install")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function InstallConsole() {
  const [selected, setSelected] = useState<(typeof commands)[number]["id"]>("agent");
  const [copied, setCopied] = useState(false);
  const active = commands.find((command) => command.id === selected) ?? commands[1];

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
          <a href="#agents">Agents</a>
          <a href="#product">Product</a>
          <a href="#install">Install</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
        </nav>
      </header>

      <section className="hero section-shell">
        <div className="hero-copy-block">
          <p className="eyebrow">SELF-HOSTED CONTROL PLANE FOR SOFTWARE AGENTS</p>
          <h1>Give your agents infrastructure arms.</h1>
          <p className="hero-copy">
            GroundControl lets ChatGPT and other approved agents inspect, deploy, verify and recover
            applications on infrastructure you own without handing the conversation your SSH keys,
            provider credentials or an unrestricted shell.
          </p>
          <div className="hero-actions">
            <button type="button" className="button button--primary" onClick={scrollToInstall}>
              Install GroundControl <Arrow />
            </button>
            <a className="button button--secondary" href={GITHUB_URL} target="_blank" rel="noreferrer">
              View source
            </a>
          </div>
          <div className="hero-notes">
            <span>Open source</span>
            <span>Single tenant</span>
            <span>MCP + OAuth</span>
            <span>Agent-assisted install</span>
          </div>
        </div>

        <figure className="hero-media">
          <Image
            src="/product/current-dashboard.png"
            alt="Current GroundControl dashboard showing the private operator control plane"
            width={1440}
            height={1000}
            priority
            sizes="(max-width: 980px) 100vw, 46vw"
          />
          <figcaption>
            <strong>Your instance, not a shared SaaS dashboard.</strong> GroundControl runs beside the
            infrastructure it operates and becomes the bounded execution layer between your agents and the host.
          </figcaption>
        </figure>
      </section>

      <section className="proof-band">
        <div className="section-shell proof-grid">
          <p className="eyebrow">THE PRODUCT THESIS</p>
          <div>
            <h2>Agents should ask for outcomes, not learn your server.</h2>
            <p>
              GroundControl turns repositories, containers, domains, deployment evidence and provider connections
              into typed operational capabilities. The agent asks to inspect or redeploy. GroundControl handles
              the host mechanics, verifies the result and returns evidence.
            </p>
          </div>
        </div>
      </section>

      <section className="evidence-section section-shell" id="agents">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">CHATGPT + YOUR INFRASTRUCTURE</p>
            <h2>Connect once. Grant only what the agent needs.</h2>
          </div>
          <p>
            GroundControl exposes a remote MCP endpoint with OAuth. Each client receives exact deployment and
            capability scopes. Human approval is reserved for the boundaries you choose, not every harmless operation.
          </p>
        </div>

        <div className="grid gap-px border border-[var(--line-strong)] bg-[var(--line-strong)] md:grid-cols-3">
          {[
            ["01", "Connect", "Add the GroundControl MCP URL to ChatGPT or another compatible agent."],
            ["02", "Authorize", "Sign into your private instance and choose exact workloads + capabilities."],
            ["03", "Operate", "The agent can inspect, redeploy and verify within that autonomy envelope."],
          ].map(([step, title, copy]) => (
            <article key={step} className="bg-[var(--deep)] p-7">
              <span className="font-mono text-[9px] tracking-[0.12em] text-[var(--accent-bright)]">{step}</span>
              <h3 className="mt-5 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {agentTools.map(([name, copy]) => (
            <article key={name} className="border border-[var(--line)] bg-[var(--deep)] p-5">
              <code className="font-mono text-xs text-[var(--accent-bright)]">{name}</code>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="workflow-section">
        <div className="section-shell workflow-grid">
          <div className="section-heading workflow-copy">
            <p className="eyebrow">REAL OPERATING SURFACE</p>
            <h2>GroundControl knows what is actually running.</h2>
            <p>
              The control plane keeps deployment identity, runtime state and public verification close enough that
              agents can make decisions without scraping a pile of shell output.
            </p>
            <figure className="workflow-media">
              <Image
                src="/product/current-infrastructure.png"
                alt="Current GroundControl infrastructure view"
                width={1440}
                height={1000}
                sizes="(max-width: 980px) 100vw, 42vw"
              />
              <figcaption>Current infrastructure surface · host and operational state.</figcaption>
            </figure>
          </div>

          <ol className="workflow-steps">
            <li>
              <span>01</span>
              <div>
                <strong>Connect GitHub</strong>
                <p>Use an operator-owned GitHub App, then choose the exact account and repository GroundControl may see.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Connect Repo</strong>
                <p>Link an installation-backed repository to the deployment. Private repositories are first-class, not a public-API fallback.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Deploy and verify</strong>
                <p>Operations keep their own durable state and evidence, even when the calling chat disappears.</p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <strong>Investigate safely</strong>
                <p>Connector health distinguishes configured, healthy, degraded, missing-scope and revoked capabilities.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="evidence-section section-shell">
        <div className="section-heading">
          <p className="eyebrow">CURRENT PRODUCT</p>
          <h2>The interface changed. The proof should change with it.</h2>
        </div>

        <figure className="evidence-feature">
          <Image
            src="/product/current-topology.png"
            alt="Current GroundControl topology view"
            width={1440}
            height={1000}
            sizes="(max-width: 720px) 100vw, 92vw"
          />
          <figcaption>
            <span>01 · Topology</span>
            <strong>Understand services and their relationships before changing them.</strong>
            <small>Current product capture.</small>
          </figcaption>
        </figure>

        <div className="evidence-grid">
          <figure className="evidence-card">
            <Image
              src="/product/current-containers.png"
              alt="Current GroundControl runtime containers view"
              width={1440}
              height={1000}
              sizes="(max-width: 720px) 100vw, 46vw"
            />
            <figcaption>
              <span>02 · Runtime</span>
              <strong>See containers, health and what is actually alive.</strong>
              <small>Runtime evidence stays separate from source assumptions.</small>
            </figcaption>
          </figure>

          <figure className="evidence-card">
            <Image
              src="/product/current-terminal.png"
              alt="Current GroundControl native PTY terminal"
              width={1440}
              height={1000}
              sizes="(max-width: 720px) 100vw, 46vw"
            />
            <figcaption>
              <span>03 · Terminal</span>
              <strong>A real PTY for the operator, not an agent escape hatch.</strong>
              <small>Tab, Ctrl+C, history, ANSI and persistent cwd.</small>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="features section-shell" id="product">
        <div className="section-heading">
          <p className="eyebrow">WHY AGENTS PREFER THE CONTROL PLANE</p>
          <h2>More reach. Less infrastructure-specific reasoning.</h2>
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

      <section className="ownership-section">
        <div className="section-shell ownership-grid">
          <div className="ownership-copy">
            <p className="eyebrow">CONNECTORS AS CAPABILITIES</p>
            <h2>“Configured” is not the same thing as healthy.</h2>
            <p>
              GitHub repository reads, signed webhooks, repair PR permissions, GHCR pulls and Daytona sandbox
              lifecycle are verified independently. GroundControl tells agents what works now and exactly what needs repair.
            </p>
            <div className="mt-6 space-y-2 font-mono text-[10px] text-[var(--muted)]">
              <p><span className="text-[var(--success)]">healthy</span> · repository read verified</p>
              <p><span className="text-amber-300">unverified</span> · configured but not yet proven</p>
              <p><span className="text-red-300">missing_scope</span> · reconnect with the capability required</p>
            </div>
          </div>

          <figure className="terminal-capture">
            <Image
              src="/product/current-dashboard.png"
              alt="Current GroundControl operator dashboard"
              width={1440}
              height={1000}
              sizes="(max-width: 980px) 100vw, 52vw"
            />
            <figcaption>
              <strong>The public website is only the front door.</strong> Every operator gets their own GroundControl instance and private login plane.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="install-section section-shell" id="install">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">AGENT-ASSISTED INSTALL</p>
            <h2>Install mechanically. Claim ownership personally.</h2>
          </div>
          <p>
            The installer runs on the VPS, generates secrets there, starts GroundControl on loopback and returns a
            short-lived one-time claim. The installing agent never becomes the permanent administrator.
          </p>
        </div>

        <InstallConsole />

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {[
            ["1", "Install", "Agent or operator runs the canonical installer on the authorized VPS."],
            ["2", "Claim", "Human opens the short-lived claim URL and creates the first administrator."],
            ["3", "Publish", "Attach your domain/reverse proxy or keep the instance private."],
            ["4", "Connect agent", "Add the instance MCP URL to ChatGPT and approve the exact scope."],
          ].map(([step, title, copy]) => (
            <article key={step} className="border border-[var(--line)] bg-[var(--deep)] p-4">
              <span className="font-mono text-[9px] text-[var(--accent-bright)]">{step}</span>
              <strong className="mt-3 block text-sm">{title}</strong>
              <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{copy}</p>
            </article>
          ))}
        </div>

        <p className="mt-5 max-w-3xl text-xs leading-6 text-[var(--dim)]">
          A fresh install binds locally first. GroundControl should be published through HTTPS before you use the
          operator login over the public internet. Domain/bridge automation is the next distribution step.
        </p>
      </section>

      <section className="final-cta section-shell">
        <p className="eyebrow">YOUR INFRASTRUCTURE, NOW AGENT-ADDRESSABLE</p>
        <h2>Build anywhere. Let GroundControl operate what you ship.</h2>
        <p className="final-cta-copy">
          The agent gets typed capabilities and evidence. You keep ownership, credentials and the private control plane.
        </p>
        <div className="hero-actions">
          <button type="button" className="button button--primary" onClick={scrollToInstall}>
            Install GroundControl <Arrow />
          </button>
          <a className="button button--secondary" href={GITHUB_URL} target="_blank" rel="noreferrer">
            View source
          </a>
        </div>
      </section>

      <footer className="section-shell">
        <a className="wordmark" href="#top">
          <span className="brand-mark" aria-hidden="true">GC</span>
          <span>GroundControl</span>
        </a>
        <p>A Serendepify product. Open source, self-hosted and single tenant.</p>
        <div>
          <a href="#install">Install</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </main>
  );
}
