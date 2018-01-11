import { AjaxPlugin } from 'vux'
import store from '../vuex/store'
const axios = AjaxPlugin.$http

const axiosObejct = axios.create({
  timeout: 30000,
  responseType: 'json',
  baseURL: 'http://cardshopapi.koudaiqifu.cn'
})
// http request 拦截器
axiosObejct.interceptors.request.use(
  config => {
    config.headers = Object.assign(config.headers ? config.headers : {}, {
      token: store.state.user.token
    })
    // config.withCredentials = true
    return config
  },
  err => {
    console.log('请求出错:\n')
    console.log(err)
  }
)

// http response 拦截器
axiosObejct.interceptors.response.use(
  resp => {
    switch (resp.status) {
      case 200:
        let code = resp.data.status.code
        if (code !== '00000') {
        }
        return resp.data
      case 400:
        return new Error('无效请求：\n') // 返回接口返回的错误信息
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        break
      case 404:
        return new Error('404访问的地址不存在')// 返回接口返回的错误信息
      default:
        return new Error('出错了：\n')// 返回接口返回的错误信息
    }
  },
  error => {
    return Promise.reject(error) // 返回接口返回的错误信息
  }
)

export default axiosObejct
