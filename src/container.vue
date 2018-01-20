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
