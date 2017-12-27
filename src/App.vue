<template>
  <div id="app">
     <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
       <x-header slot="header" title="title" class="header"></x-header>
       <transition
          name="viewTransition" >
            <router-view class="router-view"></router-view>
       </transition> 
       <tabbar>
        <tabbar-item selected  slot="bottom">
          <i slot="icon" class="iconfont iconcss icon-shouyeweijihuo"></i>
          <span slot="label" class="tabbar-item">首页</span>
        </tabbar-item>
        <tabbar-item >
          <i slot="icon" class="iconfont iconcss icon-fenleiweijihuo"></i>
          <span slot="label" class="tabbar-item">分类</span>
        </tabbar-item>
        <tabbar-item badge="2" link="">
          <i slot="icon" class="iconfont iconcss icon-gouwucheweijihuo"></i>
          <span slot="label" class="tabbar-item">购物车</span>
        </tabbar-item>
        <tabbar-item>
          <i slot="icon" class="iconfont iconcss icon-huiyuanweijihuo"></i>
          <span slot="label" class="tabbar-item">会员</span>
        </tabbar-item>
      </tabbar>      
     </view-box>
  </div>
</template>

<script>
  import { Radio, Group, Cell, Badge, Drawer, Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading } from 'vux'
  export default {
    name: 'app',
    components: {
      Radio,
      Group,
      Cell,
      Badge,
      Drawer,
      ButtonTab,
      ButtonTabItem,
      ViewBox,
      XHeader,
      Tabbar,
      TabbarItem,
      Loading,
      Actionsheet
    }
  }
</script>

<style lang="less" scoped>
@import "~vux/src/styles/reset.less";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height:100%;
  .header{
    width:100%;position: absolute;left:0;top:0;z-index:100;
  }
  .iconcss{
    font-size:0.24rem;
  }
  .tabbar-item{
    font-size: 0.1rem;
  }
}
</style>

