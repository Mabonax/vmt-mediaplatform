const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  parseServicePromo,
} = require("../.cache/tests/engine/schemas/promo.js");
const {
  createAssetRegistry,
} = require("../.cache/tests/engine/assets/registry.js");
const {
  assetRegistry,
  drHealthAssets,
} = require("../.cache/tests/brands/dr-health/assets/manifest.js");
const {
  videoFormats,
  getVideoFormat,
} = require("../.cache/tests/engine/layout/formats.js");
const { revealProgress } = require("../.cache/tests/engine/motion/timing.js");
const {
  drHealthTheme,
} = require("../.cache/tests/brands/dr-health/theme/tokens.js");
const {
  promoScenes,
  promoTiming,
} = require("../.cache/tests/brands/dr-health/compositions/timeline.js");
const demo = require("../src/brands/dr-health/data/demo.json");
const clone = () => structuredClone(demo);

test("demo and editor examples satisfy the versioned composition contract", () => {
  assert.deepEqual(parseServicePromo(demo), demo);
  for (const file of fs
    .readdirSync("examples")
    .filter((name) => name.endsWith(".json"))) {
    parseServicePromo(
      JSON.parse(fs.readFileSync(path.join("examples", file), "utf8")),
    );
  }
});
test("external JSON rejects unsupported version, invalid times and duplicate slots", () => {
  for (const invalid of ["24:00", "9:30", "11:60"]) {
    const props = clone();
    props.content.availability = [invalid];
    assert.throws(() => parseServicePromo(props));
  }
  const props = clone();
  props.content.availability = ["09:00", "09:00"];
  assert.throws(() => parseServicePromo(props), /unique/);
  props.content.schemaVersion = 2;
  assert.throws(() => parseServicePromo(props));
});
test("empty copy, excessive content and unsafe configuration fail validation", () => {
  const changes = [
    (p) => {
      p.content.doctor.name = " ";
    },
    (p) => {
      p.content.doctor.name = "x".repeat(45);
    },
    (p) => {
      p.content.availability = [];
    },
    (p) => {
      p.content.availability = ["08:00", "09:00", "10:00", "11:00", "12:00"];
    },
    (p) => {
      p.design.layout = "unimplemented";
    },
    (p) => {
      p.design.motionSpeed = 0;
    },
    (p) => {
      p.design.imageScale = 2;
    },
    (p) => {
      p.design.typographyScale = 1.2;
    },
  ];
  for (const change of changes) {
    const props = clone();
    change(props);
    assert.throws(() => parseServicePromo(props));
  }
});
test("missing optional portrait resolves gracefully and wrong media types never reach Img", () => {
  const props = clone();
  delete props.content.doctor.imageAssetId;
  assert.equal(parseServicePromo(props).content.doctor.imageAssetId, undefined);
  assert.equal(assetRegistry.optional("not-supplied", "person"), undefined);
  assert.equal(assetRegistry.optional("doctor-demo-01", "video"), undefined);
  assert.equal(assetRegistry.get("doctor-demo-01").type, "person");
  assert.throws(() => assetRegistry.get("unknown"), /Unknown asset/);
});
test("registry filters intersect requirements and distinguish approval from existence", () => {
  assert.equal(assetRegistry.byType("person").length, 1);
  assert.equal(assetRegistry.byTags(["demo", "portrait"]).length, 1);
  assert.equal(assetRegistry.byTags(["demo", "licensed-photo"]).length, 0);
  assert.equal(
    assetRegistry.select({ type: "person", transparent: true }).length,
    1,
  );
  assert.equal(
    assetRegistry.select({ approvedOnly: true, type: "person" }).length,
    0,
  );
  assert.equal(
    assetRegistry.select({ approvedOnly: true, type: "logo" }).length,
    6,
  );
});
test("registry rejects duplicates, authoring files, remote URLs and path traversal", () => {
  assert.throws(
    () => createAssetRegistry([drHealthAssets[0], drHealthAssets[0]]),
    /Duplicate/,
  );
  for (const source of [
    "doctor.ai",
    "doctor.psd",
    "doctor.aep",
    "../doctor.png",
    "https://example.com/doctor.png",
    "C:\\doctor.png",
    "/doctor.png",
  ]) {
    assert.throws(() =>
      createAssetRegistry([{ ...drHealthAssets[0], source }]),
    );
  }
});
test("all manifested assets and local fonts exist, with provenance and licenses", () => {
  for (const asset of assetRegistry.all) {
    assert.ok(fs.statSync(path.join("public", asset.source)).size > 0);
    assert.ok(
      asset.provenance.creator &&
        asset.provenance.license &&
        asset.provenance.sourceReference,
    );
  }
  for (const name of [
    "Manrope-Variable.ttf",
    "Manrope-OFL.txt",
    "DMSerifDisplay-Regular.ttf",
    "DMSerifDisplay-OFL.txt",
  ]) {
    assert.ok(
      fs.statSync(path.join("public/brands/dr-health/fonts", name)).size > 0,
    );
  }
});
test("all 450 frames have exactly one editorial scene and each format has native dimensions", () => {
  assert.equal(promoTiming.durationInFrames / promoTiming.fps, 15);
  for (let frame = 0; frame < 450; frame++)
    assert.equal(
      promoScenes.filter((s) => frame >= s.from && frame < s.to).length,
      1,
    );
  for (const [format, dimensions] of Object.entries(videoFormats)) {
    assert.equal(getVideoFormat(dimensions.width, dimensions.height), format);
    assert.ok(dimensions.safeX * 2 < dimensions.width);
    assert.ok(
      dimensions.contentTop + dimensions.safeBottom < dimensions.height,
    );
  }
  assert.deepEqual(
    Object.values(videoFormats).map(({ width, height }) => [width, height]),
    [
      [1080, 1920],
      [1080, 1080],
      [1920, 1080],
    ],
  );
});
test("motion is deterministic under out-of-order seeking, clamped and settled", () => {
  for (const style of ["subtle", "smooth"]) {
    const design = { ...demo.design, motionStyle: style };
    for (const frame of [60, 0, 12, 8, 60, 3, 12]) {
      const progress = revealProgress(
        frame,
        30,
        drHealthTheme,
        design,
        0.1,
        0.65,
        true,
      );
      assert.ok(Number.isFinite(progress) && progress >= 0 && progress <= 1);
      assert.equal(
        progress,
        revealProgress(frame, 30, drHealthTheme, design, 0.1, 0.65, true),
      );
    }
    assert.equal(revealProgress(0, 30, drHealthTheme, design, 0.1), 0);
    assert.equal(revealProgress(100, 30, drHealthTheme, design), 1);
  }
  assert.notEqual(
    revealProgress(6, 30, drHealthTheme, demo.design),
    revealProgress(6, 30, drHealthTheme, { ...demo.design, motionSpeed: 1.5 }),
  );
});
