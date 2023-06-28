import type { App } from 'vue'
import { setupPinia } from './pinia'
import { setupAssets } from './assets'
import { setupI18n } from './i18n'

export function useModules(app: App) {
  setupPinia(app)
  setupI18n(app)
  setupAssets()
}
