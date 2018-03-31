import {axios} from '../../js';
import qs from 'qs';
const state = {
  inited: false,
  headerImages: {
    is_show: '1',
    block_content: []
  },
  focus: {
    is_show: '1',
    block_content: {
      title: '',
      list: []
    }
  },
  mainRecommend: {
    is_show: '1',
    block_content: {
      title: '',
      list: []
    }
  },
  scrollers: {
    is_show: '1',
    block_content: [
      {card_list: []}
    ]
  },
  recommend: {
    is_show: '1',
    block_content: {
      title: '',
      list: []
    }
  },
  page: 1,
  pageSize: 6,
  isEnd: false,
  intentionList: {},
  uploadRes: {},
  shareInfo: {},
  WxShare: {},
  getIndexInfo: {},
  cartNum: ''
};

const actions = {
  async init ({commit, rootState}) {
    const { result, status: {code, msg} } = await axios.get('/index', {params: {store_id: localStorage.getItem('store_id') || '', source: 1}});
    if (code === '00000') {
      commit('initData', result);
    } else {
      return msg;
    }
  },
  async getInitTitleInfo ({commit, rootState}, params) {
    const { result, status: {code, msg} } = await axios.get('site/index', {'params': params});
    if (code === '00000') {
      commit('initData1', result);
      if (result.style_color) {
        localStorage.setItem('setColor', result.style_color);
      }
    } else {
      return msg;
    }
  },
  async loadMore ({commit, rootState, state}) {
    const {page, pageSize} = state;
    const {result: {list}, status: {code, msg}} = await axios.get('/index/gethotproduct', {params: {store_id: localStorage.getItem('store_id') || '', page, pageSize}});
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
  },
  async initGetShareInfo ({commit, rootState, state}, params) {
    const {result, status: {code, msg}} = await axios.post('/intention-list/get-share-user-info', qs.stringify(params));
    if (code === '00000') {
      commit('getShareInfo', result);
    } else {
      return msg;
    }
  },
  async saveEditInfo ({commit, rootState, state}, params) {
    const {status: {code, msg}} = await axios.post('/site/update-info', qs.stringify(params));
    if (code === '00000') {
    } else {
      return msg;
    }
  },
  async initWxshare ({commit, rootState, state}, params) {
    const {result, status: {code, msg}} = await axios.post('/site/wx-jsconfig', qs.stringify(params));
    if (code === '00000') {
      commit('getWxShare', result);
    } else {
      return msg;
    }
  },
  async initUploadImg ({commit, rootState, state}, params) {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const {result, status: {code, msg}} = await axios.post('/site/upload', params, config);
    if (code === '00000') {
      commit('getUploadRes', result);
    } else {
      return msg;
    }
  },
  async cartNums ({commit, rootState}, params) {
    const { result, status: {code} } = await axios.get('/cart/count', {'params': params});
    if (code === '00000') {
      commit('getCartNum', result);
    }
    return code;
  }
};

const mutations = {
  initData (state, data) {
    if (data[0]) {
      state.headerImages = data[0];
    }
    if (data[1]) {
      state.focus = data[1];
    }
    if (data[2]) {
      state.mainRecommend = data[2];
    }
    if (data[3]) {
      state.scrollers = data[3];
    }
    if (data[4]) {
      state.recommend = data[4];
    }
  },
  pushRecommend (state, data) {
    if (data.length > 0) {
      state.recommend.list.push(...data);
    }
  },
  setInit (state, data) {
    state.inited = data;
  },
  initData1 (state, data) {
    state.getIndexInfo = data;
  },
  setIsEnd (state, isEnd) {
    state.isEnd = isEnd;
  },
  setPage (state, page) {
    state.page = page;
  },
  getIntentionList (state, data) {
    state.intentionList = data;
  },
  getUploadRes (state, data) {
    state.uploadRes = data;
  },
  getShareInfo (state, data) {
    state.shareInfo = data;
  },
  getWxShare (state, data) {
    state.WxShare = data;
  },
  getCartNum (state, data) {
    state.cartNum = data.count;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
