import { axios } from '../../js'
const state = {
  list: []
}

const actions = {
  async getData ({commit, state}) {
    const list = [...state.list]
    const {result, status: {code, msg}} = await axios.get('/address/index')
    if (code === '00000') {
      commit('setList', list.push(result))
    } else {
      return msg
    }
  },
  async remove ({commit, state}, id) {
    const list = [...state.list]
    const {status: {code, msg}} = await axios.delete('/address/delete', {data: {id}})
    const index = list.findIndex(item => item.id === id)
    if (code === '00000') {
      commit('setList', list.splice(index, 1))
    } else {
      return msg
    }
  },
  async add ({commit, state}, {name, phone, province, city, district, town, address}) {
    const list = [...state.list]
    const {result, status: {code, msg}} = await axios.post('/address/add', {name, phone, province, city, district, town, address})
    if (code === '00000') {
      commit('setList', list.unshift(result))
    } else {
      return msg
    }
  },
  async update ({commit, state}, {name, phone, province, city, district, town, address, id}) {
    const list = [...state.list]
    const {result, status: {code, msg}} = await axios.post('/address/update', {name, phone, province, city, district, town, address, id})
    const index = list.findIndex(item => item.id === id)
    if (code === '00000') {
      commit('setList', list.splice(index, 1, result))
    } else {
      return msg
    }
  }
}

const mutations = {
  setList (state, list) {
    state.list = list
  }
}

const getter = {
  findById (state) {
    return id => state.list.filter(item => item.id === id)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getter,
  mutations
}
