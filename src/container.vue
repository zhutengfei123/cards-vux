<template>
    <div class="container">
       <transition name="vux-header-fade-in-right">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
       </transition> 
    </div>     
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
@Component
export default class Container extends Vue {
  tabs= [
    { name: '首页', selected: true, iconfont: '&#58972;', link: '/main' },
    { name: '分类', iconfont: '&#58965;', link: '/main/classification' },
    { name: '购物车', badge: '2', iconfont: '&#58971;', link: '/main/cart' },
    { name: '会员', iconfont: '&#58967;', link: '/main/member' }
  ]
}
</script>
<style lang="less">
.container {
  .weui-tabbar__label{
    line-height: unset;
    margin:0;
  }
  .weui-tabbar__item{
    text-decoration: none;
  }
}
</style>
