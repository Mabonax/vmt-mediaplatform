# Grammar implementation report — 2026-09-23

| Acceptance item | Result |
| --- | --- |
| 1. Baseline | Confirmed `431f664`, subsequent branding commit `ee36bf3`, Remotion 4.0.527 / React 19.2.3 and two existing dirty Studio files. |
| 2. Architecture | Separate asset/content/token contracts, reference/DNA/spatial/motion records, pure resolver, shared artwork and renderer adapters. Legacy template retained. |
| 3. ReferenceComposition | Strict typed source records with required provenance/license and original project references. |
| 4. DesignDNA | Palette, typography, layout, hierarchy, imagery, shapes, surfaces and normalized character axes. Executable/descriptive fields distinguished in docs. |
| 5. CompositionGrammar | Semantic zones, flow constraints, widths, priorities, anchors, no-overlap rules, subject-only decoration and responsive modes. |
| 6. Families | Editorial health, minimal clinical and technology health. White canvases and original PNG logos throughout. |
| 7. Variation | Three layouts; bounded type/image scales, spacing, shapes, depth and expressiveness. |
| 8. Design axes | Expressive, friendly, dimensional, spacious and dynamic, affecting correlated properties. |
| 9. MotionGrammar | Subtle and premium use existing deterministic primitives; reusable on the same static composition. |
| 10. Assets | Existing registry reused; missing/wrong-type/unapproved fallback, opaque/facing/aspect containment. Six original-logo hashes verified. |
| 11. Static React | Independent Rspack build, zero Remotion modules confirmed in its build graph. Interactive gallery. |
| 12. UI translation | Responsive minimal-clinical booking experiment with search, service/time selection, review, request, appointments, change and clear. Local state only. |
| 13. Remotion matrix | 36 registrations: 3 families × 2 layouts × 2 motions × 3 ratios. Third layout selectable in schema. Root inline defaults resolve Studio save detection. |
| 14. Automated checks | Strict TypeScript, ESLint and 17 contract tests pass, including existing tests. No checks weakened. |
| 15. Visual verification | 36 matrix stills, 22 control endpoint stills across 11 controls, 18 edge stills, 12 motion samples, 2 exact-repeat stills. Three native six-second H.264 renders decode fully. Existing 87-still / 12-control suite also passes. |
| 16. Documentation | Six requested concept guides plus this evidence report, README links, architecture and branding updates. |
| 17. Commit | Focused commit named `feat: add reference composition and design grammar engine`; use `git log -1` for its hash. No push. Prior Studio edits remain unstaged. |
| 18. Limitations | Original manually encoded references; no automatic ingestion or AI analysis. Constrained spatial executor, two motion styles, one fictional service/practitioner UI. Source review is not authenticated app acceptance. Prior video files intentionally retained. |
| 19. Next step | Review family/contact-sheet choices, then encode one approved real campaign or licensed reference with the same schema and provenance checks. |

## Commands and artifacts

`npm.cmd run check`, `npm.cmd run build`, `npm.cmd run gallery:build`, `node scripts/verify-grammar.mjs`. Legacy suite was run with `QA_OUTPUT=out/grammar/legacy` so prior verified outputs remain intact. Its negative-input test still emits the previously documented Remotion page-close cleanup warning; assertions pass and the browser error collection is empty.

New artifacts remain under `out/grammar/` (Git-ignored): `verification.json`, `families-contact-sheet.png`, `variations-contact-sheet.png`, `editorial-health-vertical.mp4`, `minimal-clinical-square.mp4`, `technology-health-landscape.mp4`, the per-frame PNGs and `legacy/verification.json`. Videos are 30 fps / 180 frames / 6 seconds at 1080×1920, 1080×1080 and 1920×1080 respectively. FFprobe metadata and full raw-video decoding were checked.

Contact sheets are reproducible with `python scripts/make-grammar-contact-sheet.py` using Pillow. They assemble the actual rendered PNGs, with original image pixels retained in the individual sources.

The refreshed original 15-second vertical promo is exported separately as `out/grammar/legacy/drhealth-white-vertical.mp4`, retaining its 1080×1920 / 30 fps / 450-frame contract. It includes the white end card, original logos and feature-aligned copy; the previous exports are preserved.

## Browser acceptance

The standalone gallery was exercised through its visible controls. All **54** combinations of three families, three layouts, three ratios and two content cases (normal / long copy with missing portrait) had a white computed canvas, no text overflow, no copy/subject overlap and no main-region overflow. An initial landscape crowding defect was corrected before this pass.

The booking experiment was exercised from disabled controls through search no-results, clear search, service selection, time selection, request preview, appointment viewing, change time, a second request and clearing the request. The status never claimed a real booking. Desktop and compact widths were inspected; the narrowest measured layout width was 335 CSS pixels on this browser host, with no page-level horizontal overflow. The tool's requested viewport does not map 1:1 to CSS pixels on this host, so this is not a claim of exact 320-pixel acceptance. Logo aspect ratio is maintained by its component at both sizes.

Studio was restarted after its existing server was found disconnected. The new composition opens at frame 90 with the correct original logo and revised messaging, and `get_current_error` returns null. Inline Root registration removes the helper-file default-props save warning. Interactive schema controls are present. Gallery and Studio are left available locally.

## Scope and dependency evidence

No clinic or Flutter files were written. Existing core dependencies were not upgraded. Rspack 1.7.11 is now explicit at its already-installed version; `@types/react-dom` 19.2.3 was added for strict static-renderer type checking. The six supplied logo PNGs and their provenance manifest remain unchanged. The stray legacy presentation translation was removed, not baked into a modified image.
