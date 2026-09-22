# Verification — 22 September 2026

## Baseline and scope

See [baseline.md](baseline.md). The starting installation was healthy: Remotion 4.0.527, React 19.2.3, TypeScript 5.9.3, an empty public folder and one blank two-second composition. No tracked user changes existed; the pre-existing lockfile was adopted. Work remained in this repository. No ERP, Flutter, external API or production deployment was modified.

## Automated evidence

| Check                           | Result                                                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm.cmd run check`             | Passed: strict TypeScript, unchanged ESLint rules and all 9 contract tests                                                                        |
| `npm.cmd run build`             | Passed with the existing Rspack/Tailwind integration                                                                                              |
| CLI `compositions src/index.ts` | All three native registrations load: 450 frames, 30 fps, 15 seconds                                                                               |
| `npm.cmd run verify:visual`     | Passed: 87 storyboard/example stills plus 12 independent design-control comparisons                                                               |
| Assets                          | Every manifest path and bundled font/license exists; unsupported/unsafe sources are rejected                                                      |
| JSON                            | Alternate fictional practitioner/practice/service/time data renders without scene changes; invalid 25:00 input is rejected by metadata validation |
| Missing optional asset          | Renders a labelled portrait placeholder in all three formats                                                                                      |
| Runtime                         | No unexpected browser console errors in the successful render checks                                                                              |
| Frame behavior                  | Numerical motion remains deterministic under out-of-order seeking; flat-preset repeated frames match exact PNG SHA-256 hashes                     |

Tests cover schema versions, required/bounded copy, 1–4 unique valid times, unsupported config choices, asset lookup/type/tag/approval filters, duplicate IDs, source formats and path traversal, actual asset/font files, every editorial frame and format dimensions, and motion determinism/clamping/speed.

Visual acceptance renders first/last frames, every storyboard beat and both sides of transition boundaries for each aspect ratio. Each of layout, typography style/scale, motion style/intensity/speed, image scale/treatment, shape style/density, depth and background is changed independently, with different output pixels asserted. Additional fixtures exercise long copy, four slots, larger type/image scale, alternate content, a coordinated hero preset and missing portraits. Representative PNGs were visually inspected; no clipping or missing media was observed in the reviewed layouts.

Machine evidence is written to ignored `out/qa/verification.json`, alongside the PNGs. Contact sheets are `out/qa/vertical-storyboard.jpg`, `square-storyboard.jpg`, and `landscape-storyboard.jpg`. The visual matrix covers supplied fixtures and individual switches, not every possible combination, language or future asset.

## Studio acceptance

`npm.cmd run studio -- --port=3100 --no-open` starts successfully. The local Studio was opened in the browser. The schema panel exposes the full nested content/design contract. An imported `defaultProps` value initially prevented Studio saves; registrations now contain editable inline snapshots generated from the canonical fixture. The warning disappeared, a doctor-name change appeared in the live composition, and the original fictional name was restored. Studio's error-overlay API returned `null`. The doctor scene was left at frame 165 for review.

`npm.cmd run sync:defaults` regenerates all three snapshots explicitly; build/start never overwrite Studio edits. Current default content is restored to the canonical demo.

## Rendered media

| File                          | Size      | Metadata verified with bundled ffprobe    |
| ----------------------------- | --------- | ----------------------------------------- |
| `out/dr-health-vertical.mp4`  | 1080×1920 | H.264, 30 fps, 450 frames, 15.000 seconds |
| `out/dr-health-square.mp4`    | 1080×1080 | H.264, 30 fps, 450 frames, 15.000 seconds |
| `out/dr-health-landscape.mp4` | 1920×1080 | H.264, 30 fps, 450 frames, 15.000 seconds |

All three full-length exports completed and every video frame decoded successfully with the bundled FFmpeg (`-c:v rawvideo -f null -`). They are silent because no licensed audio was supplied. Build products, QA images and videos are ignored by Git; source, fixtures, original illustration and font/license files are committed.

## Renderer observations

Chrome's blurred box-shadow rasterizer can vary by 1–2 RGB channel levels between otherwise identical captures, including with software GL. The exact pixel assertion therefore uses the flat preset, retaining the same frame-driven typography, image and motion behavior without blurred shadow paint. No tolerance-based assertion replaces that exact check. The CLI and QA harness explicitly select `swangle` for a consistent rendering backend. Exact cross-GPU/version identity is not claimed for blurred shadows.

Remotion 4.0.527 may log `Target.closeTarget: No target with given id found` while cleaning up the deliberately rejected invalid-props page. The expected validation rejection is asserted, successful composition browser-error collection is empty, subsequent renders succeed, and the verification command exits zero. This observed renderer cleanup warning is separate from application/runtime failures; dependencies were not upgraded or patched to suppress it.

## Commands used

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run verify:visual
npm.cmd run sync:defaults
npm.cmd run studio -- --port=3100 --no-open
npm.cmd run render:vertical -- --browser-executable="C:\Program Files\Google\Chrome\Application\chrome.exe"
node node_modules/@remotion/cli/remotion-cli.js render src/index.ts DrHealthServicePromo15-Square out/dr-health-square.mp4 --browser-executable="C:\Program Files\Google\Chrome\Application\chrome.exe" --log=error
node node_modules/@remotion/cli/remotion-cli.js render src/index.ts DrHealthServicePromo15-Landscape out/dr-health-landscape.mp4 --browser-executable="C:\Program Files\Google\Chrome\Application\chrome.exe" --log=error
```

The initial CLI discovery and fallback checks also used direct Node entry points for TypeScript, ESLint and Remotion. No rules or strictness were weakened. No network push was performed.

## Remaining development material

The supplied DrHealth logos and teal/green palette now replace development branding; see [branding.md](branding.md). Fonts and supporting tints remain template choices. The clinician illustration, names, clinic, service and times remain demo content; booking/confirmation is conceptual. No actual stock photography, soundtrack, real booking destination or API integration is provided. The next step is an editorial review with authorized practitioner images and marketing copy.
