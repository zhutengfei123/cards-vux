import axios from 'axios'
import qs from 'qs'
// import { BASE_URL } from './baseUrl'

var axiosObejct = axios.create({
  timeout: 30000,
  responseType: 'json'
})
// http request 拦截器
axiosObejct.interceptors.request.use(
  config => {
    config.headers = Object.assign(config.headers ? config.headers : {}, {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
    // 打印请求路径
    console.log('请求地址:' + config.url)

    // 打印请求查询参数
    if (config.params) {
      console.log('查询参数:' + qs.stringify(config.params))
    }

    // 打印post请求体
    if (config.method === 'post') {
      if (config.data) {
        console.log(config.data)
        console.log('请求体body:' + config.data)
      }
    }
    // config.withCredentials = true
    return config
  },
  err => {
    console.log('请求出错:\n')
    console.log(err)
  }
)

export default axiosObejct
