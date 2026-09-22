# Asset guide

No approved Dr. Health branding was supplied. The wordmark, care motif, palette and typography are development proposals. The original clinician SVG is an abstract labelled placeholder, not a real practitioner. No stock previews, internet portraits or patient data were added.

## Organization and production exports

Use `public/brands/dr-health/` with `logos/`, `people/{doctors,patients,families}/`, `illustrations/`, `backgrounds/`, `devices/`, `icons/`, `shapes/`, `textures/`, `video/` and `audio/{music,sfx,voice}/`. Only directories containing real assets need to exist. Fonts and licenses live in `fonts/`.

| Source/workflow       | Render-ready format                                                                          |
| --------------------- | -------------------------------------------------------------------------------------------- |
| Illustrator `.ai`     | SVG for vector paths; PNG/WebP for raster effects                                            |
| Photoshop `.psd`      | PNG/WebP with alpha for cutouts; JPEG/WebP for opaque photography                            |
| After Effects `.aep`  | MP4 for opaque footage; tested WebM/ProRes MOV for alpha                                     |
| Blender               | Transparent PNG stills/layers or tested video exports                                        |
| SVG                   | Self-contained paths/shapes and viewBox; outline logo text; no scripts or external resources |
| PNG / WebP            | Alpha for cutouts; enough resolution for the largest output at 1.15× image scale             |
| JPEG                  | Opaque photos/backgrounds; no transparency                                                   |
| MP4 / WebM / MOV      | Accepted video containers; codec/alpha support still requires render testing                 |
| MP3 / WAV / M4A / OGG | Licensed music, effects and voice                                                            |

Authoring formats cannot be rendered directly. The registry rejects `.ai`, `.psd`, `.aep`, remote URLs and traversal paths. An extension is not a codec or security guarantee: sanitize/review SVG and test new media before use.

## Manifest and rights

Register assets in `src/brands/dr-health/assets/manifest.ts`. Sources are relative to `public/`, without a leading slash, and resolve through `staticFile()` in the renderer. IDs/filenames use descriptive lowercase kebab case; preserve IDs across routine export updates. Use versioned filenames for materially changed licensed exports.

`CreativeAsset` records ID, brand, type, source, tags, alt text, placeholder/approved status, creator, license, source reference, and optional orientation, alpha, facing, composition and brightness. Track stock purchase records, generated-art source history, permitted uses and releases in rights records. Sensitive consent evidence belongs outside public assets.

- `get(id)` requires a known asset and fails clearly otherwise.
- `optional(id, type)` safely resolves optional content and rejects media-type mismatch.
- `byType(type)` and `byTags(tags)` filter by type or **all** supplied tags.
- `select({ brand, type, tags, transparent, approvedOnly })` intersects template requirements in stable manifest order.

To add an approved doctor portrait, export it into `people/doctors/`, add provenance and `status: "approved"`, then set `content.doctor.imageAssetId`. `PersonCutout` contains transparent art, covers with opaque photos, supports card/circle framing and displays a fallback for an absent ID or failed load. Tests catch absent manifested files; do not use fallback rendering to bypass asset validation.

For layered illustrations, export named transparent layers at one shared artboard size, register each layer and animate them in a template-specific component. Preserve coordinates across exports; keep editable source files outside the render manifest.

## Fonts and audio

Manrope and DM Serif Display are bundled from the official [Google Fonts repository](https://github.com/google/fonts) with SIL Open Font License files. See `public/brands/dr-health/fonts/README.md` for source URLs and SHA-256 hashes. No external font fetch occurs during rendering. These remain temporary type choices.

Current videos are silent: no music, sound effects or voice assets were supplied. The registry supports audio/video metadata, but this template does not expose inactive playback switches. Add playback only with real licensed media and an editorial requirement.
