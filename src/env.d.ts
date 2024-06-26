/// <reference types="vite/client" />
/// <reference types="@uni-helper/axios-adapter/client" />
/// <reference types="@uni-helper/vite-plugin-uni-pages/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}
declare module 'virtual:uni-middleware' {
  import type { ComponentPublicInstance } from 'vue'

  interface Page extends ComponentPublicInstance {
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
  export type Middleware = (to: Page, from?: Page) => MiddlewareReturn

  export const middlewares: {
    global: Middleware[]
    [x: string]: Middleware[]
  }
}
// 声明 vite 环境变量
declare interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_BASE: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_BASE_URL_DEV: string
  readonly VITE_API_BASE_PREFIX: string
  readonly VITE_DEV_PORT: number
  // 更多环境变量...
}
