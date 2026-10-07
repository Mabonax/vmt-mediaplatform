import {z} from "zod";

const color = z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/);

const keyframePointSchema = z.object({
  frame: z.number().int().min(0),
  value: z.number(),
  easing: z.enum(["linear", "ease-in", "ease-out", "ease-in-out"]).default("ease-in-out"),
}).strict();

const keyframeTrackSchema = z.array(keyframePointSchema).min(1).refine(
  (points) => points.every((point, index) => index === 0 || point.frame > points[index - 1].frame),
  "Keyframes must be strictly increasing by frame",
);

const transformAnimationSchema = z.object({
  x: keyframeTrackSchema.optional(),
  y: keyframeTrackSchema.optional(),
  scale: keyframeTrackSchema.optional(),
  rotation: keyframeTrackSchema.optional(),
  opacity: keyframeTrackSchema.optional(),
}).strict();

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

const motionSchema = z.object({
  entrance: z.enum(["none", "fade", "rise", "scale"]),
  exit: z.enum(["none", "fade"]),
  intensity: z.number().min(0).max(1),
}).strict();

const baseItem = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  parentId: z.string().min(1).nullable().default(null),
  zIndex: z.number().int().default(0),
  timing: timingSchema,
  transform: transformSchema,
  animation: transformAnimationSchema.optional(),
  motion: motionSchema.default({
    entrance: "rise",
    exit: "fade",
    intensity: 0.6,
  }),
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

const browserWindowItem = baseItem.extend({
  type: z.literal("browser-window"),
  title: z.string(),
  url: z.string(),
  screenshotSrc: z.string().optional(),
  accent: color,
  chrome: z.enum(["light", "dark"]),
});

const cursorItem = baseItem.extend({
  type: z.literal("cursor"),
  variant: z.enum(["pointer", "hand"]),
  color,
  clickAtFrame: z.number().int().min(0).optional(),
});

const calloutItem = baseItem.extend({
  type: z.literal("callout"),
  label: z.string(),
  accent: color,
  foreground: color,
  background: color,
  direction: z.enum(["left", "right", "up", "down"]),
});

const flowItem = baseItem.extend({
  type: z.literal("flow"),
  steps: z.array(z.string().min(1)).min(2).max(8),
  accent: color,
  foreground: color,
  surface: color,
});

const groupItem = baseItem.extend({
  type: z.literal("group"),
  collapsed: z.boolean().default(false),
});

export const workstationItemSchema = z.discriminatedUnion("type", [
  textItem,
  solidItem,
  imageItem,
  uiCardItem,
  browserWindowItem,
  cursorItem,
  calloutItem,
  flowItem,
  groupItem,
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
}).strict().superRefine((project, ctx) => {
  const trackIds = new Set<string>();
  const itemIds = new Set<string>();

  project.tracks.forEach((track, trackIndex) => {
    if (trackIds.has(track.id)) {
      ctx.addIssue({
        code: "custom",
        message: `Duplicate track id: ${track.id}`,
        path: ["tracks", trackIndex, "id"],
      });
    }
    trackIds.add(track.id);

    track.items.forEach((item, itemIndex) => {
      if (itemIds.has(item.id)) {
        ctx.addIssue({
          code: "custom",
          message: `Duplicate item id: ${item.id}`,
          path: ["tracks", trackIndex, "items", itemIndex, "id"],
        });
      }
      itemIds.add(item.id);

      if (item.parentId === item.id) {
        ctx.addIssue({
          code: "custom",
          message: `Item cannot parent itself: ${item.id}`,
          path: ["tracks", trackIndex, "items", itemIndex, "parentId"],
        });
      }

      if (item.timing.from + item.timing.durationInFrames > project.durationInFrames) {
        ctx.addIssue({
          code: "custom",
          message: `Item exceeds project duration: ${item.id}`,
          path: ["tracks", trackIndex, "items", itemIndex, "timing"],
        });
      }

      if (item.animation) {
        Object.entries(item.animation).forEach(([property, points]) => {
          if (!points) return;
          points.forEach((point, pointIndex) => {
            if (point.frame >= item.timing.durationInFrames) {
              ctx.addIssue({
                code: "custom",
                message: `Keyframe exceeds item duration: ${item.id}.${property}`,
                path: [
                  "tracks",
                  trackIndex,
                  "items",
                  itemIndex,
                  "animation",
                  property,
                  pointIndex,
                  "frame",
                ],
              });
            }
          });
        });
      }
    });
  });

  const allItems = project.tracks.flatMap((track) => track.items);
  const itemById = new Map(allItems.map((item) => [item.id, item]));

  allItems.forEach((item) => {
    if (!item.parentId) return;
    const parent = itemById.get(item.parentId);
    if (!parent) {
      ctx.addIssue({
        code: "custom",
        message: `Unknown parent id: ${item.parentId}`,
        path: ["tracks"],
      });
      return;
    }
    if (parent.type !== "group") {
      ctx.addIssue({
        code: "custom",
        message: `Parent must be a group: ${item.parentId}`,
        path: ["tracks"],
      });
      return;
    }

    const visited = new Set<string>([item.id]);
    let cursor = parent;
    while (cursor.parentId) {
      if (visited.has(cursor.id)) {
        ctx.addIssue({
          code: "custom",
          message: `Circular parent hierarchy involving: ${item.id}`,
          path: ["tracks"],
        });
        break;
      }
      visited.add(cursor.id);
      const next = itemById.get(cursor.parentId);
      if (!next || next.type !== "group") break;
      cursor = next;
    }
  });
});

export type WorkstationProject = z.infer<typeof workstationProjectSchema>;
export type WorkstationItem = z.infer<typeof workstationItemSchema>;
export type WorkstationKeyframePoint = z.infer<typeof keyframePointSchema>;
