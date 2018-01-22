import {axios} from '../../js';
import qs from 'qs';
const state = {
  inited: false,
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
  },
  page: 1,
  pageSize: 6,
  isEnd: false,
  intentionList: {}
};

const actions = {
  async init ({commit, rootState}) {
    const { result, status: {code, msg} } = await axios.get('/index', {params: {store_id: rootState.global.storeId, source: 1}});
    if (code === '00000') {
      commit('initData', result);
    } else {
      return msg;
    }
  },
  async loadMore ({commit, rootState, state}) {
    const {page, pageSize} = state;
    const {result: {list}, status: {code, msg}} = await axios.get('/index/gethotproduct', {params: {store_id: rootState.global.storeId, page, pageSize}});
    if (code === '00000') {
      commit('pushRecommend', list);
      commit('setIsEnd', list ? list.length < pageSize : true);
    } else {
      return msg;
    }
  },
  async initIntentionList ({commit, rootState, state}, params) {
    const {result, status: {code, msg}} = await axios.post('/site/get-intention-list', qs.stringify(params));
    if (code === '00000') {
      commit('getIntentionList', result);
    } else {
      return msg;
    }
  }
};

const mutations = {
  initData (state, data) {
    state.headerImages = data[0].block_content;
    state.focus = data[1].block_content;
    state.mainRecommend = data[2].block_content;
    state.scrollers = data[3].block_content;
    state.recommend = data[4].block_content;
  },
  pushRecommend (state, data) {
    if (data.length > 0) {
      state.recommend.list.push(...data);
    }
  },
  setInit (state, data) {
    state.inited = data;
  },
  setIsEnd (state, isEnd) {
    state.isEnd = isEnd;
  },
  setPage (state, page) {
    state.page = page;
  },
  getIntentionList (state, data) {
    state.intentionList = data;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
