# GroundControl marketing media capture plan

The public site should only use real product captures. Do not add invented dashboards, fake metrics, synthetic terminal output, or decorative UI mockups.

## Capture status — 29 August 2026

The first real-media pass is now committed under `public/product/`:

- `assistant-health-check.webp` — live AI Co-Pilot inspection with container image, health and port evidence
- `existing-compose-flow.webp` — animated WebP made from three real workflow states: source validation, inferred configuration and verified deployment
- `deployment-verified.webp` and `release-history.webp` — successful Ghana Health AI deployment and release evidence
- `runtime-inventory.webp` — live container health, ports and resource usage
- `terminal-docker-ps.webp` — harmless real `docker ps` command in the onboard terminal
- `intelligence-recovery.webp` — failed endpoint, exact upstream problem, uncertainty and safe recovery action
- `template-catalogue.webp`, `template-source-verified.webp` and `template-config.webp` — live template workflow evidence
- `operations-overview.webp` — current fleet overview, including real unhealthy state

Still worth recording later: a true 8–15 second deployment video, an external ChatGPT + GroundControl split-context capture, and a successful public-domain/HTTPS verification clip. Until those exist, the site must not imply that the animated WebP is a continuous screen recording.

## Capture set

### 1. Agent workflow hero
Use the real ChatGPT + GroundControl session showing the authenticated GroundControl terminal while ChatGPT is working through deployment/investigation tasks.

Purpose: prove the core story that a user can authenticate once and let ChatGPT use GroundControl capabilities without pasting VPS credentials into the conversation.

Recommended format: 16:10 or 3:2 screenshot, 1400–1800px wide, WebP. Crop browser chrome only if it does not remove important context.

### 2. Templates
Route: `/templates`

Capture:
- template browser / choose step
- `vps-caddy-existing-compose`
- Odoo Community template
- one production-shaped SaaS template such as Next.js + PostgreSQL + Redis
- review/deploy step with real fields and environment requirements visible

Purpose: demonstrate that templates are deployment workflows, not boilerplate cards.

### 3. Deployment progress
Route: `/deployments`

Capture a real deployment moving through source/config/build/deploy/verify, preferably one that finishes successfully and shows the public route verification.

Recommended format: short 8–15 second MP4/WebM plus a still frame.

### 4. Runtime
Route: `/runtime`

Capture a real running service with container state, ports, health and resource details visible.

Purpose: show the connection between what was deployed and what is actually running.

### 5. Terminal
Route: `/terminal`

Capture the onboard terminal running a harmless real host command such as container listing, process inspection or checking a service.

Do not expose secrets, SSH material, tokens, private environment values or sensitive host data.

### 6. Intelligence
Route: `/intelligence`

Capture a real investigation with:
- selected failing endpoint or service
- visible evidence gathering
- exact failure reason
- actionable next step / recovery action
- verification after the action where available

Purpose: sell GroundControl as an operational system, not merely a dashboard.

### 7. Domains / Cloudflare
Capture a real deployment showing domain configuration and external HTTPS verification. Hide account identifiers or zone details that should not be public.

## Editing rules

- Prefer real screenshots and short recordings over illustrations.
- Crop for focus, not to manufacture a different product state.
- Redact secrets rather than replacing them with fictional values.
- Never fabricate success states, counts or metrics for marketing.
- Keep typography and UI untouched inside screenshots so captures remain recognizable as GroundControl.
- Compress stills to WebP and recordings to MP4/WebM before committing to `public/product/`.

## Suggested page order once media is available

1. Hero copy + real ChatGPT/GroundControl session
2. Real deployment clip
3. Product capability grid
4. Templates capture strip
5. Runtime + terminal paired captures
6. Intelligence investigation clip
7. Ownership/security explanation
8. Installer + open-source CTA
