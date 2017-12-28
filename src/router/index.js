import Vue from 'vue'
import Router from 'vue-router'
import Memrber from '@/components/memrber/Index'
import Index from '@/components/index/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/memrber',
      component: Memrber
    }
  ]
})
