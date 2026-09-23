import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { format } from "prettier";
// Explicit authoring command. Never run automatically during builds.
const { content } = JSON.parse(
  fs.readFileSync("src/brands/dr-health/data/demo.json", "utf8"),
);
const families = ["editorial-health", "minimal-clinical", "technology-health"];
const formats = [
  ["Vertical", 1080, 1920],
  ["Square", 1080, 1080],
  ["Landscape", 1920, 1080],
];
const registrations = families
  .map(
    (familyId) =>
      `<Folder name="${familyId}">${["split", "portrait-first"]
        .flatMap((layoutVariant) =>
          ["subtle", "premium"].flatMap((motionId) =>
            formats.map(([format, width, height]) => {
              const props = {
                schemaVersion: 1,
                familyId,
                variation: {
                  layoutVariant,
                  typographyScale: 1,
                  imageScale: 1,
                  whitespace: 0.5,
                  shapeDensity: 0.5,
                  depth: 0.5,
                  expressiveness: 0.5,
                },
                axes: {
                  expressive: 0.5,
                  friendly: 0.5,
                  dimensional: 0.5,
                  spacious: 0.5,
                  dynamic: 0.5,
                },
                motionId,
                content,
              };
              return `<Composition id="Grammar-${familyId}-${layoutVariant}-${motionId}-${format}" component={GrammarPromo} width={${width}} height={${height}} fps={30} durationInFrames={180} schema={grammarPromoSchema} calculateMetadata={calculateGrammarMetadata} defaultProps={${JSON.stringify(props, null, 2)}} />`;
            }),
          ),
        )
        .join("\n")}</Folder>`,
  )
  .join("\n");
export async function updateGrammarRegistrations(root) {
  const start = "    {/* Grammar examples start: explicit sync only */}";
  const end = "    {/* Grammar examples end */}";
  const formatted = (
    await format(`<Folder name="Design-Grammar">${registrations}</Folder>`, {
      parser: "typescript",
    })
  )
    .trim()
    .replace(/;$/, "");
  const section = `${start}\n${formatted
    .split("\n")
    .map((line) => "    " + line)
    .join("\n")}\n${end}`;
  root = root.replace(
    'import { Composition } from "remotion";',
    'import { Composition, Folder } from "remotion";',
  );
  root = root.replace(
    'import { GrammarRegistrations } from "./renderers/remotion/GrammarRegistrations";',
    'import { GrammarPromo, calculateGrammarMetadata } from "./renderers/remotion/GrammarPromo";\nimport { grammarPromoSchema } from "./engine/grammar/models";',
  );
  if (root.includes(start)) {
    const first = root.indexOf(start);
    const last = root.indexOf(end, first);
    if (last < 0) throw new Error("Grammar section end marker missing");
    return root.slice(0, first) + section + root.slice(last + end.length);
  }
  if (!root.includes("    <GrammarRegistrations />"))
    throw new Error("Grammar placeholder missing");
  return root.replace("    <GrammarRegistrations />", section);
}
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  fs.writeFileSync(
    "src/Root.tsx",
    await updateGrammarRegistrations(fs.readFileSync("src/Root.tsx", "utf8")),
  );
  console.log("Wrote 36 inline grammar examples; legacy defaults preserved.");
}
