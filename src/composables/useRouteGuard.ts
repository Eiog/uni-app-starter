/* eslint-disable no-console */
import type { Router } from 'uni-mini-router'

export function useRouteGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const { language } = useLanguage()
    console.log(language.value)

    next()
  })
  router.afterEach(() => {

  })
}
