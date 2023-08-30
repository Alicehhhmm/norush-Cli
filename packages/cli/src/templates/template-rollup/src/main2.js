/**
 * @description main2 |入口文件2
 * @param {model} esm
 */
import foo from "./esm";
import myFunction from "./amd";
import iife from "./iife";
import common from "./common";

export default function main2() {
  foo();
  console.log("main2 end...");
  console.log(esm);
  console.log(myFunction);
  console.log(iife);
  console.log(common);
  console.log();
}
main2();
