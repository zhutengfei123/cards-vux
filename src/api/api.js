import axios from './ajax'
export const getblocks = params => {
  return axios.get('/index', {params})
}
export const gethotproduct = params => {
  return axios.get('/index/gethotproduct', {params})
}
