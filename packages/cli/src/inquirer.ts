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
    name: 'vanilla',
    display: 'Vanilla',
    color: yellow,
    variants: [
      {
        name: 'vanilla-ts',
        display: 'TypeScript',
        color: blue,
      },
      {
        name: 'vanilla',
        display: 'JavaScript',
        color: yellow,
      },
    ],
  },
  {
    name: 'vue',
    display: 'Vue',
    color: green,
    variants: [
      {
        name: 'vue-ts',
        display: 'TypeScript',
        color: blue,
      },
      {
        name: 'vue',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'custom-create-vue',
        display: 'Customize with create-vue ↗',
        color: green,
        customCommand: 'npm create vue@latest TARGET_DIR',
      },
      {
        name: 'custom-nuxt',
        display: 'Nuxt ↗',
        color: lightGreen,
        customCommand: 'npm exec nuxi init TARGET_DIR',
      },
    ],
  },
  {
    name: 'react',
    display: 'React',
    color: cyan,
    variants: [
      {
        name: 'react-ts',
        display: 'TypeScript',
        color: blue,
      },
      {
        name: 'react-swc-ts',
        display: 'TypeScript + SWC',
        color: blue,
      },
      {
        name: 'react',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'react-swc',
        display: 'JavaScript + SWC',
        color: yellow,
      },
    ],
  },
  {
    name: 'preact',
    display: 'Preact',
    color: magenta,
    variants: [
      {
        name: 'preact-ts',
        display: 'TypeScript',
        color: blue,
      },
      {
        name: 'preact',
        display: 'JavaScript',
        color: yellow,
      },
    ],
  },
  {
    name: 'lit',
    display: 'Lit',
    color: lightRed,
    variants: [
      {
        name: 'lit-ts',
        display: 'TypeScript',
        color: blue,
      },
      {
        name: 'lit',
        display: 'JavaScript',
        color: yellow,
      },
    ],
  },
  {
    name: 'svelte',
    display: 'Svelte',
    color: red,
    variants: [
      {
        name: 'svelte-ts',
        display: 'TypeScript',
        color: blue,
      },
      {
        name: 'svelte',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'custom-svelte-kit',
        display: 'SvelteKit ↗',
        color: red,
        customCommand: 'npm create svelte@latest TARGET_DIR',
      },
    ],
  },
  {
    name: 'others',
    display: 'Others',
    color: reset,
    variants: [
      {
        name: 'create-vite-extra',
        display: 'create-vite-extra ↗',
        color: reset,
        customCommand: 'npm create vite-extra@latest TARGET_DIR',
      },
      {
        name: 'create-electron-vite',
        display: 'create-electron-vite ↗',
        color: reset,
        customCommand: 'npm create electron-vite@latest TARGET_DIR',
      },
    ],
  },
]


export {
  PROMPTLIST,
  FRAMEWORKS,
  SELECT_MODEL
}

