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
