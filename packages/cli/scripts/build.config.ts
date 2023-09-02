// rollup.config.js
import path from "node:path";
import { fileURLToPath } from 'node:url'
import json from "@rollup/plugin-json";
// import terser from "@rollup/plugin-terser";
import alias from "@rollup/plugin-alias";
import postcss from "rollup-plugin-postcss";
import filesize from "rollup-plugin-filesize";
import commonjs from "@rollup/plugin-commonjs";
// import typescript from "@rollup/plugin-typescript";
import typescript from "rollup-plugin-typescript2";
import nodeResolve from "@rollup/plugin-node-resolve";
const __dirname = fileURLToPath(new URL('.', import.meta.url))


export default {
  input: {
    "cli.js": 'src/cli.ts',
  },
  external: [/node_modules/, 'inquirer'],
  treeshake: true,
  output: {
    dir: 'dist',
    format: "esm",
    sourcemap: true,
    entryFileNames: "[name]",
    chunkFileNames: "chunks/chunk-[name]-[hash].js",
    manualChunks: {
      utils: ["src/utils/index.ts"],
    },
  },

  plugins: [
    commonjs(),
    json(),
    alias({
      entries: {
        "@": path.resolve(__dirname, "../src"),
      },
    }),
    typescript({
      tsconfig: path.resolve(__dirname, "./tsconfig.build.json"),
    }),
    nodeResolve({
      extensions: [".js", ".ts"],
      preferBuiltins: true,
    }),
    postcss({
      minimize: true,
      sourceMap: false,
      extensions: [".less", ".scss", '.css'],
      use: ["less"],
    }),
    filesize(),
    // terser(),
  ],
};
