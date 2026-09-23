import { rspack } from "@rspack/core";
import fs from "node:fs";
import path from "node:path";

const output = path.resolve("dist/gallery");
const compiler = rspack({
  mode: "production",
  entry: path.resolve("src/renderers/static/index.tsx"),
  output: { path: output, filename: "gallery.js" },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: { syntax: "typescript", tsx: true },
            transform: { react: { runtime: "automatic" } },
          },
        },
      },
      { test: /\.css$/, type: "css", parser: { url: false } },
    ],
  },
  experiments: { css: true },
  optimization: { concatenateModules: false },
});
await new Promise((resolve, reject) =>
  compiler.run((error, stats) =>
    compiler.close((closeError) => {
      if (error || closeError || stats.hasErrors())
        return reject(
          error ||
            closeError ||
            new Error(stats.toString({ all: false, errors: true })),
        );
      const modules = stats
        .toJson({ all: false, modules: true })
        .modules.map((m) => m.name);
      if (
        modules.some((name) =>
          /node_modules[\\/](@remotion|remotion)[\\/]/.test(name),
        )
      )
        return reject(new Error("Static gallery must not bundle Remotion"));
      fs.writeFileSync(
        path.join(output, "dependency-proof.json"),
        JSON.stringify({ remotionModules: 0, modules }, null, 2),
      );
      resolve();
    }),
  ),
);
fs.writeFileSync(
  path.join(output, "index.html"),
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DrHealth · Design studies</title><link rel="stylesheet" href="/gallery.css"></head><body><div id="root"></div><script src="/gallery.js"></script></body></html>',
);
console.log(
  "Static React gallery built. Zero Remotion modules in dependency graph.",
);
