import {axios} from '../../js'
const state = {
  initData: []
}
const actions = {
  async init ({commit, rootState}) {
    const { result, status: {code, msg} } = await axios.get('/cart/index', {params: {}})
    if (code === '00000') {
      commit('getInitData', result)
    } else {
      return new Error(msg)
    }
  }
}
const mutations = {
  getInitData (state, data) {
    state.initData = data
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
