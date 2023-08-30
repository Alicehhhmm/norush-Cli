import {
  blue,
  cyan,
  green,
  lightGreen,
  magenta,
  reset,
  yellow,
} from 'kolorist'
import { Framework, PromptList } from '../types/index.d'

// 问询列表选择
const SELECT_MODEL = [
  {
    name: 'customizeConfig',
    display: '定制化配置',
    color: lightGreen,
  },
  {
    name: 'template',
    display: '项目模板',
    color: cyan,
  },
]

// 注册问询列表
const PROMPTLIST: PromptList[] = [
  {
    type: 'confirm',
    message: reset('是否需要注册定制项目配置？'),
    name: 'customizeInit',
  },
  {
    type: 'checkbox',
    message: reset('请选择需要安装的定制化配置(默认选eslint注册):'),
    name: 'plugins',
    choices: [
      {
        name: 'eslint注册',
        value: 'eslint',
        checked: true,
      },
      {
        name: 'vscode格式化注册',
        value: 'vscode',
        checked: true,
      },
      {
        name: 'husky注册',
        value: 'husky',
        checked: false,
      },
      {
        name: 'commitLint注册',
        value: 'commitLint',
        checked: false,
      },
    ],
  },
  {
    type: 'list',
    message: reset('请选择对应框架(默认为基础配置):'),
    name: 'envFormat',
    choices: [
      {
        name: 'Default',
        value: 'default',
        checked: true,
      },
      {
        name: 'Vue2',
        value: 'isVue2',
        checked: false,
      },
      {
        name: 'Vue3',
        value: 'isVue3',
        checked: false,
      },
      {
        name: 'React',
        value: 'isReact',
        checked: false,
      },
    ],
  },
];

// 模板问询列表
const FRAMEWORKS: Framework[] = [
  {
    name: 'template-rollup',
    display: 'Rollup',
    color: magenta,
  },
  {
    name: 'template-rollup-ts',
    display: 'Rollup-ts',
    color: cyan,
  },
  {
    name: 'template-webpack-config',
    display: 'Webpack-Simple',
    color: green,
  },
  {
    name: 'template-webpack-config-complex',
    display: 'Webpack-Complex',
    color: blue,
  },
  {
    name: 'template-webpack-config-react',
    display: 'Webpack-React',
    color: yellow,
  },
]


export {
  PROMPTLIST,
  FRAMEWORKS,
  SELECT_MODEL
}

