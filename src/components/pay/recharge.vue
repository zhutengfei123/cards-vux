<template>
  <div class="recharge">
    <tab>
      <tab-item v-for="(item, index) in tabList" :key="index" :selected="index===0" @on-item-click="onItemClick(index)">{{item.title}}</tab-item>
    </tab>
    <div class="recharge-1" v-show="active===0">
      <div class="r-top">充值金额</div>
      <group>
        <x-input title="￥" v-model="rechargeVal" @on-blur="onBlur"></x-input>
      </group>
      <div class="r-desc">
        <span class="desc-l">注意：大额支付建议使用转账汇款</span>
        <span class="desc-r">充值记录</span>
      </div>
      <div class="r-foot">
        <x-button class="r-foot-btn">微信支付</x-button>
      </div>
    </div>
    <div class="recharge-2" v-show="active===1">
      dfa
    </div>
  </div>
</template>
<script>
  import { XButton, Tab, TabItem, XInput, Group } from 'vux'
  import { Component, Vue } from 'vue-property-decorator'
  @Component({
    components: {
      XButton,
      Tab,
      TabItem,
      XInput,
      Group
    }
  })
  export default class OrderPaySuccess extends Vue {
    rechargeVal = ''
    active = 0
    tabList = [
      {title: '在线支付'},
      {title: '转账汇款'}
    ]
    onItemClick (index) {
      this.active = index
    }
    onBlur () {
  
    }
  }
</script>
<style lang="less">
  .recharge {
    font-size: 0.14rem;
    overflow: hidden;
    .weui-cells {
      margin-top: 0 !important;
    }
    .r-foot {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 0.3rem;
    }
    .r-foot-btn {
      width: 3.45rem;
      background: #B79E74;
      font-size: 0.16rem;
    }
    .desc-l {
      color: #A6A6A6;
    }
    .desc-r {
      color: #B79E74;
    }
    .r-desc {
      height: 0.44rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.15rem;
    }
    .r-inp {
      height: 0.44rem;
      background: #ffffff;
    }
    .r-top {
      height: 0.44rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 0.15rem;
    }
    .vux-tab-ink-bar {
      background-color: #B79E74;
      height: 1px !important;
    }
  }
</style>