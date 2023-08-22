import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

// 读取package.json
const { name, version } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url)).toString()
);
export const VERSION: string = version;
export const PACKAGENAME: string = name;

export const LOGOFONT: string = 'norush'