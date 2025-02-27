import type { PluginOption } from 'vite'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import { UniUIResolver, WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import { NutResolver } from 'nutui-uniapp'

export function VitePluginComponents(): PluginOption[] {
  return [
    UniHelperComponents({
      dirs: ['src/components', 'src/layouts'],
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: [NutResolver(), WotResolver(), UniUIResolver()],
      // https://wot-design-uni.cn/
      // https://ano-ui.vercel.app/
    }), // https://uni-helper.js.org/vite-plugin-uni-components

  ]
}
