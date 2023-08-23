import fs from 'fs-extra';
import { getPackageJson, writeInPkg, getPath } from '../utils';
import { eslintrcFn, prettierrcInit } from '../templates/template-init';
import {
  BASE_DEV_DEPS,
  BASE_DEV_DEPS_VUE2,
  BASE_DEV_DEPS_VUE3,
  BASE_DEV_DEPS_REACT
} from '../a.module.params'
import { checkVueVersion } from '../utils';



export const eslintInit = async (envFormat: string, pckJson: any) => {
  let devDependencies: string[] = BASE_DEV_DEPS;
  const deps = { ...pckJson.devDependencies, ...pckJson.dependencies };
  const pckvue2 = deps['vue'] && checkVueVersion(deps['vue']) === 2
  const pckvue3 = deps['vue'] && checkVueVersion(deps['vue']) === 3

  if (envFormat === 'isVue2' || pckvue2) {
    devDependencies = [
      ...BASE_DEV_DEPS,
      ...BASE_DEV_DEPS_VUE2
    ];
  }
  if (envFormat === 'isVue3' || pckvue3) {
    devDependencies = [
      ...BASE_DEV_DEPS,
      ...BASE_DEV_DEPS_VUE3
    ];
  }
  if (envFormat === 'isReact' || deps['react']) {
    devDependencies = [
      ...BASE_DEV_DEPS,
      ...BASE_DEV_DEPS_REACT
    ];
  }


  // 将配置内容写入package.json, 并生成配置文件
  await writeInPkg(devDependencies, 'devDependencies');
  fs.outputFileSync(getPath('./.eslintrc.js'), eslintrcFn());
  fs.outputFileSync(getPath('./.prettierrc'), prettierrcInit);

  let pkgJson = await getPackageJson();
  if (pkgJson['eslintConfig']) {
    delete pkgJson.eslintConfig;
  }
  fs.writeJsonSync(getPath('package.json'), pkgJson, { spaces: 2 });
};
