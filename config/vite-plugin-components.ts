import type { PluginOption } from 'vite'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import { AnoResolver } from 'ano-ui'
import { NutResolver } from 'nutui-uniapp'
import { VinUIResolver } from '../plugin/vin-ui-resolver'
import { WotDesignResolver } from '../plugin/wot-design-resolver'

export function VitePluginComponents(): PluginOption[] {
  return [
    UniHelperComponents({
      dirs: ['src/components', 'src/layouts'],
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: [AnoResolver(), NutResolver(), VinUIResolver(), WotDesignResolver()],
      // https://wot-design-uni.cn/
      // https://ano-ui.vercel.app/
    }), // https://uni-helper.js.org/vite-plugin-uni-components

  ]
}
