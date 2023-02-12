let BASE_URL = ''
// #ifdef H5
BASE_URL = '/api'
// #endif
// #ifdef APP-PLUS
BASE_URL = '/'
// #endif
// #ifdef MP
if (process.env.NODE_ENV === 'development')
  BASE_URL = 'https://mock.apifox.cn/m1/1199247-0-default'
else
  BASE_URL = '/'

// #endif
export const http: (options: UniApp.RequestOptions) => Promise<any> = ({ url, data, header, method, dataType, responseType, sslVerify }) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      data,
      header: header ?? {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      method,
      dataType,
      responseType,
      sslVerify,
      success: (res) => {
        const { data, statusCode } = res
        if (statusCode === 200)
          return resolve(data)
        return reject(res)
      },
      fail: (error) => {
        return reject(error)
      },

    })
  })
}
export const get: <REQ = AnyObject, RES = any>(url: string, data: REQ) => Promise<RES> = (url, data) => http({ url, data: data as UniApp.RequestOptions['data'], method: 'GET' })
export const post: <REQ = AnyObject, RES = any>(url: string, data: REQ) => Promise<RES> = (url, data) => http({ url, data: data as UniApp.RequestOptions['data'], method: 'POST' })
