// 用户 Store
const state = {
  storeId: '1000227',
  title: ''
}
const mutations = {
  setTitle (state, title) {
    state.title = title
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
