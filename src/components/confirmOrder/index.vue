<template>
  <div class="confirm-order">
    <group>
      <cell v-if="confirmOrderInitData.address.phone" is-link link="/address">
        <div class="address-t"><span class="address-name">{{confirmOrderInitData.address.name}}</span>&nbsp;<span>{{confirmOrderInitData.address.phone}}</span></div>
        <div class="address-b">{{confirmOrderInitData.address.province+' '+confirmOrderInitData.address.city+' '+confirmOrderInitData.address.district+' '+confirmOrderInitData.address.town+confirmOrderInitData.address.address}}</div>
      </cell>
      <cell class="no-address" v-else title="请选择收货地址" is-link link="/address"></cell>
    </group>
    <div class="order-con" v-for="(item, index) in confirmOrderInitData.list" :key="index">
      <div class="con-top">共{{item.goods.length}}件商品<span>（{{item.title}}）</span></div>
      <div class="con-mid" v-for="(subItem, i) in item.goods" :key="i">
        <div class="my-img"><img class="img" :src="subItem.pic" alt=""></div>
        <div class="con-mid-m">{{subItem.name}}</div>
        <div class="con-mid-r">
          <span class="my-color-t">￥{{subItem.member_price}}</span>
          <span class="my-color-b">x{{subItem.num}}</span>
        </div>
      </div>
      <div class="con-foot">
        <span class="con-total">商品合计</span>
        <span class="my-color-t">￥{{item.total_price || '0'}}</span>
      </div>
      <div class="con-foot">
        <span class="con-total">运费</span>
        <span class="my-color-t">￥{{confirmOrderInitData.freight}}</span>
      </div>
    </div>
    <div class="con-foot foot-money">
      <span class="con-total">账户余额</span>
      <span v-if="isCreditEnough==='1'" class="my-color-t">￥{{confirmOrderInitData.balance}}</span>
      <span v-else class="my-color-t">￥{{confirmOrderInitData.balance}}<span class="con-total">（余额不足）</span></span>
    </div>
    <div class="confirm-foot">
      <span class="pay-price">合计：￥{{confirmOrderInitData.total_price}}</span>
      <span class="pay-btn" @click="handlePayBtn" :style="{'background-color':setColor}">{{isCreditEnough==='1'?'去付款':'去充值'}}</span>
    </div>
   
     <div class="exitcss" v-show="exitcss == true">
      <div class="k">
        <div class="kdiv">
          <p style="font-size: 0.18rem;font-weight:bold;">确认支付</p>
          <p style="font-size: 0.14rem;">本次消费将从账户余额中扣除</p>
        </div>
         <div class="btn-clss">
           <a class="extBtn"  @click="exitshow(0)">取消</a>
           <a class="extOK"  @click="onConfirm" :style="{'background-color':setColor}" >确认</a>
         </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Cell, Group, Confirm, Toast } from 'vux';
import { Component, Vue } from 'vue-property-decorator';
import {State, Action, namespace} from 'vuex-class';
const ConfirmOderState = namespace('confirmOrder', State);
const ConfirmOderAction = namespace('confirmOrder', Action);
@Component({
  components: {
    Cell,
    Group,
    Confirm,
    Toast
  }
})
export default class ConfirmOrder extends Vue {
  @ConfirmOderState confirmOrderInitData
  @ConfirmOderState isCreditEnough
  @ConfirmOderAction isConfirmOrder
  @ConfirmOderAction confirmOrderInit
  setColor = localStorage.getItem('setColor')
  ids = localStorage.getItem('ids') || ''
  exitcss = false
  created () {
    const params = {
      'ids': this.ids
    };
    this.confirmOrderInit(params).then(msg => {
      if (msg) {
        this.$vux.toast.text(msg, 'middle');
      }
    });
  }
  onConfirm () {
    const params = {
      'ids': this.ids,
      'address_id': this.confirmOrderInitData.address.id
    };
    this.isConfirmOrder(params).then(msg => {
      if (!msg) {
        this.$router.push({
          path: '/orderPaySuccess'
        });
        this.exitshow(0);
      } else {
        this.$vux.toast.text(msg, 'middle');
        this.exitshow(1);
      }
    }).catch(error => console.log(error));
  }
  handlePayBtn () {
    if (this.isCreditEnough === '1') {
      this.exitshow(1);
    } else {
      this.$router.push({
        path: '/recharge'
      });
    }
  }
  exitshow (id) {
    if (id === 0) {
      this.exitcss = false;
    } else {
      this.exitcss = true;
    }
  }
}
</script>
<style lang="less">
  .confirm-order {
    font-size: 0.14rem;
    overflow: hidden;
    position: relative;
    height: 100%;
    .no-address .vux-cell-primary {
      flex: initial;
      width: 100%;
    }
    .weui-cells {
      margin: 0;
    }
    .weui-cell_access .weui-cell__ft {
      width: 100%;
    }
    .address-b {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .address-name {
      font-weight: bolder;
    }
    .address-t, .address-b {
      width: 100%;
      font-size: 0.16rem;
      color: #303030;
      justify-content: flex-start;
      align-items: center;
      text-align: left;
    }
    .weui-dialog__btn_primary {
      color: #ffffff;
      background: #B79E74;
    }
    .weui-dialog__btn_default {
      color: #ffffff;
      background: #A6A6A6;
    }
    .pay-price {
      color: #C61A2A;
    }
    .pay-btn {
      margin-right: 0.15rem;
      height: 100%;
      background: #B79E74;
      width: 1.47rem;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .confirm-foot {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 0.5rem;
      width: 100%;
      background: #ffffff;
      padding-left: 0.15rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .foot-money {
      margin-top: 0.2rem;
      height: 0.44rem;
      background: #ffffff;
    }
    .weui-cell {
      height: 1rem;
      padding: 0 0.15rem !important;
    }
    .vux-label {
      font-size: 0.16rem;
    }
    .con-total {
      font-size: 0.14rem;
      color: #A6A6A6;
    }
    .con-foot {
      height: 0.35rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.15rem;
    }
    .con-mid-m {
      width: 40%;
      height: 100%;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 0 0.15rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      line-height: 0.2rem;
      text-align: left;
    }
    .my-color-t {
      font-size: 0.14rem;
      color: #C61A2A;
    }
    .my-color-b {
      font-size: 0.1rem;
      color: #A6A6A6;
    }
    .con-mid-r {
      width: 30%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      flex-direction: column;
    }
    .img {
      width: 100%;
      border: none;
      height: 100%;
    }
    .my-img {
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .con-mid {
      height: 0.6rem;
      padding: 0.15rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .con-mid:before {
      content: " ";
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
    .con-top {
      position: relative;
      height: 0.44rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 0.15rem;
    }
    .con-top:before {
      content: " ";
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
    .order-con {
      background: #ffffff;
      margin-top: 0.15rem;
    }
  }

.exitcss{
    width: 100%;
    height: calc(100vh);
    position: fixed;
    top:0px;
    left: 0px;
    z-index: 999999;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  .k{
    width: 80%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 4px;
    .kdiv{
      height:1.56rem;
      width:100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      p{
        color: #3c3c3c;
        text-align: center;
      }
    }
    
    .btn-clss{
      width: 100%;
      display: flex;
      justify-content:center;

      a{
        width: 50%;
        height: 0.44rem;
        line-height: 0.44rem;
        text-align: center;
        font-size: 0.14rem;
        color: #fff;
      }
      .extBtn{
          background: #d9d9d9;
      }
      .extOK{
         background: #B79E74;
      }
    }
  }
}
</style>

