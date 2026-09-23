import {
  grammarPromoSchema,
  type GrammarPromoProps,
  type CompositionFamily,
} from "./models";
import { familyRegistry } from "../../brands/dr-health/grammar/families";
import { assetRegistry } from "../../brands/dr-health/assets/manifest";
import { drHealthTheme } from "../../brands/dr-health/theme/tokens";
import type { CreativeAsset } from "../assets/registry";
import { motionGrammars } from "./motion";

export type GrammarFormat = "vertical" | "square" | "landscape";
const mix = (a: number, b: number) => (a + b) / 2;
export function resolveSubject(
  asset: CreativeAsset | undefined,
  family: CompositionFamily,
  side: "left" | "right" | "center",
  approvedOnly = false,
) {
  const req = family.grammar.assetRequirements;
  if (
    !asset ||
    asset.brand !== "dr-health" ||
    asset.type !== req.type ||
    (approvedOnly && asset.status !== "approved")
  )
    return {
      asset: undefined,
      treatment: "initials" as const,
      reason: "No compatible portrait supplied",
    };
  if (req.transparent && !asset.properties?.transparent)
    return {
      asset,
      treatment: "framed" as const,
      reason: "Opaque portrait contained in a frame",
    };
  const facing = asset.properties?.facing;
  if (
    req.facing === "inward" &&
    facing &&
    facing !== "center" &&
    side !== "center" &&
    facing === side
  )
    return {
      asset,
      treatment: "framed" as const,
      reason: "Outward-facing portrait contained without mirroring",
    };
  if (asset.properties?.orientation === "landscape")
    return {
      asset,
      treatment: "framed" as const,
      reason: "Landscape portrait contained without cropping",
    };
  return { asset, treatment: "cutout" as const, reason: undefined };
}
export function parseGrammarPromo(input: unknown): GrammarPromoProps {
  const props = grammarPromoSchema.parse(input);
  const family = familyRegistry.get(props.familyId);
  if (!family.grammar.variants.includes(props.variation.layoutVariant))
    throw new Error("Layout incompatible with family");
  if (!family.compatibleMotion.includes(props.motionId))
    throw new Error("Motion incompatible with family");
  if (
    new Set(props.content.availability).size !==
    props.content.availability.length
  )
    throw new Error("Availability must contain unique times");
  return props;
}
export function resolveComposition(input: unknown, format: GrammarFormat) {
  const props = parseGrammarPromo(input);
  const family = familyRegistry.get(props.familyId);
  const dna = family.reference.designDNA;
  const axes = Object.fromEntries(
    Object.entries(props.axes).map(([key, value]) => [
      key,
      mix(value, dna.character[key as keyof typeof props.axes]),
    ]),
  ) as typeof props.axes;
  const v = props.variation;
  const expressive = mix(axes.expressive, v.expressiveness);
  const spacious = mix(axes.spacious, v.whitespace);
  const dimensional = mix(axes.dimensional, v.depth);
  const stacked =
    format === "vertical" ||
    (v.layoutVariant === "stacked" && format !== "landscape");
  const subjectFirst = v.layoutVariant === "portrait-first";
  const side = stacked
    ? "center"
    : subjectFirst
      ? "left"
      : family.grammar.elements.subject.preferredZone === "left"
        ? "left"
        : "right";
  const subject = resolveSubject(
    assetRegistry.optional(props.content.doctor.imageAssetId),
    family,
    side,
    props.content.dataMode === "approved",
  );
  const long =
    props.content.copy.brandHeadline.length > 38 ||
    props.content.service.name.length > 32;
  return {
    props,
    family,
    dna,
    axes,
    format,
    stacked,
    subjectFirst,
    side,
    subject,
    tokens: drHealthTheme,
    motion: motionGrammars[props.motionId],
    style: {
      background: drHealthTheme.colors.white,
      headingFamily:
        dna.typography.display === "serif"
          ? drHealthTheme.typography.display
          : drHealthTheme.typography.body,
      headingSize:
        (format === "landscape" ? 3.75 : stacked ? 6.7 : 5.6) *
        dna.typography.scale *
        v.typographyScale *
        (0.94 + expressive * 0.12) *
        (long ? 0.84 : 1),
      headingWeight: dna.typography.displayWeight,
      tracking: dna.typography.tracking + axes.friendly * 0.012,
      lineHeight: dna.typography.lineHeight + axes.friendly * 0.025,
      padding: (format === "landscape" ? 3 : 4) + spacious * 1.3,
      gap: (format === "landscape" ? 1.4 : 2.3) + spacious * 1.6,
      radius: dna.surfaces.radius + axes.friendly * 12,
      buttonRadius:
        dna.surfaces.button === "pill"
          ? 999
          : dna.surfaces.radius + axes.friendly * 8,
      shadow:
        dna.surfaces.treatment === "flat"
          ? "none"
          : `0 ${6 + dimensional * 14}px ${15 + dimensional * 22}px #005b6c${Math.round(
              6 + dimensional * 16,
            )
              .toString(16)
              .padStart(2, "0")}`,
      border: dna.surfaces.border + dimensional * 0.5,
      imageScale: dna.imagery.scale * v.imageScale * (0.97 + expressive * 0.06),
      shapeCount: Math.round(
        (mix(v.shapeDensity, dna.shapes.density) + expressive * 0.3) *
          dna.shapes.repetition,
      ),
      shapeOpacity: 0.1 + expressive * 0.15,
      shapeRotation: axes.dynamic * (dna.shapes.language === "rings" ? 12 : 3),
      ctaWeight: Math.round(550 + expressive * 150),
      columns: `${1 + dna.layout.asymmetry * 0.12}fr 1fr`,
    },
  };
}
export type ResolvedComposition = ReturnType<typeof resolveComposition>;
