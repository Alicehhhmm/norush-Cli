// rollup.config.js
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import del from "rollup-plugin-delete";

export default {
  input: {
    main1: "src/main.js",
    main2: "src/main2.js",
  },
  output: {
    dir: "dist",
    format: "es",
    entryFileNames: "[name].[hash:6].js",
    chunkFileNames: "chunks/chunk-[name]-[hash].js",
    manualChunks: {
      vendors: ["lodash-es"],
      utils: ["src/utils/index.js"],
    },
  },
  plugins: [
    commonjs(),
    json(),
    nodeResolve(),
    del({ targets: "./dist" }),
    terser(),
  ],
};
