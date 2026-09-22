import Link from "next/link";
import { Header, Footer } from "@/app/components/SiteChrome";
import Capture from "@/app/components/Capture";
import CodeBlock from "@/app/components/CodeBlock";
export const metadata = {
  title: "GroundControl: open-source agentic deployment with OAuth and MCP",
  description:
    "How GroundControl connects software agents to VPS workloads, turns a GitHub push into a recorded deployment, and makes the result available through MCP.",
};
export default function ArticlePage() {
  return (
    <>
      <Header />
      <main id="main" className="article wrap">
        <header className="article-header">
          <p className="eyebrow">Field notes / 001</p>
          <h1>
            GroundControl: open-source agentic deployment with OAuth and MCP.
          </h1>
          <p className="article-subtitle">
            Your infrastructure, connected to the agents you use.
          </p>
          <p className="lead">
            Connect an agent to your applications, give it a defined scope, and
            let it work from deployment state. GroundControl brings discovery,
            execution and verification into one control plane on your VPS.
          </p>
          <div className="article-meta">
            <span>Edward Kwabena Twumasi</span>
            <span>22 September 2026</span>
            <span>Product and engineering</span>
          </div>
        </header>
        <Capture
          file="agents-desktop.jpg"
          alt="The GroundControl Agents workspace showing its MCP endpoint and a ChatGPT OAuth grant"
          caption="The Agents workspace exposes the MCP endpoint and each client’s access. This example shows a ChatGPT connection, captured 22 September 2026."
          priority
        />
        <div className="article-layout">
          <aside className="article-contents">
            <p className="eyebrow">In this story</p>
            <a href="#purpose">An operational connection</a>
            <a href="#workloads">Start with your workloads</a>
            <a href="#connection">Connect an agent</a>
            <a href="#deployment">From merge to deployment</a>
            <a href="#work">The agent’s view</a>
            <a href="#try-it">Use it on your VPS</a>
          </aside>
          <div className="prose article-prose">
            <section id="purpose">
              <h2>Give agents the context to act.</h2>
              <p>
                An agent can help much more when it knows which application you
                mean, where it runs and what happened during its last
                deployment. I built GroundControl to make that operational
                context available through a connection the operator controls.
              </p>
              <p>
                GroundControl runs on your infrastructure and connects the
                application’s source, containers, configuration and public
                address. You can work through its interface or authorize an
                agent to inspect workloads, read logs, check health and request
                supported deployments. Both work from the same workload identity
                and recorded results.
              </p>
            </section>
            <section id="workloads">
              <h2>Start with what is already running.</h2>
              <p>
                After installation, GroundControl probes the host and helps you
                find existing Compose applications and containers. You review
                the candidates, enroll the applications you want to track and
                optionally group them into projects. Their files stay where they
                are. For a new application, Templates guides you through source
                verification, configuration, review and deployment.
              </p>
              <p>
                This gives the control plane a useful unit to operate on. One
                deployment can contain a web service, an API, a database and a
                cache, with a public route to verify alongside the runtime. The{" "}
                <Link href="/docs/after-install">post-install guide</Link> walks
                through both paths.
              </p>
            </section>
            <section id="connection">
              <h2>Connect through MCP and OAuth.</h2>
              <p>
                Your instance exposes an MCP endpoint at <code>/mcp</code>. A
                compatible client connects to that address, signs in through
                OAuth and requests access. You approve its capabilities and
                select the deployments it may use. The Agents workspace keeps
                those grants visible and lets you revoke them.
              </p>
              <p>
                MCP supplies the tools. OAuth defines the client’s access.
                GroundControl holds the infrastructure credentials and executes
                the permitted operations. Once connected, the agent can follow
                an approved request through to its result without another
                infrastructure credential handoff at every step.
              </p>
              <p>
                ChatGPT is one working example of this connection. Its setup is
                documented in the{" "}
                <Link href="/docs/agent-access">agent access guide</Link>,
                alongside the endpoint and authorization flow for compatible MCP
                clients.
              </p>
            </section>
            <section id="deployment">
              <h2>A merge becomes an operation you can follow.</h2>
              <p>
                For a managed workload with merge automation enabled, a signed
                GitHub push to the configured branch starts a source deployment.
                GroundControl checks the repository and branch, creates an
                operation ID, synchronizes source, prepares configuration and
                executes the Compose deployment. Runtime and public endpoint
                checks become part of the operation record.
              </p>
              <p>
                RentAWeekend exercised this flow on 21 September. The recorded
                operation completed in one attempt, and its verification
                returned public HTTP 200. ChatGPT later retrieved the operation
                through
                <code> operation.get</code> over MCP.
              </p>
              <div className="operation-record">
                <span className="eyebrow">RentAWeekend deployment record</span>
                <code>cmubbc14l0002tjpa0r56r1sm</code>
                <dl>
                  <div>
                    <dt>Trigger</dt>
                    <dd>GitHub push to main</dd>
                  </div>
                  <div>
                    <dt>Execution</dt>
                    <dd>21 Sep · 14:00–14:03 UTC</dd>
                  </div>
                  <div>
                    <dt>Result</dt>
                    <dd>Success · one attempt</dd>
                  </div>
                </dl>
              </div>
              <Capture
                file="verification-desktop.jpg"
                alt="RentAWeekend deployment verification with service images, migration result and public endpoint check"
                caption="GroundControl’s recorded verification for the 21 September RentAWeekend deployment."
              />
              <p>
                The operation ID also gives a disconnected client a place to
                return. It can retrieve progress, attempts and evidence from the
                same request. This makes deployment work useful across tool
                timeouts and later conversations.
              </p>
            </section>
            <section id="work">
              <h2>Let the agent inspect the result.</h2>
              <p>
                On 22 September, ChatGPT used its scoped connection to check
                RentAWeekend’s health. GroundControl returned the state of its
                web, API, PostgreSQL and Redis containers, together with a
                successful public HTTP check.
              </p>
              <CodeBlock
                label="RentAWeekend health response · 22 September 2026 · selected fields"
                copy={false}
                code={
                  '{\n  "deployment": "rentaweekend",\n  "runtime": { "healthy": true },\n  "public": { "checked": true, "status": 200, "healthy": true },\n  "healthy": true\n}'
                }
              />
              <p>
                The agent could answer from the application’s state and connect
                that answer to a deployment record. You can inspect the{" "}
                <a href="/evidence/rentaweekend-health-2026-09-22.json">
                  captured health response
                </a>{" "}
                and the{" "}
                <Link href="/docs/evidence">full verification notes</Link>,
                including the build and image provenance.
              </p>
            </section>
            <section id="try-it">
              <h2>Put it to work on your infrastructure.</h2>
              <p>
                Install GroundControl, claim your instance and review the host
                scan. Choose one application, confirm its identity and connect
                your agent. A health check gives you a first result you can
                compare with the product interface. From there, follow the
                deployment guide for the operations your workload supports.
              </p>
              <div className="article-cta">
                <Link className="button" href="/docs/getting-started">
                  Install GroundControl ↗︎
                </Link>
                <Link className="text-link" href="/docs/after-install">
                  Continue after installation →
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
