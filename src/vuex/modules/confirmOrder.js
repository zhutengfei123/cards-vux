import {axios} from '../../js';
import qs from 'qs';
const state = {
  confirmOrderInitData: {
    address: {
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      town: '',
      address: ''
    },
    list: [
      {
        goods: [],
        title: '',
        name: '',
        member_price: '',
        num: '',
        total_price: '',
        freight: ''
      }
    ],
    balance: '',
    total_price: ''
  },
  orderId: '',
  isCreditEnough: localStorage.getItem('isCreditEnough') || ''
};
const actions = {
  async confirmOrderInit ({commit, rootState}, params) {
    const { result, status: {code, msg} } = await axios.post('/order/preorder', qs.stringify(params));
    if (code === '00000') {
      commit('confirmOrderGetInitData', result);
    } else {
      return msg;
    }
  },
  async isConfirmOrder ({commit, rootState}, params) {
    const { result, status: {code, msg} } = await axios.post('/order/pay', qs.stringify(params));
    if (code === '00000') {
      commit('getOrderId', result.order_sn);
    } else {
      return msg;
    }
  }
};
const mutations = {
  confirmOrderGetInitData (state, data) {
    state.confirmOrderInitData = data;
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
