import Link from "next/link";
import type { Guide } from "./guides";
import { Table } from "./guide-parts";
import CodeBlock from "@/app/components/CodeBlock";

export const releaseGuides: Record<string, Guide> = {
  "build-and-release": {
    updated: "8 November 2026",
    title: "Build and release with your agent",
    description: "Turn a GitHub commit into a published container image, then deploy that image through GroundControl.",
    outcome: "A build operation with image digests and a separate release operation you can inspect.",
    sections: [
      { id: "prepare", title: "1. Prepare the application", body: <><p><Link href="/docs/projects">Add your project</Link>, link its GitHub repository and Compose deployment, and configure source access and a registry credential in GroundControl. Each selected service needs a build context and an image destination.</p><p><Link href="/docs/agent-access">Connect your agent</Link> with access to the deployment and redeploy capability. Start with <code>deployment.inspect</code> to confirm the source and target.</p><p>From your local repository, get the exact revision to build:</p><CodeBlock label="Find the commit SHA" code="git rev-parse HEAD" /><p>Use the complete output as <code>commitSha</code>. Push that commit to the linked repository before requesting a build.</p></> },
      { id: "builder", title: "2. Choose where the build runs", body: <><Table headers={["Builder", "Execution location", "Use"]} rows={[
        ["buildkit (default)", "Managed host, in a resource-capped BuildKit builder", "Build and publish without a GitHub Actions runner. It still uses the host’s CPU, memory and disk."],
        ["docker-agentic", "Docker cloud sandbox, controlled through the host’s sbx CLI", "Move image compilation off the production host. Requires working sbx cloud access and registry credentials."],
        ["local", "Directly on the managed host", "Development builds."],
      ]} /><p>The Docker sandbox path clones the exact commit, builds Linux AMD64 images, pushes them and attempts sandbox cleanup. Source preparation and optional image tests still run on the managed host.</p></> },
      { id: "build", title: "3. Build and publish", body: <><p>Ask your connected agent to call <code>deployment.build_publish</code> with your deployment, full commit SHA, builder and a unique <code>idempotencyKey</code>. You can select specific Compose services.</p><CodeBlock label="Example request to your agent" code={'Build and publish the pushed commit for my staging deployment.\nUse the Docker cloud sandbox builder.\nRun the image tests using the test command we have verified for this app.\nShow me the build operation, test results and image digests before releasing.'} /><p>Tests are optional by default. Set <code>runTests: true</code> and provide a command that can run inside the built image; production images may not contain test dependencies. GroundControl can otherwise use the repository’s package.json test script.</p><p>Read <code>operation.get</code> using the returned operation ID. Wait for completion and review the images, tests and phase logs. Reuse the same idempotency key only when reconciling that same request.</p></> },
      { id: "release", title: "4. Release and verify", body: <><p>Call <code>deployment.release</code> with the same deployment, the successful <code>buildOperationId</code> and a new idempotency key. GroundControl pins images by digest and records previous image references. It refuses builds whose recorded tests failed; skipped tests are not a passing test result.</p><p>Follow the release with <code>operation.get</code>, then use <code>deployment.health</code> and <code>deployment.logs</code>. Inspect the public endpoint and the application behaviour you changed.</p><p>A recorded rollback pair is recovery information, not a guarantee of automatic rollback. If an operation becomes <code>uncertain</code>, inspect the actual deployment before retrying.</p></> },
      { id: "source", title: "When an in-place source deployment is enough", body: <><p><code>deployment.source.deploy</code> syncs a linked branch and builds on the target host without GitHub Actions. Use the build/publish/release path above when you need a separately published, digest-addressed artifact.</p><p>For push-triggered deployment and operation tracking, see <Link href="/docs/deployment-automation">Deploy &amp; automate</Link>. Implementation references: <a href="https://github.com/teckedd-code2save/groundcontrol/blob/main/src/lib/mcp-agent.ts">MCP tools</a> and <a href="https://github.com/teckedd-code2save/groundcontrol/blob/main/docs/runbooks/build-publish.md">build verification runbook</a>.</p></> },
    ],
  },
  roadmap: {
    updated: "8 November 2026", title: "Product direction", description: "Where GroundControl is heading, separate from the workflows you can use today.", outcome: "A clear distinction between current operations and the next development goals.",
    sections: [
      { id: "today", title: "Available today", body: <p>GroundControl connects agents to approved deployments through OAuth and MCP. It supports source builds, image publishing, digest-based releases, configuration checks, health checks and durable operation records. See <Link href="/docs/build-and-release">Build &amp; release</Link> for the workflow.</p> },
      { id: "next", title: "Next development goals", body: <><p>Expand isolated build and test capacity, support concurrent jobs and make disposable preview environments easier to use.</p><p>Loop, GroundControl’s intelligence and recovery engine, aims to connect service changes with affected customer journeys and evidence-backed recovery. Unattended recovery remains subject to policy, verification and evaluation.</p><p>These are development goals, not release commitments. Follow the <a href="https://github.com/teckedd-code2save/groundcontrol/blob/main/docs/LOOP.md">Loop implementation contract</a> and <a href="https://github.com/teckedd-code2save/groundcontrol/issues">repository issues</a> for implementation status.</p></> },
    ],
  },
};
