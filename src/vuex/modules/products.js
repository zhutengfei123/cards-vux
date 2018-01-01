import axios from '../../js/ajax'
  const state = {
    list: [],
  }
  
  const actions = {
    async getProducts ({commit}) {
        const {result,status:{code,msg}}=await axios.get('')
        if(code==='00000'){
            commit('setList',result)
        }else{
            return new Error(msg)
        }
    },
  }
  
  const mutations = {
    setList (state,list) {
        state.list=list
    }
  }
  
  export default {
    namespaced: true,
    state,
    actions,
    mutations
  }
  