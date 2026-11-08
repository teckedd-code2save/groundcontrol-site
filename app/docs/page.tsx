import Link from "next/link";
import { Header, Footer } from "@/app/components/SiteChrome";
import DocsNav from "./_components/DocsNav";
import { guideGroups, guideIndex } from "@/content/guide-index";
export const metadata = {
  title: "GroundControl docs | Understand, set up and operate",
  description:
    "Understand GroundControl, install it, discover and enroll workloads, connect an agent through OAuth and MCP, and verify operations.",
};
export default function DocsPage() {
  return (
    <>
      <Header />
      <div className="docs-layout docs-index wrap">
        <DocsNav />
        <main id="main" className="doc-main">
          <header className="doc-header">
            <p className="eyebrow">Documentation</p>
            <h1>
              Find your next step.
            </h1>
            <p className="lead">
              Install GroundControl, connect your agent, or build and release an application.
            </p>
          </header>
          <div className="docs-entrypoints">
            <Link href="/docs/getting-started">
              <span>01 / Start</span>
              <h2>I need to install it.</h2>
              <p>Choose your computer or a server and open the setup link.</p>
              <b>Installation guide →</b>
            </Link>
            <Link href="/docs/after-install">
              <span>02 / Continue</span>
              <h2>It’s installed. Now what?</h2>
              <p>Add a project, then connect or launch a deployment.</p>
              <b>Follow the next steps →</b>
            </Link>
            <Link href="/docs/agent-access">
              <span>03 / Connect</span>
              <h2>My workload is ready.</h2>
              <p>Connect an MCP client and approve its deployment scope.</p>
              <b>Connect your agent →</b>
            </Link>
          </div>
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
