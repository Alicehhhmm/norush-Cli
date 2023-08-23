import minimist from 'minimist'//用于解析命令行参数选项。

/**
 * @description 命令行参数说明
 * @param {string} argv|命令行参数[npm norus --param]
 * @param {string} argTargetDir|根据命令行传递的参数[norush projectName -t]，获取初始化项目生成的目标目录名称 
 * @param {string} argTemplate|命令行[ --template / -t / -h / --help],获取代码模板或查看指令
 * @param {string} defaultTargetDir|默认文件名
 */
const argv = minimist<{
  t?: string
  template?: string
  h?: string
  help?: string
}>(process.argv.slice(2), { string: ['_'] })

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '')
}


const argTargetDir = formatTargetDir(argv._[0])

const argTemplate = argv.template || argv.t || argv.h || argv.help
console.log('===============process.argv=================', process.argv);
console.log('===============argv=================', argv);
console.log('===============argTemplate=================', argTemplate);
console.log('===============argTargetDir=================', argTargetDir);


export {
  argv,
  argTemplate,
  argTargetDir,
  formatTargetDir
}