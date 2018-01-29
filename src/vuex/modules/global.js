const state = {
  storeId: '',
  title: ''
};

const actions = {};
const mutations = {
  setTitle (state, data) {
    state.title = data;
  },
  setStoreId (state, data) {
    state.storeId = data;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
