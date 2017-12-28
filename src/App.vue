<template>
  <div id="app">
     <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
       <x-header slot="header" title="title" class="header"></x-header>
       <transition
          name="viewTransition" >
            <router-view class="router-view"></router-view>
       </transition> 
       <tabbar slot="bottom">
        <tabbar-item v-for="(item,index) in tabs" :key="index" :selected="item.selected" :badge="item.badge">
          <i slot="icon" :class="`iconfont iconcss ${item.iconfont}`"></i>
          <span slot="label" class="tabbar-item">{{item.name}}</span>
        </tabbar-item>
      </tabbar>      
     </view-box>
  </div>
</template>

<script>
  import { ViewBox, XHeader, Tabbar, TabbarItem } from 'vux'
  export default {
    name: 'app',
    data () {
      return {
        tabs: [{name: '首页', selected: true, iconfont: 'icon-shouyeweijihuo'}, {name: '分类', iconfont: 'icon-fenleiweijihuo'}, {name: '购物车', badge: 2, iconfont: 'icon-gouwucheweijihuo'}, {name: '会员', iconfont: 'icon-huiyuanweijihuo'}]
      }
    },
    components: {
      ViewBox,
      XHeader,
      Tabbar,
      TabbarItem
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
<style>
.weui-tabbar__label{
    line-height: unset;
    margin:0;
}
</style>

