import { createRouter } from 'uni-mini-router'
import pagesJsonToRoutes from 'uni-parse-pages'
import pagesJson from '../pages.json'

export const router = createRouter({
  routes: [...pagesJsonToRoutes(pagesJson)],
})
useRouteGuard(router)
