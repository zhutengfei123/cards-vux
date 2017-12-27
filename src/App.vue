<template>
  <div id="app">
      <x-header slot="header"
              style="width:100%;position:absolute;left:0;top:0;z-index:100;"
            
              title="title"
             >
    </x-header>
     <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">

   

      <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
      <transition
          @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
          name="viewTransition" >
            <router-view class="router-view"></router-view>
      </transition>       
     </view-box>
     <tabbar>
        <tabbar-item>
          <i slot="icon" class="iconfont iconcss icon-shouyeweijihuo"></i>
          <span slot="label" class="iconText">首页</span>
        </tabbar-item>
        <tabbar-item >
          <i slot="icon" class="iconfont iconcss icon-fenleiweijihuo"></i>
          <span slot="label" class="iconText">分类</span>
        </tabbar-item>
        <tabbar-item selected badge="2"  link="">
          <i slot="icon" class="iconfont iconcss icon-gouwucheweijihuo"></i>
          <span slot="label" class="iconText">购物车</span>
        </tabbar-item>
        <tabbar-item icon-class="iconfont">
          <i slot="icon" class="iconfont iconcss icon-huiyuanweijihuo"></i>
          <span slot="label" class="iconText">会员</span>
        </tabbar-item>
      </tabbar>
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

<style lang="less">
@import "~vux/src/styles/reset.less";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
