export const guideGroups = ["Understand", "Set up", "Operate"] as const;
export const guideIndex = [
  {
    slug: "philosophy",
    title: "The GroundControl approach",
    short: "Concepts & principles",
    group: "Understand",
    description:
      "Hosts, projects, deployments, agent grants and the philosophy behind them.",
    keywords:
      "philosophy concepts entities relationships loop autonomy control plane",
  },
  {
    slug: "getting-started",
    title: "Install & claim",
    short: "Start on your VPS",
    group: "Set up",
    description:
      "Installation commands, SSH tunnel, ownership and host checks.",
    keywords: "linux VPS docker bootstrap install claim setup",
  },
  {
    slug: "after-install",
    title: "After installation",
    short: "Choose your next step",
    group: "Set up",
    description:
      "Review the host scan and follow a checklist for your first application.",
    keywords: "next onboarding first steps dashboard workflow",
  },
  {
    slug: "publishing",
    title: "Publish over HTTPS",
    short: "Make the instance reachable",
    group: "Set up",
    description: "DNS, Caddy, tunnels and OAuth discovery checks.",
    keywords: "domain cloudflare port TLS https proxy",
  },
  {
    slug: "discovery",
    title: "Discover your workloads",
    short: "Understand the scan",
    group: "Set up",
    description:
      "Scan paths, Compose files, Docker labels, candidates and missing results.",
    keywords: "discovery scan host docker inventory candidate paths layout",
  },
  {
    slug: "first-deployment",
    title: "Enrol an existing app",
    short: "Bring one workload into view",
    group: "Set up",
    description:
      "Enrollment, project grouping, tracking mode and source identity.",
    keywords:
      "repository GitHub environment enroll enrol track managed configuration",
  },
  {
    slug: "new-deployment",
    title: "Deploy a new app",
    short: "Create with Templates",
    group: "Set up",
    description:
      "Choose a template, verify source, review configuration and deploy.",
    keywords: "templates new create repository compose GHCR Caddy",
  },
  {
    slug: "agent-access",
    title: "Connect ChatGPT",
    short: "Authorize OAuth + MCP",
    group: "Set up",
    description:
      "Add the plugin, sign in, select workloads and make your first tool call.",
    keywords: "oauth mcp plugin apps developer mode permissions scopes",
  },
  {
    slug: "deployment-automation",
    title: "Deploy & automate",
    short: "Follow the outcome",
    group: "Operate",
    description:
      "Controlled redeploys, operation evidence and merge automation.",
    keywords:
      "autopilot webhook redeploy durable operation idempotency Daytona",
  },
  {
    slug: "distribution",
    title: "Upgrade & recover",
    short: "Maintain your instance",
    group: "Operate",
    description:
      "Preview, backup, guarded upgrades and data-preserving uninstall.",
    keywords: "distribution rollback recovery version uninstall",
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    short: "Find the next check",
    group: "Operate",
    description:
      "Connection, consent, visibility, timeouts and verification problems.",
    keywords: "error 401 403 timeout refresh reauthentication health failure",
  },
  {
    slug: "evidence",
    title: "Evidence & limits",
    short: "Inspect the records",
    group: "Operate",
    description:
      "Real desktop captures, operation records and downloadable health evidence.",
    keywords: "proof acceptance JSON ChatGPT RentAWeekend case study",
  },
] as const;
