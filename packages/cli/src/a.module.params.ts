/**
 * @description 动态参数模型
 * @param {Array} BASE_DEPS|dependencies 
 * @param {Array} BASE_DEV_DEPS|devDependencies
 * @param {string}
 */

export const BASE_DEV_DEPS: Array<string> = [
  'eslint@^7.25.0',
  'prettier@^2.7.1',
  'eslint-friendly-formatter@^4.0.1',
  'eslint-plugin-prettier@^4.0.0',
  'eslint-plugin-html@^6.2.0',
  'eslint-config-prettier@^8.5.0',
];

// Vue eslint configuration
export const BASE_DEV_DEPS_VUE2: Array<string> = [
  'eslint-plugin-vue@^6.2.2'
];
export const BASE_DEV_DEPS_VUE3: Array<string> = [
  'eslint-plugin-vue@^9.2.0',
  '@typescript-eslint/parser@^5.30.7'
];

// React eslint configuration
export const BASE_DEV_DEPS_REACT: Array<string> = [
  'eslint-plugin-react@^7.30.1',
  'eslint-plugin-jsx-a11y@^6.6.1',
  '@typescript-eslint/parser@^5.30.7',
  '@typescript-eslint/eslint-plugin@5.30.7',
];

// Eslintignore config
export const ESL_IGNORE: string = `
  .prettierrc
  !commitlint.config.js
  .babel.config.js
  !.umirc.ts
`;