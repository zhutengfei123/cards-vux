import { axios } from '../../js';
const state = {
  orders: []
};

const getters = {
  getOrdersByType ({orders}) {
    return (type) => {
      orders.filter(order => order.type === type);
    };
  }
};

const actions = {
  async getOrders ({commit}) {
    const result = await axios
      .get('', {params: {}})
      .then(() => {});
    return result;
  }
};

const mutations = {
  setOrders () {}
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
