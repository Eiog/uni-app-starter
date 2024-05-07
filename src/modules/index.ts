import type { App } from 'vue'

import { i18n } from './i18n'
import { pinia } from './pinia'
import { router } from './router'

export * from './i18n'
export * from './pinia'
export * from './router'
export function useModules(app: App) {
  app
    .use(i18n)
    .use(pinia)
    .use(router)
}
