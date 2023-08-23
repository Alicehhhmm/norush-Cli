import path from 'path';
import fs from 'fs-extra'
import spawn from 'cross-spawn'
import { getEnv, getPackageJson } from './env'
import { checkNpmOrYarn } from './check'
import { debugInfo, debugWarning } from './debug'


export const getPath = (name: string) => {
  const basePath = getEnv('base') as string;
  return path.resolve(basePath, name);
};

export const isEmptyObject = (arg: object): boolean => {
  return arg && Reflect.ownKeys(arg).length === 0
}

export const hasElementInArray = (list: Array<String>, element: string) => {
  return list.indexOf(element) >= 0 ? element : ''
}

export const writeInPkg = async (devArr: string[], key: string = 'devDependencies') => {
  let pkg = await getPackageJson()
  devArr.forEach((item: string) => {
    // 为了防止安装包里面的名字有@
    const index = item.lastIndexOf('@')
    const k = index === -1 ? item : item.slice(0, index)
    const v = index === -1 ? '' : item.slice(index + 1) || ''
    pkg[key][k] = v
    debugInfo(`${item} ✅`)
  })
  // fs.writeJsonSync(getPath('package.json'), pkg, { spaces: 2 })
}