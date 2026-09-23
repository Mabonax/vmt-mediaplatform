# Dr. Health Motion & Design Engine

Independent, JSON-driven Remotion 4.0.527 / React 19 / strict TypeScript foundation. Portable tokens, a typed asset registry and validated content/design configuration feed a reusable 15-second template in three native formats.

**Uses the supplied DrHealth logos and their teal/green palette.** See [branding sources](docs/branding.md). Practitioner/practice content remains fictional, the clinician is a labelled illustration, and booking screens are concepts. No appointment is booked, and no ERP or Flutter application is connected or modified.

## Windows commands

The new [Reference Composition / Design Grammar layer](docs/reference-compositions.md) adds three white-background families, 36 Remotion examples and a standalone React gallery with a booking UI experiment. Start the gallery with `npm.cmd run gallery`, then open `http://127.0.0.1:3101`. Run `npm.cmd run verify:grammar` for its separate outputs under `out/grammar/`.

```powershell
npm.cmd ci
npm.cmd run studio
npm.cmd run check
npm.cmd run build
npm.cmd run render:vertical
npm.cmd run render:square
npm.cmd run render:landscape
```

Outputs: `out/dr-health-vertical.mp4`, `out/dr-health-square.mp4`, `out/dr-health-landscape.mp4`. Each is 450 frames, 30 fps, 15 seconds. Studio registrations end in `-Vertical`, `-Square` and `-Landscape` after `DrHealthServicePromo15`.

Use installed Chrome instead of downloading a managed browser:

```powershell
npm.cmd run render:vertical -- --browser-executable="C:\Program Files\Google\Chrome\Application\chrome.exe"
```

Change content/design through Studio props or JSON:

```powershell
npm.cmd run render:square -- --props=examples/hero.json
npx.cmd remotion still src/index.ts DrHealthServicePromo15-Square out/hero.png --frame=165 --props=examples/hero.json
```

Studio saves per-format defaults in `src/Root.tsx`. After editing the canonical `demo.json`, run `npm.cmd run sync:defaults` to refresh all three inline snapshots. This explicit command replaces saved Studio defaults; build/start never do so automatically. Use `--props=src/brands/dr-health/data/demo.json` to render directly from the fixture.

Repeated render scripts overwrite their output, matching the existing Remotion config. Use a different CLI output path to preserve comparisons. No dependency upgrades were made. Zod and renderer are explicitly declared at their already installed versions.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run verify:visual
```

`check` combines TypeScript, ESLint and contract tests. Visual verification builds, samples each scene/transition in all formats, renders alternate JSON, checks all 12 design controls, checks repeated frames, rejects invalid input and captures unexpected browser errors. Results are under `out/qa/`. Installed Chrome/Edge is detected on Windows; `REMOTION_BROWSER_EXECUTABLE` overrides detection. Human review is still required.

The npm wrapper can start slowly on this host. Equivalent direct entry points: `node node_modules/typescript/bin/tsc --noEmit`, `node node_modules/eslint/bin/eslint.js src`, `node node_modules/@remotion/cli/remotion-cli.js <command>`. No global npm/Git changes are required.

## Edit points

- Content: `src/brands/dr-health/data/demo.json`
- Contract: `src/engine/schemas/promo.ts`
- Theme: `src/brands/dr-health/theme/tokens.ts`
- Assets: `src/brands/dr-health/assets/manifest.ts` and `public/brands/dr-health/`
- Timeline/scenes: `src/brands/dr-health/compositions/` and `scenes/`
- Reusable visuals/motion: `src/components/`

## Documentation

- [Baseline audit](docs/baseline.md)
- [Architecture](docs/architecture.md)
- [Asset guide](docs/asset-guide.md)
- [Branding sources and palette](docs/branding.md)
- [Template system](docs/template-system.md)
- [Future ERP integration](docs/erp-integration.md)
- [Verification evidence](docs/verification.md)
- [Reference compositions](docs/reference-compositions.md)
- [DesignDNA and design axes](docs/design-dna.md)
- [Composition grammar and asset compatibility](docs/composition-grammar.md)
- [Variation engine](docs/variation-engine.md)
- [Motion grammar](docs/motion-grammar.md)
- [Static React and UI translation](docs/ui-translation.md)
- [Grammar implementation and verification report](docs/grammar-verification.md)

The project remains private/UNLICENSED. Bundled fonts include their licenses; Remotion's [licensing terms](https://www.remotion.dev/docs/license) also apply.
