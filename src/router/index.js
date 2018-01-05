import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
const Memrber = () => import('@/components/memrber/Index')
const Index = () => import('@/components/index/index')
const Classification = () => import('@/components/classification/index')
const Cart = () => import('@/components/cart/index')
const Detail = () => import('@/components/detail/index')
const Container = () => import('@/container')
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/main',
      component: Container,
      children: [
        {
          path: '',
          name: '首页',
          component: Index
        },
        {
          path: 'memrber',
          name: '会员',
          component: Memrber
        },
        {
          path: 'classification',
          name: '分类',
          component: Classification
        },
        {path: 'cart', name: '购物车', component: Cart}
      ]
    },

    {path: '/detail/:id', name: '商品详情', component: Detail},
    { path: '*' }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})
router.beforeEach((to, from, next) => {
  store.commit('global/setTitle', to.name)
  next()
})
export default router
