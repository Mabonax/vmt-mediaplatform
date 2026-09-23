import {
  familySchema,
  type CompositionFamily,
  type DesignDNA,
  type FamilyId,
} from "../../../engine/grammar/models";

const dna: DesignDNA = {
  palette: {
    background: "white",
    surface: "white",
    foreground: "ink",
    primaryAccent: "primary",
    secondaryAccent: "accent",
    muted: "muted",
    contrast: "calm",
  },
  typography: {
    display: "serif",
    body: "sans",
    scale: 1.06,
    displayWeight: 400,
    bodyWeight: 400,
    tracking: -0.035,
    casing: "uppercase-labels",
    lineHeight: 1.06,
    relationship: "contrast",
  },
  layout: {
    grid: "editorial",
    contentWidth: 1,
    alignment: "left",
    asymmetry: 0.6,
    whitespace: 0.7,
    density: 0.3,
    overlap: 0,
    edge: "inset",
  },
  hierarchy: {
    headline: 1,
    imagery: 0.85,
    supporting: 0.45,
    cta: 0.7,
    decoration: 0.2,
    metadata: 0.25,
  },
  imagery: {
    placement: "right",
    scale: 0.9,
    crop: "contain",
    treatment: "arch",
    masking: "rounded",
    relationship: "foreground",
    facing: "center",
  },
  shapes: {
    language: "rings",
    density: 0.6,
    scale: 1.1,
    repetition: 3,
    tendency: "behind-subject",
    stroke: 2,
    fill: "none",
  },
  surfaces: {
    treatment: "layered",
    radius: 28,
    border: 1,
    shadow: 0.5,
    button: "pill",
    panels: "open",
  },
  character: {
    expressive: 0.65,
    friendly: 0.8,
    dimensional: 0.55,
    spacious: 0.7,
    dynamic: 0.5,
  },
};
function makeFamily(
  id: FamilyId,
  name: string,
  designDNA: DesignDNA,
): CompositionFamily {
  return familySchema.parse({
    id,
    reference: {
      id: `${id}-original-01`,
      name,
      source: {
        type: "react",
        path: "src/renderers/shared/GrammarArtwork.tsx",
        provenance:
          "Manually encoded original composition for this project. Supplied DrHealth PNG marks retain their source provenance.",
        license:
          "Project-authored layout; supplied trademarks used at the user's direction. No third-party reference artwork.",
      },
      family: id,
      notes: [
        "White canvas; original unmodified logo.",
        "Fictional clinician and illustrative availability.",
        "Design choices are manually authored, not inferred by AI.",
      ],
      designDNA,
    },
    grammar: {
      id: `${id}-v1`,
      family: id,
      elements: {
        headline: {
          preferredZone: "left",
          maxWidth: 1,
          priority: 1,
          anchor: "flow",
          overlapAllowed: false,
        },
        subject: {
          preferredZone: designDNA.imagery.placement,
          maxWidth: 1,
          priority: 2,
          anchor: "flow",
          overlapAllowed: false,
        },
        body: {
          preferredZone: "left",
          maxWidth: 0.98,
          priority: 3,
          follows: "headline",
          anchor: "flow",
          overlapAllowed: false,
        },
        cta: {
          preferredZone: "bottom",
          maxWidth: 1,
          priority: 4,
          follows: "body",
          anchor: "bottom-left",
          overlapAllowed: false,
        },
        metadata: {
          preferredZone: "bottom",
          maxWidth: 1,
          priority: 5,
          follows: "subject",
          anchor: "flow",
          overlapAllowed: false,
        },
      },
      variants: ["split", "portrait-first", "stacked"],
      primaryShape: {
        relationship: "behind-subject",
        scaleRelativeToSubject: designDNA.shapes.scale,
        avoidHeadlineCollision: true,
      },
      responsive: {
        vertical: "stack",
        square: "adaptive",
        landscape: "columns",
      },
      assetRequirements: {
        role: "doctor",
        type: "person",
        transparent: true,
        facing: "inward",
        fallback: "initials",
      },
    },
    compatibleMotion: ["subtle", "premium"],
    renderers: {
      static: true,
      remotion: true,
      application: id === "minimal-clinical",
    },
  });
}
export const compositionFamilies: readonly CompositionFamily[] = [
  makeFamily("editorial-health", "Editorial health", dna),
  makeFamily("minimal-clinical", "Minimal clinical", {
    ...dna,
    typography: {
      ...dna.typography,
      display: "sans",
      scale: 0.94,
      displayWeight: 700,
      tracking: -0.04,
      relationship: "uniform",
      lineHeight: 1.12,
    },
    layout: {
      ...dna.layout,
      grid: "modular",
      asymmetry: 0.15,
      whitespace: 0.85,
      edge: "ruled",
    },
    imagery: { ...dna.imagery, treatment: "card", scale: 0.8 },
    shapes: { ...dna.shapes, language: "rules", density: 0.2, repetition: 1 },
    surfaces: {
      ...dna.surfaces,
      treatment: "flat",
      radius: 12,
      shadow: 0,
      button: "rounded",
      panels: "outlined",
    },
    character: {
      expressive: 0.2,
      friendly: 0.5,
      dimensional: 0.1,
      spacious: 0.8,
      dynamic: 0.2,
    },
  }),
  makeFamily("technology-health", "Technology health", {
    ...dna,
    palette: { ...dna.palette, contrast: "crisp" },
    typography: {
      ...dna.typography,
      display: "sans",
      scale: 1,
      displayWeight: 700,
      tracking: -0.045,
      relationship: "uniform",
      lineHeight: 1.04,
    },
    layout: {
      ...dna.layout,
      grid: "technical",
      contentWidth: 0.97,
      asymmetry: 0.4,
      edge: "ruled",
    },
    imagery: {
      ...dna.imagery,
      treatment: "technical",
      masking: "square",
      scale: 0.87,
    },
    shapes: {
      ...dna.shapes,
      language: "grid",
      density: 0.8,
      repetition: 4,
      stroke: 1,
    },
    surfaces: {
      ...dna.surfaces,
      radius: 4,
      border: 2,
      treatment: "solid",
      shadow: 0.25,
      button: "square",
      panels: "outlined",
    },
    character: {
      expressive: 0.7,
      friendly: 0.3,
      dimensional: 0.45,
      spacious: 0.5,
      dynamic: 0.8,
    },
  }),
];

export function createFamilyRegistry(entries: readonly CompositionFamily[]) {
  const parsed = entries.map((entry) => familySchema.parse(entry));
  const records = new Map<FamilyId, CompositionFamily>();
  for (const family of parsed) {
    if (records.has(family.id))
      throw new Error(`Duplicate family: ${family.id}`);
    if (
      family.reference.family !== family.id ||
      family.grammar.family !== family.id
    )
      throw new Error("Family ownership mismatch");
    if (
      new Set(family.grammar.variants).size !== family.grammar.variants.length
    )
      throw new Error("Duplicate layout variant");
    // This renderer supports a flow graph with explicit collision-free partitions.
    const e = family.grammar.elements;
    if (
      e.body.follows !== "headline" ||
      e.cta.follows !== "body" ||
      e.metadata.follows !== "subject" ||
      Object.values(e).some((rule) => rule.overlapAllowed)
    )
      throw new Error("Unsupported or cyclic spatial relationships");
    records.set(family.id, family);
  }
  return {
    all: parsed,
    get(id: FamilyId) {
      const family = records.get(id);
      if (!family) throw new Error(`Unknown family: ${id}`);
      return family;
    },
  };
}
export const familyRegistry = createFamilyRegistry(compositionFamilies);
