import { defineConfig } from "vite";
import { resolve } from 'path'
import uni from "@dcloudio/vite-plugin-uni";
import Unocss from 'unocss/vite'
import { UnocssToUni } from "vite-plugin-unocss-to-uni";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { viteMockServe } from 'vite-plugin-mock'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import Icons from 'unplugin-icons/vite'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const useMock = mode==='mock'
  
  const plugins = [
    AutoImport({
      /* options */
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: [
        "vue",
        "@vueuse/core",
        // 小程序特有的生命周期等从这里引入
        { "@dcloudio/uni-app": ["onLaunch", "onShow", "onHide"] },
      ],
      dirs: ["src/hooks", "src/store", "src/utils", "src/api"],
      dts: "src/typings/auto-import.d.ts",
    }),
    Components({
      /* options */
      dirs: ["src/components"],
      extensions: ["vue"],
      deep: true,
      dts: "src/typings/components.d.ts",
      resolvers: [],
    }),
    viteMockServe({
      mockPath: './src/mock',
      localEnabled: true,
      prodEnabled:false,
      supportTs: true,
      watchFiles: true,
      injectCode: `
          import { setupProdMockServer } from './mock';
          setupProdMockServer();
        `
    }),
    Icons({ compiler: 'vue3', autoInstall: true }),
    viteCommonjs(),
    uni(),
    Unocss(),
    UnocssToUni(),
    VueSetupExtend(),
  ]
  return {
    plugins: plugins
    ,
    resolve: {
      alias: {
        "@": resolve(__dirname, './src'), // 路径别名
      }
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
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
  }
});
