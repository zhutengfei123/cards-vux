<template>
  <div class="recharge-detailed">
    <div v-for="(item, index) in detailList" :key="index">
      <div class="r-d-top">{{item.month}}<span class="r-d-num">（{{item.list.length}}）</span></div>
      <group v-for="(subItem, i) in item.list" :key="i" @click.native="handleRechargeDetail(subItem)">
        <cell class="r-d-g" is-link>
          <div class="r-d-con1">
            <span class="con1-desc">充值金额</span>
            <span class="con1-desc">+￥{{subItem.price}}</span>
          </div>
          <div class="r-d-con1">
            <span class="con2--time">{{subItem.time}}</span>
            <span class="con2-status">{{subItem.status}}</span>
          </div>
        </cell>
      </group>
    </div>
  </div>
</template>
<script>
  import { Group, Cell } from 'vux'
  import Vue from 'vue'
  import Component from 'vue-class-component'
  @Component({
    components: {
      Group,
      Cell
    }
  })
  export default class rechargeDetailed extends Vue {
    detailList = [
      {
        month: '本月',
        list: [
          {price: '1200.00', time: '2017-2-20 15:07:29', status: '汇款成功'},
          {price: '1200.00', time: '2017-2-20 15:07:29', status: '汇款待确认'},
          {price: '1200.00', time: '2017-2-20 15:07:29', status: '支付失败'},
          {price: '1200.00', time: '2017-2-20 15:07:29', status: '汇款成功'}
        ]
      },
      {
        month: '3月',
        list: [
          {price: '1010.00', time: '2017-2-20 15:07:29', status: '汇款待确认'},
          {price: '1010.00', time: '2017-2-20 15:07:29', status: '支付失败'},
          {price: '1010.00', time: '2017-2-20 15:07:29', status: '汇款成功'}
        ]
      },
      {
        month: '12月',
        list: [
          {price: '3300.00', time: '2017-2-20 15:07:29', status: '支付失败'},
          {price: '3300.00', time: '2017-2-20 15:07:29', status: '汇款待确认'},
          {price: '3300.00', time: '2017-2-20 15:07:29', status: '支付失败'}
        ]
      }
    ]
    handleRechargeDetail (item) {
      console.log('item', item)
      this.$router.push({
        path: '/rechargeDetails'
      })
    }
  }
</script>
<style lang="less">
  .recharge-detailed {
    font-size: 0.14rem;
    overflow: hidden;
    .weui-cells:before {
      border: none !important;
    }
    .con2-time {
      color: #A6A6A6;
    }
    .con2-status {
      color: #B79E74;
    }
    .con1-desc {
      color: #3c3c3c;
    }
    .weui-cell_access .weui-cell__ft {
      width: 100%;
      padding-right: 0.2rem;
    }
    .r-d-con1 {
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.16rem;
    }
    .r-d-num {
      color: #000000;
    }
    .weui-cells {
      margin: 0!important;
    }
    .r-d-g {
      height: 0.5rem;
      padding: 0.1rem 0.15rem;
    }
    .r-d-top {
      height: 0.44rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 0.15rem;
      color: #3c3c3c;
    }
  }
</style>

