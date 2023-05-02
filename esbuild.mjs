import * as esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";

const options = {
  bundle: true,
  entryPoints: ["./src/background.ts", "./src/content.ts"],
  minify: process.env.NODE_ENV === "production",
  outdir: "./dist",
  plugins: [
    copy({
      // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
      // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
      // REF: https://www.npmjs.com/package/esbuild-plugin-copy
      resolveFrom: "cwd",
      assets: [
        {
          from: ["./manifest.json"],
          to: ["./dist/manifest.json"],
        },
      ],
    }),
    copy({
      resolveFrom: "cwd",
      assets: [
        {
          from: ["./src/assets/images/*.png"],
          to: ["./dist"],
        },
      ],
    }),
  ],
};

await esbuild.build(options);
