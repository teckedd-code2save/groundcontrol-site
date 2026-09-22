# Public site review, 22 September 2026

## Product journey revision

The homepage now has a four-part product tour using actual desktop captures, a post-install sequence, an illustrated workload model, inspectable deployment proof and direct learning paths. Twelve native guides cover the GroundControl philosophy, installation, next steps, publishing, discovery, enrollment, new template deployments, agent access, automation, maintenance, troubleshooting and evidence.

The post-install guide offers separate checklists for existing and new applications. Checkmarks are session-only progress aids; they do not perform or verify any server operation. Documentation navigation is grouped into Understand, Set up and Operate, with an explicit expandable menu on narrow screens.

## Product verification

- Installer, onboarding probe, inventory discovery, enrollment, project grouping, source deployment and Templates were traced against product main `68e2c23`.
- Live UI review confirmed Settings → Layout → Deployment discovery, the two root fields, Discovered on this host and the enrollment dialog. No workload was enrolled, deployed or restarted during those captures.
- The guides distinguish initial broad host probing from the inventory scan of configured roots. They explain Docker-label matching, conventional Compose names, bounded depth and common missing/duplicate candidate cases.
- Existing candidates default to tracking. New template deployments become managed. The current UI has no general tracking-to-managed promotion control. OAuth permissions are separate, and tracking is not a universal read-only security boundary.
- Loop, Daytona, public verification and source-to-image evidence limits remain explicit.

## Automated verification

Local lint, TypeScript, nine tests and production build passed. Tests validate internal destinations and anchors across all twelve guides, image paths, OAuth connection instructions, endpoint validation, clipboard outcomes, product-tour keyboard navigation and independent checklist state.

## Browser verification and limits

The preceding public revision was reviewed at 1363 CSS pixels. The product images loaded, guide anchors and search worked, the endpoint builder produced the expected HTTPS MCP address and Copy placed it on the clipboard. There was no horizontal document overflow. The current journey revision requires a fresh public-page review after deployment; do not treat the preceding review as verification of this revision.

The available browser does not expose mobile viewport emulation. Responsive rules at 1200, 950 and 700 pixels have been inspected, including local table/code scrolling, product-tour layout, accessible control sizes and collapsible guide navigation. Actual phone-browser testing remains unverified.

Vercel preview requires a separate sign-in. Public production pages are available for visual verification after the authorized merge. This site revision does not establish that a separate fresh VPS installation or new ChatGPT plugin connection was completed.
