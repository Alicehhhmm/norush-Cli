// rollup.config.js
import json from "@rollup/plugin-json";
import del from "rollup-plugin-delete";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { cwd } from "process";
import path from "node:path";

const pkg = path.resolve(cwd(), "package.json");
const banner = `/**
* @author: luyi
* @license: ${pkg.license}
* @version: ${pkg.version}
*/
`;

export default [
  {
    input: {
      main1: "src/main.js",
      main2: "src/main2.js",
    },
    external: Object.keys(pkg.peerDependencies || {}),

    output: [
      {
        banner,
        dir: "dist",
        format: "esm",
        exports: "named",
        name: "react-components",
        // entryFileNames: "[name].[hash:6].js",
        // chunkFileNames: "chunks/chunk-[name]-[hash].js",
        // manualChunks: {
        //   vendors: ["lodash-es"],
        //   utils: ["src/utils/index.js"],
        // },
      },
    ],
    plugins: [
      commonjs(),
      json(),
      nodeResolve(),
      del({ targets: "./dist" }),
      // terser(),
    ],
  },
];
