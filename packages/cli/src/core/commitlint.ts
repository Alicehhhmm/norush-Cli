/**
 * @description husk 结合 commitlint 提交信息校验
 */
import fs from 'fs-extra';
import {
  run,
  getPath,
  writeInPkg,
  getPackageJson
} from '../utils';
import { commitLintConfig } from '../../templates/template-init';
import { BASE_DEV_DEPS_commitlint, commitMsg, preCommit } from "../a.module.params";



const commitlintPath = getPath('commitlint.config.js');

export const commitLintInit = async () => {
  await writeInPkg(BASE_DEV_DEPS_commitlint);
  await run('npx husky add .husky/commit-msg "npm-run-test"');
  let pkgJson = await getPackageJson();

  // 配置Git提交辅助commitizen插件,并添加commit脚本
  pkgJson['config'] = {
    commitizen: {
      path: '@commitlint/cz-commitlint',
    },
  };
  pkgJson.scripts['commit'] = 'git add . && git-cz';
  fs.writeJsonSync(getPath('package.json'), pkgJson, { spaces: 2 });

  // 先删除项目已存在的commitlint.config.js
  if (await fs.pathExists(commitlintPath)) {
    fs.removeSync(commitlintPath);
  }
  fs.outputFileSync(commitlintPath, commitLintConfig);
  fs.outputFileSync(getPath('./.husky/commit-msg'), commitMsg);
  fs.outputFileSync(getPath('./.husky/pre-commit'), preCommit);
};
