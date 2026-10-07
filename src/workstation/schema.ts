import {z} from "zod";

const color = z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/);
const transformSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number().positive(),
  height: z.number().positive(),
  rotation: z.number(),
  opacity: z.number().min(0).max(1),
  scale: z.number().positive(),
}).strict();

const timingSchema = z.object({
  from: z.number().int().min(0),
  durationInFrames: z.number().int().positive(),
}).strict();

const baseItem = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  timing: timingSchema,
  transform: transformSchema,
}).strict();

const textItem = baseItem.extend({
  type: z.literal("text"),
  text: z.string(),
  style: z.object({
    color,
    fontFamily: z.string().min(1),
    fontSize: z.number().positive(),
    fontWeight: z.number().int().min(100).max(900),
    textAlign: z.enum(["left", "center", "right"]),
    lineHeight: z.number().positive(),
  }).strict(),
});

const solidItem = baseItem.extend({
  type: z.literal("solid"),
  color,
  radius: z.number().min(0),
});

const imageItem = baseItem.extend({
  type: z.literal("image"),
  src: z.string().min(1),
  fit: z.enum(["contain", "cover"]),
  radius: z.number().min(0),
});

const uiCardItem = baseItem.extend({
  type: z.literal("ui-card"),
  title: z.string(),
  body: z.string(),
  accent: color,
  background: color,
  foreground: color,
});

export const workstationItemSchema = z.discriminatedUnion("type", [
  textItem,
  solidItem,
  imageItem,
  uiCardItem,
]);

export const workstationTrackSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  visible: z.boolean(),
  locked: z.boolean(),
  items: z.array(workstationItemSchema),
}).strict();

export const workstationProjectSchema = z.object({
  schemaVersion: z.literal(1),
  name: z.string().min(1),
  fps: z.number().int().positive(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  durationInFrames: z.number().int().positive(),
  background: color,
  tracks: z.array(workstationTrackSchema),
}).strict();

export type WorkstationProject = z.infer<typeof workstationProjectSchema>;
export type WorkstationItem = z.infer<typeof workstationItemSchema>;
