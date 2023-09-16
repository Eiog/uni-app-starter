import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
    },
  },
  pages: [],
  middleware: ['global'],
  globalStyle: {
    backgroundColor: '@bgColor',
    backgroundColorBottom: '@bgColorBottom',
    backgroundColorTop: '@bgColorTop',
    backgroundTextStyle: '@bgTxtStyle',
    navigationBarBackgroundColor: '#000000',
    navigationBarTextStyle: '@navTxtStyle',
    navigationBarTitleText: 'Vitess-Uni',
    navigationStyle: 'default',
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
