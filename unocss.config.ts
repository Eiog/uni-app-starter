import { presetIcons } from "unocss";
import presetWeapp from 'unocss-preset-weapp'
export default ({
  presets: [
    presetWeapp({
      prefix: 'u-',

    }),
    presetIcons({
      // 其他选项
      prefix: "i-",
      extraProperties: {
        display: "inline-block",
      },
    }),
  ]
});