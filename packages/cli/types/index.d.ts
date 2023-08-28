/**
 * @description 通用类型
 * @param 消息提示样式类型
 */


// template information Types
type Framework = {
  name: string
  display: string
  color: ColorFunc
  variants?: FrameworkVariant[]
}
type FrameworkVariant = {
  name: string
  display: string
  color: ColorFunc
  customCommand?: string
}
type ColorFunc = (str: string | number) => string


// prompt information Types
type PromptList = {
  type: string,
  message: string,
  name: string,
  choices?: ArrayChoices[],
}
type ArrayChoices = {
  name: string,
  value: string,
  checked: boolean,
}

