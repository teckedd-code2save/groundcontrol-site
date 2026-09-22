# Public site review — 22 September 2026

## What changed

The adoption path now stays on the public site: eight guides cover installation, claim, HTTPS, workload enrollment, ChatGPT OAuth/MCP, operation tracking, maintenance, troubleshooting and evidence. The article and homepage use fresh desktop product captures; the previous phone images are removed.

## Verification

- Local lint, TypeScript, seven tests and production build passed. Tests validate all internal guide destinations, section anchors, image paths, connection instructions, endpoint validation and clipboard outcomes.
- PR #17 passed GitHub CI and Vercel deployment. Its merged production revision is `dcaa1dbf37fb7f2d5de6c8804c564b4b287e314e`.
- The public homepage and native OAuth guide were opened in the browser at 1363 CSS pixels. Both product images loaded; there was no horizontal document overflow. The guide's section links and search worked.
- Entering `https://gc.example.org` produced `https://gc.example.org/mcp`, and the browser clipboard contained that exact value after Copy. An HTTP address showed the HTTPS validation error.
- The guide's ChatGPT settings path was checked against OpenAI's current connection documentation. The GroundControl fields were checked against the product code and authenticated desktop UI. We did not create a separate new ChatGPT plugin or new VPS installation as part of this site review.
- Fresh MCP health and a retrieved, existing GitHub-triggered operation are published as separate evidence records. The article does not describe the existing operation as a new ChatGPT-issued deployment.

## Visual follow-up

Browser review caught external-link arrows rendered as emoji tiles. Text-presentation selectors correct them. The article's visible title now names GroundControl and agentic deployment, and the hero explains the repeated access/credential friction directly.

The available browser does not expose mobile viewport emulation. The 1200/900/700-pixel responsive rules were inspected in code, including horizontal table/code scrolling and mobile guide navigation. Actual phone-browser testing remains unverified; desktop review is not a substitute for it.

Vercel preview required a separate sign-in, so visual verification used the public production pages after the authorized merge.
