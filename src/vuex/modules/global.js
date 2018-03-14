const state = {
  title: ''
};

const actions = {};
const mutations = {
  setTitle (state, data) {
    state.title = data;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
