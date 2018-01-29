<template>
  <div id="app">
     <view-box ref="viewBox" body-padding-top="46px" :body-padding-bottom="/main/.test($route.path)?'55px':'0'">
       <x-header slot="header" :title="title" class="header"></x-header>
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
import { State, namespace } from 'vuex-class';
const GlobalState = namespace('global', State);
@Component({
  components: { ViewBox, XHeader, Tabbar, TabbarItem },
  watch: {
    '$route': function (val, oldval) {
      document.title = this.title;
      if (!this.showEdit) {
        this.tabs = [
          { name: '首页', icon1: '&#xe65d;', icon2: '&#xe65b;', link: '/mine' },
          { name: '分类', icon1: '&#58965;', icon2: '&#xe659;', link: '/mine/classification' },
          { name: '意向单', icon1: '&#xe660;', icon2: '&#xe65f;', link: '/mine/intentionList' }
        ];
      } else {
        this.tabs = [
          { name: '首页', icon1: '&#xe65d;', icon2: '&#xe65b;', link: '/main' },
          { name: '分类', icon1: '&#58965;', icon2: '&#xe659;', link: '/main/classification' },
          { name: '购物车', icon1: '&#xe65c;', icon2: '&#xe65a;', link: '/main/cart' },
          { name: '会员', icon1: '&#58967;', icon2: '&#xe65b;', link: '/main/member' }
        ];
      }
    }
  }
})
export default class App extends Vue {
  @GlobalState title;
  @GlobalState showEdit;
  tabs = [];
  isActive = 0
  handleClickTabs (index) {
    this.isActive = index;
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
.active {
  color: #B79E74 !important;
}
#vux_view_box_body {
  overflow-x: hidden;
}
.weui-grid {
  text-decoration: none;
  padding: 0.04rem !important;
}
.vux-cell-form-preview {
  font-size: 0.14rem;
}
</style>

