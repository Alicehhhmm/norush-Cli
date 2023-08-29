// rollup.config.js
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
// import typescript from "@rollup/plugin-typescript";
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: {
    "cli.js": "src/cli.ts",
  },
  external: [/node_modules/],
  output: {
    dir: 'dist',
    format: "es",
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
    // terser(),
    typescript(),
    nodeResolve({
      extensions: [".js", ".ts"],
      preferBuiltins: true,
    }),
  ],
};
