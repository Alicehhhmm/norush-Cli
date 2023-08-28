// rollup.config.js
import path from "node:path";
import { fileURLToPath } from "node:url";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import { getPackageJson, getPath } from "./src/utils";
import fs from 'fs-extra'

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// const pkgJson = await getPackageJson()
// delete pkgJson.type


export default {
  input: "src/cli.ts",
  external: [/node_modules/],
  output: {
    dir: 'dist',
    format: "cjs",

  },

  plugins: [
    json(),
    // terser(),
    typescript(),
    nodeResolve({
      extensions: [".js", ".ts"],
      preferBuiltins: true,
    }),
  ],
};
