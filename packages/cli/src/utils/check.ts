// 各种检测函数
import fs from 'fs-extra';
import { debugError } from './debug';
import { getEnv } from './env';

/**
 * @description 判断文件夹是否存在
 * @param {string} fs.pathExists|用于检查文件或目录是否存在
 * @param {string} fileName|文件或文件夹名称 例如(.git)
 */
export const pathExists = async (fileName: string, ext: boolean = true): Promise<boolean | void> => {
  const base = getEnv('base') as string || process.cwd();
  const res = await fs.pathExists(`${base}/${fileName}`);
  if (!res) {
    ext && debugError(`${base}/${fileName}不存在`);
    return false;
  } else {
    return res;
  }
};

/**
 * @description 判断是哪个vue版本
 */
export const checkVueVersion = (version: string) => {
  const v = version.split('.')[0] as string;
  return Number(v.match(/\d+/g));
};

/**
 * @description 判断使用的是npm或yarn
 */
export const checkNpmOrYarn = async (_basePath?: string): Promise<string[]> => {
  // 如果原项目使用的是yarn进行安装的，那还是使用npm进行按照，否则就使用npm
  if (await pathExists('yarn.lock', false)) {
    return ['yarn', 'add'];
  }
  return ['npm', 'init'];
};
