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

// [1]|获取用户输入的交互命令行参数 _: [ 'norush-cli', 'create', 'temp' ]
const argv = minimist<{
  t?: string
  template?: string
}>(process.argv.slice(2), { string: ['_'] })

console.log(argv);

const defaultTargetDir = 'norush-project'

async function init() {
  // 根据命令行传递的参数，获取初始化项目生成的目标目录
  const argTargetDir = formatTargetDir(argv._[0])

  // 项目最终目录名称
  let targetDir = argTargetDir || defaultTargetDir
  console.log('targetDir@', targetDir);

}

// 指定目录格式
function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '')
}

init().catch((e) => {
  console.error('初始化失败:', e)
})
