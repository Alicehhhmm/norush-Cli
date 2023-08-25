import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import prompts from 'prompts'
import { red, reset } from 'kolorist'
import { argTargetDir, argTemplate, debugProcess } from "./utils";
import { FRAMEWORKS } from './inquirer'

const cwd = process.cwd()

async function initTemplate() {

  let targetDir = argTargetDir || 'my-project'

  const TEMPLATES = FRAMEWORKS.map(
    (f) => (f.variants && f.variants.map((v) => v.name)) || [f.name],
  ).reduce((a, b) => a.concat(b), [])

  let result: prompts.Answers<'framework'>

  try {
    result = await prompts(
      [
        {
          type: 'select',
          name: 'framework',
          message:
            typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
              ? reset(
                `"${argTemplate}" 不是一个有效的模板。请从以下选项中选择:`,
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
  const { framework } = result

  const root = path.join(cwd, targetDir)

  let template: string = framework?.name

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../',
    `templates`,
  )
  const templateDirFile = path.join(templateDir, template)

  /**
   * @description 文件复制
   * @param src |需要复制的文件、文件夹路径
   * @param dest |目标文件路径
   */
  function copy(src: string, dest: string) {
    const stat = fs.statSync(src)
    const hasDir = path.dirname(dest)

    if (!fs.existsSync(hasDir)) {
      fs.mkdirSync(hasDir, { recursive: true });
    }

    if (stat?.isDirectory()) {
      copyDir(src, dest)
    } else {
      fs.copyFileSync(src, dest)
    }
  }

  function copyDir(srcDir: string, destDir: string) {
    fs.mkdirSync(destDir, { recursive: true })
    for (const file of fs.readdirSync(srcDir)) {
      const srcFile = path.resolve(srcDir, file)
      const destFile = path.resolve(destDir, file)
      copy(srcFile, destFile)
    }
  }

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, file)

    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDirFile, file), targetPath)
    }
  }

  /**
   * @description 读取模板文件
   * @param templateDirFile|选择的模板文件夹
   */
  const files = fs.readdirSync(templateDirFile)

  for (const file of files.filter((f) => f !== 'node_modules')) {
    write(file)
  }

  const cdProjectName = path.relative(cwd, root)
  debugProcess(`成功获取模板:  ${template} \n`)
  if (root !== cwd) {
    console.log(
      `  cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName
      }`,
    )
  }
  console.log(`  npm install`)
  console.log(`  npm run dev`)
  console.log()
}


export default initTemplate;
