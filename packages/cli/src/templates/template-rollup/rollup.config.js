// rollup.config.js
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";

/**
 * @description 配置参数
 * @param {string} input |入口文件路径
 * @param {string|object} output |输入文件路径（详细配置）
 * @param {Array} external |忽略外部引入文件
 * @param {Array} plugins |第三方插件
 */
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
