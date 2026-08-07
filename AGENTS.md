<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# GroundControl Site Agent Notes

The public product and installation site for [GroundControl](https://github.com/teckedd-code2save/groundcontrol) — a self-hosted VPS cockpit for Docker containers, Caddy proxies, deployments, domains, and system health. This site is the marketing + installer surface; the private console is a separate app at `console.groundcontrol.serendepify.com` and is **not** part of this repo. No authentication or dashboard access belongs here.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, static prerendering) |
| UI | React 19 |
| Language | TypeScript 5.9 (strict) |
| Styling | Tailwind CSS 4 (`@tailwindcss/postcss`, no `tailwind.config`) |
| Lint | ESLint 9 flat config (`eslint-config-next` core-web-vitals + typescript) |
| Tests | Vitest + @testing-library/react (jsdom) |
| Runtime | Node >= 22 |
| Deploy | Vercel (static export via `vercel.json`) |

## Project structure

- `app/` — App Router routes: `page.tsx` (the entire single page), `layout.tsx` (fonts + metadata), `globals.css` (Tailwind import + design tokens + component classes)
- `public/` — static assets (`favicon.svg`)
- `next.config.ts` — `reactStrictMode: true`, nothing else
- `vercel.json` — framework `nextjs`, build command `npm run vercel-build`
- `eslint.config.mjs` — flat config with `globalIgnores` for `.next/`, `out/`, `build/`
- `vitest.config.ts` / `vitest.setup.ts` — test runner config (jsdom, `@/` alias → repo root)
- `.github/workflows/ci.yml` — lint + typecheck + build on push/PR (do not touch without a separate issue)

## Key scripts

- `npm run dev` — dev server on `http://localhost:3000`
- `npm run build` — `next build` (statically prerenders `/`)
- `npm run start` — serve the production build
- `npm run lint` — `eslint . --ignore-pattern .next`
- `npm test` / `npm run test:watch` — Vitest run / watch
- There is **no `typecheck` script** — `npx tsc --noEmit` is the de-facto check (strict tsconfig, `noEmit: true`)

## Deployment

- Vercel, no environment variables, no runtime server features. The single page is statically prerendered at build time.
- Keep `vercel.json` (`framework: nextjs`, `buildCommand: npm run vercel-build`) intact; `vercel-build` is `next build`.
- Public site domain: `groundcontrol.serendepify.com`. The private console app lives at `console.groundcontrol.serendepify.com` — its GitHub callback and webhook URLs must keep using the console hostname, never this site.
- The installer command on the page downloads `scripts/bootstrap` from the main GroundControl repo (`teckedd-code2save/groundcontrol`, `main` branch). Keep that URL in sync with the product.

## Code conventions

- All routes are static. The site is a single page today — plain `<a>` tags and hash anchors (`#install`, `#capabilities`) are correct; switch to `next/link` only if real multi-page routing is added.
- Interactive logic stays in the page component (see `InstallConsole`): small local components, no premature extraction into `app/components/`.
- TypeScript strict — no `any`. Data arrays are `as const` where the shape is fixed (see `commands`, `capabilities` in `app/page.tsx`).
- Styling: Tailwind utility classes for layout + semantic classes (`.hero`, `.install-console`, …) defined in `app/globals.css` with CSS variables from `:root`. Design tokens live in the `--*` variables — extend those, don't hardcode hex values.
- Tests are colocated in `app/` (`page.test.tsx`, `layout.test.tsx`). Render the page with @testing-library/react, assert on roles/accessible names, stub `navigator.clipboard` (jsdom has none). `next/font/google` must be mocked when testing anything that imports `app/layout.tsx`.
- Run `npm run lint`, `npx tsc --noEmit`, and `npm test` before pushing — CI runs lint/typecheck/build but does **not** run tests yet.

## Relationship to GroundControl

This repo is the public face of the [GroundControl product repo](https://github.com/teckedd-code2save/groundcontrol). Product features land in that repo; this site only markets them and hosts the one-line VPS installer. Keep the copy honest and in sync with what the product actually does — no fake stats, no promised-but-unbuilt features.
