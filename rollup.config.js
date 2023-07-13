import babel from "rollup-plugin-babel";
import json from "@rollup-plugin-json";

export default {
  input: "packages/cli/index.js",
  outputFile: "./dist/src/index.js",
};
