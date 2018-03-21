import { axios } from '../../js';
import qs from 'qs';
const state = {
  addressList: [
    {
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      address: ''
    }
  ]
};
const actions = {
  async getData ({commit, rootState}, params) {
    const {result, status: {code, msg}} = await axios.get('/address/index', {'params': params});
    if (code === '00000') {
      commit('setList', result);
    } else {
      return msg;
    }
  },
  async remove ({commit, rootState}, params) {
    const {status: {code, msg}} = await axios.post('/address/delete', qs.stringify(params));
    if (code === '00000') {
    } else {
      return msg;
    }
  },
  async setDefaultAdress ({commit, rootState}, params) {
    const {status: {code, msg}} = await axios.post('/address/set-default', qs.stringify(params));
    if (code === '00000') {
    } else {
      return msg;
    }
  },
  async editAddress ({commit, rootState}, params) {
    const {status: {code, msg}} = await axios.post('/address/update', qs.stringify(params));
    if (code === '00000') {
    } else {
      return msg;
    }
  },
  async addAddress ({commit, rootState}, params) {
    const {status: {code, msg}} = await axios.post('/address/add', qs.stringify(params));
    if (code === '00000') {
    } else {
      return msg;
    }
  }
};
const mutations = {
  setList (state, data) {
    state.addressList = data;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
