import {axios} from '../../js';
import qs from 'qs';
const state = {
  initData: [],
  orderId: ''
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
    const { result, status: {code, msg} } = await axios.post('/order/pay', qs.stringify({'ids': params.ids, 'address_id': params.address_id}));
    if (code === '00000') {
      commit('getOrderId', result.order_sn);
    } else {
      return msg;
    }
  }
};
const mutations = {
  getInitData (state, data) {
    state.initData = data;
  },
  getOrderId (state, data) {
    state.orderId = data;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
