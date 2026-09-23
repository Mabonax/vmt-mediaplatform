# Reference compositions

This layer sits beside the first-generation `DrHealthServicePromo15`. Baseline inspection confirmed commits `431f664` and `ee36bf3`, Remotion 4.0.527 and React 19.2.3. Two pre-existing Studio edits were present in Root and DrHealthServicePromo15; they are preserved separately from this change. The clinic and Flutter repositories are read-only reference sources.

`src/engine/grammar/models.ts` defines strict Zod records for references, DesignDNA, composition grammar, variations, axes, motion and family registration. `src/brands/dr-health/grammar/families.ts` registers three original references. The reference record holds source type, source path, required provenance/license, family, notes and DNA. Missing licensing text or unsupported fields fail parsing. Provenance records are evidence, not a legal rights verifier.

| Family | Encoded language |
| --- | --- |
| editorial-health | Serif headline, generous spacing, arch portrait and rings |
| minimal-clinical | Sans headline, restrained rules, flat outlined cards |
| technology-health | Tight sans hierarchy, technical grid, squared panels |

All compositions use a white canvas, white surfaces, the original supplied DrHealth PNG logos and the same demo content. Layout artwork is authored within this project, not copied from stock references. PNG source hashes and licensing remain in `public/brands/dr-health/logos/provenance.json`. The source PNGs are unchanged; the renderer only windows their transparent margins. No logo is traced, recolored, stretched or mirrored. Fonts retain their OFL notices.

## Future ingestion

1. Record the source, creator, license evidence, permitted outputs and acquisition reference. Do not assume that access to a stock download confers template redistribution rights.
2. Preserve the source as an authoring reference. Export renderable SVG/PNG/WebP assets; the existing registry excludes AI/PSD/AEP authoring formats and arbitrary remote URLs.
3. Have a designer encode DNA, element relationships, asset requirements, supported layouts and compatible motion. Record intentional departures from the reference.
4. Validate schemas, render the common content matrix, inspect long/missing/alternate assets and review rights before approval.

Source types cover image, SVG, Illustrator export, Figma export, React, Remotion and other. This implementation does not ingest or analyze arbitrary files. It has no AI vision service, external downloads or speculative design extraction. A future AI adapter may propose a schema-valid candidate with source citations; human review must approve rights and visual relationships before registration. Multi-reference synthesis should retain every source record and document conflict resolution instead of flattening provenance into a single ownership claim.

Start locally with `npm.cmd run gallery` (127.0.0.1:3101), or `npm.cmd run studio` and open the Design-Grammar folder.
