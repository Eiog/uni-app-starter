import un from '@uni-helper/uni-network'
import type { UnConfig, UnError, UnInstance, UnResponse } from '@uni-helper/uni-network'

let basePrefix = import.meta.env.VITE_API_BASE_PREFIX || ''
// #ifndef H5
basePrefix = import.meta.env.VITE_API_BASE_URL || ''
// #endif

// 创建实例
const instance: UnInstance = un.create({
  // 前缀
  baseUrl: basePrefix,
  // 超时
  timeout: 1000 * 30,
  // 请求头
  headers: {
    'Content-Type': 'application/json',
  },
})
// 请求拦截器
instance.interceptors.request.use(
  (config: UnConfig) => {
    // TODO 在这里可以加上想要在请求发送前处理的逻辑
    // TODO 比如 loading 等
    return config
  },
  (error: UnError) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response: UnResponse<any>) => {
    if (response.status === 200)
      return response.data

    return Promise.reject(response.data)
  },
  (error: UnError) => {
    return Promise.reject(error)
  },
)

export const get: <RES = any, REQ = any>(
  path: string,
  params?: REQ,
) => Promise<UnResponse<RES, REQ>['data']> = (path, params) => {
  return instance.get(path, {
    params: params as any,
  })
}

export const post: <RES = any, REQ = object>(
  path: string,
  data?: REQ,
) => Promise<UnResponse<RES, REQ>['data']> = (path, data) => {
  return instance.post(path, data)
}
export const http = {
  instance,
  get,
  post,
}
