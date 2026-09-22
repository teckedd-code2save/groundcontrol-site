import Link from "next/link";
import { Header, Footer } from "@/app/components/SiteChrome";
import Capture from "@/app/components/Capture";
import CodeBlock from "@/app/components/CodeBlock";
import ProductTour from "@/app/components/ProductTour";
import WorkloadModel from "@/app/components/WorkloadModel";
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="landing-hero wrap">
          <div className="hero-heading">
            <p className="eyebrow">
              <span className="status-dot" />
              Open-source agentic deployment
            </p>
            <h1>
              Give your agents
              <br />
              the access to
              <br />
              <em>follow through.</em>
            </h1>
          </div>
          <div className="hero-intro">
            <p className="lead">
              Discover your applications, choose what to manage, and let your
              agents help operate them.
            </p>
            <p>
              GroundControl is a self-hosted control plane for your VPS. It
              gives agents controlled access through OAuth and MCP, so approved
              work can move from a request to a verified result without repeated
              access and credential handoffs.
            </p>
            <div className="actions">
              <Link className="button" href="/docs/getting-started">
                Install GroundControl <span aria-hidden="true">↗︎</span>
              </Link>
              <Link className="text-link" href="/docs/after-install">
                Already installed? Start here →
              </Link>
            </div>
            <div className="hero-spec">
              <span>Docker Compose</span>
              <span>Your VPS</span>
              <span>MCP + OAuth</span>
            </div>
          </div>
        </section>
        <section className="tour-section wrap" id="product">
          <div className="section-label">
            <p className="eyebrow">
              A working connection to your infrastructure
            </p>
            <span className="small">Explore the product</span>
          </div>
          <ProductTour />
        </section>
        <section className="onboarding-story wrap" id="after-install">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Installation is the beginning</p>
              <h2>
                You installed it.
                <br />
                Here is what comes next.
              </h2>
            </div>
            <p>
              The local host is connected. GroundControl can now help you
              understand what is running and bring one application into its
              control plane.
            </p>
          </div>
          <div className="route-list">
            {[
              [
                "01",
                "Review what was found",
                "Confirm the server, Compose folders, containers and proxy. Correct scan paths when something is missing.",
                "discovery",
              ],
              [
                "02",
                "Choose your workload",
                "Enrol an existing application in place, or use Templates to create and enroll a new deployment.",
                "after-install#choose-path",
              ],
              [
                "03",
                "Establish its identity",
                "Check the source, runtime, configuration and public address. Understand tracking and management mode.",
                "first-deployment#management-mode",
              ],
              [
                "04",
                "Connect, operate and verify",
                "Approve the agent’s scope. Start with a health check and follow each authorized operation to its recorded result.",
                "agent-access",
              ],
            ].map(([n, title, description, href]) => (
              <Link key={n} href={`/docs/${href}`}>
                <span className="route-number">{n}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span aria-hidden="true">↗︎</span>
              </Link>
            ))}
          </div>
          <Link className="text-link" href="/docs/after-install">
            Open the post-install checklist →
          </Link>
        </section>
        <section className="philosophy-band" id="approach">
          <div className="wrap philosophy-grid">
            <div>
              <p className="eyebrow">The GroundControl approach</p>
              <h2>
                Your application is
                <br />
                more than a container.
              </h2>
              <p>
                GroundControl connects the source, runtime and public route to
                one workload identity. Your team and your agents can work from
                that shared context.
              </p>
              <p>
                You choose the scope. The control plane holds the infrastructure
                credentials and records execution. Verification shows what
                worked and what still needs attention.
              </p>
              <Link className="text-link" href="/docs/philosophy">
                Read the philosophy and core concepts →
              </Link>
            </div>
            <WorkloadModel />
          </div>
        </section>
        <section className="proof-story wrap" id="proof">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Used on a real VPS</p>
              <h2>
                The work leaves
                <br />
                something you can inspect.
              </h2>
            </div>
            <p>
              GroundControl deployed RentAWeekend from a GitHub push. ChatGPT
              connected through MCP to inspect its health and read the operation
              record.
            </p>
          </div>
          <div className="proof-grid">
            <Capture
              file="verification-desktop.jpg"
              alt="GroundControl runtime image verification and public HTTP 200 evidence for RentAWeekend"
              caption="Recorded RentAWeekend release · 21 September 2026 · opened in the desktop UI on 22 September"
            />
            <div className="proof-details">
              <p className="eyebrow">Captured through MCP</p>
              <h3>RentAWeekend</h3>
              <dl>
                <div>
                  <dt>Health check</dt>
                  <dd>22 Sep 2026</dd>
                </div>
                <div>
                  <dt>Runtime</dt>
                  <dd>4 containers healthy</dd>
                </div>
                <div>
                  <dt>Public endpoint</dt>
                  <dd>HTTP 200</dd>
                </div>
              </dl>
              <p>Recorded 22 September 2026 through a scoped MCP connection.</p>
              <a href="/evidence/rentaweekend-health-2026-09-22.json">
                Open the health response ↗︎
              </a>
              <Link href="/docs/evidence">Inspect the deployment record →</Link>
            </div>
          </div>
          <Link
            href="/articles/agentic-deployment-with-oauth-and-mcp"
            className="article-strip"
          >
            <span className="eyebrow">Engineering field notes</span>
            <h3>
              GroundControl: open-source agentic deployment with OAuth and MCP.
            </h3>
            <span>
              Read the article <span aria-hidden="true">↗︎</span>
            </span>
          </Link>
        </section>
        <section className="learning-section wrap">
          <div>
            <p className="eyebrow">The operator’s handbook</p>
            <h2>
              Understand it.
              <br />
              Then put it to work.
            </h2>
            <p>
              Follow the commands, product steps and checks for installation,
              discovery, agent access and deployment.
            </p>
            <Link className="text-link" href="/docs">
              Explore the handbook →
            </Link>
          </div>
          <div className="learning-links">
            {[
              [
                "How GroundControl works",
                "The philosophy, entities and permission boundaries.",
                "philosophy",
              ],
              [
                "Discovery & enrollment",
                "Where the scanner looks and what enrollment changes.",
                "discovery",
              ],
              [
                "Connect your agent",
                "MCP client setup, OAuth consent and a ChatGPT walkthrough.",
                "agent-access",
              ],
              [
                "Deploy & automate",
                "Durable operations, merge automation and verification.",
                "deployment-automation",
              ],
            ].map(([title, description, href]) => (
              <Link key={href} href={`/docs/${href}`}>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <span aria-hidden="true">↗︎</span>
              </Link>
            ))}
          </div>
        </section>
        <section className="start-section">
          <div className="wrap start-grid">
            <div>
              <p className="eyebrow">Start with one host and one application</p>
              <h2>
                Make your infrastructure
                <br />
                accessible to your agent.
              </h2>
              <p>
                Install privately, claim ownership, and choose the first
                workload.
              </p>
              <Link className="button" href="/docs/getting-started">
                Follow the installation guide <span aria-hidden="true">↗︎</span>
              </Link>
            </div>
            <div>
              <CodeBlock
                label="Run on your VPS"
                code="curl -fsSL https://raw.githubusercontent.com/teckedd-code2save/groundcontrol/main/scripts/install | sudo bash"
              />
              <p className="small">
                Linux · Docker · root or sudo
                <br />
                Read the installation guide for prerequisites and host access.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
