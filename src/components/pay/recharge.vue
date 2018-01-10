<template>
  <div class="recharge">
    <tab>
      <tab-item v-for="(item, index) in tabList" :key="index" :selected="index===0" @on-item-click="onItemClick(index)">{{item.title}}</tab-item>
    </tab>
    <div class="recharge-1" v-show="active===0">
      <div class="r-top">充值金额</div>
      <group>
        <x-input title="￥" v-model="rechargeVal" @on-blur="rechargeValOnBlur"></x-input>
      </group>
      <div class="r-desc">
        <span class="desc-l">注意：大额支付建议使用转账汇款</span>
        <span class="desc-r" @click="handleRechargeDetail">充值记录</span>
      </div>
      <div class="r-foot">
        <x-button class="r-foot-btn" link="/rechargeResults">微信支付</x-button>
      </div>
    </div>
    <div class="recharge-2" v-show="active===1">
      <div class="r-2-top">
        <span class="r-2-t-l">汇款信息</span>
        <span class="r-2-t-r" @click="handleRechargeDetail">充值记录</span>
      </div>
      <div class="r-2-con">
        <div class="r-2-c-item">
          <span class="r-2-con-l">收款银行</span>
          <span class="r-2-t-l">中国工商银行浙江分行</span>
        </div>
        <div class="r-2-c-item">
          <span class="r-2-con-l">收款人</span>
          <span class="r-2-t-l">李晓明</span>
        </div>
        <div class="r-2-c-item">
          <span class="r-2-con-l">收款账号</span>
          <span class="r-2-t-l">147298762836846282</span>
        </div>
      </div>
      <div class="r-top">汇款金额</div>
      <group class="r-2-remit">
        <x-input title="￥" v-model="remitVal" @on-blur="remitValOnBlur"></x-input>
      </group>
      <div class="r-2-top r-2-foot">
        <span class="r-2-t-l">汇款底单</span>
        <span class="r-2-t-r"><img class="foot-img" src="../../assets/logo.png" alt=""></span>
      </div>
      <div class="r-foot">
        <x-button class="r-foot-btn" link="/submitSuccess">提交</x-button>
      </div>
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
    remitVal = ''
    active = 0
    tabList = [
      {title: '在线支付'},
      {title: '转账汇款'}
    ]
    handleRechargeDetail () {
      this.$router.push({
        path: '/rechargeDetailed'
      })
    }
    onItemClick (index) {
      this.active = index
    }
    rechargeValOnBlur () {
  
    }
    remitValOnBlur () {
  
    }
  }
</script>
<style lang="less">
  .recharge {
    font-size: 0.14rem;
    overflow: hidden;
    .foot-img {
      width: 0.2rem;
      height: 0.17rem;
    }
    .r-2-foot {
      border: none !important;
    }
    .r-2-remit {
      margin-bottom: 0.15rem;
    }
    .r-2-remit .weui-cell {
      height: 0.5rem;
    }
    .r-2-remit .weui-input {
      font-size: 0.2rem;
      color: #3C3C3C;
    }
    .r-2-remit .weui-label {
      font-size: 0.2rem;
      color: #3C3C3C;
    }
    .r-2-con-l {
      font-size: 0.14rem;
      color: #A6A6A6;
    }
    .r-2-c-item {
      height: 0.33rem;
      padding: 0 0.15rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .r-2-con {
      background: #ffffff;
    }
    .r-2-t-l {
      font-size: 0.14rem;
      color: #3C3C3C;
    }
    .r-2-t-r {
      font-size: 0.14rem;
      color: #B79E74;
    }
    .r-2-top {
      height: 0.44rem;
      background: #ffffff;
      padding: 0 0.15rem;
      margin-top: 0.15rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #D9D9D9;
    }
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