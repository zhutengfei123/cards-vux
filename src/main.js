// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'
import './css/icons/iconfont.css'
import './css/com.css'
import './js/rem.js'
FastClick.attach(document.body)
Vue.config.productionTip = false

Vue.use(Vuex)
sync(store, router)

Vue.prototype.$api = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
