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
      <main id="main" className="home-page">
        <div className="hero-field">
          <section className="landing-hero wrap" aria-labelledby="hero-title">
            <div className="hero-heading">
              <p className="eyebrow">
                <span className="status-dot" />
                Operational intelligence, by Serendepify
              </p>
              <h1 id="hero-title">
                Keep your
                <br />
                <em>software</em>
                <br />
                running.
              </h1>
            </div>
            <div className="hero-intro">
              <p className="lead">
                For the teams who own the infrastructure—and the outcome.
              </p>
              <p>
                Understand what is running. Investigate what changed. Give your
                team and your agents the context to act, with evidence to check
                the result. GroundControl brings your applications, deployments,
                and infrastructure into one place you control.
              </p>
              <div className="actions">
                <Link className="button" href="/docs/getting-started">
                  Install GroundControl <span aria-hidden="true">↗︎</span>
                </Link>
                <a className="button secondary" href="#product">
                  See how it works <span aria-hidden="true">↓</span>
                </a>
              </div>
              <Link className="text-link returning-link" href="/docs/after-install">
                Already installed? Continue setup →
              </Link>
              <div className="hero-spec">
                <span>Self-hosted</span>
                <span>Docker Compose first</span>
                <span>Open source</span>
              </div>
            </div>
          </section>
          <section className="tour-section wrap" id="product">
            <div className="section-label">
              <p className="eyebrow">Inside GroundControl</p>
              <span className="small">The product today · actual interface</span>
            </div>
            <ProductTour />
          </section>
        </div>
        <section className="capability-story wrap" id="capabilities">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / Understand the whole system</p>
              <h2>Your VPS is a living system.</h2>
            </div>
            <p>
              A running container is only part of the story. Bring the source,
              services, configuration, and public address into the same view,
              so the next decision starts with context.
            </p>
          </div>
          <div className="capability-columns">
            {[
              [
                "01",
                "See how it fits together.",
                "Discover existing applications and inspect their source, runtime, and public route. Start with the infrastructure you already own.",
              ],
              [
                "02",
                "Work from evidence.",
                "Read deployment history, runtime checks, and endpoint results. Follow an operation to its recorded outcome, including what still needs attention.",
              ],
              [
                "03",
                "Keep your final say.",
                "Choose the deployments and capabilities an agent can access. GroundControl keeps infrastructure credentials behind that boundary.",
              ],
            ].map(([number, title, text]) => (
              <article key={number}>
                <span className="mono">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="onboarding-story wrap" id="after-install">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / Start with what you have</p>
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
              <p className="eyebrow">03 / Autonomy without surrender</p>
              <h2>
                Your infrastructure.
                <br />
                Your agents.
                <br />
                Your final say.
              </h2>
              <p>
                Keep the infrastructure you own and the workflows you know.
                GroundControl gives your team and your agents a shared picture
                of each application, without handing over unrestricted access.
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
              <p className="eyebrow">04 / Evidence from a real VPS</p>
              <h2>
                Proof you can
                <br />
                open and inspect.
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
        <section className="direction-section wrap" aria-labelledby="direction-title">
          <div className="direction-label"><span className="eyebrow">Where we’re going</span><span className="direction-badge">Product direction</span></div>
          <div>
            <h2 id="direction-title">From verified operations<br />to proactive recovery.</h2>
            <p>
              Serendepify’s vision is a system that understands service relationships,
              tests affected customer journeys, and helps recover from regressions
              within an operator’s policy. This is the direction for Autopilot,
              not a promise of unattended recovery in today’s release.
            </p>
            <a className="text-link" href="https://www.serendepify.com/#autopilot">Explore the Serendepify vision <span aria-hidden="true">↗</span></a>
          </div>
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
                Your next application.
                <br />
                Under your control.
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
