import Vue from 'vue'
import Router from 'vue-router'
const Memrber = () => import('@/components/memrber/Index')
const Index = () => import('@/components/index/index')
const Classification = () => import('@/components/classification/index')
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
    },
    {
      path: '/classification',
      component: Classification
    }
  ]
})
