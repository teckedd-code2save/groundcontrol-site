import Link from "next/link";
import { Header, Footer } from "@/app/components/SiteChrome";
import Capture from "@/app/components/Capture";
import CodeBlock from "@/app/components/CodeBlock";
import ProductTour from "@/app/components/ProductTour";
import WorkloadModel from "@/app/components/WorkloadModel";
import DeploymentStory from "@/app/components/DeploymentStory";
export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="home-page">
        <div className="hero-field">
          <section className="landing-hero wrap" aria-labelledby="hero-title">
            <div className="hero-heading">
              <h1 id="hero-title">
                <span>Own the path</span>{" "}
                <span>to <em>production.</em></span>
              </h1>
            </div>
            <div className="hero-intro">
              <p className="lead">
                Agent-assisted deployment.
                <br />
                End to end.
              </p>
              <p>
                Bring your project and the agents you already use. GroundControl
                connects configuration, rollout and verification on infrastructure
                you own, with a clear record of every deployment.
              </p>
              <div className="actions">
                <Link className="button" href="/docs/getting-started">
                  Install GroundControl <span aria-hidden="true">↗︎</span>
                </Link>
                <a className="button secondary" href="#product">
                  Explore the workflow <span aria-hidden="true">↓</span>
                </a>
              </div>
              <Link className="text-link returning-link" href="/docs/after-install">
                Already installed? Continue setup →
              </Link>
              <div className="hero-spec">
                <span>Self-hosted</span>
                <span>MCP + OAuth</span>
                <span>Open source</span>
              </div>
            </div>
          </section>
          <DeploymentStory />
          <section className="tour-section wrap" id="product">
            <div className="section-label">
              <p className="eyebrow">Your project. Every stage of deployment.</p>
              <span className="small">The product today · actual interface</span>
            </div>
            <ProductTour />
          </section>
        </div>
        <section className="capability-story wrap" id="capabilities">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / From instruction to execution</p>
              <h2>One shared view. From intent to result.</h2>
            </div>
            <p>
              GroundControl connects your application’s source, containers,
              configuration, and public address. Your agent works from that
              shared context, with tools to carry an authorized request through
              to a result you can inspect.
            </p>
          </div>
          <div className="capability-columns">
            {[
              [
                "01",
                "Inspect real application state.",
                "Ask your agent what is deployed, read the logs, and check service health. It works from your application’s state and deployment history.",
              ],
              [
                "02",
                "Let your agent take action.",
                "Approve the capabilities and deployments it can use through OAuth. GroundControl executes supported deployment requests on your infrastructure while holding the credentials.",
              ],
              [
                "03",
                "Follow through to the result.",
                "Get runtime checks and public endpoint evidence for the operation. A durable operation ID lets your agent return to the same work after a timeout or in a later conversation.",
              ],
            ].map(([number, title, text]) => (
              <article key={number}>
                <span className="mono">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <Link
            href="/articles/agentic-deployment-with-oauth-and-mcp"
            className="article-strip"
          >
            <span className="eyebrow">Why GroundControl</span>
            <h3>Your infrastructure, connected to the agents you use.</h3>
            <span>
              Read the story <span aria-hidden="true">↗︎</span>
            </span>
          </Link>
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
              Start on your computer or connect an existing Linux server.
              Add the application you’re building, then decide where and how
              its deployments run.
            </p>
          </div>
          <div className="route-list">
            {[
              [
                "01",
                "Choose your starting point",
                "Run the launcher on your computer. Choose local Docker or a remote Linux server and open your private setup link.",
                "getting-started",
              ],
              [
                "02",
                "Add your project",
                "Pick a folder or a GitHub repository. Keep the source, context and deployments for your application together.",
                "projects",
              ],
              [
                "03",
                "Connect or launch a deployment",
                "Connect an app that already runs, or launch a new instance. Give each deployment its own environment and host.",
                "projects#deployments",
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
                Bring a project from your computer or GitHub. Connect its
                existing deployments or launch a new instance on your own
                infrastructure. Keep your sources and environments together.
              </p>
              <p>
                MCP gives your agent the tools. OAuth defines its access. You
                can work through the interface or your agent, using the same
                application identity and recorded results. Review and revoke
                access from the Agents workspace.
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
                From GitHub push
                <br />
                to agent insight.
              </h2>
            </div>
            <p>
              For managed workloads with merge automation enabled, a signed
              GitHub push starts a deployment your agent can follow. In this
              recorded example, GroundControl deployed RentAWeekend, and ChatGPT
              inspected its health and operation record through MCP.
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
                "Projects & deployments",
                "Folder and GitHub imports, environments and running instances.",
                "projects",
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
                Your infrastructure.
                <br />
                Ready for your agent.
              </h2>
              <p>
                Install GroundControl, choose an application, and connect your
                agent. Start with a health check, then explore the operations
                your workload supports.
              </p>
              <Link className="button" href="/docs/getting-started">
                Follow the installation guide <span aria-hidden="true">↗︎</span>
              </Link>
            </div>
            <div>
              <CodeBlock
                label="Start from your computer"
                code={"curl -fsSL https://raw.githubusercontent.com/teckedd-code2save/groundcontrol/main/scripts/start -o groundcontrol-start\nbash groundcontrol-start"}
              />
              <p className="small">
                Choose this computer or a remote Linux server.
                <br />
                macOS / Linux · Windows through WSL · Docker for local installs.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
