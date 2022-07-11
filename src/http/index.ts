enum Method {
    GET,
    POST,
    PUT,
    DELETE
}
type RequestOption = {
    header?: object
    timeout?: number
    dataType?: string
}

let BASE_URL = ""
// #ifdef H5
BASE_URL = '/api'
// #endif
// #ifdef APP-PLUS
BASE_URL = "/"
// #endif
// #ifdef MP
if (process.env.NODE_ENV === 'development') {
    BASE_URL = "https://mock.apifox.cn/m1/1199247-0-default"
} else {
    BASE_URL = "/"
}
// #endif


function request(url: string, data?: object | string | ArrayBuffer, method?: keyof typeof Method, option?: RequestOption) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: BASE_URL + url,
            data: data,
            method: method,
            ...option,
            success: res => { return resolve(res.data) },
            fail: err => { return reject(err) }
        })
    })
}
const http = {
    get: (url: string, data?: object) => request(url, data, 'GET'),
    post: (url: string, data?: object) => request(url, data, 'POST')
}
export default http