# Controlled variation

Inputs remain separate: `content`, `familyId`, `variation`, `axes` and `motionId`. Family registration supplies the reference, DNA, spatial grammar, compatible motion and renderer capabilities. The renderer receives their resolved result, not an expanding set of bespoke per-output templates.

`parseGrammarPromo()` is called by metadata calculation and the component. It rejects invalid versions, unknown IDs, unsupported layout/motion choices, out-of-range axes/scales and duplicate appointment times. It reuses the existing content schema and its copy limits.

| Variation | Supported range |
| --- | --- |
| layoutVariant | split, portrait-first, stacked |
| typographyScale | 0.85–1.10 |
| imageScale | 0.85–1.15 |
| whitespace, shapeDensity, depth, expressiveness | 0–1 |

Family character constrains the result, so zero expressiveness does not erase brand identity. Content and selected asset identity do not change when a layout or axis changes. Resolution is pure and input data is not mutated.

Remotion registers 36 six-second examples: three families × two layouts × two motion grammars × three native formats. The third layout is selectable in every composition's schema controls and in the static gallery. All compositions expose axes, fine variation and content in Studio. `npm.cmd run sync:grammar` explicitly refreshes the marked grammar section in Root; it preserves legacy defaults and is never a build hook. Registrations are inline in Root because Remotion 4.0.527 cannot save defaults from the helper-registration component tested here. The final Studio inspector locates Root and shows the schema editor without a save warning. `sync:defaults` explicitly refreshes both legacy and grammar snapshots from the canonical fixture.

```powershell
npm.cmd run gallery
npm.cmd run verify:grammar
npx.cmd remotion render src/index.ts Grammar-editorial-health-split-premium-Vertical out/grammar/custom.mp4 --browser-executable="C:\Program Files\Google\Chrome\Application\chrome.exe"
```

`out/grammar/` is separate from the prior verified MP4s and `out/qa/`. The verification runner compares every exposed variation/axis using independently resolved props and checks repeated flat frames exactly. It also exports all matrix stills, motion samples, third-layout cases and long-copy/missing-portrait cases. Comparisons are assertions, not simply file existence checks.
