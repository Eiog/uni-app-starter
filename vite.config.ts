import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import UniMiddleware from '@uni-helper/vite-plugin-uni-middleware'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import { AnoResolver } from 'ano-ui'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://uni-helper.js.org/uni-use
// https://uni-helper.js.org/axios-adapter
// https://vitejs.dev/config/
export default defineConfig(() => {
  const plugins = [
    UniHelperManifest(), // https://uni-helper.js.org/vite-plugin-uni-manifest
    UniHelperPages(), // https://uni-helper.js.org/vite-plugin-uni-pages
    UniHelperLayouts(), // https://uni-helper.js.org/vite-plugin-uni-layouts
    UniHelperComponents({
      dts: 'src/typings/components.d.ts',
      directoryAsNamespace: true,
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: [AnoResolver()],
    }), // https://uni-helper.js.org/vite-plugin-uni-components
    Uni(),
    UniMiddleware(), // https://uni-helper.js.org/vite-plugin-uni-middleware
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
        'uni-app',
        'vue-i18n',
        'pinia',
      ],
      dirs: ['src/hooks', 'src/composables', 'src/stores', 'src/utils'],
      dts: 'src/typings/auto-import.d.ts',
      vueTemplate: true,
    }),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: resolve(__dirname, './src/locales/**'),
    }), // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n

  ]
  return {
    plugins,
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'), // 路径别名
        'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
      },
    },
    server: {
      port: 3900,
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
