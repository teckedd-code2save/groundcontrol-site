export const guideIndex = [
  {
    slug: "getting-started",
    title: "Install & claim",
    short: "01 · Start here",
    description: "Commands, SSH tunnel, owner account and host checks.",
    keywords: "linux VPS docker bootstrap install claim setup",
  },
  {
    slug: "publishing",
    title: "Publish over HTTPS",
    short: "02 · Make it reachable",
    description: "DNS, Caddy, tunnels and OAuth discovery checks.",
    keywords: "domain cloudflare port TLS https proxy",
  },
  {
    slug: "first-deployment",
    title: "Connect a deployment",
    short: "03 · Choose a workload",
    description: "Enroll Compose, record source identity and verify health.",
    keywords: "repository GitHub environment enroll configuration",
  },
  {
    slug: "agent-access",
    title: "Connect ChatGPT",
    short: "04 · OAuth + MCP",
    description:
      "Add the plugin, sign in, grant access and make your first tool call.",
    keywords: "oauth mcp plugin apps developer mode permissions scopes",
  },
  {
    slug: "deployment-automation",
    title: "Deploy & automate",
    short: "05 · Operate",
    description:
      "A first redeploy, operation evidence and deployment-scoped merge automation.",
    keywords:
      "autopilot webhook redeploy durable operation idempotency Daytona",
  },
  {
    slug: "distribution",
    title: "Upgrade & recover",
    short: "06 · Maintain",
    description:
      "Preview, backup, guarded upgrades and data-preserving uninstall.",
    keywords: "distribution rollback recovery version uninstall",
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    short: "Find the next check",
    description:
      "Resolve connection, consent, visibility and verification problems.",
    keywords: "error 401 403 timeout refresh reauthentication health failure",
  },
  {
    slug: "evidence",
    title: "Evidence & limits",
    short: "Inspect the receipts",
    description:
      "Real desktop captures, recorded operations and downloadable health evidence.",
    keywords: "proof acceptance JSON ChatGPT RentAWeekend case study",
  },
] as const;
