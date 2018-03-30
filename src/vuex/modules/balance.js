import { axios } from '../../js';
const state = {
  recordList: [],
  userInfo: {}
};
const actions = {
  async getRecords ({commit, rootState}, params) {
    const {result, status: {code, msg}} = await axios.get('/site/balance-info', {'params': params});
    if (code === '00000') {
      commit('setList', result);
    } else {
      return msg;
    }
  },
  async getInfo ({commit, rootState}, params) {
    const {result, status: {code, msg}} = await axios.get('/site/user-info', {'params': params});
    if (code === '00000') {
      commit('setInfo', result);
    } else {
      return msg;
    }
  }
};
const mutations = {
  setList (state, data) {
    state.recordList = data;
  },
  setInfo (state, data) {
    state.userInfo = data;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
