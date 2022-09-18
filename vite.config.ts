import { defineConfig } from 'vite';
import { resolve } from 'path';
import uni from '@dcloudio/vite-plugin-uni';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import transformWeClass from 'unplugin-transform-we-class/vite';
import {
  presetAttributifyWechat,
  defaultAttributes,
} from 'unplugin-unocss-attributify-wechat/vite';
// https://vitejs.dev/config/

export default defineConfig(() => {
  const plugins = [
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
        { '@dcloudio/uni-app': ['onLaunch', 'onShow', 'onHide'] },
      ],
      dirs: ['src/hooks', 'src/stores', 'src/utils'],
      dts: 'src/typings/auto-import.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    Components({
      /* options */
      dirs: ['src/components', 'src/layouts'],
      extensions: ['vue'],
      deep: true,
      dts: 'src/typings/components.d.ts',
      resolvers: [],
    }),
    uni(),
    presetAttributifyWechat({
      nonValuedAttribute: true,
      classPrefix: 'u-',
      attributes: [...defaultAttributes],
    }),
    transformWeClass({}),
    process.env.UNI_COMPILER !== 'nvue' ? Unocss() : undefined,
  ];
  return {
    plugins: plugins,
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'), // 路径别名
        thorui: 'thorui-uni/lib/thorui', // 路径别名
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
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
