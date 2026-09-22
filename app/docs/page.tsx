import Link from "next/link";
import { Header, Footer } from "@/app/components/SiteChrome";
import DocsNav from "./_components/DocsNav";
import { guideIndex } from "@/content/guide-index";
export const metadata = {
  title: "GroundControl docs — From VPS to connected agent",
  description:
    "Follow the complete GroundControl installation, HTTPS publishing, ChatGPT plugin, OAuth consent and first deployment walkthrough.",
};
export default function DocsPage() {
  return (
    <>
      <Header />
      <div className="docs-layout docs-index wrap">
        <DocsNav />
        <main id="main" className="doc-main">
          <header className="doc-header">
            <p className="eyebrow">GROUNDCONTROL DOCS</p>
            <h1>From your VPS to your first agent operation.</h1>
            <p className="lead">
              Install the control plane, connect a workload, and give ChatGPT a
              verified path to operate it. Commands, expected results and
              recovery steps are all here.
            </p>
          </header>
          <div className="start-paths">
            <Link href="/docs/getting-started">
              <span>START FROM SCRATCH</span>
              <h2>I have a VPS.</h2>
              <p>Install, claim and publish GroundControl.</p>
              <strong>Start installation →</strong>
            </Link>
            <Link href="/docs/agent-access">
              <span>ALREADY INSTALLED?</span>
              <h2>Connect ChatGPT.</h2>
              <p>Add the MCP plugin and complete OAuth.</p>
              <strong>Open the connection guide →</strong>
            </Link>
          </div>
          <section className="guide-list">
            <div className="section-label">
              <h2>The complete walkthrough</h2>
              <span className="mono">SET UP → OPERATE → MAINTAIN</span>
            </div>
            {guideIndex.map((g, i) => (
              <Link key={g.slug} href={`/docs/${g.slug}`}>
                <span className="guide-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{g.title}</h3>
                  <p>{g.description}</p>
                </div>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </section>
          <div className="callout">
            <strong>What is being installed?</strong>
            <p>
              GroundControl runs on your infrastructure. ChatGPT connects to
              your instance through MCP and OAuth. The public product site hosts
              these guides; each installation has its own login, credentials and
              grants.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
