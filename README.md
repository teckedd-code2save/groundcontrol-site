# GroundControl Site

The public product and installation site for [GroundControl](https://github.com/teckedd-code2save/groundcontrol) — a self-hosted VPS cockpit for managing Docker containers, Caddy proxies, deployments, domains, and system health across your infrastructure.

This site is intentionally separate from the private GroundControl console. It provides product information, feature documentation, and the one-click VPS installer script. No authentication or dashboard access is exposed here.

## Tech Stack

- **Next.js 16** (static prerendering)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Vercel** (deployment)

## Quick Start

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000`.

## Validate

```bash
npm run lint
npm run vercel-build
```

The Vercel build produces a statically prerendered `/` route. The page has no authentication or dashboard link; its primary action is the VPS installer.

## Deploy on Vercel

1. Import this repository as a new Vercel project.
2. Keep the detected framework as **Next.js**.
3. Deploy without environment variables.
4. Add `groundcontrol.serendepify.com` to the Vercel project only when the current site is ready to be replaced.

The private application remains at `console.groundcontrol.serendepify.com`; its GitHub callback and webhook URLs must use that console hostname.

## License

MIT
