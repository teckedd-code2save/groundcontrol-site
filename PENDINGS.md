# PENDINGS — Known Sharp Edges

Things that can bite you when working with or deploying the GroundControl public site.

---

## Next.js 16 Breaking Changes

This repo uses a version of Next.js with breaking changes — APIs, conventions, and file structure may all differ from LLM training data. Read `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices; the agent entry in `AGENTS.md` flags this for a reason.

## Static-export constraints

- The site is a single statically prerendered page. There is **no server runtime** — don't add API routes, cookies, headers, or `getServerSideProps`-style logic expecting them to run.
- `next.config.ts` has **no `output: "export"`** — "static" today means Vercel prerenders `/` at build time via `npm run vercel-build` (= `next build`). If you add `output: "export"`, verify `npm run dev` still behaves before relying on it.

## vercel.json behavior

- `vercel.json` pins `framework: nextjs` and `buildCommand: npm run vercel-build`. It contains no rewrites/headers today — if you add any, they interact with the prerendered export; test the deployed artifact, not just `npm run dev`.
- No environment variables are needed. If one is ever added, it must be set in BOTH the Vercel project and CI (or CI's `npm ci` + build will diverge from production).

## Type checking

- There is **no `typecheck` script** — `npx tsc --noEmit` is the de-facto check (strict, `noEmit: true`). CI runs it directly.
- `tsconfig.json` has `incremental: true`, which drops `tsconfig.tsbuildinfo` into the repo root on every check. It is gitignored (commit `5d10667`) — don't commit it and don't delete the ignore entry.

## CI

- CI (`ci.yml`, from issue #2) runs lint + typecheck + build on push/PR. **It does not run tests yet** — `npm test` is local-only until CI is extended in a separate issue.
- CI uses `npm ci`, which hard-fails without a committed `package-lock.json`. Commit lockfile changes alongside every dependency change.

## App Router layout & routing

- Only reserved filenames (`page.tsx`, `layout.tsx`, …) are routes. Other files colocate safely in `app/` (that's where `page.test.tsx` lives) — but anything you don't want shipped as a route must not use a reserved name.
- The site is one page; nav uses plain `<a>` + hash anchors (`#install`, `#capabilities`). `scroll-behavior: smooth` on `html` makes those work client-side. Adding real pages means `next/link` and re-checking the anchor behavior.

## Tailwind 4 specifics

- Tailwind 4 is configured through `@tailwindcss/postcss` — there is **no `tailwind.config.js`**. Theme tokens are CSS variables in `app/globals.css` (`--ink`, `--accent`, `--panel`, …) and arbitrary values like `bg-[#090b0a]` are used in JSX. Extend the variables rather than hardcoding colors.
- `app/globals.css` defines the component classes (`.hero`, `.install-console`, `.product-preview`, …) with plain CSS on top of `@import "tailwindcss"` — keep that structure; don't rewrite it as utility-only.

## Fonts

- `app/layout.tsx` uses `next/font/google` (Geist / Geist_Mono). Fonts are fetched at build time — CI and Vercel need network access. In tests, `next/font/google` must be mocked (see `app/layout.test.tsx`).

## Installer console (page interactions)

- `InstallConsole` copies via `navigator.clipboard.writeText` when available and falls back to a hidden textarea + `document.execCommand("copy")`. `execCommand` is deprecated; jsdom has neither API, so tests stub `navigator.clipboard`.
- The install command embeds `root@YOUR_VPS_IP` as a literal placeholder — it is a template, not a real host. Don't "fix" it to a real address.

## Tests (Vitest)

- Vitest runs in jsdom with `globals: true`; `vitest.setup.ts` imports `@testing-library/jest-dom/vitest` for matchers. The `@` alias resolves to the repo root (no `src/` directory here — different from `groundcontrol`).
- Test files are type-checked by `tsc --noEmit` and linted by ESLint like everything else — keep them clean (explicit `import { describe, expect, it } from "vitest"` rather than relying on globals).

## Repo hygiene

- `.next/`, `out/`, `build/` are generated and gitignored; ESLint's `globalIgnores` covers them.
- IDEAS.md is the roadmap; AGENTS.md is the operating guide; PENDINGS.md (this file) is the sharp-edges log. When a feature ships, update IDEAS.md and re-check whether the edge that blocked it still belongs here.
- The GitHub links on the page must all point at `teckedd-code2save/groundcontrol`; the console hostname `console.groundcontrol.serendepify.com` belongs to the private app and must never be mixed into this site's copy or URLs.
