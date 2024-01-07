import axios from 'axios'
import { ACCESS_TOKEN } from '@/const'



const service = axios.create({
    baseURL: "https://127.0.0.1/api"
})

service.interceptors.request.use(config => {
    const token = sessionStorage.getItem(ACCESS_TOKEN) || localStorage.getItem(ACCESS_TOKEN)
    if (token) {
        config.headers.Authorization = "Bearer " + token
    }
    return config
})


interface LoginParam {
    username: string
    password: string
}

/**
 * 用户登录接口
 * @param userinfo 用户登录信息
 * @returns 
 */
export function loginApi(userinfo: LoginParam) {
    return service.post('/token/create', userinfo)
}