import Link from "next/link";
import { Header, Footer } from "@/app/components/SiteChrome";
import Capture from "@/app/components/Capture";
import CodeBlock from "@/app/components/CodeBlock";
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="hero wrap">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> OPEN-SOURCE AGENTIC DEPLOYMENT
            </p>
            <h1>
              Give your agents
              <br />a clear path
              <br />
              <em>to production.</em>
            </h1>
            <p className="lead">
              GroundControl gives ChatGPT controlled access to manage
              deployments, so it can act on approved requests and verify the
              result without repeatedly asking you to provide access or
              credentials.
            </p>
            <div className="actions">
              <Link className="button" href="/docs/agent-access">
                Connect ChatGPT <span>↗︎</span>
              </Link>
              <Link className="text-link" href="/docs/getting-started">
                Install on your VPS →
              </Link>
            </div>
            <p className="hero-note">
              MCP + OAuth <span>·</span> Your infrastructure <span>·</span>{" "}
              Observable operations
            </p>
          </div>
          <div className="hero-proof">
            <div className="proof-label">
              <span className="mono">IN THE PRODUCT</span>
              <span>01 / Agent access</span>
            </div>
            <Capture
              file="agents-desktop.jpg"
              alt="GroundControl desktop Agents page showing a real active ChatGPT grant"
              caption="An actual operator instance. The agent gets an endpoint, capabilities and selected workloads."
              priority
            />
            <div className="hero-proof-foot">
              <span>
                <b>Scoped</b> by capability and workload
              </span>
              <Link href="/docs/agent-access#consent">
                See the connection steps →
              </Link>
            </div>
          </div>
        </section>
        <section className="principles wrap">
          <p className="eyebrow">SAFE. SMOOTH. OBSERVABLE. AGENTIC.</p>
          <div>
            <h2>
              Connect your agent.
              <br />
              Keep the controls.
            </h2>
            <p>
              Authorize a workload and its operations through OAuth.
              GroundControl holds the infrastructure credentials, runs typed
              actions and records what happened. Your agent can follow the
              result, even after the conversation disconnects.
            </p>
          </div>
        </section>
        <section className="walkthrough wrap">
          <div className="section-label">
            <p className="eyebrow">A PATH YOU CAN FOLLOW</p>
            <Link className="text-link" href="/docs">
              Open the complete docs →
            </Link>
          </div>
          <div className="journey-grid">
            {[
              [
                "01",
                "Install & claim",
                "Start privately on your VPS and create the owner account.",
                "getting-started",
              ],
              [
                "02",
                "Connect ChatGPT",
                "Add your MCP endpoint, sign in and approve the workload.",
                "agent-access",
              ],
              [
                "03",
                "Operate & verify",
                "Inspect health, request a redeploy and follow its evidence.",
                "deployment-automation",
              ],
            ].map(([n, t, d, s]) => (
              <Link key={n} href={`/docs/${s}`}>
                <span className="mono">
                  {n} <span aria-hidden="true">↗︎</span>
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
              </Link>
            ))}
          </div>
        </section>
        <section className="evidence-section" id="proof">
          <div className="wrap">
            <div className="section-label">
              <p className="eyebrow">THE WORK, WITH RECEIPTS</p>
              <Link href="/docs/evidence" className="text-link">
                Inspect all evidence →
              </Link>
            </div>
            <div className="evidence-heading">
              <h2>
                A real application.
                <br />A recorded outcome.
              </h2>
              <p>
                RentAWeekend runs on the owner’s VPS. These desktop captures and
                tool results show the actual grant, runtime verification and
                public health check.
              </p>
            </div>
            <div className="evidence-layout">
              <Capture
                file="verification-desktop.jpg"
                alt="GroundControl desktop deployment evidence showing runtime image verification and public HTTP 200"
                caption="RentAWeekend · recorded 21 September release · desktop capture 22 September 2026"
              />
              <aside className="evidence-receipt">
                <p className="eyebrow">OBSERVED THROUGH MCP</p>
                <h3>rentaweekend</h3>
                <dl>
                  <div>
                    <dt>Health read</dt>
                    <dd>22 Sep 2026</dd>
                  </div>
                  <div>
                    <dt>Runtime</dt>
                    <dd className="good">4 / 4 healthy</dd>
                  </div>
                  <div>
                    <dt>Public endpoint</dt>
                    <dd className="good">HTTP 200</dd>
                  </div>
                </dl>
                <CodeBlock
                  label="Selected response fields"
                  copy={false}
                  code={
                    '"deployment": "rentaweekend"\n"healthy": true\n"public": {\n  "checked": true,\n  "status": 200\n}'
                  }
                />
                <p className="small">
                  A captured tool response, not a live status feed. The raw
                  response is available to inspect.
                </p>
                <a href="/evidence/rentaweekend-health-2026-09-22.json">
                  Open health evidence ↗︎
                </a>
              </aside>
            </div>
          </div>
        </section>
        <section className="story-teaser wrap">
          <p className="eyebrow">FIELD NOTES / 001</p>
          <div>
            <h2>
              How ChatGPT became
              <br />
              part of the operations flow.
            </h2>
            <p>
              The connection, the deployment record, the timeouts and what the
              evidence really proves.
            </p>
            <Link
              className="text-link"
              href="/articles/chatgpt-operated-my-deployment"
            >
              Read the engineering story →
            </Link>
          </div>
          <span className="story-mark" aria-hidden="true">
            ↗︎
          </span>
        </section>
        <section className="install-section wrap" id="install">
          <div>
            <p className="eyebrow">START WITH YOUR OWN INSTANCE</p>
            <h2>
              Your VPS.
              <br />
              Your control plane.
            </h2>
            <p>
              Install privately, claim the instance, then publish a stable HTTPS
              endpoint for your agent.
            </p>
            <Link className="text-link" href="/docs/getting-started">
              Follow installation with expected results →
            </Link>
          </div>
          <div>
            <CodeBlock
              label="On your authorized Linux VPS"
              code="curl -fsSL https://raw.githubusercontent.com/teckedd-code2save/groundcontrol/main/scripts/install | sudo bash"
            />
            <p className="small">
              Requires root/sudo and Docker Compose. The installer returns a
              one-time claim URL and binds to loopback.{" "}
              <Link href="/docs/getting-started#before-you-start">
                Read the prerequisites.
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
