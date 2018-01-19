import {axios} from '../../js';
// import qs from 'qs';
const state = {
  initData: [],
  categoryData: [
    {children: []}
  ]
};
const actions = {
  async init ({commit, rootState}, params) {
    const { result, status: {code, msg} } = await axios.get('/index.php/card-shop', {'params': params});
    if (code === '00000') {
      commit('getInitData', result);
    } else {
      return msg;
    }
  },
  async initCategoryData ({commit, rootState}, params) {
    const { result, status: {code, msg} } = await axios.get('/index.php/card-category', {'params': params});
    if (code === '00000') {
      commit('getCategoryData', result);
    } else {
      return msg;
    }
  }
};
const mutations = {
  getInitData (state, data) {
    state.initData = data;
  },
  getCategoryData (state, data) {
    state.categoryData = data;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
