<template>
  <div id="app">
     <view-box ref="viewBox" body-padding-top="46px" :body-padding-bottom="/main/.test($route.path)?'55px':'0'">
       <!-- <x-header slot="header" :title="title" class="header"></x-header> -->
       <transition name="vux-header-fade-in-right">
          <router-view></router-view>
       </transition>
       <tabbar slot="bottom" v-show="/main|mine/.test($route.path)">
          <tabbar-item v-for="(item, index) in tabs" :key="index" @click.native="handleClickTabs(index)" :link="item.link">
            <span slot="icon" :class="isActive===index?'active':''" class="app-icon" v-html="isActive===index?item.icon2:item.icon1"></span>
            <span slot="label" :class="isActive===index?'active':''" class="tabbar-item">{{item.name}}</span>
          </tabbar-item>
       </tabbar> 
     </view-box>
  </div>
</template>
<script>
import { ViewBox, XHeader, Tabbar, TabbarItem } from 'vux';
import { Component, Vue } from 'vue-property-decorator';
import { State, namespace, Action } from 'vuex-class';
const GlobalState = namespace('global', State);
const UserState = namespace('user', State);
const IndexState = namespace('index', State);
const IndexAction = namespace('index', Action);
@Component({
  components: { ViewBox, XHeader, Tabbar, TabbarItem },
  watch: {
    '$route': function (val, oldval) {
      if (this.title !== '首页') {
        document.title = this.title;
        if (document.title === '分类') {
          this.isActive = 1;
        }
        if (document.title === '购物车' || document.title === '意向单') {
          this.isActive = 2;
        }
        if (document.title === '会员') {
          this.isActive = 3;
        }
      } else {
        this.isActive = 0;
      }
      let str = this.$route.path;
      if (/mine/.test(str)) {
        if (window.location.hash.split('#')[1] === '/mine') {
          this.isActive = 0;
        }
        this.tabs = [
          { name: '首页', icon1: '&#xe65d;', icon2: '&#xe65b;', link: '/mine' },
          { name: '分类', icon1: '&#58965;', icon2: '&#xe659;', link: '/mine/classification' },
          { name: '意向单', icon1: '&#xe660;', icon2: '&#xe65f;', link: '/mine/intentionList' }
        ];
      }
      if (/main/.test(str)) {
        this.tabs = [
          { name: '首页', icon1: '&#xe65d;', icon2: '&#xe65b;', link: '/main' },
          { name: '分类', icon1: '&#58965;', icon2: '&#xe659;', link: '/main/classification' },
          { name: '购物车', icon1: '&#xe65c;', icon2: '&#xe65a;', link: `${this.token === '' ? '/login' : '/main/cart'}` },
          { name: '会员', icon1: '&#58967;', icon2: '&#xe65b;', link: '/main/member' }
        ];
      }
    }
  }
})
export default class App extends Vue {
  @GlobalState title;
  @UserState token;
  @IndexAction getInitTitleInfo
  @IndexState getIndexInfo;
  tabs = [];
  isActive = 0
  handleClickTabs (index) {
    this.isActive = index;
  }
  created () {
    if (!/share_user_id/.test(location.hash) && /store_id/.test(location.hash)) {
      const storeId = location.hash.split('store_id=')[1];
      localStorage.setItem('store_id', storeId);
    }
    if (/share_user_id/.test(location.hash) && /store_id/.test(location.hash)) {
      let str = location.hash.split('main')[1] || '&';
      let arr = str.split('&') || [];
      const storeId = arr[0].split('store_id=')[1] || '';
      const shareId = arr[1].split('share_user_id=')[1] || '';
      localStorage.setItem('store_id', storeId);
      localStorage.setItem('shareId', shareId);
      this.$router.push('/mine');
    }
    const params = {
      'store_id': localStorage.getItem('store_id')
    };
    this.getInitTitleInfo(params).then(msg => {
      if (msg) {
        this.$vux.toast.text(msg, 'middle');
      } else {
        localStorage.setItem('storeName', this.getIndexInfo.store_name);
        localStorage.setItem('bgImgUrl', this.getIndexInfo.store_logo_url);
        document.title = localStorage.getItem('storeName');
      }
    });
  }
}
</script>
<style lang="less" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  font-size: 0.14rem;
  background: #f6f6f6;
  .weui-tabbar {
    background: #ffffff !important;
  }
  .weui-tabbar:before {
    content: initial !important;
  }
  .header {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 992;
  }
}
</style>
<style lang="less">
@import "~vux/src/styles/reset.less";
@import "./css/common.less";
.weui-tabbar__item {
  padding: 0 !important;
}
.tabbar-item {
  color: #999999 !important;
}
.active {
  color: #B79E74 !important;
}
#vux_view_box_body {
  overflow-x: hidden;
  padding-top: 0 !important;
}
.weui-grid {
  text-decoration: none;
  padding: 0.04rem !important;
}
.vux-cell-form-preview {
  font-size: 0.14rem;
}
</style>

