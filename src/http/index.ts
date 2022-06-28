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
function request(url: string, data?: object | string | ArrayBuffer, method?: keyof typeof Method, option?: RequestOption) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: url,
            data: data,
            method: method,
            ...option,
            success: res => { return resolve(res) },
            fail: err => { return reject(err) }
        })
    })
}
const http = {
    get: (url: string, data?: object) => request(url, data,'GET'),
    post: (url: string, data?: object) => request(url, data,'POST')
}
export default http