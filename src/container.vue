<template>
    <div class="container-index">
       <!-- <transition name="vux-header-fade-in-right"> -->
          <router-view></router-view>
       <!-- </transition>  -->
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
.container-index {
  .weui-btn:after {
    content: initial !important;
  }
  .weui-tabbar__label{
    line-height: unset;
    margin:0;
  }
  .weui-tabbar__item{
    text-decoration: none;
  }
}
</style>
