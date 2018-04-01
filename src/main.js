import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import store from './vuex/store';
import { sync } from 'vuex-router-sync';
import vueTap from 'v-tap';
import { WechatPlugin, BusPlugin, DevicePlugin, ToastPlugin, ConfigPlugin } from 'vux';
import './js/rem.js';
if (process.env.NODE_ENV === 'production' && process.env.SERVICE_WORKER && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
if (process.env.NODE_ENV === 'development') {
  Vue.config.productionTip = false;
  Vue.config.devtools = true;
}
Vue.use(Vuex);
Vue.use(vueTap);
Vue.use(WechatPlugin);
Vue.use(BusPlugin);
Vue.use(DevicePlugin);
Vue.use(ToastPlugin);
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX'
});
Vue.use(ToastPlugin, { position: 'middle' });
Vue.mixin({
  created () {
    this.$vux = Vue.$vux;
  }
});
sync(store, router);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
