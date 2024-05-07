import 'uno.css'
import '@unocss-applet/reset/uni-app/tailwind-compat.css'
import '@vingogo/uni-ui/lib/style.css'
import 'nutui-uniapp/styles/index.scss'

import { createSSRApp } from 'vue'

import App from './App.vue'
import { useModules } from './modules'

export function createApp() {
  const app = createSSRApp(App)
  useModules(app)

  return {
    app,
  }
}
