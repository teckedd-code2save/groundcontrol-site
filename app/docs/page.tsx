import Link from "next/link";
import { Header, Footer } from "@/app/components/SiteChrome";
import DocsNav from "./_components/DocsNav";
import { guideGroups, guideIndex } from "@/content/guide-index";
export const metadata = {
  title: "GroundControl docs | Understand, set up and operate",
  description:
    "Understand GroundControl, install it, discover and enroll workloads, connect ChatGPT through OAuth and MCP, and verify operations.",
};
export default function DocsPage() {
  return (
    <>
      <Header />
      <div className="docs-layout docs-index wrap">
        <DocsNav />
        <main id="main" className="doc-main">
          <header className="doc-header">
            <p className="eyebrow">The operator’s handbook</p>
            <h1>
              From your first scan
              <br />
              to a verified operation.
            </h1>
            <p className="lead">
              Learn how GroundControl thinks about your infrastructure, then
              follow the path that matches where you are.
            </p>
          </header>
          <div className="docs-entrypoints">
            <Link href="/docs/getting-started">
              <span>01 / Start</span>
              <h2>I need to install it.</h2>
              <p>Install, claim and connect the local host.</p>
              <b>Installation guide →</b>
            </Link>
            <Link href="/docs/after-install">
              <span>02 / Continue</span>
              <h2>It’s installed. Now what?</h2>
              <p>Review discovery and choose your first application.</p>
              <b>Follow the next steps →</b>
            </Link>
            <Link href="/docs/agent-access">
              <span>03 / Connect</span>
              <h2>My workload is ready.</h2>
              <p>Add ChatGPT and approve its deployment scope.</p>
              <b>Connect your agent →</b>
            </Link>
          </div>
          <Link className="concept-banner" href="/docs/philosophy">
            <span>Before the commands</span>
            <div>
              <h2>Understand the GroundControl approach.</h2>
              <p>
                What is a deployment? How is a project different? What does an
                agent actually control?
              </p>
            </div>
            <span aria-hidden="true">↗︎</span>
          </Link>
          {guideGroups.map((group) => (
            <section className="guide-list" key={group}>
              <div className="section-label">
                <h2>{group}</h2>
                <span className="mono">
                  {guideIndex.filter((g) => g.group === group).length} guides
                </span>
              </div>
              {guideIndex
                .filter((g) => g.group === group)
                .map((g) => (
                  <Link key={g.slug} href={`/docs/${g.slug}`}>
                    <div>
                      <h3>{g.title}</h3>
                      <p>{g.description}</p>
                    </div>
                    <span aria-hidden="true">↗︎</span>
                  </Link>
                ))}
            </section>
          ))}
        </main>
      </div>
      <Footer />
    </>
  );
}
