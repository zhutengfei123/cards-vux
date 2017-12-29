import axios from './apicom'

// 本地调手动设置token
localStorage.setItem('token', 'b54fbbd73628c051127db186ab744909')
// localStorage.setItem('token','5fe9dbac063ddd52a28eae5ee914ce45')
// 初始化调用
export const init = () => {
  return axios.get('/v1/mall', {})
}

/** ******restful接口，axios传参格式规范:******/
/*
.get(url, { params: params })
.post(url, data)
.put(url, data)
.delete(url, { data: params })
 */

// 首页模块

export const getIndexCards = params => {
  return axios.get('/index', { params })
}

export const getUserList = params => {
  return axios.get('/user/addCard', { params })
}
