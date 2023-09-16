import type { ComponentPublicInstance, Plugin } from 'vue'
import { middlewares } from 'virtual:uni-middleware'

export interface Page extends ComponentPublicInstance {
  $mpType: string
  $pages: Record<string, any>
  $vm: Page
  route: string
}

export type MiddlewareReturn =
  | void
  | boolean
  | string
  | {
    url: string
    method: 'navigateTo' | 'redirectTo' | 'switchTab' | 'reLaunch'
    options: Record<string, any>
  }
export type MiddlewareRuntime = (to: Page, from?: Page) => MiddlewareReturn | Promise<MiddlewareReturn>

export function createNavigationGuardPlugin(): Plugin {
  let from: Page
  let to: Page
  return {
    install(app) {
      app.mixin({
        async onShow() {
          const pages = getCurrentPages<Page>()
          const page = pages[pages.length - 1]
          if (!page)
            return
          if (page.route === from?.route)
            return
          to = page
          try {
            const pageMiddlewares = middlewares.global.concat(
              middlewares[to.route] ?? [],
            )

            for (const middleware of pageMiddlewares) {
              const result = await middleware(to, from)
              if (result === undefined) {
                continue
              }
              else if (typeof result === 'boolean' && result) {
                continue
              }
              else if (typeof result === 'boolean' && !result) {
                if (pages.length >= 2) {
                  uni.navigateBack()
                }
                else {
                  uni.reLaunch({
                    url: from.route,
                  })
                }
              }
              else if (typeof result === 'string') {
                uni.redirectTo({
                  url: result,
                })
              }
              else {
                const { method, options, url } = result
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                uni[method]({
                  url,
                  ...options,
                })
              }
            }
          }
          catch (error) {}
          from = to
        },
      })
    },
  }
}

export function defineMiddleware(middleware: MiddlewareRuntime) {
  return middleware
}
