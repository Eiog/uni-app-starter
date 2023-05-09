import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      '^vin-(.*)': '@vingogo/uni-ui/lib/components/$1/index.vue',
      'nut-(.*)?-(.*)': 'uni-nutui/components/sky-nutui/packages/__VUE/$1$2/index.vue',
      'nut-(.*)': 'uni-nutui/components/sky-nutui/packages/__VUE/$1/index.vue',
      '^u-(.*)': 'uview-plus/components/u-$1/u-$1.vue',
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
    backgroundColor: '@tabBgColor',
    borderStyle: '@tabBorderStyle',
    color: '@tabFontColor',
    selectedColor: '@tabSelectedColor',
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
