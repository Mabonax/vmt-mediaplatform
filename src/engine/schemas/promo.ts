import { z } from "zod";
import { zColor, zTextarea } from "@remotion/zod-types";

const copy = (max: number) => z.string().trim().min(1).max(max);
const paragraph = (max: number) => zTextarea().trim().min(1).max(max);
const assetId = z
  .string()
  .regex(/^[a-z0-9][a-z0-9-]*$/)
  .max(80);
export const promoContentSchema = z.object({
  schemaVersion: z.literal(1),
  dataMode: z.enum(["demo", "approved"]),
  practice: z.object({ name: copy(48) }),
  doctor: z.object({
    name: copy(44),
    speciality: copy(44),
    imageAssetId: assetId.optional(),
  }),
  service: z.object({ name: copy(40), description: paragraph(90) }),
  availability: z
    .array(
      z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use a 24-hour HH:MM time"),
    )
    .min(1)
    .max(4),
  availabilityLabel: copy(42),
  cta: z.object({
    title: copy(40),
    subtitle: copy(70),
    destinationLabel: copy(42),
  }),
  copy: z.object({
    brandHeadline: copy(54),
    brandSupporting: paragraph(85),
    serviceQuestion: copy(54),
    doctorHeadline: copy(54),
    availabilityHeadline: copy(54),
    bookingHeadline: copy(54),
    bookingSupporting: paragraph(80),
    confirmationHeadline: copy(54),
    confirmationSupporting: paragraph(85),
    bookingAction: copy(28),
    confirmationLabel: copy(28),
  }),
});

export const designConfigSchema = z.object({
  logoVariant: z
    .enum(["wordmark", "powered-by-gperp"])
    .describe("Logo: DrHealth wordmark or DrHealth powered by Gperp"),
  logoPosition: z
    .enum(["left", "center", "right"])
    .describe("Logo position in the top header"),
  logoScale: z.number().min(0.6).max(1.4).describe("Logo size"),
  headingFont: z.enum(["Montserrat", "Poppins"]).describe("Heading font"),
  bodyFont: z.enum(["Poppins", "Montserrat"]).describe("Body font"),
  backgroundColor: zColor(),
  textColor: zColor(),
  primaryColor: zColor(),
  accentColor: zColor(),
  contentPosition: z
    .enum(["top", "center", "bottom"])
    .describe("Vertical position of scene content"),
  textAlign: z
    .enum(["left", "center", "right"])
    .describe("Text alignment"),
  contentOffsetX: z
    .number()
    .min(-180)
    .max(180)
    .describe("Move scene content left or right in pixels"),
  contentOffsetY: z
    .number()
    .min(-180)
    .max(180)
    .describe("Move scene content up or down in pixels"),
  layout: z.enum(["editorial", "hero"]).describe("Copy and image order"),
  typographyStyle: z
    .enum(["editorial", "clinical"])
    .describe("Heading weight: editorial is lighter, clinical is stronger"),
  typographyScale: z.number().min(0.85).max(1.1).describe("Text scale"),
  motionStyle: z.enum(["subtle", "smooth"]).describe("Animation style"),
  motionIntensity: z.number().min(0).max(1).describe("Animation intensity"),
  motionSpeed: z.number().min(0.75).max(1.5).describe("Animation speed"),
  imageScale: z.number().min(0.85).max(1.15).describe("Image scale"),
  imageTreatment: z.enum(["card", "circle"]).describe("Portrait treatment"),
  shapeStyle: z.enum(["rings", "petals"]).describe("Background shape style"),
  shapeDensity: z
    .enum(["sparse", "balanced", "rich"])
    .describe("Number of background shapes"),
  visualDepth: z.enum(["flat", "layered"]).describe("Card shadow depth"),
  background: z
    .enum(["paper", "mint"])
    .describe("Decorative line colour: teal or green"),
});

export const servicePromoSchema = z.object({
  content: promoContentSchema,
  design: designConfigSchema,
});
export type PromoContent = z.infer<typeof promoContentSchema>;
export type DesignConfig = z.infer<typeof designConfigSchema>;
export type ServicePromoProps = z.infer<typeof servicePromoSchema>;

/** Used in calculateMetadata AND the component: invalid external JSON fails before rendering. */
export const parseServicePromo = (input: unknown): ServicePromoProps => {
  const result = servicePromoSchema.parse(input);
  if (
    new Set(result.content.availability).size !==
    result.content.availability.length
  ) {
    throw new Error("Availability must contain unique times.");
  }
  return result;
};
