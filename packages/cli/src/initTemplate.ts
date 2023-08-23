import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import spawn from 'cross-spawn'//node spawn 和 spawnSync 的跨平台解决方案。用于生成子进程。
import minimist from 'minimist'//用于解析命令行参数选项。
import prompts from 'prompts' // 用于命令行交互提示。
import {
  blue,
  cyan,
  green,
  lightGreen,
  lightRed,
  magenta,
  red,
  reset,
  yellow,
} from 'kolorist'
import { argTargetDir, argTemplate, formatTargetDir } from "./utils";
import { FRAMEWORKS } from './inquirer'

const defaultTargetDir = 'my-project'

async function initTemplate() {

  // 项目最终目录名称
  let targetDir = argTargetDir || defaultTargetDir


  // 可选用框架对应的模板代码
  const TEMPLATES = FRAMEWORKS.map(
    (f) => (f.variants && f.variants.map((v) => v.name)) || [f.name],
  ).reduce((a, b) => a.concat(b), [])

  // 用户设置的最终结果
  let result: prompts.Answers<
    'projectName' | 'framework'
  >

  try {
    result = await prompts(
      [
        // 初始化项目名称，若命令行设置了相关参数，则不需要调整
        {
          type: argTargetDir ? null : 'text',
          // type: 'text',
          name: 'projectName',
          message: reset('Project name:'),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir
          },
        },
        // 校验模板是否可用并选择要生成的代码模板所属框架
        {
          type:
            argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
          name: 'framework',
          message:
            typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
              ? reset(
                `"${argTemplate}" isn't a valid template. Please choose from below: `,
              )
              : reset('请选择你需要的模板:'),
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color
            return {
              title: frameworkColor(framework.display || framework.name),
              value: framework,
            }
          }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' 操作被取消!')
        },
      },
    )
  } catch (e: any) {
    console.log(e.message);
    return
  }


  // 用户选择的最终参数
  const { projectName, } = result

  console.log('result@2', projectName, argTargetDir, result);

}


export default initTemplate;
