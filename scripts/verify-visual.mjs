import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {
  getCompositions,
  openBrowser,
  renderStill,
  selectComposition,
} from "@remotion/renderer";

const serveUrl = path.resolve("build");
const output = path.resolve(process.env.QA_OUTPUT || "out/qa");
fs.mkdirSync(output, { recursive: true });
const browserExecutable =
  process.env.REMOTION_BROWSER_EXECUTABLE ||
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  ].find((candidate) => fs.existsSync(candidate));
// Fix the GL backend for reproducible geometry and typography on this host.
const chromiumOptions = { gl: "swangle" };
const browser = await openBrowser("chrome", {
  browserExecutable,
  chromiumOptions,
});
const errors = [];
const onBrowserLog = (log) => {
  if (log.type === "error") errors.push(log.text);
};
const shared = {
  serveUrl,
  puppeteerInstance: browser,
  onBrowserLog,
  chromiumOptions,
};
const report = { compositions: [], stills: [], variants: [], errors };
const hash = (file) =>
  createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const demo = JSON.parse(
  fs.readFileSync("src/brands/dr-health/data/demo.json", "utf8"),
);
try {
  const allCompositions = await getCompositions(serveUrl, {
    puppeteerInstance: browser,
    onBrowserLog,
  });
  const compositions = allCompositions.filter((item) => item.id.startsWith("DrHealthServicePromo15-"));
  assert.equal(compositions.length, 3);
  for (const composition of compositions) {
    const suffix = composition.id.split("-").at(-1).toLowerCase();
    assert.equal(composition.durationInFrames, 450);
    assert.equal(composition.fps, 30);
    report.compositions.push({
      id: composition.id,
      width: composition.width,
      height: composition.height,
      fps: composition.fps,
      frames: composition.durationInFrames,
    });
    // Every story beat, the first/last frames, and both sides of each transition.
    for (const frame of [
      0, 35, 59, 65, 95, 119, 125, 165, 209, 215, 255, 299, 305, 335, 359, 365,
      395, 419, 425, 449,
    ]) {
      const file = path.join(output, `${suffix}-${frame}.png`);
      await renderStill({
        ...shared,
        composition,
        frame,
        output: file,
        scale: 0.5,
      });
      report.stills.push({
        format: suffix,
        frame,
        file: path.relative(process.cwd(), file),
        sha256: hash(file),
      });
    }
    console.log(`Verified storyboard and transitions: ${composition.id}`);
  }
  const square = compositions.find((c) => c.id.endsWith("Square"));
  const reference = report.stills.find(
    (s) => s.format === "square" && s.frame === 165,
  );
  // One control at a time, so every exposed switch must visibly affect output.
  const variants = {
    layout: { layout: "hero" },
    typographyStyle: { typographyStyle: "clinical" },
    typographyScale: { typographyScale: 0.85 },
    motionStyle: { motionStyle: "subtle" },
    motionIntensity: { motionIntensity: 0 },
    motionSpeed: { motionSpeed: 1.5 },
    imageScale: { imageScale: 1.15 },
    imageTreatment: { imageTreatment: "circle" },
    shapeStyle: { shapeStyle: "petals" },
    shapeDensity: { shapeDensity: "rich" },
    visualDepth: { visualDepth: "flat" },
    background: { background: "mint" },
  };
  for (const [name, change] of Object.entries(variants)) {
    const inputProps = { ...demo, design: { ...demo.design, ...change } };
    const composition = await selectComposition({
      ...shared,
      id: square.id,
      inputProps,
    });
    const frame = name.startsWith("motion") ? 128 : 165;
    const baseline = path.join(output, `baseline-${name}.png`);
    if (frame !== 165)
      await renderStill({
        ...shared,
        composition: square,
        frame,
        output: baseline,
        scale: 0.5,
      });
    const file = path.join(output, `control-${name}.png`);
    await renderStill({
      ...shared,
      composition,
      inputProps,
      frame,
      output: file,
      scale: 0.5,
    });
    assert.notEqual(
      hash(file),
      frame === 165 ? reference.sha256 : hash(baseline),
      `${name} must change rendered pixels`,
    );
    report.variants.push({
      name,
      frame,
      sha256: hash(file),
      changesPixels: true,
    });
  }
  const repeat = path.join(output, "deterministic-repeat.png");
  // Chrome's blurred shadow paint can dither by 1-2 color levels across captures.
  // Keep an exact hash assertion for the flat preset, which retains every motion
  // driver, font, asset and layout without the nondeterministic blur rasterizer.
  const repeatProps = {
    ...demo,
    design: { ...demo.design, visualDepth: "flat" },
  };
  const repeatComposition = await selectComposition({
    ...shared,
    id: square.id,
    inputProps: repeatProps,
  });
  await renderStill({
    ...shared,
    composition: repeatComposition,
    inputProps: repeatProps,
    frame: 165,
    output: repeat,
    scale: 0.5,
  });
  assert.equal(
    hash(repeat),
    hash(path.join(output, "control-visualDepth.png")),
    "Seeking and rerendering the same frame must be deterministic",
  );
  const invalid = structuredClone(demo);
  invalid.content.availability = ["25:00"];
  // Run before more renders: Remotion 4.0.527 releases a rejected metadata page
  // asynchronously. Further renders let that cleanup finish before browser close.
  await assert.rejects(
    () =>
      selectComposition({
        serveUrl,
        puppeteerInstance: browser,
        id: square.id,
        inputProps: invalid,
      }),
    /24-hour|Zod|invalid_format/,
  );
  for (const example of [
    "hero",
    "alternate-content",
    "edge-copy",
    "missing-portrait",
  ]) {
    const inputProps = JSON.parse(
      fs.readFileSync(`examples/${example}.json`, "utf8"),
    );
    for (const registration of compositions) {
      const composition = await selectComposition({
        ...shared,
        id: registration.id,
        inputProps,
      });
      for (const frame of example === "edge-copy"
        ? [95, 165, 255, 335, 395, 449]
        : [165]) {
        const file = path.join(
          output,
          `${example}-${registration.id.split("-").at(-1).toLowerCase()}-${frame}.png`,
        );
        await renderStill({
          ...shared,
          composition,
          inputProps,
          frame,
          output: file,
          scale: 0.5,
        });
        report.stills.push({
          example,
          frame,
          file: path.relative(process.cwd(), file),
          sha256: hash(file),
        });
        if (example === "alternate-content" && registration.id === square.id)
          assert.notEqual(
            hash(file),
            reference.sha256,
            "JSON content must change the rendered output",
          );
      }
    }
  }
  assert.deepEqual(
    errors,
    [],
    "Unexpected browser errors during render acceptance",
  );
  report.deterministic = {
    exactPixelMatch: true,
    visualDepth: "flat",
    note: "Layered shadow blur can differ by 1-2 channel levels in Chrome; frame-driven motion is independently tested.",
  };
  report.invalidInputRejected = true;
  console.log(
    `PASS: ${report.stills.length} storyboard/example stills, ${report.variants.length} independent controls, deterministic rerender, invalid JSON rejection.`,
  );
} finally {
  fs.writeFileSync(
    path.join(output, "verification.json"),
    JSON.stringify(report, null, 2),
  );
  await browser.close({ silent: true });
}
