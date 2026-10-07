import {rspack} from "@rspack/core";
import fs from "node:fs";
import path from "node:path";

const output = path.resolve("dist/editor");
fs.rmSync(output, {recursive: true, force: true});

const compiler = rspack({
  mode: "development",
  entry: path.resolve("src/editor/index.tsx"),
  output: {
    path: output,
    filename: "editor.js",
    publicPath: "/",
  },
  resolve: {extensions: [".tsx", ".ts", ".js"]},
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {syntax: "typescript", tsx: true},
            transform: {react: {runtime: "automatic"}},
          },
        },
      },
      {test: /\.css$/, type: "css", parser: {url: false}},
    ],
  },
  experiments: {css: true},
});

await new Promise((resolve, reject) =>
  compiler.run((error, stats) =>
    compiler.close((closeError) => {
      if (error || closeError || stats.hasErrors()) {
        reject(
          error ||
            closeError ||
            new Error(stats.toString({all: false, errors: true})),
        );
        return;
      }
      resolve();
    }),
  ),
);

fs.writeFileSync(
  path.join(output, "index.html"),
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>VMT Motion Editor</title><link rel="stylesheet" href="/editor.css"></head><body><div id="root"></div><script src="/editor.js"></script></body></html>',
);

console.log("VMT Motion Editor built at dist/editor");
