import {axios} from '../../js';
import qs from 'qs';
const state = {
  initData: []
};
const actions = {
  async init ({commit, rootState}, params) {
    const { result, status: {code, msg} } = await axios.post('/order/preorder', qs.stringify({'ids': params.ids}));
    if (code === '00000') {
      commit('getInitData', result);
    } else {
      return msg;
    }
  },
  async isConfirmOrder ({commit, rootState}, params) {
    const { status: {code, msg} } = await axios.post('/order/pay', qs.stringify({'ids': params.ids, 'address_id': params.address_id}));
    if (code === '00000') {
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
