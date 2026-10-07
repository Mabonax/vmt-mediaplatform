import http from "node:http";
import fs from "node:fs";
import path from "node:path";

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

const server = http.createServer((req, res) => {
  try {
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405).end();
      return;
    }

    const url = new URL(req.url, "http://localhost");
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
