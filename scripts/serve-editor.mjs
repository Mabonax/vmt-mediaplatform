import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import {spawn} from "node:child_process";

const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ttf": "font/ttf",
  ".json": "application/json",
};

const readJsonBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 8_000_000) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });

const startExport = async (payload) => {
  const cacheDir = path.resolve(".cache/vmt-motion-export");
  fs.mkdirSync(cacheDir, {recursive: true});
  const requestPath = path.join(
    cacheDir,
    `request-${Date.now()}-${process.pid}.json`,
  );
  fs.writeFileSync(requestPath, JSON.stringify(payload, null, 2));

  const child = spawn(
    process.execPath,
    [path.resolve("scripts/render-workstation-batch.mjs"), requestPath],
    {
      cwd: process.cwd(),
      detached: true,
      stdio: "ignore",
    },
  );
  child.unref();

  return requestPath;
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");

    if (req.method === "POST" && url.pathname === "/api/export") {
      const payload = await readJsonBody(req);
      if (!payload.project || !Array.isArray(payload.targets) || payload.targets.length === 0) {
        res
          .writeHead(400, {"Content-Type": "application/json"})
          .end(JSON.stringify({ok: false, error: "Missing project or export targets"}));
        return;
      }

      const requestPath = await startExport(payload);
      res
        .writeHead(202, {"Content-Type": "application/json"})
        .end(
          JSON.stringify({
            ok: true,
            message: "Export started",
            requestPath,
            outputDirectory: "out/vmt-motion",
          }),
        );
      return;
    }

    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405).end();
      return;
    }
    const relative = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    const fromPublic = relative.startsWith("brands/");
    const root = path.resolve(fromPublic ? "public" : "dist/editor");
    const target = path.resolve(root, relative || "index.html");

    if (
      !target.startsWith(root + path.sep) ||
      !fs.existsSync(target) ||
      !fs.statSync(target).isFile()
    ) {
      res.writeHead(404).end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": mime[path.extname(target)] || "application/octet-stream",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    });

    if (req.method === "HEAD") res.end();
    else fs.createReadStream(target).pipe(res);
  } catch {
    res.writeHead(400).end("Bad request");
  }
});

server.listen(3102, "127.0.0.1", () => {
  console.log("VMT Motion Editor: http://127.0.0.1:3102");
});
