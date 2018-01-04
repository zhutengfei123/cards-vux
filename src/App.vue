<template>
  <div id="app">
     <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
       <x-header slot="header" :title="title" class="header"></x-header>
       <transition name="vux-header-fade-in-right">
          <keep-alive>
            <router-view class="router-view"></router-view>
          </keep-alive>
       </transition> 
       <tabbar slot="bottom">
        <tabbar-item v-for="(item,index) in tabs" :key="index" :selected="item.selected" :badge="item.badge" :link="item.link">
          <span slot="icon" class="app-icon" v-html="item.iconfont"></span>
          <span slot="label" class="tabbar-item">{{item.name}}</span>
        </tabbar-item>
       </tabbar>      
     </view-box>
  </div>
</template>

<script>
  import { ViewBox, XHeader, Tabbar, TabbarItem } from 'vux'
  import {mapState} from 'vuex'
  export default {
    name: 'app',
    data () {
      return {
        tabs: [
          {name: '首页', selected: true, iconfont: '&#58972;', link: '/'},
          {name: '分类', iconfont: '&#58965;', link: '/classification'},
          {name: '购物车', badge: '2', iconfont: '&#58971;', link: '/cart'},
          {name: '会员', iconfont: '&#58967;', link: '/memrber'}]
      }
    },
    computed: {
      ...mapState('global', {
        title: ({title}) => title
      })
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
  background: #F6F6F6;
  .header{
    width:100%;
    position: absolute;
    left:0;
    top:0;
    z-index:100;
  }
  .iconcss{
    font-size:0.24rem;
  }
  .tabbar-item{
    font-size: 0.1rem;
  }
  .router-view {
    width: 100%;
    top: 46px;
  }
  
}

</style>
<style>
@font-face {
  font-family: "iconfont";
  src: url('css/icons/iconfont.eot?t=1514276920946'); /* IE9*/
  src: url('css/icons/iconfont.eot?t=1514276920946#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('css/icons/iconfont.ttf?t=1514276920946') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('css/icons/iconfont.svg?t=1514276920946#iconfont') format('svg'); /* iOS 4.1- */
}
.app-icon {
  font-family: 'iconfont';
  font-size: 0.24rem;
  color: #999999;
}
.weui-tabbar__label{
    line-height: unset;
    margin:0;
}
.weui-grid{
    text-decoration: none;
    padding:0.04rem!important;
}
</style>

