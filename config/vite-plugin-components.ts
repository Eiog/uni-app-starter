import type { PluginOption } from 'vite'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import { NutResolver } from 'nutui-uniapp'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import { VinUIResolver } from '../plugin/vin-ui-resolver'

export function VitePluginComponents(): PluginOption[] {
  return [
    UniHelperComponents({
      dirs: ['src/components', 'src/layouts'],
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: [NutResolver(), VinUIResolver(), WotResolver()],
      // https://wot-design-uni.cn/
      // https://ano-ui.vercel.app/
    }), // https://uni-helper.js.org/vite-plugin-uni-components

  ]
}
