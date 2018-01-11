// 用户 Store
const state = {
  user: null,
  logined: false,
  token: localStorage.getItem('token'),
  account: ''
}

const actions = {
  async login () {},
  async register () {}
}

const mutations = {
  setUser () {}
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
