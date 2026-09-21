"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const agentTools = [
  ["deployment.list", "See only the workloads the grant allows."],
  ["deployment.inspect", "Read source, target, release and runtime identity."],
  ["deployment.health", "Check containers and the public endpoint."],
  ["deployment.config.check", "Confirm named config keys while values stay private."],
  ["deployment.redeploy", "Start an idempotent durable redeploy."],
  ["operation.get", "Return later for final status and evidence."],
] as const;

const capabilities = [
  ["Agent-native operations", "ChatGPT and MCP clients receive scoped capabilities while SSH keys stay inside GroundControl.", "MCP · OAuth"],
  ["Durable operations", "Deployments continue after the calling chat disappears and retain verification evidence.", "operation id · evidence"],
  ["Connector health", "GitHub, GHCR and Daytona are verified capability by capability.", "healthy · degraded"],
  ["Native operator PTY", "Humans still get a real terminal with Tab, Ctrl+C, history and persistent state.", "xterm · PTY"],
  ["Secret-safe config checks", "Agents can confirm named configuration exists while values remain private.", "metadata only"],
  ["Single tenant", "Every install is your own private control plane on infrastructure you own.", "self-hosted"],
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
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
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

function DeploymentEvidence() {
  const evidence = [
    {
      label: "REQUEST",
      title: "ChatGPT asked GroundControl to operate one deployment.",
      copy: "The OAuth grant exposed only the selected workload and typed deployment capabilities. VPS credentials never entered the chat.",
      value: "scoped access",
    },
    {
      label: "TRIGGER",
      title: "A signed merge event became durable work.",
      copy: "A push to the allowed RentAWeekend main branch created a deployment.source.deploy operation tied to the exact revision.",
      value: "operation cmubbc14l…",
    },
    {
      label: "VERIFY",
      title: "GroundControl checked the customer outcome.",
      copy: "The operation completed in one attempt with no recorded error. Web, API, PostgreSQL and Redis were healthy, and the public route returned HTTP 200.",
      value: "HTTP 200 · 99 ms",
    },
  ] as const;

  return (
    <section className="deployment-evidence section-shell" id="proof">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">ONE REAL REQUEST · COMPLETE EVIDENCE CHAIN</p>
        <h2>ChatGPT did more than call a deploy endpoint.</h2>
        <p>
          It used GroundControl to stay inside policy, start durable work, reconnect to the
          operation, and report the verified customer-facing result.
        </p>
      </div>

      <div className="evidence-chain">
        {evidence.map((item, index) => (
          <article key={item.label} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
            <div className="evidence-meta">
              <span>0{index + 1}</span>
              <strong>{item.label}</strong>
            </div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
            <code>{item.value}</code>
          </article>
        ))}
      </div>

      <div className="proof-gallery" data-reveal>
        <figure>
          <div className="proof-capture">
            <Image src="/proof/oauth-scoped-grant.jpg" alt="GroundControl OAuth screen granting ChatGPT selected deployment capabilities" width={710} height={1536} />
          </div>
          <figcaption><strong>01 · AUTHORIZE</strong><span>The operator selects both capabilities and deployments. Everything else remains invisible.</span></figcaption>
        </figure>
        <figure className="proof-live-card">
          <div className="proof-live-head"><span>FRESH MCP CHECK</span><i>HEALTHY</i></div>
          <div className="proof-live-body">
            <p><span>deployment</span><strong>rentaweekend</strong></p>
            <p><span>runtime</span><strong>4 / 4 healthy</strong></p>
            <p><span>public endpoint</span><strong>HTTP 200</strong></p>
            <pre>{`ChatGPT → deployment.health\nweb       healthy\napi       healthy\npostgres  healthy\nredis     healthy\npublic    200 OK`}</pre>
          </div>
          <figcaption><strong>02 · OPERATE</strong><span>A live read through the scoped OAuth/MCP grant on 21 September 2026—no SSH session or credential handoff.</span></figcaption>
        </figure>
        <figure>
          <div className="proof-capture">
            <Image src="/proof/rentaweekend-live.jpg" alt="The live RentAWeekend application after its verified deployment" width={710} height={1536} />
          </div>
          <figcaption><strong>03 · VERIFY</strong><span>The application GroundControl deployed and checked at its public endpoint.</span></figcaption>
        </figure>
      </div>

      <div className="proof-actions" data-reveal>
        <Link href="/articles/chatgpt-operated-my-deployment">Read the deployment story <Arrow /></Link>
        <Link href="/docs">Open technical docs <Arrow /></Link>
        <a href="https://github.com/teckedd-code2save/groundcontrol/actions/runs/35617805067" target="_blank" rel="noreferrer">
          View acceptance run <Arrow />
        </a>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main id="top">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="GroundControl home">
          <span className="orbit-mark" aria-hidden="true"><i /></span>
          <span>GroundControl</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#proof">How it works</a>
          <Link href="/docs">Docs</Link>
          <Link href="/articles/chatgpt-operated-my-deployment">Article</Link>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
        </nav>
      </header>

      <section className="hero-private">
        <div className="ambient-mesh" aria-hidden="true">
          <div className="ambient-orb ambient-orb--one" />
          <div className="ambient-orb ambient-orb--two" />
          <div className="ambient-grain" />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-private-inner">
          <p className="eyebrow hero-kicker">OPEN-SOURCE AGENTIC DEPLOYMENT · MCP + OAUTH</p>
          <h1 aria-label="Give AI agents controlled access to deploy.">
            <span className="line-mask"><span className="line-inner">Give AI agents controlled</span></span>
            <span className="line-mask"><span className="line-inner line-inner--accent">access to deploy.</span></span>
          </h1>
          <p className="hero-private-copy fade-in-seq">
            No repeated permission prompts. No credential handoffs. GroundControl makes deployment safe, smooth,
            observable and agentic—so ChatGPT can inspect, deploy, follow progress and verify the result through one scoped OAuth grant.
          </p>
          <div className="hero-actions fade-in-seq">
            <button type="button" className="button button--primary" onClick={scrollToInstall}>
              Install on your VPS <Arrow />
            </button>
            <a className="button button--secondary" href={GITHUB_URL} target="_blank" rel="noreferrer">
              View source
            </a>
          </div>
          <div className="hero-notes fade-in-seq">
            <span>MCP + OAuth</span>
            <span>Single tenant</span>
            <span>Durable operations</span>
            <span>Agent-assisted install</span>
          </div>
        </div>
        <a href="#proof" className="scroll-cue" aria-label="Scroll to deployment workflow">
          <span />
          Scroll
        </a>
      </section>

      <section className="statement section-shell" data-reveal>
        <p className="eyebrow">THE PRODUCT THESIS</p>
        <div>
          <h2>Your agents only need to tell GroundControl what they want done.</h2>
          <p>
            Deploy this release. Check the health. Roll back if verification fails. GroundControl turns those requests into
            server-specific actions, verifies the result, and returns evidence.
          </p>
        </div>
      </section>

      <DeploymentEvidence />

      <section className="capabilities section-shell" id="product">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">WHAT GROUNDCONTROL GIVES THE AGENT</p>
          <h2>More reach. Less infrastructure-specific reasoning.</h2>
        </div>
        <div className="capability-grid">
          {capabilities.map(([title, copy, meta], index) => (
            <article key={title} data-reveal style={{ transitionDelay: `${index * 55}ms` }}>
              <span className="capability-index">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <small>{meta}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="tools-band">
        <div className="section-shell tools-layout">
          <div data-reveal>
            <p className="eyebrow">NARROW TOOL SURFACE</p>
            <h2>A small, typed capability surface.</h2>
            <p>
              External agents get intent-level operations with resource scopes, idempotency and evidence. The native terminal
              remains an operator tool.
            </p>
          </div>
          <div className="tool-list" data-reveal>
            {agentTools.map(([name, copy]) => (
              <div key={name}>
                <code>{name}</code>
                <span>{copy}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="connectors section-shell">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">CONNECTORS AS CAPABILITIES</p>
          <h2>Connect GitHub. Connect Repo. Prove what actually works.</h2>
          <p>
            Repository access, signed events, repair PR permissions, private GHCR pulls and Daytona sandbox
            reproduction are verified independently, so each capability has a trustworthy current status.
          </p>
        </div>
        <div className="connector-flow" data-reveal>
          <span>Connect GitHub</span><i>→</i><span>Connect Repo</span><i>→</i><span>Deploy</span><i>→</i><span>Verify</span>
        </div>
      </section>

      <section className="install-section section-shell" id="install">
        <div className="section-heading section-heading--split" data-reveal>
          <div>
            <p className="eyebrow">AGENT-ASSISTED INSTALL</p>
            <h2>Install mechanically. Claim ownership personally.</h2>
          </div>
          <p>
            The installer runs on the authorized VPS, generates secrets there, starts GroundControl on loopback and
            returns a short-lived one-time claim. Human ownership is established explicitly during claim.
          </p>
        </div>
        <InstallConsole />
        <div className="install-steps">
          {[
            ["01", "Install", "Run the canonical installer on the VPS."],
            ["02", "Claim", "Human creates the first administrator."],
            ["03", "Publish", "Attach HTTPS/domain or keep it private."],
            ["04", "Connect agent", "Approve the exact MCP scope."],
          ].map(([step, title, copy], index) => (
            <article key={step} data-reveal style={{ transitionDelay: `${index * 65}ms` }}>
              <span>{step}</span>
              <strong>{title}</strong>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta section-shell" data-reveal>
        <p className="eyebrow">YOUR INFRASTRUCTURE, NOW AGENT-ADDRESSABLE</p>
        <h2>Build anywhere. Let GroundControl operate what you ship.</h2>
        <p>
          Your agent gets bounded reach and operational evidence. You keep ownership, credentials and the private
          control plane.
        </p>
        <div className="hero-actions">
          <button type="button" className="button button--primary" onClick={scrollToInstall}>
            Install GroundControl <Arrow />
          </button>
          <a className="button button--secondary" href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </section>

      <footer className="section-shell">
        <a className="wordmark" href="#top">
          <span className="orbit-mark" aria-hidden="true"><i /></span>
          <span>GroundControl</span>
        </a>
        <p>A Serendepify product. Open source, self-hosted, single tenant.</p>
        <div>
          <Link href="/docs">Docs</Link>
          <Link href="/articles/chatgpt-operated-my-deployment">Article</Link>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </main>
  );
}
