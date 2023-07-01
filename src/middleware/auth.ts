import { defineMiddleware } from '@uni-helper/vite-plugin-uni-middleware/runtime'

export default defineMiddleware((to, from) => {
  // eslint-disable-next-line no-console
  console.log(to, from)

  return to.route
})
