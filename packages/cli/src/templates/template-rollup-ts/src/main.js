/**
 * @description main |入口文件
 * @param {model} esm
 */
import foo from "./esm";
import { version } from "../package.json";
import { compact } from "lodash-es";
import answer from "the-answer";
import greet from "./common";
import { subtract, add } from "./utils";

export default function main() {
  foo();
  console.log("当前包的版本号是：", version);
  console.log("lodash-es方法:", compact([0, 1, false, 2, "", 3]));
  console.log("the-answer方法:", answer);
  console.log("CommonJS方式引入:", greet("CommonJS"));
  console.log("utils的add方法:", add(1, 1));
  console.log("utils的subtract方法:", subtract(10, 5));
  console.log("main end...");
  console.log();
}
main();
