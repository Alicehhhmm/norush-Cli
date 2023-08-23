import prompts from 'prompts'
import logoPrompts from "./logoFonts";
import { argTargetDir, argTemplate } from "./utils";
import { PROMPTLIST, FRAMEWORKS, SELECT_MODEL } from "./inquirer";
import initCustomize from "./initCustomize";
import initTemplate from "./initTemplate";
import { lightRed, reset } from 'kolorist'


(async function initApp() {
  try {
    logoPrompts()
    const result = await prompts(
      [
        {
          type: argTemplate || argTargetDir ? null : 'select',
          name: 'selectModel',
          message: reset('请选择需要定制的模式:'),
          choices: SELECT_MODEL.map((model) => {
            return {
              title: model.color(model.display || model.name),
              value: model,
            }
          }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(lightRed('✖') + ' 操作已取消!')
        },
      },
    )
    result?.selectModel?.name === 'customizeConfig' || argTemplate || argTargetDir
      ? initCustomize()
      : initTemplate()

  } catch (err: any) {
    console.log(err.message);
  }
})();






