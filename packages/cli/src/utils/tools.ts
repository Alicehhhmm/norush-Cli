import path from 'path';
import fs from 'fs-extra'
import spawn from 'cross-spawn'
import { getPackageJson } from './env'
import { debugInfo, debugWarning } from './debug'

const basePath: string = process.cwd()

export const getPath = (filePathName: string) => {
  return path.resolve(basePath, filePathName);
};

export const isEmptyObject = (arg: object): boolean => {
  return arg && Reflect.ownKeys(arg).length === 0
}

export const hasElementInArray = (list: Array<String>, element: string) => {
  return list.indexOf(element) >= 0 ? element : ''
}

/**
 * @description 将配置写入package.json
 * @param writeJsonSync 
 */
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
  fs.writeJsonSync(getPath('package.json'), pkg, { spaces: 2 })
}


/**
 * @description 自定义脚本
 * @param spawn |提供一个简单且灵活的方法来创建子进程并执行外部命令
 */
export const run = async (str: string) => {
  const runArr = str.split(' ')
  if (runArr.length < 2) {
    debugWarning(`运行参数错误${str}`)
    return false
  }
  const [npm, ...args] = runArr
  debugInfo(`${runArr.join(' ')}✅`)
  spawn.sync(npm, args, {
    stdio: 'pipe',
    cwd: basePath
  })
}