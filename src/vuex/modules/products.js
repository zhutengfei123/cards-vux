import {axios} from '../../js';
// import qs from 'qs';
const state = {
  initData: []
};
const actions = {
  async init ({commit, rootState}, params) {
    const { result, status: {code, msg} } = await axios.get('/index.php/card-shop', {'params': params});
    if (code === '00000') {
      commit('getInitData', result);
    } else {
      return msg;
    }
  }
};
const mutations = {
  getInitData (state, data) {
    state.initData = data;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
