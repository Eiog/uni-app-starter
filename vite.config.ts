import { defineConfig } from "vite";
import { resolve } from 'path'
import uni from "@dcloudio/vite-plugin-uni";
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      uni(),
      Unocss({
        presets: [presetUno(), presetAttributify(), presetIcons()],
      }),
      VueSetupExtend(),
      viteMockServe({
        mockPath:'./src/mock',
        localEnabled:true,
        supportTs:true,
        watchFiles:true
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, './src'), // 路径别名
      }
    },
  }
});
