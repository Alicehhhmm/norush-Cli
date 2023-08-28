import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "rollup";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default {
  input: path.resolve(__dirname, "packages"),
  external: [/node_modules/],
  output: {
    dir: "./dist",
    format: "esm",
  },
  plugins: [json(), typescript(), terser()],
};
