import { axios } from '../../js';
// 用户 Store
const state = {
  user: null,
  token: localStorage.getItem('token'),
  account: '',
  company: '',
  realname: '',
  avatar: '',
  level: '',
  balance: ''
};

const actions = {
  async login ({commit, rootState}, {mobile, password}) {
    const {result, status: {code, msg}} = await axios.post('/site/login', {
      store_id: rootState.global.storeId,
      mobile,
      type: 1,
      pwd: password
    });
    if (code === '00000') {
      commit('setToken', result.token);
    } else {
      return msg;
    }
  },
  async register ({commit, rootState}, {mobile, password, company, code}) {
    const {result, status} = await axios.post('/site/register', {
      store_id: rootState.global.storeId,
      mobile,
      password,
      company,
      code
    });
    if (status.code === '00000') {
      commit('setToken', result.token);
    } else {
      return status.msg;
    }
  },
  async sendCode ({commit, rootState}, {mobile, type}) {
    const {status} = await axios.post('/site/send-code', {
      store_id: rootState.global.storeId,
      mobile,
      type
    });
    if (status.code !== '00000') {
      return status.msg;
    }
  },
  async getInfo ({commit, state}) {
    const {result, status: {code, msg}} = await axios.get('/site/user-info');
    if (code === '00000') {
      commit('setInfo', {
        ...state,
        company: result.company,
        realname: result.realname,
        avatar: result.head_pic,
        level: result.level_name,
        balance: result.balance
      });
    } else {
      return msg;
    }
  },
  async updateInfo ({commit, state}, {realname, avatar}) {
    const {status: {code, msg}} = await axios.post('/site/update-info', {realname, head_pic: avatar});
    if (code === '00000') {
      commit('setInfo', {
        ...state,
        realname,
        avatar
      });
    } else {
      return msg;
    }
  },
  async resetPwd ({commit, rootState}, {mobile, password, code}) {
    const {status: {msg}} = await axios.post('/site/reset-pwd', {
      store_id: rootState.global.storeId,
      mobile,
      password,
      code
    });
    return msg;
  }
};

const mutations = {
  setInfo (state, data) {
    for (const prop in data) {
      state[prop] = data[prop];
    }
  },
  setToken (state, token) {
    state.token = token;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
