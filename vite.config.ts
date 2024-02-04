import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import Unocss from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import postcssPresetEnv from 'postcss-preset-env'
import px2rpx from 'postcss-pxtorpx-pro'
import { VitePluginMock } from './plugin/vite-plugin-mock'
import { VitePluginAutoImport, VitePluginComponents, VitePluginI18n } from './config'

// https://uni-helper.js.org/uni-use
// https://uni-helper.js.org/axios-adapter
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const { VITE_DEV_PORT, VITE_API_BASE_PREFIX, VITE_API_BASE_URL, VITE_BASE } = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      UniHelperManifest(), // https://uni-helper.js.org/vite-plugin-uni-manifest
      UniHelperPages(), // https://uni-helper.js.org/vite-plugin-uni-pages
      UniHelperLayouts(), // https://uni-helper.js.org/vite-plugin-uni-layouts

      // UniMiddleware(), // https://uni-helper.js.org/vite-plugin-uni-middleware
      Unocss(),
      Icons({ compiler: 'vue3' }),
      VitePluginMock({ prefix: VITE_API_BASE_PREFIX }),
      ...VitePluginAutoImport(),
      ...VitePluginComponents(),
      ...VitePluginI18n(),
      Uni(),
    ],
    clearScreen: true,
    base: VITE_BASE ?? '/',
    server: {
      port: Number(VITE_DEV_PORT),
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      open: false, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: true, // 如果端口已占用直接退出
      proxy: VITE_API_BASE_URL === ''
        ? undefined
        : {
            [VITE_API_BASE_PREFIX]: {
              target: VITE_API_BASE_URL,
              changeOrigin: true,
              rewrite: path => path.replace(/^\`${VITE_API_BASE_PREFIX}`/, ''),
            },
          },
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'), // 路径别名
        'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
        scopeBehaviour: 'local',
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@import "nutui-uniapp/styles/variables.scss";',
        },
      },
      postcss: {
        plugins: [
          postcssPresetEnv(),
          px2rpx({
            replace: false,
            transform: x => 2 * x,
            exclude: 'node_modules',
          }),
        ],
      },
    },
  }
})
