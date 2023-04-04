import { build } from "esbuild";
import fs from "fs";

function compile() {
    try {
        build({
            entryPoints: [
                "./src/popup.tsx",
                "./src/background.ts",
                "./src/content.ts",
            ],
            outdir: "./public",
            bundle: true,
            loader: { ".ts": "ts" },
            target: ["chrome100"],
        });
    } catch (ex) {
        console.error(ex);
    }
}

fs.watch("src", { recursive: true }, compile);
compile();
