import Vue from 'vue'
import Router from 'vue-router'
import Aboutus from '@/components/memrber/Aboutus'
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
      path: '/aboutus',
      component: Aboutus
    }
  ]
})
