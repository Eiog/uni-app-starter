/* eslint-disable no-console */
import type { Router } from 'uni-mini-router'

export function useRouteGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    next()
  })
  router.afterEach(() => {
    const { language } = useAppStore()
    console.log(language)
  })
}
