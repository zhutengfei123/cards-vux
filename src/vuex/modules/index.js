import axios from '../../js/ajax'
const state = {
  headerImages: [],
  focus: {
    title: '',
    list: []
  },
  mainRecommend: {
    title: '',
    list: []
  },
  scrollers: [],
  recommend: {
    title: '',
    list: []
  }
}

const actions = {
  async init ({commit, rootState}) {
    const { result, status: {code, msg} } = await axios.get('/index', {params: {store_id: rootState.global.storeId, source: 1}})
    if (code === '00000') {
      commit('setHeaderImages', result[0].block_content)
      commit('setFocus', result[1].block_content)
      commit('setMainRecommend', result[2].block_content)
      commit('setScrollers', result[3].block_content)
      commit('setRecommend', result[4].block_content)
    } else {
      return new Error(msg)
    }
  },
  async loadMore ({commit, rootState}, {page, pageSize}) {
    const {result, status: {code, msg}} = await axios.get('/index/gethotproduct', {params: {store_id: rootState.global.storeId, page, pageSize}})
    if (code === '00000') {
      commit('pushRecommend', result.list)
    } else {
      return new Error(msg)
    }
  }
}

const mutations = {
  setHeaderImages (state, data) {
    state.headerImages = data
  },
  setFocus (state, data) {
    state.focus = data
  },
  setMainRecommend (state, data) {
    state.mainRecommend = data
  },
  setScrollers (state, data) {
    state.scrollers = data
  },
  setRecommend (state, data) {
    state.recommend = data
  },
  pushRecommend (state, data) {
    if (data.length > 0) {
      state.recommend.list.push(...data)
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
