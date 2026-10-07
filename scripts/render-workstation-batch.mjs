import {spawn} from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const presets = {
  "landscape-1080": {
    width: 1920,
    height: 1080,
    suffix: "landscape-1920x1080",
  },
  "square-1080": {
    width: 1080,
    height: 1080,
    suffix: "square-1080x1080",
  },
  "vertical-1080": {
    width: 1080,
    height: 1920,
    suffix: "vertical-1080x1920",
  },
};

const fitProject = (project, preset) => {
  const next = structuredClone(project);
  const scale = Math.min(
    preset.width / project.width,
    preset.height / project.height,
  );
  const contentWidth = project.width * scale;
  const contentHeight = project.height * scale;
  const offsetX = (preset.width - contentWidth) / 2;
  const offsetY = (preset.height - contentHeight) / 2;

  next.width = preset.width;
  next.height = preset.height;

  for (const track of next.tracks) {
    for (const item of track.items) {
      const originalWidth = item.transform.width;
      const originalHeight = item.transform.height;
      item.transform.x = offsetX + item.transform.x * scale;
      item.transform.y = offsetY + item.transform.y * scale;
      item.transform.width = originalWidth * scale;
      item.transform.height = originalHeight * scale;
      item.transform.anchorX =
        (item.transform.anchorX ?? originalWidth / 2) * scale;
      item.transform.anchorY =
        (item.transform.anchorY ?? originalHeight / 2) * scale;

      if (item.animation) {
        for (const point of item.animation.x ?? []) {
          point.value = offsetX + point.value * scale;
        }
        for (const point of item.animation.y ?? []) {
          point.value = offsetY + point.value * scale;
        }
        for (const point of item.animation.anchorX ?? []) {
          point.value *= scale;
        }
        for (const point of item.animation.anchorY ?? []) {
          point.value *= scale;
        }
      }
    }
  }

  return next;
};

const sanitizeName = (value) =>
  String(value || "vmt-motion")
    .trim()
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase() || "vmt-motion";

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: false,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with code ${code}`));
    });
  });

const [requestPath] = process.argv.slice(2);
if (!requestPath) {
  throw new Error("Usage: node scripts/render-workstation-batch.mjs <request.json>");
}

const request = JSON.parse(fs.readFileSync(requestPath, "utf8"));
if (!request.project || !Array.isArray(request.targets) || request.targets.length === 0) {
  throw new Error("Export request must contain project and at least one target");
}

const cacheDir = path.resolve(".cache/vmt-motion-export");
const outputDir = path.resolve("out/vmt-motion");
fs.mkdirSync(cacheDir, {recursive: true});
fs.mkdirSync(outputDir, {recursive: true});

const npx = process.platform === "win32" ? "npx.cmd" : "npx";
const baseName = sanitizeName(request.project.name);
const outputs = [];

for (const target of request.targets) {
  const preset = presets[target];
  if (!preset) throw new Error(`Unsupported export target: ${target}`);

  const project = fitProject(request.project, preset);
  const propsPath = path.join(cacheDir, `${baseName}-${preset.suffix}.json`);
  const outputPath = path.join(outputDir, `${baseName}-${preset.suffix}.mp4`);

  fs.writeFileSync(propsPath, JSON.stringify(project, null, 2));

  console.log(`Rendering ${target} → ${outputPath}`);
  await run(npx, [
    "remotion",
    "render",
    "src/index.ts",
    "VMT-MotionProject",
    outputPath,
    "--props",
    propsPath,
    "--codec",
    "h264",
    "--overwrite",
  ]);

  outputs.push(outputPath);
}

console.log(JSON.stringify({ok: true, outputs}, null, 2));
