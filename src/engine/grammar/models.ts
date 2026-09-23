import { z } from "zod";
import { promoContentSchema } from "../schemas/promo";

const unit = z.number().min(0).max(1);
const id = z.string().regex(/^[a-z][a-z0-9-]*$/);
const label = z.string().trim().min(1);
export const familyIdSchema = z.enum([
  "editorial-health",
  "minimal-clinical",
  "technology-health",
]);
export const layoutVariantSchema = z.enum([
  "split",
  "portrait-first",
  "stacked",
]);
export const motionIdSchema = z.enum(["subtle", "premium"]);
export const designAxesSchema = z
  .object({
    expressive: unit,
    friendly: unit,
    dimensional: unit,
    spacious: unit,
    dynamic: unit,
  })
  .strict();
export type DesignAxes = z.infer<typeof designAxesSchema>;

export const designDNASchema = z
  .object({
    palette: z
      .object({
        background: z.literal("white"),
        surface: z.literal("white"),
        foreground: z.literal("ink"),
        primaryAccent: z.literal("primary"),
        secondaryAccent: z.literal("accent"),
        muted: z.literal("muted"),
        contrast: z.enum(["calm", "crisp"]),
      })
      .strict(),
    typography: z
      .object({
        display: z.enum(["serif", "sans"]),
        body: z.literal("sans"),
        scale: z.number().min(0.8).max(1.2),
        displayWeight: z.union([z.literal(400), z.literal(700)]),
        bodyWeight: z.literal(400),
        tracking: z.number().min(-0.06).max(0.1),
        casing: z.enum(["sentence", "uppercase-labels"]),
        lineHeight: z.number().min(1).max(1.3),
        relationship: z.enum(["contrast", "uniform"]),
      })
      .strict(),
    layout: z
      .object({
        grid: z.enum(["editorial", "modular", "technical"]),
        contentWidth: z.number().min(0.8).max(1),
        alignment: z.enum(["left", "center"]),
        asymmetry: unit,
        whitespace: unit,
        density: unit,
        overlap: unit,
        edge: z.enum(["inset", "ruled"]),
      })
      .strict(),
    hierarchy: z
      .object({
        headline: unit,
        imagery: unit,
        supporting: unit,
        cta: unit,
        decoration: unit,
        metadata: unit,
      })
      .strict(),
    imagery: z
      .object({
        placement: z.enum(["right", "left", "center"]),
        scale: z.number().min(0.5).max(1),
        crop: z.literal("contain"),
        treatment: z.enum(["arch", "card", "technical"]),
        masking: z.enum(["rounded", "square"]),
        relationship: z.literal("foreground"),
        facing: z.enum(["left", "right", "center"]),
      })
      .strict(),
    shapes: z
      .object({
        language: z.enum(["rings", "rules", "grid"]),
        density: unit,
        scale: z.number().min(0.5).max(1.5),
        repetition: z.number().int().min(1).max(5),
        tendency: z.literal("behind-subject"),
        stroke: z.number().min(1).max(4),
        fill: z.literal("none"),
      })
      .strict(),
    surfaces: z
      .object({
        treatment: z.enum(["flat", "solid", "layered"]),
        radius: z.number().min(0).max(48),
        border: z.number().min(1).max(3),
        shadow: unit,
        button: z.enum(["pill", "rounded", "square"]),
        panels: z.enum(["open", "outlined"]),
      })
      .strict(),
    character: designAxesSchema,
  })
  .strict();
export type DesignDNA = z.infer<typeof designDNASchema>;

export const referenceCompositionSchema = z
  .object({
    id,
    name: label,
    source: z
      .object({
        type: z.enum([
          "image",
          "svg",
          "illustrator-export",
          "figma-export",
          "react",
          "remotion",
          "other",
        ]),
        path: label.optional(),
        provenance: label,
        license: label,
      })
      .strict(),
    family: familyIdSchema,
    notes: z.array(label),
    designDNA: designDNASchema,
  })
  .strict();
export type ReferenceComposition = z.infer<typeof referenceCompositionSchema>;
const zone = z.enum(["left", "right", "top", "bottom", "center"]);
export const elementRoles = [
  "headline",
  "subject",
  "body",
  "cta",
  "metadata",
] as const;
export type ElementRole = (typeof elementRoles)[number];
const role = z.enum(elementRoles);
const rule = z
  .object({
    preferredZone: zone,
    maxWidth: unit,
    priority: z.number().int().min(1).max(5),
    follows: role.optional(),
    anchor: z.enum(["flow", "bottom-left", "bottom-center"]),
    overlapAllowed: z.boolean(),
  })
  .strict();
export const compositionGrammarSchema = z
  .object({
    id,
    family: familyIdSchema,
    elements: z
      .object({
        headline: rule,
        subject: rule,
        body: rule,
        cta: rule,
        metadata: rule,
      })
      .strict(),
    variants: z.array(layoutVariantSchema).min(2).max(3),
    primaryShape: z
      .object({
        relationship: z.literal("behind-subject"),
        scaleRelativeToSubject: z.number().min(0.5).max(1.5),
        avoidHeadlineCollision: z.literal(true),
      })
      .strict(),
    responsive: z
      .object({
        vertical: z.literal("stack"),
        square: z.literal("adaptive"),
        landscape: z.literal("columns"),
      })
      .strict(),
    assetRequirements: z
      .object({
        role: z.literal("doctor"),
        type: z.literal("person"),
        transparent: z.boolean(),
        facing: z.enum(["inward", "any"]),
        fallback: z.literal("initials"),
      })
      .strict(),
  })
  .strict();
export type CompositionGrammar = z.infer<typeof compositionGrammarSchema>;
export const variationSchema = z
  .object({
    layoutVariant: layoutVariantSchema,
    typographyScale: z.number().min(0.85).max(1.1),
    imageScale: z.number().min(0.85).max(1.15),
    whitespace: unit,
    shapeDensity: unit,
    depth: unit,
    expressiveness: unit,
  })
  .strict();
export const motionGrammarSchema = z
  .object({
    id: motionIdSchema,
    name: label,
    entrance: z.enum(["fade-slide", "spring-scale"]),
    exit: z.literal("fade"),
    duration: z.number().min(0.2).max(2),
    stagger: z.number().min(0).max(0.3),
    travel: z.number().min(0).max(70),
    parallax: z.number().min(0).max(20),
    spring: z
      .object({
        damping: z.number().positive(),
        stiffness: z.number().positive(),
        mass: z.number().positive(),
        overshootClamping: z.literal(true),
      })
      .strict(),
    order: z
      .array(role)
      .length(5)
      .refine(
        (roles) => new Set(roles).size === 5,
        "Each semantic role must appear exactly once",
      ),
  })
  .strict();
export type MotionGrammar = z.infer<typeof motionGrammarSchema>;
export const grammarPromoSchema = z
  .object({
    schemaVersion: z.literal(1),
    familyId: familyIdSchema,
    variation: variationSchema,
    axes: designAxesSchema,
    motionId: motionIdSchema,
    content: promoContentSchema,
  })
  .strict();
export type GrammarPromoProps = z.infer<typeof grammarPromoSchema>;
export type FamilyId = z.infer<typeof familyIdSchema>;
export const familySchema = z
  .object({
    id: familyIdSchema,
    reference: referenceCompositionSchema,
    grammar: compositionGrammarSchema,
    compatibleMotion: z
      .array(motionIdSchema)
      .min(2)
      .refine(
        (ids) => new Set(ids).size === ids.length,
        "Motion styles must be unique",
      ),
    renderers: z
      .object({
        static: z.literal(true),
        remotion: z.literal(true),
        application: z.boolean(),
      })
      .strict(),
  })
  .strict();
export type CompositionFamily = z.infer<typeof familySchema>;
