# Template system

`DrHealthServicePromo15` receives two independent objects: **content** and **design**. Contract: `src/engine/schemas/promo.ts`. Default JSON: `src/brands/dr-health/data/demo.json`. Replacing data does not require rewriting animation.

## Content

Version 1 contains data mode, practice, doctor, optional portrait ID, service, one to four unique 24-hour `HH:MM` times, an availability label, CTA and campaign copy. Text limits are template constraints, not clinical rules. Zod strips unknown object properties.

Demo mode visibly labels fictional information. `approved` changes the data label only; it does not establish legal, clinical, brand or asset approval. Development-branding and concept-interface notices remain. Booking/confirmation scenes always state that no appointment is booked.

## Working design controls

| Property          | Values                   | Effect                                                         |
| ----------------- | ------------------------ | -------------------------------------------------------------- |
| `layout`          | editorial / hero         | Wide-format order; portrait copy alignment                     |
| `typographyStyle` | editorial / clinical     | Serif / sans display and weight                                |
| `typographyScale` | 0.85–1.10                | Heading size                                                   |
| `motionStyle`     | subtle / smooth          | Eased / restrained spring reveals                              |
| `motionIntensity` | 0–1                      | Translation, scale and parallax amplitude; zero retains fades  |
| `motionSpeed`     | 0.75–1.5                 | Reveal duration and ambient speed; timeline remains 15 seconds |
| `imageScale`      | 0.85–1.15                | Portrait zoom within frame                                     |
| `imageTreatment`  | card / circle            | Portrait clipping and framing                                  |
| `shapeStyle`      | rings / petals           | Background geometry                                            |
| `shapeDensity`    | sparse / balanced / rich | One / three / five accents                                     |
| `visualDepth`     | flat / layered           | Shadows and device rotation                                    |
| `background`      | paper / mint             | Theme-backed background                                        |

All controls have implemented behavior. Pixel checks change each independently. No inactive cutout/full-bleed/device-focus switches are advertised. Presets are constrained and deterministic; no random selection exists.

Examples: `hero.json` coordinates an alternate design, `alternate-content.json` changes only data, `edge-copy.json` exercises longer copy/four slots/upper size bounds, and `missing-portrait.json` demonstrates fallback. Render-test new combinations and languages before expanding contract limits.

## Motion and storyboard

Reusable `FadeIn`, `SlideIn`, `ScaleIn`, `SpringReveal`, `Stagger`, `Parallax`, `MaskReveal` and `TypeReveal` live in `components/motion/primitives.tsx`. Delay/duration use seconds; SlideIn supports direction/distance. Default intensity and spring behavior derive from tokens. TypeReveal reveals words without text reflow.

Timeline: brand 0–2 s, service 2–4 s, doctor 4–7 s, availability 7–10 s, booking concept 10–12 s, value/confirmation 12–14 s, CTA 14–15 s. Ten-frame dissolves overlap scenes within the fixed 450-frame output. The final frame holds the CTA; the footer introduces the same CTA earlier.

## Formats and future Studio

Root registrations: `DrHealthServicePromo15-Vertical` 1080×1920, `-Square` 1080×1080, `-Landscape` 1920×1080, all 30 fps. Format derives from registered dimensions, not mutable content. Portrait stacks; wider layouts reflow with native font sizes and visual dimensions.

Studio's Zod props panel already edits the exact same content/design objects. A future React editor can expose these controls, validate presets and feed a Player/render job. Save versioned configuration separately from publication approval. Pass complete nested content/design objects in CLI JSON: Remotion's top-level prop merge is not a deep patch merge. Examples contain complete props.

Remotion 4.0.527 can save Studio edits only when `defaultProps` is an inline object literal. `Root.tsx` therefore contains editable per-format snapshots, initially generated from the canonical demo JSON. `npm run sync:defaults` explicitly refreshes those snapshots from the fixture and **replaces saved per-format Studio edits**; it is never run automatically by build/start. To render the fixture directly regardless of saved Studio defaults, pass `--props=src/brands/dr-health/data/demo.json`. Preserve useful Studio variations as separate JSON examples before syncing.

No custom visual editor, upload service or rendering queue is built. Future color/font controls should target an approved theme instead of arbitrary scattered constants.
