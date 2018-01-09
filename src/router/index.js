import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
const Member = () => import('@/components/member/Index')
const Index = () => import('@/components/index/index')
const Classification = () => import('@/components/classification/index')
const Cart = () => import('@/components/cart/index')
const Detail = () => import('@/components/detail/index')
const Container = () => import('@/container')
const ConfirmOrder = () => import('@/components/confirmOrder/index')
const OrderPaySuccess = () => import('@/components/pay/orderPaySuccess')
const OrderPayFail = () => import('@/components/pay/orderPayFail')
const Recharge = () => import('@/components/pay/recharge')
const Help = () => import('@/components/help/index')
const Order = () => import('@/components/order/index')
const OrderDetail = () => import('@/components/order/detail')
const Delivery = () => import('@/components/order/delivery')
const Money = () => import('@/components/member/money')
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
          path: 'member',
          name: '会员',
          component: Member
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
    {path: '/confirmOrder', name: '确认订单', component: ConfirmOrder},
    {path: '/orderPaySuccess', name: '订单支付成功', component: OrderPaySuccess},
    {path: '/orderPayFail', name: '订单支付失败', component: OrderPayFail},
    {path: '/recharge', name: '充值', component: Recharge},
    {path: '/help', name: '帮助中心', component: Help},
    {path: '/order', name: '我的订单', component: Order},
    {path: '/member/money', name: '现金账户', component: Money},
    {path: '/order/detail', name: '订单详情', component: OrderDetail},
    {path: '/order/delivery', name: '物流信息', component: Delivery},
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
