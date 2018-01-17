import { axios } from '../../js';
const state = {
  list: [],
  page:1
};

const actions = {
    async getRecords ({commit,state},{page}) {
      const list = [...state.list];
      const {result,status} = await axios.get('/site/balance-list',{params:{page:state.page}});
      if(status.code==='00000'){
        commit('setList',list.push(result.list))
      }else{
        return status.msg
      }
    }
};

const mutations={
    setList(state,list){
        state.list=list
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
};