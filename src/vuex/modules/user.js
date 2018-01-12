import { axios } from '../../js';
// 用户 Store
const state = {
  user: null,
  logined: false,
  token: localStorage.getItem('token'),
  account: '',
  company: '',
  realname: '',
  avatar: '',
  level: '',
  balance: ''
};

const actions = {
  async login () {},
  async register () {},
  async getUserInfo ({commit}) {
    const {result, status: {code, msg}} = await axios.get('/site/user-info');
    if (code === '00000') {
      commit('setUserInfo', result);
    } else {
      return msg;
    }
  }
};

const mutations = {
  setUserInfo (state, data) {
    state.company = data.company;
    state.realname = data.realname;
    state.avatar = data.head_pic;
    state.level = data.level_name;
    state.balance = data.balance;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
