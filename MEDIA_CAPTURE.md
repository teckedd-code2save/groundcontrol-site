# Public evidence captures

The public site uses unaltered desktop captures from the operator's authenticated GroundControl interface, captured on 22 September 2026. No generated interface or chat image is presented as product evidence.

| Asset                                   | Product page                                        | What it proves                                                                                      |
| --------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `public/proof/agents-desktop.jpg`       | Agents                                              | MCP endpoint, active ChatGPT grant, five displayed scopes, eight allowed workloads                  |
| `public/proof/configure-desktop.jpg`    | Deployments / RentAWeekend / Configure              | Explicit repository, branch, recorded revision and enabled deployment-specific merge automation     |
| `public/proof/verification-desktop.jpg` | Deployments / RentAWeekend / Deploy / View evidence | Service image comparison, migration exit, public verification for the recorded 21 September release |
| `public/proof/discovery-desktop.jpg`    | Deployments / Discovered on this host               | Existing Compose candidates, paths and explicit enrollment controls                                 |
| `public/proof/enrollment-desktop.jpg`   | Deployments / Enrol into a project                  | Existing project choices and Create & link; the dialog was closed without enrolling anything        |
| `public/proof/layout-desktop.jpg`       | Settings / Layout / Deployment discovery            | Separate discovery root and template deployment root, using the running instance's actual values    |

The public screenshot captions distinguish capture date from operation date. Images open full-size; their original aspect ratio is preserved. The previous mobile captures were removed.

## MCP records

- `public/evidence/rentaweekend-health-2026-09-22.json` contains a fresh deployment.health result with a provenance wrapper.
- `public/evidence/rentaweekend-operation-2026-09-21.json` contains selected fields and exact log excerpts from the existing operation retrieved through operation.get on 22 September. The record explicitly marks omissions.
- The operation was triggered by GitHub push, not a new ChatGPT redeploy call.
- Evidence records a host build and a runtime image tag different from the synced source commit. Do not claim that this proves off-host building or exact source-to-image provenance.
- These are dated snapshots, not a continuous status feed.

## Documentation verification

ChatGPT's connection path was checked against https://developers.openai.com/plugins/deploy/connect-chatgpt on 22 September 2026. It currently describes Settings → Security and login → Developer mode, then Plugins → +. Older product copy refers to Apps / Connectors. Account and workspace availability can differ.

GroundControl setup labels, installer options, claim behavior, publishing paths, OAuth scopes and revocation behavior were checked against product main `68e2c23` and the running UI. The post-install follow-up also traced inventory discovery, enrollment defaults, project grouping, managed source-deploy guards and Templates. Discovery and enrollment captures did not start a deployment or change workload ownership.

Docs are rendered natively from `content/guides.tsx` and `content/journey-guides.tsx`; `content/guide-index.ts` drives grouped navigation. The illustrated workload model is labeled as an example. The product-tour tabs display captured images, not a live connection to the reader's host.

The documentation explicitly distinguishes tracking from managed deployment and from OAuth authorization. A newly discovered workload defaults to tracking, and the current UI has no general promotion control. Tracking is not documented as a universal read-only security boundary.
