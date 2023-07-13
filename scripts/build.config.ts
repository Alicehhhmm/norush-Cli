import fs from 'node:fs'
import fse from 'fs-extra';
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const cwd = process.cwd()
const root = path.join(cwd, 'packages')
// 获取 package.json 内容对象
const getPackageJson = async (base: string = '' as string) => {
  const file = path.resolve(base, 'package.json');
  const json = fse.readJSON(file);
  return json;
};

const filePath = './file.txt';
const data = 'Hello, world!';


const buildInit = async () => {
  // fs.copyFileSync(root, cwd) //源文件的路径和目标文件的路径。
  // fs.copyFileSync(path.resolve(cwd, './README.md'), './dist/README.md');
  // fs.writeFileSync(cwd, JSON.stringify(getPackageJson(), null, 2) + '\n')
  fs.writeFileSync(filePath, data);

};

buildInit();
