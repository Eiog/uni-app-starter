import { createSSRApp } from 'vue'
import 'uno.css'
import '@vingogo/uni-ui/lib/style.css'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createNavigationGuardPlugin } from '../plugin/vite-plugin-uni-middleware-runtime'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  const guard = createNavigationGuardPlugin()
  const i18n = createI18n({
    locale: 'en_us',
    legacy: false,
    fallbackLocale: 'en_us',
    messages,
  })
  const pinia = createPinia().use(createPersistedState())
  app.use(pinia)
  app.use(i18n)
  app.use(guard)

  return {
    app,
  }
}
