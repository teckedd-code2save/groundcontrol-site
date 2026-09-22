import Link from "next/link";
import { Header, Footer } from "@/app/components/SiteChrome";
import Capture from "@/app/components/Capture";
import CodeBlock from "@/app/components/CodeBlock";
export const metadata = {
  title:
    "GroundControl: open-source agentic deployment with OAuth and MCP | Field notes",
  description:
    "How ChatGPT used scoped access to inspect a real VPS deployment and retrieve verification evidence, what the merge-triggered operation proved, and how to reproduce the connection.",
};
export default function ArticlePage() {
  return (
    <>
      <Header />
      <main id="main" className="article wrap">
        <header className="article-header">
          <p className="eyebrow">FIELD NOTES / 001 · BUILDING IN PUBLIC</p>
          <h1>
            Giving ChatGPT a real
            <br />
            role in deployment.
          </h1>
          <p className="article-subtitle">
            GroundControl is an open-source agentic deployment tool with OAuth
            and MCP access for agents.
          </p>
          <p className="lead">
            The useful moment was when the conversation could inspect my running
            application, retrieve its deployment evidence and check the public
            result—all through a scoped connection.
          </p>
          <div className="article-meta">
            <span>Edward Kwabena Twumasi</span>
            <span>22 September 2026</span>
            <span>Engineering field report</span>
          </div>
        </header>
        <Capture
          file="agents-desktop.jpg"
          alt="An active ChatGPT OAuth grant in the GroundControl Agents workspace"
          caption="The actual connection: an MCP endpoint, a ChatGPT client, five capability scopes and eight selected deployments. Captured 22 September 2026."
          priority
        />
        <div className="article-layout">
          <aside className="article-contents">
            <p className="eyebrow">IN THIS STORY</p>
            <a href="#friction">The friction</a>
            <a href="#connection">The connection</a>
            <a href="#work">The observed work</a>
            <a href="#deployment">The deployment record</a>
            <a href="#limits">What still needs work</a>
            <a href="#try-it">Try it yourself</a>
          </aside>
          <div className="prose article-prose">
            <section id="friction">
              <h2>A conversation should be able to follow through.</h2>
              <p>
                I wanted to ask ChatGPT what was happening with an application
                on my VPS and have it work from the real deployment state. The
                usual interruption was familiar: the agent needed access, a
                credential, a terminal session, or another manual handoff before
                it could take the next step.
              </p>
              <p>
                GroundControl gives that conversation an operational path. The
                operator connects a client through OAuth and approves specific
                workloads and capabilities. The agent can then inspect a
                deployment, check its health, read execution logs, request an
                authorized redeploy and retrieve the recorded result.
              </p>
              <p>
                That is what I mean by safe, smooth, observable and agentic. The
                path is easier to use because the control plane knows the
                workload and owns its execution. Safety depends on explicit
                grants and policy; observability depends on evidence that
                survives the chat.
              </p>
            </section>
            <section id="connection">
              <h2>The setup is a product feature.</h2>
              <p>
                A self-hosted GroundControl instance exposes an MCP endpoint at{" "}
                <code>/mcp</code>. In the Agents workspace, I can copy that URL,
                see authorized clients, inspect their scopes and revoke access.
                When a compatible client connects, GroundControl handles OAuth
                discovery and consent.
              </p>
              <p>
                The active ChatGPT grant in the screenshot lists five scopes and
                eight deployments. That count describes this operator’s
                approval, not a product limit. The read scope, for example,
                covers both listing deployments and inspecting their identity.
                Workloads outside the selected set remain outside the grant.
              </p>
              <p>
                OAuth also has a lifecycle. During a later check, this
                connection needed reauthentication before its health call
                succeeded. A streamlined setup should explain that recovery
                honestly. It reduces repeated infrastructure credential
                handoffs; it does not eliminate token expiry or the client’s own
                write confirmations.
              </p>
              <p>
                The full{" "}
                <Link href="/docs/agent-access">
                  ChatGPT connection walkthrough
                </Link>{" "}
                covers endpoint preparation, the plugin setup, consent and the
                first read-only call. A reader should be able to follow it
                without opening a source file.
              </p>
            </section>
            <section id="work">
              <h2>What ChatGPT actually read from the VPS</h2>
              <p>
                The inspected workload was RentAWeekend, a Compose application
                with web, API, PostgreSQL and Redis services. The connection let
                ChatGPT retrieve the deployment identity and recent execution
                logs. A fresh <code>deployment.health</code> call on 22
                September returned healthy runtime status and a public HTTP 200
                result.
              </p>
              <CodeBlock
                label="Selected fields from the observed health response"
                copy={false}
                code={
                  '{\n  "deployment": "rentaweekend",\n  "runtime": { "healthy": true },\n  "public": { "checked": true, "status": 200, "healthy": true },\n  "healthy": true\n}'
                }
              />
              <p>
                The{" "}
                <a href="/evidence/rentaweekend-health-2026-09-22.json">
                  captured JSON response
                </a>{" "}
                includes the container names, images and states. This is a
                point-in-time check. It tells us that those services and that
                route passed at the time of observation; it is not an uptime
                claim or a substitute for a customer journey test.
              </p>
              <p>
                Those reads happened through the typed MCP connection. They did
                not require pasting the VPS SSH key into the conversation. The
                operator’s broader GroundControl interface still provides host
                controls and a terminal, while this agent connection exposes its
                approved deployment tools.
              </p>
            </section>
            <section id="deployment">
              <h2>A merge produced a durable operation.</h2>
              <p>
                The deployment record has a separate origin: a signed GitHub
                push to RentAWeekend’s allowed main branch. GroundControl
                created a <code>deployment.source.deploy</code> operation,
                synchronized the source, prepared configuration, recreated
                Compose services and recorded verification. ChatGPT subsequently
                retrieved that operation through <code>operation.get</code>.
              </p>
              <div className="operation-record">
                <span className="eyebrow">RECORDED OPERATION</span>
                <code>cmubbc14l0002tjpa0r56r1sm</code>
                <dl>
                  <div>
                    <dt>Created</dt>
                    <dd>21 Sep · 14:00:45 UTC</dd>
                  </div>
                  <div>
                    <dt>Finished</dt>
                    <dd>21 Sep · 14:03:16 UTC</dd>
                  </div>
                  <div>
                    <dt>Result</dt>
                    <dd>Success · one attempt · no recorded error</dd>
                  </div>
                </dl>
              </div>
              <p>
                The distinction matters: the record proves a merge-triggered
                operation that an agent could inspect. It should not be
                presented as if the same operation was initiated by a fresh
                ChatGPT redeploy call.
              </p>
              <Capture
                file="verification-desktop.jpg"
                alt="RentAWeekend deployment verification showing service images, completed migration and public endpoint evidence"
                caption="The recorded result in GroundControl: Compose runtime comparison, completed migration, and the public HTTP check."
              />
              <p>
                A durable operation makes the next conversation useful. The
                client can disconnect and return to an ID whose status, attempts
                and evidence are still there. If tracking becomes uncertain
                after a restart, the right next step is to inspect the real
                runtime and existing evidence before issuing another mutation.
              </p>
            </section>
            <section id="limits">
              <h2>The evidence also exposes unfinished work.</h2>
              <p>
                The recorded deployment includes a build on the VPS. Earlier
                heavy builds competed with GroundControl and RentAWeekend for
                host resources and contributed to timeouts. Moving builds to CI
                or an approved isolated builder is the preferred production
                architecture, but the presence of a webhook checkbox does not
                prove that separation already happened.
              </p>
              <p>
                The operation also records source revision{" "}
                <code>468acf8d6982…</code> while the web and API images use tag{" "}
                <code>0661793317ff…</code>. The verifier checked those images
                against the effective Compose configuration. That is useful
                runtime consistency evidence; it is not proof that the image was
                built from the newly synchronized source. Immutable artifact
                provenance needs a separate check.
              </p>
              <p>
                Daytona has a focused role here: isolated reproduction and
                candidate validation for eligible code and configuration
                failures. It is early access, not the production runtime or a
                dependency of connecting ChatGPT. A useful repair should lead to
                a reviewable change and ordinary release verification.
              </p>
              <p>
                Distribution has its own proof. A disposable Linux acceptance
                run exercised installation, owner claim, loopback binding,
                persistence, MCP/OAuth discovery, an idempotent rerun, a guarded
                same-image upgrade and a data-preserving uninstall. It did not
                test every DNS provider, all version migrations or a
                failed-verification application rollback. The{" "}
                <Link href="/docs/evidence">evidence page</Link> makes those
                boundaries explicit.
              </p>
            </section>
            <section id="try-it">
              <h2>Try the smallest complete path.</h2>
              <p>
                Install GroundControl, claim it, publish HTTPS and enroll one
                existing Compose application. Then connect ChatGPT, select that
                workload and ask for a read-only health check. Only after those
                results are clear should you run a controlled redeploy and
                follow its operation to completion.
              </p>
              <p>
                That is the adoption test I want the product to pass: a new
                operator can reach a real, bounded result, understand why it
                succeeded, and know what to check when it fails.
              </p>
              <div className="article-cta">
                <Link className="button" href="/docs/getting-started">
                  Start the walkthrough ↗
                </Link>
                <Link className="text-link" href="/docs/agent-access">
                  Already installed? Connect ChatGPT →
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
