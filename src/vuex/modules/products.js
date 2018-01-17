import {axios} from '../../js';
const state = {
  inited: false,
  list: [],
  page: 1,
  pageSize: 6,
  isEnd: false
};

const actions = {
  async getProducts ({
    commit,
    rootState,
    state
  }, {category, orderType, order}) {
    const {page, pageSize} = state;
    const {
      result: {list},
      status: {
        code,
        msg
      }
    } = await axios.get('/card-shop', {
      params: {
        store_id: rootState.global.storeId,
        page,
        page_size: pageSize,
        category_id: category,
        order_by_type: orderType,
        order_by: order
      }
    });
    if (code === '00000') {
      commit('pushList', list);
      commit('setIsEnd', {isEnd: list ? list.length < pageSize : true});
    } else {
      return new Error(msg);
    }
  }
};

const mutations = {
  pushList (state, data) {
    if (data.length > 0) {
      state
        .list
        .push(...data);
    }
  },
  resetList (state) {
    state.list = [];
  },
  setPage (state, page) {
    state.page = page;
  },
  setIsEnd (state, isEnd) {
    state.isEnd = isEnd;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
