<template>
  <div class="order-pay-index">
    <div class="con-top">
      <span class="app-icon">{{payResults.pay_status===1?'&#xe605;':'&#xe658;'}}</span>
      <span class="con-top-title">{{payResults.pay_status===1?'支付成功':'支付失败'}}</span>
    </div>
    <div class="con-bot">
      <x-button class="btn-l" link="/rechargeDetailed">查看明细</x-button>
    </div>
  </div>
</template>
<script>
import { XButton, Toast } from 'vux';
import { Component, Vue } from 'vue-property-decorator';
import {State, Action, namespace} from 'vuex-class';
const rechargeState = namespace('recharge', State);
const rechargeAction = namespace('recharge', Action);
@Component({
  components: {XButton, Toast}
})
export default class OrderPayFail extends Vue {
    @rechargeState payResults
    @rechargeAction initGetPayResults
    created () {
      let orderId = location.hash.split('order_sn=')[1] || '';
      const params = {
        'recharge_sn': orderId
      };
      this.initGetPayResults(params).then(msg => {
        if (msg) {
          this.$vux.toast.text(msg, 'middle');
        }
      });
    }
}
</script>
<style lang="less">
  .order-pay-index {
    font-size: 0.14rem;
    overflow: hidden;
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

