import { createRouter } from 'uni-mini-router'
import pagesJsonToRoutes from 'uni-parse-pages'
import pagesJson from '../pages.json'

const router = createRouter({
  routes: [...pagesJsonToRoutes(pagesJson)],
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach')

  // const { isLogin } = useAppStore()
  // if (!isLogin && to && to.path !== '/pages/login') {
  //   // 如果没有登录信息且目标路由不是登录页面则跳转到登录页面
  //   next({ path: '/pages/login', navType: 'replaceAll' })
  // }
  // else if (isLogin && to && to.path === '/pages/login') {
  //   // 如果已经登录且目标页面是登录页面则跳转至首页
  //   next({ path: '/pages/index', navType: 'replaceAll' })
  // }
  // else {
  //   next()
  // }
  next()
})
router.afterEach((to, from) => {
  console.log('afterEach')

  // const { isLogin } = useAppStore()
  // if (!isLogin && to.path !== '/pages/login') {
  //   // 如果没有登录信息且目标路由不是登录页面则跳转到登录页面
  //   router.replaceAll({ path: '/pages/login' })
  // }
  // else if (isLogin && to.path === '/pages/login') {
  //   // 如果已经登录且目标页面是登录页面则跳转至首页
  //   router.replaceAll({ path: '/pages/index' })
  // }
})

export default router
