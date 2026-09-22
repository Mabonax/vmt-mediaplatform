# Supplied DrHealth branding — 22 September 2026

Source: `C:\xampp\htdocs\gperp-clinic\public\branding\png`, explicitly selected by the user. Source files and the clinic application were read only. The six PNG files are copied into `public/brands/dr-health/logos/` without changing their bytes. `glass- icon.png` is named `glass-icon.png` locally for a safe public path; its image bytes remain identical. Original dimensions and SHA-256 hashes are recorded in that folder's `provenance.json`.

## Usage

| Source                 | Use                                                  |
| ---------------------- | ---------------------------------------------------- |
| `logo.png`             | Header and device wordmark                           |
| `app-icon.png`         | Brand reveal and service card icon                   |
| `drhealth.png`         | End-card DrHealth / powered by Gperp lockup          |
| `logo-icon.png`        | Registered square icon for future templates          |
| `glass- icon.png`      | Registered glass icon for future templates           |
| `powered-by-gperp.png` | Registered separate endorsement for future templates |

PNG exports contain transparent artboard margins. Measured alpha bounds are stored in the asset manifest. `AssetArtwork` uses a proportional CSS presentation window to display the actual artwork while retaining the original source file. There is no raster cropping, redrawing, stretching, recolouring or AI regeneration of the logos. Black-text wordmarks sit on a white plate on dark backgrounds, preserving their original colours and contrast.

## Palette

| Role                     | Value                 | Basis                                                          |
| ------------------------ | --------------------- | -------------------------------------------------------------- |
| Primary teal             | `#005B6C`             | Exact recurring opaque colour in the wordmarks and square icon |
| Accent green             | `#10BA31`             | Exact opaque colour in the wordmarks and square icon           |
| Logo black / white       | `#000000` / `#FFFFFF` | Existing logo lettering                                        |
| Body ink / end-card dark | `#003F4B` / `#00252C` | Supporting dark teal choices                                   |
| Paper / soft background  | `#F5FAFA` / `#E0F1EF` | Supporting light teal choices                                  |
| Muted copy / border      | `#47666B` / `#C2DDDE` | Supporting contrast and separation choices                     |

The source gradient remains in the original logos. Theme shadows, CTA, cards, backgrounds, progress indicators and the original demo clinician illustration follow the supplied palette. The theme is marked `source-aligned`: user-supplied logos and sampled primary colours are distinguished from derived tints, selected fonts and motion styling. Brand-use authorization here does not invent a broader third-party license.

The existing fictional doctor/practice data and concept-booking labels remain. The footer now says `DEMO CAMPAIGN`, since the artwork is supplied branding rather than a proposed logo.

## Change boundary

The existing Studio edits in `src/Root.tsx` and the composition's styling were preserved. Default snapshots were not regenerated. The branding commit includes only the footer-label change in the previously dirty composition file; unrelated local edits remain unstaged.

## Verification

All six copied PNGs were byte-compared with the originals. Strict TypeScript, ESLint, nine contract tests and the production bundle passed. The visual suite passed 87 storyboard/example captures, all 12 independent control comparisons and the exact flat-preset repeat-frame check, with zero unexpected browser console errors. The documented Remotion negative-input cleanup warning remains unchanged.

Updated logo placement and colour treatments were visually inspected in portrait, square and landscape captures, including the dark end card. All three 15-second MP4s were regenerated and decoded successfully; metadata confirms native dimensions, 30 fps and 450 frames. Source logos and the clinic application were not modified.
