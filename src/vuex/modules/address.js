import { axios } from '../../js';
const state = {
  list: []
};

const actions = {
  async getData ({commit, state}) {
    const list = [...state.list];
    axios.get('/address/index').then(({result, status: {code, msg}}) => {
      if (code === '00000') {
        commit('setList', list.push(result));
      } else {
        return msg;
      }
    });
  },
  async remove ({commit, state}, id) {
    const list = [...state.list];
    axios.delete('/address/delete', {data: {id}}).then(({result, status: {code, msg}}) => {
      const index = list.findIndex(item => item.id === id);
      if (code === '00000') {
        commit('setList', list.splice(index, 1));
      } else {
        return msg;
      }
    });
  },
  async add ({commit, state}, {name, phone, province, city, district, town, address}) {
    const list = [...state.list];
    axios.post('/address/add', {name, phone, province, city, district, town, address}).then(({result, status: {code, msg}}) => {
      if (code === '00000') {
        commit('setList', list.unshift(result));
      } else {
        return msg;
      }
    });
  },
  async update ({commit, state}, {name, phone, province, city, district, town, address, id}) {
    const list = [...state.list];
    axios.post('/address/update', {name, phone, province, city, district, town, address, id}).then(({result, status: {code, msg}}) => {
      const index = list.findIndex(item => item.id === id);
      if (code === '00000') {
        commit('setList', list.splice(index, 1, result));
      } else {
        return msg;
      }
    });
  }
};

const mutations = {
  setList (state, list) {
    state.list = list;
  }
};

const getter = {
  findById (state) {
    return id => state.list.filter(item => item.id === id);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getter,
  mutations
};
