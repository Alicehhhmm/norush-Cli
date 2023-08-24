import fs from 'fs-extra';
import {
  run,
  getPath,
  debugInfo,
  debugWarning,
  pathExists,
  getPackageJson,
  writeInPkg,
} from '../utils';
import { BASE_DEV_DEPS_HUSKY } from "../a.module.params";


export const huskyInit = async () => {
  // 检查是否有git 如果没有 需要先初始化git
  if (!(await pathExists('.git', false))) {
    debugWarning(`请先初始化git`);
    debugInfo('参考命令 git init');
    process.exit();
  }

  // 写入配置文件、并更改package.json
  await writeInPkg(BASE_DEV_DEPS_HUSKY);
  let pkgJson = await getPackageJson();
  pkgJson.scripts['prepare'] = 'husky install';
  pkgJson.scripts['pre-commit'] = 'lint-staged';
  pkgJson.scripts['postinstallmac'] = 'git config core.hooksPath .husky && chmod 700 .husky/*';
  pkgJson.scripts['eslint'] = 'eslint --cache --max-warnings 0  "{src,mock}/**/*.{vue,ts,js,tsx}" --fix';
  pkgJson['lint-staged'] = {
    '*.{js,ts,vue,jsx,tsx}': ['npm run eslint'],
    '*.{js,jsx,ts,tsx,md,html,css,lees,scss,sass}': 'prettier --write',
  };
  fs.writeJsonSync(getPath('package.json'), pkgJson, { spaces: 2 });

  await run('npm run prepare');
  await run('npx husky add .husky/pre-commit "npm-run-pre-commit"');
};
