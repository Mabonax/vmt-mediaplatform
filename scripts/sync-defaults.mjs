import fs from "node:fs";
import { updateGrammarRegistrations } from "./sync-grammar-examples.mjs";

// An explicit authoring command, never a prebuild hook: preserve Studio edits.
// Remotion 4.0.527 can save only inline object-literal defaultProps.
const props = JSON.parse(
  fs.readFileSync("src/brands/dr-health/data/demo.json", "utf8"),
);
const formats = [
  ["Vertical", 1080, 1920],
  ["Square", 1080, 1080],
  ["Landscape", 1920, 1080],
];
const registrations = formats
  .map(
    ([name, width, height]) => `      <Composition
        id="DrHealthServicePromo15-${name}"
        component={DrHealthServicePromo15}
        durationInFrames={450}
        fps={30}
        width={${width}}
        height={${height}}
        schema={servicePromoSchema}
        defaultProps={${JSON.stringify(props, null, 2)}}
        calculateMetadata={calculatePromoMetadata}
      />`,
  )
  .join("\n");
fs.writeFileSync(
  "src/Root.tsx",
  await updateGrammarRegistrations(`// Initial snapshots generated from data/demo.json by npm run sync:defaults.
// Studio can save per-format edits here. Sync is explicit because it replaces those edits.
import "./index.css";
import { Composition } from "remotion";
import { GrammarRegistrations } from "./renderers/remotion/GrammarRegistrations";
import { DrHealthServicePromo15, calculatePromoMetadata } from "./brands/dr-health/compositions/DrHealthServicePromo15";
import { servicePromoSchema } from "./engine/schemas/promo";

export const RemotionRoot = () => (
  <>
${registrations}
    <GrammarRegistrations />
  </>
);
`),
);
console.log(
  "Updated inline Studio defaults for all three formats from demo.json.",
);
