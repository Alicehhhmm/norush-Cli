/**
 * @description 通用类型
 * @param 消息提示样式类型
 */

// template information Types
export type Framework = {
  name: string
  display: string
  color: ColorFunc
  variants?: FrameworkVariant[]
}
export type FrameworkVariant = {
  name?: string
  display?: string
  color?: ColorFunc
  customCommand?: string
}
export type ColorFunc = (str: string | number) => string


// prompt information Types
export type PromptList = {
  type: string,
  message: string,
  name: string,
  choices?: ArrayChoices[],
}
export type ArrayChoices = {
  name: string,
  value: string,
  checked: boolean,
}





