import { resolve } from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import type { ComponentResolver } from 'unplugin-vue-components'
import Icons from 'unplugin-icons/vite'
// https://vitejs.dev/config/
const UviewUiResolver = (): ComponentResolver => {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^(U[-A-Z]|u-[-a-z])/)) {
        const cName = name.slice(1).match(/([A-Z])([a-z]+)/g)?.map(m => m.toLowerCase()).toString().replace(',', '-')
        return {
          from: `uview-plus/components/u-${cName}/u-${cName}.vue`,
        }
      }
    },
  }
}
const UniNutUiResolver = (): ComponentResolver => {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^(Nut[A-Z]|nut-[a-z])/)) {
        const cName = name.slice(3).toLowerCase()
        return {
          from: `uni-nutui/components/sky-nutui/packages/__VUE/${cName}/index.vue`,
        }
      }
    },
  }
}
export default defineConfig(() => {
  const plugins = [
    Icons({ compiler: 'vue3' }),
    AutoImport({
      /* options */
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: [
        'vue',
        '@vueuse/core',
        'pinia',
        // 小程序特有的生命周期等从这里引入
        { '@dcloudio/uni-app': ['onLaunch', 'onShow', 'onHide', 'onLoad'] },
      ],
      dirs: ['src/hooks', 'src/stores', 'src/utils'],
      dts: 'src/typings/auto-import.d.ts',
      vueTemplate: true,
    }),
    Components({
      /* options */
      dirs: ['src/components', 'src/layouts'],
      extensions: ['vue'],
      deep: true,
      dts: 'src/typings/components.d.ts',
      include: [/[\\/]node_modules[\\/]uni-nutui[\\/]/, /\.vue$/],
      exclude: [],
      resolvers: [UviewUiResolver(), UniNutUiResolver()],
    }),
    uni(),
    Unocss(),
  ]
  return {
    plugins,
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'), // 路径别名
        '~nutui': resolve(__dirname, './node_modules/uni-nutui/components/sky-nutui/packages/__VUE'),
        '~uview': resolve(__dirname, './node_modules/uview-plus/components'),
      },
    },
    server: {
      port: 9999,
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      open: false, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: true, // 如果端口已占用直接退出
      proxy: {
        '/api': {
          target: 'https://mock.apifox.cn/m1/1199247-0-default/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
