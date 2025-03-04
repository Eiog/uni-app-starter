import type { UnConfig, UnError, UnInstance, UnResponse } from '@uni-helper/uni-network'
import process from 'node:process'
import un from '@uni-helper/uni-network'

let basePrefix = import.meta.env.VITE_API_BASE_PREFIX || ''
// #ifndef H5
if (process.env.NODE_ENV === 'development')
  basePrefix = import.meta.env.VITE_API_BASE_URL_DEV || ''
else
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

export function get<RES = any, REQ = object>(path: string, data?: REQ): Promise<RES> {
  return instance(path, {
    method: 'get',
    params: data as any,
  })
}
export function post<RES extends string | object>(path: string, data?: Record<string, any>): Promise<RES> {
  return instance(path, {
    method: 'post',
    data,
  })
}
