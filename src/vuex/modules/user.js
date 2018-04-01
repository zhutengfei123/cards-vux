import { axios } from '../../js';
import qs from 'qs';
const state = {
  token: localStorage.getItem('token') || '',
  isRead: {},
  userInfo: {},
  phone: ''
};
const actions = {
  async login ({commit, rootState}, params) {
    const {result, status: {code, msg}} = await axios.post('/site/login', qs.stringify(params));
    if (code === '00000') {
      localStorage.setItem('token', result.token);
      commit('setToken', result.token);
    } else {
      return msg;
    }
  },
  async register ({commit, rootState}, params) {
    const {status} = await axios.post('/site/register', qs.stringify(params));
    if (status.code === '00000') {
    } else {
      return status.msg;
    }
  },
  async sendCode ({commit, rootState}, params) {
    const {status} = await axios.post('/site/send-code', qs.stringify(params));
    if (status.code !== '00000') {
      return status.msg;
    }
  },
  async getInfos ({commit, rootState}, params) {
    const {result, status: {code, msg}} = await axios.get('/site/user-info', {'params': params});
    let list = await axios.get('/site/user-info', {'params': params});
    if (code === '00000') {
      commit('setInfo', result);
      return list;
    } else {
      return msg;
    }
  },
  async initGetIsRead ({commit, rootState}, params) {
    const {result, status: {code, msg}} = await axios.get('/site/is-read-by-intention', {'params': params});
    if (code === '00000') {
      commit('getIsRead', result);
    } else {
      return msg;
    }
  },
  async resetPwd ({commit, rootState}, {mobile, password, code}) {
    const {status} = await axios.post('/site/reset-pwd', qs.stringify({
      store_id: localStorage.getItem('store_id') || '',
      mobile,
      password,
      code
    }));
    return status;
  },
  async getKPhone ({commit, rootState}, params) {
    const { result, status: {code, msg} } = await axios.get('site/index', {'params': params});
    if (code === '00000') {
      commit('getPhoneV', result.kf_phone);
    } else {
      return msg;
    }
  }
};
const mutations = {
  setInfo (state, data) {
    state.userInfo = data;
  },
  setToken (state, data) {
    state.token = data;
  },
  getIsRead (state, data) {
    state.isRead = data;
  },
  getPhoneV (state, data) {
    state.phone = data;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
