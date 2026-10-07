import type {
  WorkstationItem,
  WorkstationKeyframePoint,
  WorkstationProject,
} from "./schema";

const cloneProject = (project: WorkstationProject): WorkstationProject =>
  structuredClone(project);

const findItem = (project: WorkstationProject, itemId: string) => {
  for (const track of project.tracks) {
    const index = track.items.findIndex((item) => item.id === itemId);
    if (index >= 0) return {track, index, item: track.items[index]};
  }
  throw new Error(`Unknown workstation item: ${itemId}`);
};

export const updateItemTransform = (
  project: WorkstationProject,
  itemId: string,
  patch: Partial<WorkstationItem["transform"]>,
) => {
  const next = cloneProject(project);
  const {item} = findItem(next, itemId);
  item.transform = {...item.transform, ...patch};
  return next;
};

export const moveItemInTime = (
  project: WorkstationProject,
  itemId: string,
  from: number,
) => {
  if (from < 0 || !Number.isInteger(from)) {
    throw new Error("Item start frame must be a non-negative integer");
  }
  const next = cloneProject(project);
  const {item} = findItem(next, itemId);
  item.timing.from = from;
  return next;
};

export const trimItem = (
  project: WorkstationProject,
  itemId: string,
  durationInFrames: number,
) => {
  if (durationInFrames <= 0 || !Number.isInteger(durationInFrames)) {
    throw new Error("Item duration must be a positive integer");
  }
  const next = cloneProject(project);
  const {item} = findItem(next, itemId);
  item.timing.durationInFrames = durationInFrames;
  return next;
};

export const moveItemToTrack = (
  project: WorkstationProject,
  itemId: string,
  targetTrackId: string,
  targetIndex?: number,
) => {
  const next = cloneProject(project);
  const source = findItem(next, itemId);
  const [item] = source.track.items.splice(source.index, 1);
  const target = next.tracks.find((track) => track.id === targetTrackId);
  if (!target) throw new Error(`Unknown workstation track: ${targetTrackId}`);
  if (target.locked) throw new Error(`Track is locked: ${targetTrackId}`);

  const index =
    targetIndex === undefined
      ? target.items.length
      : Math.max(0, Math.min(targetIndex, target.items.length));
  target.items.splice(index, 0, item);
  return next;
};

export const reorderTrack = (
  project: WorkstationProject,
  trackId: string,
  targetIndex: number,
) => {
  const next = cloneProject(project);
  const currentIndex = next.tracks.findIndex((track) => track.id === trackId);
  if (currentIndex < 0) throw new Error(`Unknown workstation track: ${trackId}`);

  const [track] = next.tracks.splice(currentIndex, 1);
  const index = Math.max(0, Math.min(targetIndex, next.tracks.length));
  next.tracks.splice(index, 0, track);
  return next;
};

type AnimatedTransformProp = keyof NonNullable<WorkstationItem["animation"]>;

export const setTransformKeyframe = (
  project: WorkstationProject,
  itemId: string,
  property: AnimatedTransformProp,
  keyframe: WorkstationKeyframePoint,
) => {
  const next = cloneProject(project);
  const {item} = findItem(next, itemId);
  const animation = item.animation ?? {};
  const existing = animation[property] ?? [];
  const withoutFrame = existing.filter((point) => point.frame !== keyframe.frame);
  animation[property] = [...withoutFrame, keyframe].sort(
    (a, b) => a.frame - b.frame,
  );
  item.animation = animation;
  return next;
};

export const removeTransformKeyframe = (
  project: WorkstationProject,
  itemId: string,
  property: AnimatedTransformProp,
  frame: number,
) => {
  const next = cloneProject(project);
  const {item} = findItem(next, itemId);
  if (!item.animation?.[property]) return next;

  const remaining = item.animation[property]!.filter(
    (point) => point.frame !== frame,
  );
  if (remaining.length < 2) {
    delete item.animation[property];
  } else {
    item.animation[property] = remaining;
  }
  return next;
};
