// rollup.config.js
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.ts",
  external: [/node_modules/],
  output: {
    dir: "./dist",
    format: "esm",
  },

  plugins: [
    json(),
    terser(),
    typescript(),
    nodeResolve({
      extensions: [".js", ".ts"],
      preferBuiltins: true,
    }),
  ],
};
