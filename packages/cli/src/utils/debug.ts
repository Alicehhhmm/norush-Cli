import chalk from 'chalk';
const log = console.log;
let debugSwitch = true;

/**
 * @description debug开关，默认开启
 * @param debug |boolean
 */
const switchDebug = (debug: boolean) => {
  debugSwitch = debug;
};

/**
 * @description debug 错误信息
 * @param type |类型
 * @param msg |信息
 * @param process.exit |如果出错就退出
 */
const debugError = (msg: string) => {
  debugSwitch && log(chalk.reset(`#`) + chalk.hex('#646cff')(`[norush-cli]: `) + chalk.red(msg));
  process.exit(0);
};

/**
 * @description debug 信息
 * @param type |类型
 * @param msg |信息
 */
const debugInfo = (msg: string) => {
  debugSwitch && log(chalk.reset(`#`) + chalk.hex('#646cff')(`[norush-cli]: `) + chalk.green(msg));
};

/**
 * @description debug 强调
 * @param type |类型
 * @param msg |信息
 */

const debugProcess = (msg: string) => {
  debugSwitch && log(chalk.reset(`#`) + chalk.hex('#646cff')(`[norush-cli]: `) + chalk.yellow(msg));
};

/**
 * @description debug warning信息
 * @param type |类型
 * @param msg |信息
 */
const debugWarning = (msg: string) => {
  log(chalk.reset(`#`) + chalk.hex('#646cff')(`[norush-cli]: `) + chalk.yellow(msg));
};

const debugTxt = (msg: string) => {
  log(chalk.reset(`#`) + chalk.hex('#646cff')(`[norush-cli]: `) + chalk.hex('#5c6d82')(msg));
};

export {
  switchDebug,
  debugInfo,
  debugError,
  debugWarning,
  debugProcess,
  debugTxt
};
