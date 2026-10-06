import net from "node:net";
import path from "node:path";
import { spawn } from "node:child_process";

const port = 3000;
const host = "127.0.0.1";
const probe = net.createServer();

probe.once("error", () => {
  console.error(
    `Port ${port} is already in use. Close the older preview, then run npm.cmd run studio again.`,
  );
  console.error(`Use only http://localhost:${port} for this project.`);
  process.exitCode = 1;
});

probe.once("listening", () => {
  probe.close(() => {
    const cli = path.resolve("node_modules/@remotion/cli/remotion-cli.js");
    const child = spawn(
      process.execPath,
      [cli, "studio", "src/index.ts", `--port=${port}`],
      { stdio: "inherit" },
    );
    child.once("exit", (code) => {
      process.exitCode = code ?? 1;
    });
    process.once("SIGINT", () => child.kill("SIGINT"));
    process.once("SIGTERM", () => child.kill("SIGTERM"));
  });
});

probe.listen(port, host);
