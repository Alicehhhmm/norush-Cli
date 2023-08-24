/**
 * @description initCli|初始化问询
 * @param commander
 * @param inquirer
 * @param fs-extra
 */
import cac from 'cac'
import inquirer from "inquirer";
import { PROMPTLIST, FRAMEWORKS, SELECT_MODEL } from "./inquirer";
import { VERSION } from './constants.js'
import { answerType } from "../types/index";
import { debugError, isEmptyObject, debugProcess } from "./utils";
import { startInit } from "./start";

const cli = cac('norush')

export default async () => {
  console.log('initCustomize',);

  try {
    // root
    cli.command('[root]', 'default')
      .action(async (entry: string, option: object) => {
        const answers: answerType = await inquirer.prompt(PROMPTLIST);

        isEmptyObject(answers)
          ? debugProcess(`请参照 norush -h 或 --help 列表的 Commands 属性,添加正确参数...`)
          : await startInit(entry, option, answers)
      })

    // create
    cli.command('create [option] <app-name>', 'create a project...')
      .alias('c')
      .option('-t, --template ', `New from Template`)
      .action(async (root, option) => {
        console.log('create', root, option)
      })

    // start inital
    cli.command('inital [root]', 'config init: Eslint、prettier、husky、TS、tailwindcss...')
      .alias('init')
      .option('-e, --eslints ', `[string] 自动化eslints`)
      .option('-p, --prettierr ', `[string] 自动化prettierr`)
      .action(async (entry, option) => {
        const answers: answerType = await inquirer.prompt(PROMPTLIST);
        await startInit(entry, option, answers)
        console.log('start', entry, option)
      })

    // buill
    cli.command('buill [root]', 'buill a project pack...')
      .alias('b')
      .option('-b, --buill ', `[string] buill Project packaging`)
      .option('-d, --dev ', `[string] build for development`)
      .option('-p, --prod ', `[string] build for production`)
      .action(async (root, option) => {
        console.log('buill@', root, option)
      })

    cli.help()
    cli.version(VERSION)

    cli.parse()
  } catch (error) {
    debugError(`错误！温馨提示: ${error.message}`)
  }
}