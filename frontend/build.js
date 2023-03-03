import { build } from "esbuild";
import fs from "fs";

fs.watch("src", { recursive: true }, () => {
  build({
    entryPoints: ["./src/popup.tsx"],
    outdir: "./public",
    bundle: true,
    minify: true,
    loader: { ".ts": "ts" },
    target: ["chrome100"],
  });
});
