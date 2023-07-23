import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      '^vin-(.*)': '@vingogo/uni-ui/lib/components/$1/index.vue',
    },
  },
  pages: [],
  globalStyle: {
    backgroundColor: '@bgColor',
    backgroundColorBottom: '@bgColorBottom',
    backgroundColorTop: '@bgColorTop',
    backgroundTextStyle: '@bgTxtStyle',
    navigationBarBackgroundColor: '#000000',
    navigationBarTextStyle: '@navTxtStyle',
    navigationBarTitleText: 'Vitess-Uni',
    navigationStyle: 'custom',
  },
  tabBar: {
    backgroundColor: '#FFF',
    borderStyle: '@tabBorderStyle',
    color: '#333',
    selectedColor: '#000',
    list: [
      {
        pagePath: 'pages/index',
        text: '首页',
      },
      {
        pagePath: 'pages/about',
        text: '关于',
      },
    ],
  },
})
