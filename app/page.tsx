"use client";

import { useState } from "react";

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

const capabilities = [
  {
    number: "01",
    title: "See the whole host",
    copy: "Containers, images, services, processes and host telemetry are presented as one operating picture.",
    meta: "Inventory · Health · Runtime",
  },
  {
    number: "02",
    title: "Deploy with context",
    copy: "Connect repositories, manage environment values and move services forward without losing the path back.",
    meta: "GitHub · Compose · Rollback",
  },
  {
    number: "03",
    title: "Investigate from evidence",
    copy: "Bring changes, alerts and runtime signals together before deciding what should happen next.",
    meta: "Signals · Timeline · Actions",
  },
];

const installSteps = [
  ["Connect", "GroundControl checks the VPS, Docker and the safest available installation path."],
  ["Install", "A self-contained control plane is created on infrastructure you already own."],
  ["Operate", "Open your instance, change the generated password and begin from the actual host state."],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ProductPreview() {
  return (
    <div className="product-preview" aria-label="GroundControl operational interface preview">
      <div className="preview-topbar">
        <div className="preview-brand">
          <span className="brand-mark brand-mark--small" />
          <span>GROUND CONTROL</span>
        </div>
        <div className="preview-topmeta">
          <span className="live-dot" /> LIVE HOST
        </div>
      </div>

      <div className="preview-body">
        <aside className="preview-rail" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={index} className={index === 0 ? "rail-line rail-line--active" : "rail-line"} />
          ))}
        </aside>

        <div className="preview-main">
          <div className="preview-heading">
            <div>
              <p className="eyebrow">FLEET OVERVIEW</p>
              <h2>Operations</h2>
            </div>
            <p className="preview-clock">02:14:38 UTC</p>
          </div>

          <section className="signal-panel">
            <div className="signal-copy">
              <span className="status-pill"><span className="live-dot" /> VERIFIED OPERATIONAL STATE</span>
              <h3>All systems operational</h3>
              <p>No current customer-impacting signals across this host.</p>
              <div className="signal-actions">
                <span>OPEN INTELLIGENCE</span>
                <span>REVIEW ALERTS</span>
              </div>
            </div>
            <div className="metric-grid">
              {[
                ["MEMORY", "42%", "1.7 / 4 GB"],
                ["DISK", "31%", "24 / 80 GB"],
                ["LOAD", "0.24", "4 cores"],
                ["CONTAINERS", "8/8", "all healthy"],
              ].map(([label, value, detail]) => (
                <div className="metric" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <small>{detail}</small>
                </div>
              ))}
            </div>
          </section>

          <div className="preview-lower">
            <div className="telemetry-card">
              <div className="card-label"><span>HOST TELEMETRY</span><span>LAST HOUR</span></div>
              <div className="chart" aria-hidden="true">
                <span className="chart-fill" />
                <span className="chart-line" />
              </div>
            </div>
            <div className="runtime-card">
              <div className="card-label"><span>RUNTIME</span><span className="healthy-text">8 RUNNING</span></div>
              {["api", "web", "postgres", "caddy"].map((service) => (
                <div className="service-row" key={service}>
                  <span className="live-dot" />
                  <span>{service}</span>
                  <small>RUNNING</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
        <div className="command-header">
          <span><i className="terminal-dot terminal-dot--red" /><i className="terminal-dot terminal-dot--gold" /><i className="terminal-dot terminal-dot--green" /></span>
          <span>GROUND CONTROL INSTALLER</span>
        </div>
        <div className="command-line">
          <span className="prompt">$</span>
          <code>{active.command}</code>
          <button type="button" onClick={copyCommand} aria-label="Copy installation command">
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>
        <div className="command-note">
          <span>YOUR VPS · YOUR DATA · YOUR CONTROL PLANE</span>
          <span>Docker required</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="GroundControl home">
          <span className="brand-mark" />
          <span>GROUND CONTROL</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#capabilities">CAPABILITIES</a>
          <a href="#install">INSTALL</a>
          <a href="https://github.com/teckedd-code2save/groundcontrol" target="_blank" rel="noreferrer">GITHUB <Arrow /></a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-mesh" aria-hidden="true"><span /><span /><span /></div>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow"><span className="live-dot" /> SELF-HOSTED OPERATIONS</p>
          <h1>Your VPS has an<br /><span>operational co-pilot.</span></h1>
          <p className="hero-copy">
            GroundControl brings deployment, runtime evidence and infrastructure actions into one control plane that stays on your server.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#install">INSTALL ON YOUR VPS <Arrow /></a>
            <a className="button button--secondary" href="https://github.com/teckedd-code2save/groundcontrol" target="_blank" rel="noreferrer">VIEW SOURCE</a>
          </div>
        </div>
        <div className="hero-proof">
          <span>01 · DOCKER NATIVE</span>
          <span>02 · OPEN SOURCE</span>
          <span>03 · YOUR INFRASTRUCTURE</span>
        </div>
      </section>

      <section className="preview-section section-shell">
        <div className="section-intro section-intro--split">
          <p className="eyebrow">THE OPERATING PICTURE</p>
          <div>
            <h2>Know what is happening.<br />Keep the controls close.</h2>
            <p>GroundControl starts from the host you already have, preserving raw access while making system state easier to understand and act on.</p>
          </div>
        </div>
        <ProductPreview />
      </section>

      <section className="capabilities section-shell" id="capabilities">
        <div className="section-intro">
          <p className="eyebrow">ONE CONTROL PLANE</p>
          <h2>From host state to the next safe action.</h2>
        </div>
        <div className="capability-grid">
          {capabilities.map((capability) => (
            <article key={capability.number}>
              <span className="capability-number">{capability.number}</span>
              <div>
                <h3>{capability.title}</h3>
                <p>{capability.copy}</p>
              </div>
              <small>{capability.meta}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="principle-band">
        <div className="section-shell principle-inner">
          <p className="eyebrow">BUILT AROUND OWNERSHIP</p>
          <blockquote>“Your server remains the source of truth. GroundControl makes it legible.”</blockquote>
          <div className="principle-meta">
            <span>SELF-HOSTED</span><span>REVERSIBLE ACTIONS</span><span>RAW ACCESS PRESERVED</span>
          </div>
        </div>
      </section>

      <section className="install-section section-shell" id="install">
        <div className="section-intro section-intro--split">
          <p className="eyebrow">START ON YOUR VPS</p>
          <div>
            <h2>One command.<br />An independent control plane.</h2>
            <p>The installer checks the environment, creates your GroundControl instance and gives you the credentials. Nothing is added to someone else’s dashboard.</p>
          </div>
        </div>

        <InstallConsole />

        <div className="install-steps">
          {installSteps.map(([title, copy], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="final-grid" aria-hidden="true" />
        <div>
          <p className="eyebrow">GROUND CONTROL FOR YOUR SERVER</p>
          <h2>Operate with context.</h2>
          <a className="button button--primary" href="#install">INSTALL GROUND CONTROL <Arrow /></a>
        </div>
      </section>

      <footer>
        <a className="wordmark" href="#top"><span className="brand-mark" /><span>GROUND CONTROL</span></a>
        <p>A Serendepify product · Self-hosted and open source.</p>
        <div>
          <a href="https://github.com/teckedd-code2save/groundcontrol" target="_blank" rel="noreferrer">GITHUB</a>
          <a href="https://serendepify.com" target="_blank" rel="noreferrer">SERENDEPIFY</a>
        </div>
      </footer>
    </main>
  );
}
