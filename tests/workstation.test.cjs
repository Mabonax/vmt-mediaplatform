const test = require("node:test");
const assert = require("node:assert/strict");

const {
  workstationProjectSchema,
} = require("../.cache/tests/workstation/schema.js");
const {
  workstationDemoProject,
} = require("../.cache/tests/workstation/defaults.js");
const {
  moveItemInTime,
  trimItem,
  updateItemTransform,
  moveItemToTrack,
  setTransformKeyframe,
  removeTransformKeyframe,
} = require("../.cache/tests/workstation/mutations.js");

test("workstation starter satisfies the neutral project contract", () => {
  const parsed = workstationProjectSchema.parse(workstationDemoProject);
  assert.equal(parsed.name, "ERP Explainer Starter");
  assert.ok(parsed.tracks.length >= 4);
});

test("editor mutations are immutable and update transforms and timing", () => {
  const moved = moveItemInTime(workstationDemoProject, "headline", 40);
  assert.equal(moved.tracks[1].items.find((item) => item.id === "headline").timing.from, 40);
  assert.equal(workstationDemoProject.tracks[1].items.find((item) => item.id === "headline").timing.from, 14);

  const transformed = updateItemTransform(workstationDemoProject, "headline", {
    x: 220,
    rotation: 4,
  });
  const headline = transformed.tracks[1].items.find((item) => item.id === "headline");
  assert.equal(headline.transform.x, 220);
  assert.equal(headline.transform.rotation, 4);

  const trimmed = trimItem(workstationDemoProject, "headline", 120);
  assert.equal(trimmed.tracks[1].items.find((item) => item.id === "headline").timing.durationInFrames, 120);
});

test("items can move between unlocked tracks", () => {
  const moved = moveItemToTrack(
    workstationDemoProject,
    "callout",
    "workflow",
    0,
  );
  assert.equal(moved.tracks.find((track) => track.id === "workflow").items[0].id, "callout");
  assert.equal(
    moved.tracks.find((track) => track.id === "application").items.some((item) => item.id === "callout"),
    false,
  );
  assert.throws(
    () => moveItemToTrack(workstationDemoProject, "callout", "background"),
    /locked/,
  );
});

test("transform keyframes can be inserted, replaced and removed", () => {
  const withKeyframe = setTransformKeyframe(
    workstationDemoProject,
    "headline",
    "x",
    {frame: 0, value: 140, easing: "linear"},
  );
  const withSecond = setTransformKeyframe(
    withKeyframe,
    "headline",
    "x",
    {frame: 30, value: 300, easing: "ease-in-out"},
  );
  const replaced = setTransformKeyframe(
    withSecond,
    "headline",
    "x",
    {frame: 30, value: 360, easing: "ease-out"},
  );

  const headline = replaced.tracks[1].items.find((item) => item.id === "headline");
  assert.equal(headline.animation.x.length, 2);
  assert.equal(headline.animation.x[1].value, 360);

  const removed = removeTransformKeyframe(replaced, "headline", "x", 30);
  const after = removed.tracks[1].items.find((item) => item.id === "headline");
  assert.equal(after.animation.x.length, 1);
  assert.equal(after.animation.x[0].frame, 0);

  const cleared = removeTransformKeyframe(removed, "headline", "x", 0);
  const clearedHeadline = cleared.tracks[1].items.find((item) => item.id === "headline");
  assert.equal(clearedHeadline.animation.x, undefined);
});

test("project validation rejects duplicate ids and out-of-range timeline data", () => {
  const duplicate = structuredClone(workstationDemoProject);
  duplicate.tracks[1].items[1].id = duplicate.tracks[1].items[0].id;
  assert.throws(() => workstationProjectSchema.parse(duplicate), /Duplicate item id/);

  const overflow = structuredClone(workstationDemoProject);
  overflow.tracks[1].items[0].timing.from = overflow.durationInFrames - 5;
  overflow.tracks[1].items[0].timing.durationInFrames = 20;
  assert.throws(() => workstationProjectSchema.parse(overflow), /exceeds project duration/);

  const badKeyframe = structuredClone(workstationDemoProject);
  const cursor = badKeyframe.tracks
    .flatMap((track) => track.items)
    .find((item) => item.id === "cursor");
  cursor.animation.x[2].frame = cursor.timing.durationInFrames;
  assert.throws(() => workstationProjectSchema.parse(badKeyframe), /Keyframe exceeds item duration/);
});

test("a single transform keyframe is valid for incremental editor authoring", () => {
  const project = setTransformKeyframe(
    workstationDemoProject,
    "headline",
    "opacity",
    {frame: 12, value: 0.5, easing: "ease-in-out"},
  );
  assert.doesNotThrow(() => workstationProjectSchema.parse(project));
});
