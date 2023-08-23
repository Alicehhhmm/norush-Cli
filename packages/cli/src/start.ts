
import { eslintInit } from './core/eslint'

import { answerType } from "../types/index";
import {
  debugError,
  debugTxt,
  debugProcess,
  getPackageJson,
  hasElementInArray
} from "./utils";

export async function startInit(
  entry: string,
  option: object,
  answers: answerType,
) {
  const pckJson = await getPackageJson()

  const { envFormat = 'default', plugins = [] } = answers

  console.log('start2', answers, plugins);

  try {

    // 安装eslint 和 prettier 并自动生成配置文件
    hasElementInArray(plugins, 'eslint') && (await eslintInit(envFormat, pckJson))


    debugProcess(`恭喜您，成功注册以下配置：\n
        ${hasElementInArray(plugins, 'eslint')} \n
    `)

    // 部分版本依赖可能有冲突，建议重新安装node modules
    debugProcess(`依赖安装请执行: \n\n npm install\n\n # or \n\n yarn install \n\n`)
    debugTxt(`#`)
  } catch (error) {
    debugError(JSON.stringify(error))
  }
}