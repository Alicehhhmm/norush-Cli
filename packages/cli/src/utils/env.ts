import path from 'path';
import fs from 'fs-extra';
import { checkVueVersion } from './check';

export const env = {
  base: '',
  default: true,
  isVue2: false,
  isVue3: false,
  isVite: false,
  isReact: false,
  isEslint: false,
  isWebpack: false,
};

type envKeys = keyof typeof env;

/**
 * @description 设置变量
 */
export const setEnv = (key: envKeys, val: any) => {
  env[key] = val as never;
};


/**
 * @description 获取变量
 */
export const getEnv = (key: envKeys) => {
  return env[key];
};

/**
 * @description 把package.json转化为json
 */
export const getPackageJson = async (base: string = getEnv('base') as string) => {
  const file = path.resolve(base, 'package.json');
  const json = fs.readJSON(file);
  return json;
};
