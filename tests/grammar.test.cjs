const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { createHash } = require("node:crypto");
const { createElement } = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const models = require("../.cache/tests/engine/grammar/models.js");
const {
  familyRegistry,
  createFamilyRegistry,
} = require("../.cache/tests/brands/dr-health/grammar/families.js");
const {
  grammarDefaults,
} = require("../.cache/tests/brands/dr-health/grammar/defaults.js");
const {
  resolveComposition,
  parseGrammarPromo,
  resolveSubject,
} = require("../.cache/tests/engine/grammar/resolve.js");
const {
  motionGrammars,
  resolveMotion,
} = require("../.cache/tests/engine/grammar/motion.js");
const {
  assetRegistry,
} = require("../.cache/tests/brands/dr-health/assets/manifest.js");
const {
  GrammarArtwork,
} = require("../.cache/tests/renderers/shared/GrammarArtwork.js");

test("references, DNA, spatial grammar and motion are validated, versioned records", () => {
  assert.equal(familyRegistry.all.length, 3);
  for (const family of familyRegistry.all) {
    assert.deepEqual(models.familySchema.parse(family), family);
    assert.ok(fs.existsSync(family.reference.source.path));
    assert.ok(
      family.reference.source.license && family.reference.source.provenance,
    );
    assert.equal(family.reference.designDNA.palette.background, "white");
    assert.equal(family.grammar.primaryShape.avoidHeadlineCollision, true);
    assert.equal(family.grammar.variants.length, 3);
  }
  for (const grammar of Object.values(motionGrammars)) {
    assert.deepEqual(models.motionGrammarSchema.parse(grammar), grammar);
    assert.equal(new Set(grammar.order).size, 5);
  }
  assert.throws(
    () => createFamilyRegistry([familyRegistry.all[0], familyRegistry.all[0]]),
    /Duplicate/,
  );
  const bad = structuredClone(familyRegistry.all[0]);
  bad.grammar.elements.body.follows = "cta";
  assert.throws(() => createFamilyRegistry([bad]), /spatial/);
  bad.grammar.family = "minimal-clinical";
  assert.throws(() => createFamilyRegistry([bad]), /ownership/);
});

test("external configuration rejects invalid axes, unknown keys, layouts, motion and duplicate times", () => {
  const mutations = [
    (p) => (p.axes.dynamic = 1.1),
    (p) => (p.variation.imageScale = 2),
    (p) => (p.variation.layoutVariant = "freeform"),
    (p) => (p.motionId = "random"),
    (p) => (p.familyId = "unknown"),
    (p) => (p.schemaVersion = 2),
    (p) => (p.axes.secret = true),
    (p) => (p.content.availability = ["09:00", "09:00"]),
  ];
  for (const mutate of mutations) {
    const props = grammarDefaults();
    mutate(props);
    assert.throws(() => parseGrammarPromo(props));
  }
});

test("family x layout x motion x format is deterministic and preserves content without input mutation", () => {
  for (const family of familyRegistry.all)
    for (const layoutVariant of family.grammar.variants)
      for (const motionId of family.compatibleMotion)
        for (const format of ["vertical", "square", "landscape"]) {
          const props = grammarDefaults(family.id);
          props.variation.layoutVariant = layoutVariant;
          props.motionId = motionId;
          const snapshot = structuredClone(props);
          const first = resolveComposition(props, format);
          assert.deepEqual(first, resolveComposition(props, format));
          assert.deepEqual(props, snapshot);
          assert.deepEqual(first.props.content, snapshot.content);
          assert.equal(first.style.background, "#FFFFFF");
          if (format === "vertical") assert.equal(first.stacked, true);
          assert.equal(first.subjectFirst, layoutVariant === "portrait-first");
        }
});

test("each high-level axis changes correlated visual or timing properties", () => {
  for (const axis of Object.keys(grammarDefaults().axes)) {
    const low = grammarDefaults();
    const high = grammarDefaults();
    low.axes[axis] = 0;
    high.axes[axis] = 1;
    const a = resolveComposition(low, "square");
    const b = resolveComposition(high, "square");
    const changes = Object.keys(a.style).filter(
      (key) => a.style[key] !== b.style[key],
    );
    const timingChanges = Object.keys(
      resolveMotion(a.motion, a.axes.dynamic, "cta"),
    ).filter(
      (key) =>
        resolveMotion(a.motion, a.axes.dynamic, "cta")[key] !==
        resolveMotion(b.motion, b.axes.dynamic, "cta")[key],
    );
    assert.ok(
      changes.length + timingChanges.length >= 2,
      `${axis}: must influence related properties`,
    );
  }
});

test("fine variation controls alter resolved layout or appearance", () => {
  for (const key of [
    "typographyScale",
    "imageScale",
    "whitespace",
    "shapeDensity",
    "depth",
    "expressiveness",
  ]) {
    const a = grammarDefaults();
    const b = grammarDefaults();
    a.variation[key] = key.endsWith("Scale") ? 0.85 : 0;
    b.variation[key] = key.endsWith("Scale") ? 1.1 : 1;
    assert.notDeepEqual(
      resolveComposition(a, "square").style,
      resolveComposition(b, "square").style,
      key,
    );
  }
});

test("asset policy safely handles wrong type, missing, opaque, facing, landscape and approval", () => {
  const family = familyRegistry.all[0];
  const portrait = assetRegistry.get("doctor-demo-01");
  assert.equal(
    resolveSubject(undefined, family, "right").treatment,
    "initials",
  );
  assert.equal(
    resolveSubject(assetRegistry.byType("logo")[0], family, "right").asset,
    undefined,
  );
  assert.equal(
    resolveSubject(portrait, family, "right", true).asset,
    undefined,
  );
  assert.equal(resolveSubject(portrait, family, "right").treatment, "cutout");
  for (const properties of [
    { facing: "right" },
    { transparent: false },
    { orientation: "landscape" },
  ]) {
    const result = resolveSubject(
      { ...portrait, properties: { ...portrait.properties, ...properties } },
      family,
      "right",
    );
    assert.equal(result.treatment, "framed");
    assert.equal(result.asset.source, portrait.source);
  }
});

test("static React markup renders all layouts with long content and missing imagery, without Remotion", () => {
  for (const family of familyRegistry.all)
    for (const format of ["vertical", "square", "landscape"])
      for (const layoutVariant of family.grammar.variants) {
        const props = grammarDefaults(family.id);
        props.variation.layoutVariant = layoutVariant;
        props.content.doctor.name = "Dr Alexandria Nomthandazo-Mahlangu";
        props.content.service.name = "Comprehensive General Consultation";
        delete props.content.doctor.imageAssetId;
        const html = renderToStaticMarkup(
          createElement(GrammarArtwork, {
            resolved: resolveComposition(props, format),
          }),
        );
        assert.match(html, /No portrait supplied/);
        assert.match(html, /Dr Alexandria/);
        assert.match(html, /Request appointment/);
        assert.match(html, /background:#FFFFFF/);
        assert.equal(
          (html.match(/data-grammar-element="subject"/g) || []).length,
          1,
        );
      }
  const files = fs.readdirSync("src/renderers/shared").concat([]);
  for (const file of files)
    assert.doesNotMatch(
      fs.readFileSync(`src/renderers/shared/${file}`, "utf8"),
      /from ["']remotion/,
    );
});

test("supplied PNG logos remain byte-identical to the recorded source hashes", () => {
  const provenance = JSON.parse(
    fs.readFileSync("public/brands/dr-health/logos/provenance.json", "utf8"),
  );
  const records = Array.isArray(provenance) ? provenance : provenance.files;
  assert.ok(records?.length >= 6);
  for (const record of records) {
    const target = `public/brands/dr-health/logos/${record.file}`;
    assert.ok(target, JSON.stringify(record));
    const file = fs.existsSync(target) ? target : `public/${target}`;
    assert.equal(
      createHash("sha256").update(fs.readFileSync(file)).digest("hex"),
      record.sha256,
    );
  }
});
