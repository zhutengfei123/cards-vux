<template>
  <div class="submit-success-index">
    <div class="con-top">
      <span class="app-icon" :style="{'color':setColor}">&#xe605;</span>
      <span class="con-top-title">提交成功</span>
    </div>
    <div class="con-bot">
      <x-button class="btn-l" @click.native="handleBack" :style="{'background-color':setColor}">返回</x-button>
    </div>
  </div>
</template>
<script>
  import { XButton } from 'vux';
import { Component, Vue } from 'vue-property-decorator';
import {State, namespace} from 'vuex-class';
const IndexState = namespace('user', State);
@Component({
    components: {
      XButton
    }
  })
  export default class submitSuccess extends Vue {
    @IndexState setColor
    handleBack () {
      this.$router.go(-1);
    }
  }
</script>
<style lang="less">
  .submit-success-index {
    font-size: 0.14rem;
    overflow: hidden;
    .weui-btn:after {
      content: initial;
    }
    .app-icon {
      font-size: 0.45rem;
      color: #B79E74;
    }
    .con-top-title {
      font-size: 0.18rem;
      color: #3C3C3C;
    }
    .btn-l {
      width: 3.45rem;
      background: #B79E74;
      font-size: 0.16rem;
    }
    .con-top {
      height: 0.9rem;
      padding: 0.3rem 0;
      background: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
    }
    .con-bot {
      margin-top: 0.15rem;
      height: 0.44rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
</style>

