import { eslintInit, eslintIgnoreInit } from './core/eslint'
import { vscodeInit } from './core/vscode'
import { huskyInit } from './core/huskys'
import { commitLintInit } from './core/commitlint'

import { answerType } from "../types/index";
import {
  debugError,
  debugTxt,
  debugProcess,
  getPackageJson,
  hasElementInArray
} from "./utils";

export async function startInit(answers: answerType) {
  console.log('startInit:', answers);
  const pckJson = await getPackageJson()

  const { envFormat = 'default', plugins = [] } = answers

  try {
    console.log('startInit:in try',);
    console.log('startInit:in hasElementInArray 1eslint',);
    // 通过问询参数：安装eslint 和 prettier 并自动生成配置文件
    hasElementInArray(plugins, 'eslint') && (await eslintInit(envFormat, pckJson))
    console.log('startInit:in hasElementInArray 2eslint',);
    // 添加忽略文件 .eslintignore
    hasElementInArray(plugins, 'eslint') && (await eslintIgnoreInit())
    console.log('startInit:in hasElementInArray 1vscode', hasElementInArray(plugins, 'vscode'));
    // 添加项目的编辑器定制化设置 .vscode 
    hasElementInArray(plugins, 'vscode') && (await vscodeInit())
    console.log('startInit:in hasElementInArray 2vscode', hasElementInArray(plugins, 'vscode'));
    // 添加git提交配置,安装 husky 并自动生成配置文件
    hasElementInArray(plugins, 'husky') && (await huskyInit())

    // 添加git提交前校验约束commitLint
    hasElementInArray(plugins, 'commitLint') && (await commitLintInit())

    debugProcess(`恭喜您，成功注册以下配置：\n
        ${envFormat ? envFormat : ''} \n
        ${hasElementInArray(plugins, 'eslint')} \n
        ${hasElementInArray(plugins, 'vscode')} \n
        ${hasElementInArray(plugins, 'husky')} \n
        ${hasElementInArray(plugins, 'commitLint')} \n
    `)

    console.log('startInit:in debugProcess',);
    // 部分版本依赖可能有冲突，建议重新安装node modules
    debugProcess(`依赖安装请执行: \n\n npm install\n\n # or \n\n yarn install \n\n`)
    debugTxt(`#`)
  } catch (error) {
    console.log('startInit:error catch:');
    console.log('startInit:error catch:', error);
    debugError(JSON.stringify(error))
  }
  console.log('startInit:end...',);
}