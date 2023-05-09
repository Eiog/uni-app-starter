import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const plugins = [
    // https://github.com/uni-helper/vite-plugin-uni-manifest
    UniHelperManifest(),
    // https://github.com/uni-helper/vite-plugin-uni-pages
    UniHelperPages(),
    // https://github.com/uni-helper/vite-plugin-uni-layouts
    UniHelperLayouts(),
    // https://github.com/uni-helper/vite-plugin-uni-components
    UniHelperComponents({
      dts: 'src/components.d.ts',
      directoryAsNamespace: true,
    }),
    Uni(),
    Unocss(),
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
        'uni-app',
        // 小程序特有的生命周期等从这里引入
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
      exclude: [],
      resolvers: [],
    }),
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
