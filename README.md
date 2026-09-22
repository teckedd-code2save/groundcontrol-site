# GroundControl Site

The public product and installation site for [GroundControl](https://github.com/teckedd-code2save/groundcontrol).

GroundControl itself is a self-hosted, single-tenant control plane. Each operator runs their own instance and private login plane. This repository is intentionally public-only: product story, current product evidence, installation and developer-facing material. It does **not** expose a shared GroundControl dashboard.

## Current product story

GroundControl gives software agents bounded infrastructure capabilities through MCP + OAuth:

- inspect deployments, runtime and health;
- check named configuration presence without exposing secret values;
- start durable idempotent redeploy operations;
- reconnect later and read final verification evidence;
- use connector capability health for GitHub, GHCR and Daytona;
- keep SSH keys, provider credentials and the human PTY outside the agent tool surface.

Fresh installs use the canonical on-host installer and a one-time human ownership claim.

## Verified deployment proof

On 22 September 2026, ChatGPT used a scoped GroundControl grant to read RentAWeekend health and retrieve an existing deployment operation:

- a signed push to the allowed `main` branch created durable operation `cmubbc14l0002tjpa0r56r1sm`;
- the operation completed in one attempt with no recorded error;
- web, API, PostgreSQL and Redis were healthy;
- the recorded verification and the fresh health response both reported public HTTP 200;
- VPS credentials and secret values remained outside the agent tool surface.

The recorded deployment was triggered by GitHub, not by a new ChatGPT redeploy request. It used a host build. Its source SHA and runtime image tag differ, so this evidence does not establish that the running images were built from that source revision. Exact captured fields and log excerpts live in `public/evidence/`.

The full deployment and Daytona contract is maintained in the main repository at
[`docs/DEPLOYMENT-AUTOMATION-AND-DAYTONA.md`](https://github.com/teckedd-code2save/groundcontrol/blob/main/docs/DEPLOYMENT-AUTOMATION-AND-DAYTONA.md).

## Install

Human-readable:

```bash
curl -fsSL https://raw.githubusercontent.com/teckedd-code2save/groundcontrol/main/scripts/install | sudo bash
```

Agent-oriented JSON result:

```bash
curl -fsSL https://raw.githubusercontent.com/teckedd-code2save/groundcontrol/main/scripts/install \
  | sudo bash -s -- --json
```

The fresh control plane binds to loopback first. Claim it through the documented local/SSH-tunnel flow, then publish it behind HTTPS or keep it private.

## Tech stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- Vercel

## Validate

```bash
npm run lint
npx tsc --noEmit
npm test
npm run vercel-build
```

## Product surfaces

- Public product site: `https://trygroundcontrol.serendepify.com`
- GroundControl instances: operator-owned/private URLs, not a shared multi-tenant console
- Source: `https://github.com/teckedd-code2save/groundcontrol`

## License

MIT

## Native documentation and public evidence

The complete adoption path lives at `/docs`. Twelve guides cover the philosophy and workload model, install/claim, next steps after installation, HTTPS publishing, host discovery, existing application enrollment, new template deployments, ChatGPT OAuth/MCP, deployment automation, maintenance, troubleshooting and evidence. No GitHub visit is required to follow a guide.

- `content/guides.tsx` contains the guide sections, runnable examples and expected results.
- `content/journey-guides.tsx` contains the philosophy, post-install, discovery and new-deployment guides. `content/guide-parts.tsx` supplies shared guide elements.
- `content/guide-index.ts` defines sidebar order and search terms.
- `ProductTour` offers four views of the actual product with keyboard-accessible tabs. `NextSteps` provides separate session-only checklists for existing and new workloads; checking an item performs no host operation.
- `WorkloadModel` is a labeled conceptual illustration, not a screenshot or live status display.
- `app/docs/_components/EndpointBuilder.tsx` formats the operator's HTTPS MCP URL entirely in the browser; it performs no network request.
- Product screenshots open at full size and preserve their aspect ratio.
- See `MEDIA_CAPTURE.md` for capture provenance, dates and claim boundaries.

Validate guide links/anchors, assets, endpoint formatting, clipboard behavior, product-tour keyboard navigation and checklist state with `npm test`. Review the actual rendered pages and capture any limits in `SITE_REVIEW.md`. The current browser runtime does not expose viewport emulation, so real phone testing remains outstanding.
