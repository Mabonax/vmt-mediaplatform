import { z } from "zod";

const copy = (max: number) => z.string().trim().min(1).max(max);
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
  service: z.object({ name: copy(40), description: copy(90) }),
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
    brandSupporting: copy(85),
    serviceQuestion: copy(54),
    doctorHeadline: copy(54),
    availabilityHeadline: copy(54),
    bookingHeadline: copy(54),
    bookingSupporting: copy(80),
    confirmationHeadline: copy(54),
    confirmationSupporting: copy(85),
    bookingAction: copy(28),
    confirmationLabel: copy(28),
  }),
});

export const designConfigSchema = z.object({
  layout: z.enum(["editorial", "hero"]),
  typographyStyle: z.enum(["editorial", "clinical"]),
  typographyScale: z.number().min(0.85).max(1.1),
  motionStyle: z.enum(["subtle", "smooth"]),
  motionIntensity: z.number().min(0).max(1),
  motionSpeed: z.number().min(0.75).max(1.5),
  imageScale: z.number().min(0.85).max(1.15),
  imageTreatment: z.enum(["card", "circle"]),
  shapeStyle: z.enum(["rings", "petals"]),
  shapeDensity: z.enum(["sparse", "balanced", "rich"]),
  visualDepth: z.enum(["flat", "layered"]),
  background: z.enum(["paper", "mint"]),
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
