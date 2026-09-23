import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import {
  openBrowser,
  getCompositions,
  renderStill,
  renderMedia,
  selectComposition,
} from "@remotion/renderer";

const output = path.resolve("out/grammar");
fs.mkdirSync(output, { recursive: true });
const serveUrl = path.resolve("build");
const chromiumOptions = { gl: "swangle" };
const browser = await openBrowser("chrome", {
  browserExecutable:
    process.env.REMOTION_BROWSER_EXECUTABLE ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  chromiumOptions,
});
const errors = [];
const common = {
  serveUrl,
  puppeteerInstance: browser,
  chromiumOptions,
  onBrowserLog: (log) => {
    if (log.type === "error") errors.push(log.text);
  },
};
const report = {
  matrix: [],
  controls: [],
  edges: [],
  motion: [],
  videos: [],
  errors,
};
const hash = (file) =>
  createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const still = async (composition, file, inputProps, frame = 90) => {
  const destination = path.join(output, file + ".png");
  const resolved = inputProps
    ? await selectComposition({ ...common, id: composition.id, inputProps })
    : composition;
  await renderStill({
    ...common,
    composition: resolved,
    inputProps,
    frame,
    output: destination,
    scale: 0.5,
  });
  return {
    file: path.relative(process.cwd(), destination),
    sha256: hash(destination),
    frame,
  };
};
try {
  const all = await getCompositions(serveUrl, common);
  assert.equal(
    all.filter((c) => c.id.startsWith("DrHealthServicePromo15-")).length,
    3,
  );
  const compositions = all.filter((c) => c.id.startsWith("Grammar-"));
  assert.equal(compositions.length, 36);
  for (const composition of compositions) {
    assert.equal(composition.durationInFrames, 180);
    assert.equal(composition.fps, 30);
    report.matrix.push({
      id: composition.id,
      width: composition.width,
      height: composition.height,
      ...(await still(composition, composition.id)),
    });
    console.log(`Matrix: ${composition.id}`);
  }
  const square = compositions.find(
    (c) => c.id === "Grammar-editorial-health-split-premium-Square",
  );
  const baselineProps = structuredClone(square.defaultProps);
  const flat = {
    ...baselineProps,
    familyId: "minimal-clinical",
    motionId: "subtle",
  };
  const repeatA = await still(square, "repeat-a", flat);
  const repeatB = await still(square, "repeat-b", flat);
  assert.equal(repeatA.sha256, repeatB.sha256, "identical settled flat frames");
  report.repeat = { exact: true, sha256: repeatA.sha256 };
  for (const axis of Object.keys(baselineProps.axes)) {
    const values = [];
    for (const value of [0, 1])
      values.push(
        await still(square, `axis-${axis}-${value}`, {
          ...baselineProps,
          axes: { ...baselineProps.axes, [axis]: value },
        }),
      );
    assert.notEqual(
      values[0].sha256,
      values[1].sha256,
      `${axis} must affect pixels`,
    );
    report.controls.push({ control: axis, values });
  }
  for (const key of [
    "typographyScale",
    "imageScale",
    "whitespace",
    "shapeDensity",
    "depth",
    "expressiveness",
  ]) {
    const values = [];
    for (const value of key.endsWith("Scale") ? [0.85, 1.1] : [0, 1])
      values.push(
        await still(square, `variation-${key}-${value}`, {
          ...baselineProps,
          variation: { ...baselineProps.variation, [key]: value },
        }),
      );
    assert.notEqual(
      values[0].sha256,
      values[1].sha256,
      `${key} must affect pixels`,
    );
    report.controls.push({ control: key, values });
  }
  for (const composition of compositions.filter((c) =>
    c.id.includes("-split-premium-"),
  )) {
    for (const edge of ["stacked", "long-missing"]) {
      const props = structuredClone(composition.defaultProps);
      if (edge === "stacked") props.variation.layoutVariant = "stacked";
      else {
        props.content.doctor.name = "Dr Alexandria Nomthandazo-Mahlangu";
        props.content.service.name = "Comprehensive General Consultation";
        props.content.copy.brandHeadline =
          "Care and appointments at your connected clinic.";
        delete props.content.doctor.imageAssetId;
        props.content.availability = ["08:00", "10:00", "13:30", "16:00"];
      }
      const metadata = await selectComposition({
        ...common,
        id: composition.id,
        inputProps: props,
      });
      report.edges.push({
        id: composition.id,
        edge,
        ...(await still(metadata, `${edge}-${composition.id}`, props)),
      });
    }
  }
  for (const motionId of ["subtle", "premium"])
    for (const frame of [0, 8, 18, 40, 165, 179])
      report.motion.push({
        motionId,
        ...(await still(
          square,
          `motion-${motionId}-${frame}`,
          { ...baselineProps, motionId },
          frame,
        )),
      });
  assert.notEqual(
    report.motion.find((r) => r.motionId === "subtle" && r.frame === 18).sha256,
    report.motion.find((r) => r.motionId === "premium" && r.frame === 18)
      .sha256,
  );
  if (!process.argv.includes("--stills-only")) {
    for (const [family, format] of [
      ["editorial-health", "Vertical"],
      ["minimal-clinical", "Square"],
      ["technology-health", "Landscape"],
    ]) {
      const composition = compositions.find(
        (c) => c.id === `Grammar-${family}-split-premium-${format}`,
      );
      const file = path.join(output, `${family}-${format.toLowerCase()}.mp4`);
      await renderMedia({
        ...common,
        composition,
        codec: "h264",
        outputLocation: file,
        concurrency: 2,
      });
      report.videos.push({
        id: composition.id,
        file: path.relative(process.cwd(), file),
        sha256: hash(file),
      });
      console.log(`Rendered: ${file}`);
    }
  }
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    path.join(output, "verification.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(
    `Verified ${report.matrix.length} matrix stills, ${report.controls.length} controls, ${report.edges.length} edges, ${report.motion.length} motion frames, ${report.videos.length} videos.`,
  );
} finally {
  await browser.close({ silent: true });
}
