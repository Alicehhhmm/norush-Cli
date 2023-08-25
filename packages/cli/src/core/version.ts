import fs from 'fs-extra'
import { getPath, debugInfo, getPackageJson } from '../utils'

const versionInit = async () => {
  // 默认为package.json版本更新
  const argv = process.argv[2]
  const pkgJson = await getPackageJson()
  let version = pkgJson.version.split('.')


  // 根据命令行参数更新: <主版本号:Major>.<次版本号:Minor>.<修订版本号:patch>.^<Beta>
  if (argv !== null && argv !== undefined) {
    argv === 'Major' ? version[0] = Number(version[0]) + 1
      : argv === 'Minor' ? version[1] = Number(version[1]) + 1 : ''
  } else {
    version[2] = Number(version[2]) + 1
  }


  pkgJson['version'] = version.join('.')
  fs.outputFileSync(getPath('./package.json'), JSON.stringify(pkgJson, null, 2))

  debugInfo(`当前版本升级为：${pkgJson['version']}`)
}

versionInit()
