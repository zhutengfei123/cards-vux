import {axios} from '../../js'
const state = {
    orders: []
}

const getters={
    getOrdersByType({orders}){
        return (type)=>{orders.filter(todo => todo.type===type)}
    }
}

const actions = {
    async getOrders({commit}){
        await axios.get('',{params:{}}).then(()=>{
            commit('')
        })
    }
}

const mutations={

}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
  