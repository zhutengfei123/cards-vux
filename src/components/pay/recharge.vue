<template>
  <div class="recharge">
    <tab :bar-active-color="setColor">
      <tab-item :style="{'color':index===active?setColor:''}" v-for="(item, index) in tabList" :key="index" :selected="index===0" @on-item-click="onItemClick(index)">{{item.title}}</tab-item>
    </tab>
    <div class="recharge-1" v-show="active===0">
      <div class="r-top">充值金额</div>
      <group>
        <x-input title="￥" v-model="rechargeVal" @on-blur="rechargeValOnBlur"></x-input>
      </group>
      <div class="r-desc">
        <span class="desc-l">注意：大额支付建议使用转账汇款</span>
        <span class="desc-r" @click="handleRechargeDetail" :style="{'color':setColor}">充值记录</span>
      </div>
      <div class="r-foot">
        <x-button class="r-foot-btn" @click.native="handleToPayLink" :style="{'background-color':setColor}">微信支付</x-button>
      </div>
    </div>
    <div class="recharge-2" v-show="active===1">
      <div class="r-2-top">
        <span class="r-2-t-l">汇款信息</span>
        <span class="r-2-t-r" @click="handleRechargeDetail" :style="{'color':setColor}">充值记录</span>
      </div>
      <div class="r-2-con">
        <div class="r-2-c-item">
          <span class="r-2-con-l">开户名称</span>
          <span class="r-2-t-l">{{accountInfo.beneficiary_bank}}</span>
        </div>
        <div class="r-2-c-item">
          <span class="r-2-con-l">开户银行</span>
          <span class="r-2-t-l">{{accountInfo.beneficiary_name}}</span>
        </div>
        <div class="r-2-c-item">
          <span class="r-2-con-l">银行账号</span>
          <span class="r-2-t-l">{{accountInfo.beneficiary_account_nunber}}</span>
        </div>
      </div>
      <div class="r-top">汇款金额</div>
      <group class="r-2-remit">
        <x-input title="￥" v-model="remitVal" @on-blur="remitValOnBlur"></x-input>
      </group>
      <div class="r-2-top r-2-foot">
        <span class="r-2-t-l">汇款底单</span>
        <span class="app-icon">&#xe6e9;</span>
      </div>
      <div class="upload-img">
        <uploader
          :max="1"
          :images="images"
          :show-header="false"
          :readonly="false"
          upload-url="http://cardshopapi.koudaiqifu.cn/site/upload"
          size="small"
          :handleClick="false"
          @preview="previewMethod($event)">
        </uploader>
      </div>
      <div class="r-foot">
        <x-button class="r-foot-btn" @click.native="handleSubmit" :style="{'background-color':setColor}">提交</x-button>
      </div>
    </div>
    <transition name="bounce">
      <div class="img-enlarge" v-show="imgEnLarge" @click="handleImgEnlarge">
        <img class="img" :src="imgUrl" alt="">
      </div>
    </transition>
  </div>
</template>
<script>
import { XButton, Tab, TabItem, XInput, Group, Toast } from 'vux';
import { Component, Vue } from 'vue-property-decorator';
import Uploader from 'vux-uploader';
import {State, Action, namespace} from 'vuex-class';
import { setTimeout, clearTimeout } from 'timers';
const rechargeState = namespace('recharge', State);
const rechargeAction = namespace('recharge', Action);
const IndexState = namespace('user', State);
@Component({
  components: {
    XButton,
    Tab,
    TabItem,
    XInput,
    Group,
    Uploader,
    Toast
  }
})
export default class OrderPaySuccess extends Vue {
  @rechargeState payLink
  @rechargeState accountInfo
  @rechargeAction init
  @rechargeAction initGetAccountInfo
  @rechargeAction initRemit
  @IndexState setColor
  rechargeVal = '';
  flag = false
  flag1 = false
  flag3 = true
  remitVal = '';
  active = 0;
  images = [];
  imgEnLarge = false
  imgUrl = ''
  tabList = [{ title: '在线支付' }, { title: '转账汇款' }];
  created () {
    const params = {};
    this.initGetAccountInfo(params).then(msg => {
      if (msg) {
        this.$vux.toast.text(msg, 'middle');
      }
    });
  }
  handleImgEnlarge () {
    this.imgEnLarge = false;
  }
  handleSubmit () {
    if (this.flag3) {
      this.flag3 = false;
      let timer = setTimeout(() => {
        clearTimeout(timer);
        this.flag3 = true;
      }, 2000);
      if (this.flag1) {
        if (this.images.length > 0) {
          const params = {
            'balance': this.remitVal,
            'remit_paper': this.images[0].file_hash || ''
          };
          this.initRemit(params).then(msg => {
            if (msg) {
              this.$vux.toast.text(msg, 'middle');
            } else {
              this.$router.push({
                path: '/submitSuccess'
              });
            }
          }).catch(error => console.log(error));
        } else {
          this.$vux.toast.text('请上传汇款清单', 'middle');
        }
      } else {
        this.$vux.toast.text('请输入充值金额', 'middle');
      }
    } else {
      this.$vux.toast.text('请不要重复提交', 'middle');
    }
  }
  handleRechargeDetail () {
    this.$router.push({
      path: '/rechargeDetailed'
    });
  }
  onItemClick (index) {
    this.active = index;
  }
  handleToPayLink () {
    if (this.flag) {
      const params = {
        'balance': this.rechargeVal
      };
      this.init(params).then(msg => {
        if (!msg) {
          window.location.href = this.payLink;
        } else {
          this.$vux.toast.text(msg, 'middle');
        }
      }).catch(error => console.log(error));
    } else {
      this.$vux.toast.text('请输入充值金额', 'middle');
    }
  }
  rechargeValOnBlur () {
    if (/^\d+(\.\d+)?$/.test(this.rechargeVal)) {
      this.rechargeVal = parseFloat(this.rechargeVal).toFixed(2);
      this.flag = true;
    } else {
      this.flag = false;
      this.rechargeVal = '';
      this.$vux.toast.text('请输入充值金额', 'middle');
    }
  }
  remitValOnBlur () {
    if (/^\d+(\.\d+)?$/.test(this.remitVal)) {
      this.remitVal = parseFloat(this.remitVal).toFixed(2);
      this.flag1 = true;
    } else {
      this.flag1 = false;
      this.remitVal = '';
      this.$vux.toast.text('请输入充值金额', 'middle');
    }
  }
  previewMethod (e) {
    this.imgUrl = e.url;
    this.imgEnLarge = true;
  }
}
</script>
<style lang="less">
.recharge {
  font-size: 0.14rem;
  overflow: hidden;
  .bounce-enter-active {
    animation: bounce-in .3s;
  }
  .bounce-leave-active {
    animation: bounce-in .3s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  .img-enlarge {
    z-index: 99999;
    position: fixed;
    background: #000000;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img {
    border: none;
    width: 100%;
    height: 50%;
  }
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
    color: #3c3c3c;
  }
  .r-2-remit .weui-label {
    font-size: 0.2rem;
    color: #3c3c3c;
  }
  .r-2-con-l {
    font-size: 0.14rem;
    color: #a6a6a6;
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
    color: #3c3c3c;
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
    background: #b79e74;
    font-size: 0.16rem;
  }
  .weui-btn:after {
    content: initial;
  }
  .desc-l {
    color: #a6a6a6;
  }
  .desc-r {
    color: #b79e74;
  }
  .r-2-t-r {
    color: #b79e74;
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
    background-color: #b79e74;
    height: 1px !important;
  }
}
</style>