"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

const proofFrames = [
  {
    step: "01",
    label: "AUTHORIZE",
    src: "/product/agent-access.webp",
    alt: "GroundControl showing an active ChatGPT OAuth grant with scoped deployment capabilities",
    title: "Give the agent a bounded operating envelope.",
    copy: "ChatGPT gets exact deployment and capability scopes. SSH keys and provider credentials stay inside your control plane.",
  },
  {
    step: "02",
    label: "VERIFY",
    src: "/product/assistant-health-check.webp",
    alt: "ChatGPT showing a live GroundControl health check for RentAWeekend with healthy containers and HTTP 200",
    title: "Read the live deployment state.",
    copy: "GroundControl resolves containers, runtime health and the public endpoint before the agent forms a conclusion.",
  },
  {
    step: "03",
    label: "OPERATE",
    src: "/product/redeploy-proof.webp",
    alt: "ChatGPT reporting a successful GroundControl redeploy with an operation ID and verification evidence",
    title: "Let GroundControl own the operation.",
    copy: "Redeploy returns a durable operation ID, continues independently of the chat, then records verification evidence.",
  },
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function scrollToInstall() {
  document.getElementById("install")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SafeProofImage({
  src,
  alt,
  className = "",
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`proof-image-fallback ${className}`} role="img" aria-label={`${alt} unavailable`}>
        <span>LIVE PRODUCT PROOF</span>
        <strong>Capture unavailable</strong>
        <small>The frame stays visible instead of collapsing.</small>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={360}
      height={780}
      sizes={sizes}
      className={className}
      unoptimized
      onError={() => setFailed(true)}
    />
  );
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

function MotionGrid() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / travel)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const eased = progress * progress * (3 - 2 * progress);
  const compact = { left: 57, top: 18, width: 29, height: 68 };
  const expanded = { left: 4.5, top: 6, width: 91, height: 86 };
  const frame = {
    left: compact.left + (expanded.left - compact.left) * eased,
    top: compact.top + (expanded.top - compact.top) * eased,
    width: compact.width + (expanded.width - compact.width) * eased,
    height: compact.height + (expanded.height - compact.height) * eased,
  };
  const spread = Math.min(1, Math.max(0, (progress - 0.14) / 0.48));
  const finalOpacity = Math.min(1, Math.max(0, (progress - 0.7) * 4));

  return (
    <section className="motion-grid-section" ref={sectionRef} id="agents">
      <div className="motion-grid-pin">
        <div className="motion-grid-lines" aria-hidden="true" />
        <div className="motion-grid-crosshairs" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, index) => <i key={index} />)}
        </div>

        <div
          className="motion-grid-copy"
          style={{
            opacity: Math.max(0, 1 - progress * 2.15),
            transform: `translateY(${-22 * progress}px)`,
          }}
        >
          <p className="eyebrow">CHATGPT + GROUNDCONTROL</p>
          <h2>Your agent gets a bounded operating envelope.</h2>
          <p>
            Connect once through OAuth. Choose the exact deployments and capabilities.
            GroundControl keeps the credentials and executes the work.
          </p>
        </div>

        <div
          className="motion-proof-stage"
          style={{
            left: `${frame.left}%`,
            top: `${frame.top}%`,
            width: `${frame.width}%`,
            height: `${frame.height}%`,
          }}
        >
          {proofFrames.map((proof, index) => {
            const offset = (index - 1) * 34 * spread;
            const opacity = index === 0
              ? 1
              : Math.min(1, Math.max(0, spread * 1.35 - (index === 2 ? 0.1 : 0)));
            const scale = 1 - (index === 1 ? 0 : 0.06 * spread);
            const rotation = index === 0 ? -2.5 * spread : index === 2 ? 2.5 * spread : 0;

            return (
              <figure
                key={proof.step}
                className={`motion-proof-card motion-proof-card--${index}`}
                style={{
                  left: `calc(50% + ${offset}%)`,
                  opacity,
                  transform: `translateX(-50%) scale(${scale}) rotate(${rotation}deg)`,
                  zIndex: index === 1 ? 4 : 3,
                }}
              >
                <div className="motion-proof-rail">
                  <span>{proof.step}</span>
                  <strong>{proof.label}</strong>
                  <i aria-hidden="true" />
                </div>
                <div className="motion-proof-image">
                  <SafeProofImage
                    src={proof.src}
                    alt={proof.alt}
                    sizes="(max-width: 720px) 74vw, 320px"
                  />
                </div>
              </figure>
            );
          })}

          <div className="motion-stage-vignette" style={{ opacity: Math.max(0, (progress - 0.48) * 1.4) }} />
        </div>

        <div className="motion-grid-final" style={{ opacity: finalOpacity }}>
          <p className="eyebrow">THE RESULT</p>
          <h3>Authorize. Verify. Operate. GroundControl keeps the evidence.</h3>
          <div className="motion-metrics">
            <span><strong>OAuth</strong> scoped access</span>
            <span><strong>HTTP 200</strong> live health</span>
            <span><strong>Operation ID</strong> durable work</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofSequence() {
  return (
    <section className="proof-sequence section-shell">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">LIVE ACCEPTANCE · SEPTEMBER 2026</p>
        <h2>See the live agent workflow end to end.</h2>
        <p>
          These are the live steps that moved through ChatGPT and GroundControl:
          a scoped grant, a real health read, and a verified redeploy.
        </p>
      </div>

      <div className="proof-sequence-grid">
        {proofFrames.map((proof, index) => (
          <article
            key={proof.step}
            className="proof-reveal-card"
            data-reveal
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            <div className="proof-reveal-meta">
              <span>{proof.step}</span>
              <strong>{proof.label}</strong>
            </div>
            <div className="proof-reveal-window">
              <SafeProofImage
                src={proof.src}
                alt={proof.alt}
                sizes="(max-width: 720px) 82vw, 310px"
              />
            </div>
            <h3>{proof.title}</h3>
            <p>{proof.copy}</p>
          </article>
        ))}
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
          <a href="#agents">Agents</a>
          <a href="#product">Product</a>
          <a href="#install">Install</a>
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
          <p className="eyebrow hero-kicker">SELF-HOSTED CONTROL PLANE FOR SOFTWARE AGENTS</p>
          <h1 aria-label="Give your agents infrastructure arms.">
            <span className="line-mask"><span className="line-inner">Give your agents</span></span>
            <span className="line-mask"><span className="line-inner line-inner--accent">infrastructure arms.</span></span>
          </h1>
          <p className="hero-private-copy fade-in-seq">
            GroundControl gives ChatGPT and other approved agents typed deployment, runtime and recovery capabilities
            on infrastructure you own. SSH keys and provider credentials stay inside your control plane.
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
        <a href="#agents" className="scroll-cue" aria-label="Scroll to agent workflow">
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

      <MotionGrid />
      <ProofSequence />

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
          <a href="#install">Install</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </main>
  );
}
