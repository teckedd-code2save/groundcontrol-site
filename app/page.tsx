import Link from "next/link";
import { Header, Footer } from "@/app/components/SiteChrome";
import ProductTour from "@/app/components/ProductTour";

export default function Home() {
  return <><Header /><main id="main" className="home-page concise-home">
    <div className="hero-field">
      <section className="landing-hero wrap" aria-labelledby="hero-title">
        <div className="hero-heading"><p className="eyebrow">Infrastructure, ready for your agents</p><h1 id="hero-title"><span>Build. Deploy.</span><span><em>Stay in control.</em></span></h1></div>
        <div className="hero-intro"><p className="lead">Give your AI agents controlled access to your applications.</p><p>GroundControl connects ChatGPT and compatible agents to the infrastructure you own. Build releases, deploy changes and check the result.</p><div className="actions"><Link className="button" href="/docs/getting-started">Get started ↗</Link><Link className="button secondary" href="/docs">Read the docs →</Link></div><div className="hero-spec"><span>Self-hosted</span><span>Open source</span><span>MCP + OAuth</span></div></div>
      </section>
      <section className="home-workflow wrap" aria-label="From agent connection to verified deployment">
        {[
          ["01", "Connect your agent", "Choose its applications and permissions.", "agent-access"],
          ["02", "Build a release", "Build a commit and publish its images.", "build-and-release"],
          ["03", "Deploy the change", "Release the built image to your application.", "build-and-release#release"],
          ["04", "Check the result", "Inspect health, logs and operation records.", "evidence"],
        ].map(([n, title, text, href]) => <Link href={`/docs/${href}`} key={n}><span className="mono">{n}</span><h2>{title}</h2><p>{text}</p><span className="workflow-guide">Open guide ↗</span></Link>)}
      </section>
      <section className="tour-section wrap" id="product"><div className="section-label"><h2>See GroundControl in action.</h2><span className="small">Actual product captures</span></div><ProductTour /></section>
    </div>
    <section className="capability-story wrap" id="capabilities">
      <div className="section-heading"><div><p className="eyebrow">What you can do today</p><h2>From source to running software.</h2></div></div>
      <div className="capability-columns">{[
        ["Build beyond CI quotas", "Build from linked GitHub source, use BuildKit or a Docker cloud sandbox, and publish release images.", "build-and-release"],
        ["Operate with context", "Inspect what is running, read deployment logs and check configuration without revealing secret values.", "deployment-automation"],
        ["Keep control of access", "Grant access to selected deployments and capabilities. Follow durable operation records and revoke access when needed.", "agent-access"],
      ].map(([title, text, href]) => <article key={title}><h3>{title}</h3><p>{text}</p><Link className="text-link" href={`/docs/${href}`}>How it works →</Link></article>)}</div>
    </section>
    <section className="start-section"><div className="wrap home-start"><div><p className="eyebrow">Start with one application</p><h2>Your next deployment.<br />With your agent.</h2><p>Run GroundControl on your computer or a Linux server.</p></div><div className="actions"><Link className="button" href="/docs/getting-started">Install GroundControl ↗</Link><Link className="text-link" href="/docs/after-install">Already installed? Next steps →</Link></div></div></section>
  </main><Footer /></>;
}
