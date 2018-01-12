<template>
  <div class="recharge-details">
    <div class="con-top">
      <span class="con-top-status">{{payStatusList[payStatus]}}</span>
      <span class="con-top-title">充值金额</span>
      <span class="con-top-price">￥{{1000.00}}</span>
    </div>
    <div class="r-2-top">
      <span class="r-2-t-l">订单详情</span>
    </div>
    <div class="r-2-con">
      <div class="r-2-c-item">
        <span class="r-2-con-l">订单号</span>
        <span class="r-2-t-l">{{'147298762836846282'}}</span>
      </div>
      <div class="r-2-c-item">
        <span class="r-2-con-l">支付方式</span>
        <span class="r-2-t-l">{{payType===0?'在线充值':'线下汇款'}}</span>
      </div>
      <div v-show="payType===1">
        <div class="r-2-c-item">
          <span class="r-2-con-l">转账银行</span>
          <span class="r-2-t-l">{{'杭州银行城西支行'}}</span>
        </div>
        <div class="r-2-c-item">
          <span class="r-2-con-l">转账账号</span>
          <span class="r-2-t-l">{{'333002983387187238'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { XButton } from 'vux';
import { Component, Vue } from 'vue-property-decorator';
@Component({
    components: {
      XButton
    }
  })
  export default class RechargeDetails extends Vue {
    payType = 0 // 0 在线支付；1 线下汇款
    payStatus = 0
    payStatusList = ['汇款待确认', '汇款审核未通过', '在线支付', '支付失败']
  }
</script>
<style lang="less">
  .recharge-details {
    font-size: 0.14rem;
    overflow: hidden;
    .r-2-con {
      background: #ffffff;
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
    .r-2-t-r {
      font-size: 0.14rem;
      color: #B79E74;
    }
    .r-2-t-l {
      font-size: 0.14rem;
      color: #3C3C3C;
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
    .con-top-status {
      font-size: 0.18rem;
      color: #B79E74;
    }
    .con-top-title {
      padding-top: 0.1rem;
      font-size: 0.18rem;
      color: #3C3C3C;
    }
    .con-top-price {
      font-size: 0.25rem;
      color: #3C3C3C;
      font-family: PingFang-SC-Bold;
    }
    .con-top {
      height: 0.9rem;
      padding: 0.3rem 0;
      background: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      margin-bottom: 0.15rem;
    }
  }
</style>

