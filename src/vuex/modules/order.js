import { axios } from '../../js';
const state = {
  orders: [],
  page: 1
};

const actions = {
  async getOrders ({commit, state}, {page, orderStatus}) {
    const orders = [...state.orders];
    const {result, status} = await axios.post('/order/get-order-list', {page, order_status: orderStatus});
    if (status.code === '00000') {
      orders.push(...result.list);
      commit('setOrders', {orders, page: state.page + 1});
    } else {
      return status.msg;
    }
  }
};

const mutations = {
  setOrders (state, data) {
    state.orders = data.orders;
    state.page = data.page;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
