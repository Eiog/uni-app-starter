import { MockMethod } from 'vite-plugin-mock';
import Mock, { Random } from 'mockjs';
const baseUrl = '/api'
export default[
    {
        url:baseUrl+'/demo',
        method:'get',
        timeout:2000,
        response:()=>{
            return{
                code:200,
                msg:'ok'
            }
        }
    }
]as MockMethod[]