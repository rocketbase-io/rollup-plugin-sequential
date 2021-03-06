import sourcemaps from "rollup-plugin-sourcemaps";
import commonjs from "rollup-plugin-commonjs";
import ts from "@wessberg/rollup-plugin-ts";
import paths from "rollup-plugin-ts-paths";
import apiExtractor from "@rocketbase/rollup-plugin-api-extractor";
import execute from "@rocketbase/rollup-plugin-exec";
import sequential from "./rollup-plugin-sequential";
import { name, globals, external } from "./package";
import banner from "./banner";

// eslint-disable-next-line @typescript-eslint/camelcase
globals.child_process = "child_process";
external.push("child_process");

export default {
  input: "src/main.ts",
  output: ["umd", "iife", "esm", "cjs"].map(format => ({
    file: `dist/${name}${format === "umd" ? "" : `.${format}`}.js`,
    exports: "named",
    sourceMap: true,
    format,
    globals,
    name,
    banner
  })),
  external,
  plugins: [
    paths(),
    ts({ tsconfig: "tsconfig.build.json" }),
    sourcemaps(),
    commonjs(),
    sequential(
      [
        apiExtractor({
          config: "build/api-extractor.json",
          override: { name },
          cleanup: false
        }),
        execute(
          [
            "api-documenter markdown --output-folder docs --input-folder dist",
            "rimraf temp api-extractor.json dist/*.*.d.ts"
          ],
          { stdio: "ignore" }
        )
      ],
      { once: true }
    )
  ]
};
