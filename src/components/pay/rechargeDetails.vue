<template>
  <div class="recharge-details">
    <div class="con-top">
      <span class="con-top-status" :style="{'color':setColor}">{{rechargeItem.state}}</span>
      <span class="con-top-title">充值金额</span>
      <span class="con-top-price">￥{{rechargeItem.amount}}</span>
    </div>
    <div class="r-2-top">
      <span class="r-2-t-l">订单详情</span>
    </div>
    <div class="r-2-con">
      <div class="r-2-c-item">
        <span class="r-2-con-l">订单号</span>
        <span class="r-2-t-l">{{rechargeItem.recharge_sn}}</span>
      </div>
      <div class="r-2-c-item">
        <span class="r-2-con-l">支付方式</span>
        <span class="r-2-t-l">{{rechargeItem.pay_type}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { XButton } from 'vux';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {XButton}
})
export default class RechargeDetails extends Vue {
  rechargeItem = {}
  setColor = localStorage.getItem('setColor')
  created () {
    this.rechargeItem = JSON.parse(localStorage.getItem('rechargeItem'));
  }
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
    .r-2-t-l {
      font-size: 0.14rem;
      color: #3C3C3C;
    }
    .r-2-top {
      position: relative;
      height: 0.44rem;
      background: #ffffff;
      padding: 0 0.15rem;
      margin-top: 0.15rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .r-2-top:before {
      content: ' ';
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #D9D9D9;
      color: #D9D9D9;
      transform-origin: 0 100%;
      transform: scaleY(0.5);
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

