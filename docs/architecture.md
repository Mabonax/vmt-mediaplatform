# Dr. Health Motion & Design Engine

This is an independent creative system. It has no connection to the Laravel ERP, Flutter app, patient database or booking service. Remotion is its first renderer; the design language is deliberately broader than video.

```text
Portable tokens + asset manifest + versioned content + design configuration
                                  |
                          Visual components
                                  |
                      Dr. Health template / scenes
                                  |
                       Remotion frame renderer
                                  |
                         9:16 / 1:1 / 16:9
```

## Boundaries

The second-generation grammar layer is introduced alongside this template. `src/engine/grammar/` contains separate schemas, spatial resolution and motion records; `src/brands/dr-health/grammar/` registers original family references. `src/renderers/shared/` implements neutral React artwork; `src/renderers/remotion/` adapts frame-driven motion; `src/renderers/static/` provides a standalone gallery and application experiment. See [reference compositions](reference-compositions.md) for the full contract and provenance boundary.

| Location                                          | Responsibility                                                                                     |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `src/engine/themes/types.ts`                      | Portable typed design vocabulary; no React or Remotion                                             |
| `src/brands/dr-health/theme/tokens.ts`            | Source-aligned brand palette, typography, spacing, elevation, images, shapes and timing in seconds |
| `src/engine/assets/registry.ts`                   | Asset identity, provenance, safe paths and requirement filtering; no renderer dependency           |
| `src/engine/schemas/promo.ts`                     | Version 1 content/configuration contract and Zod validation                                        |
| `src/engine/layout/formats.ts`                    | Native format dimensions, safe areas and layout metrics                                            |
| `src/components/`                                 | Context-themed reusable visuals; cards accept resolved assets rather than choosing brand data      |
| `src/engine/motion/` and `src/components/motion/` | Deterministic Remotion adapters                                                                    |
| `src/engine/typography/fonts.ts`                  | Browser/Remotion font-loading boundary                                                             |
| `src/brands/dr-health/`                           | Brand manifest, demo fixture, scenes and composition                                               |

`Root.tsx` registers three native compositions with editable inline snapshots generated from the JSON fixture. This accommodates Remotion's source-based Studio save mechanism without embedding content in scenes. `npm run sync:defaults` explicitly regenerates the snapshots; builds preserve Studio edits. The original unused blank `Composition.tsx` is retained as a starter reference. No second project exists.

## Render boundary

External JSON enters `parseServicePromo()` in `calculateMetadata` and at the composition boundary. Invalid times, duplicate slots, unknown config choices, unsupported contract versions and oversized copy fail before output. The root Zod object also supplies Studio's props controls. Content is JSON rather than embedded practitioner data. Campaign wording lives in `content.copy`; fixed navigation and concept disclaimers belong to the template.

Motion derives from frame, fps and tokens. No timers, CSS keyframes, randomness or live requests participate. Fonts are bundled and rendering waits for them. The first template uses overlapping scene dissolves, persistent brand/footer elements and continuous background movement.

## Shared design language

React web UI can consume token types, values and asset definitions independently. A future Flutter adapter can serialize semantic tokens and map them to Dart types; CSS shadows require explicit translation. Keep Remotion hooks, browser font loading and video layout metrics outside shared packages. No existing application is refactored here.

Future templates should define their own content schemas and reuse proven visuals. Extract a generic VMT namespace only once another real brand establishes shared requirements.

## Documentation sources

Checked through Context7 against official Remotion docs and installed **4.0.527**: [schemas](https://www.remotion.dev/docs/schemas), [input props](https://www.remotion.dev/docs/passing-props), [metadata](https://www.remotion.dev/docs/calculate-metadata), [spring](https://www.remotion.dev/docs/spring), [render CLI](https://www.remotion.dev/docs/cli/render). Existing dependencies were not upgraded. Zod 4.5.4 and renderer 4.0.527 were already installed transitively and are now declared directly for explicit imports.
