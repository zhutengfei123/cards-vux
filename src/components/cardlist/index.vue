<template>
  <div class="classification">
    <tab bar-active-color="transparent" class="tab" ref="topBar">
      <tab-item :selected="true" @on-item-click="handleClickTab(1)">全部</tab-item>
      <tab-item @on-item-click="handleClickTab(2)">销量</tab-item>
      <tab-item @on-item-click="handleClickTab(3)">
        <span>价格</span>
        <div class="order-by">
          <span :class="active?'':'active'" @click.stop="handleActive(1)" class="app-icon" style="font-size:0.24rem;">&#xe627;</span>
          <span :class="active?'active':''" @click.stop="handleActive(2)" class="app-icon">&#xe611;</span>
        </div>
      </tab-item>
      <tab-item class="app-icon" @on-item-click="handleLayoutType">{{layoutType?'&#xe62c;':'&#xe7e7;'}}</tab-item>
    </tab>
    <div v-if="layoutType" class="card-list-wrap">
      <div class="card-list" v-for="(item, index) in initData.list" :key="index">
        <div class="card-list-img"><img :src="item.pic_url" alt=""></div>
        <div class="card-list-title">{{item.category_name}}</div>
        <div class="card-list-price">尊享价:￥ {{item.price}}</div>
        <div class="card-list-btn"><x-button mini>加入购物车</x-button></div>
      </div>
    </div>
    <div v-else class="card-list-wrap">
      <div class="card-list1" v-for="(item, index) in initData.list" :key="index">
        <div class="card-list1-left"><img :src="item.pic_url" alt=""></div>
        <div class="card-list1-right">
          <div class="card-list1-right-top">{{item.category_name}}</div>
          <div class="card-list1-right-bot">
            <span class="card-list-price">尊享价:￥ {{item.price}}</span>
            <span><x-button mini>加入购物车</x-button></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {State, Action, Mutation, namespace} from 'vuex-class';
import {Tab, TabItem, XButton, Toast} from 'vux';
import {Component, Vue} from 'vue-property-decorator';
import { setTimeout, clearTimeout } from 'timers';
const ProductsState = namespace('products', State);
const ProductsAction = namespace('products', Action);
const ProductsMutation = namespace('products', Mutation);
const GlobalState = namespace('global', State);
@Component({
  components: {
    Tab,
    TabItem,
    XButton,
    Toast
  }
})
export default class Cardlist extends Vue {
  @ProductsState initData
  @ProductsAction init
  @ProductsMutation getInitData
  @GlobalState storeId
  layoutType = false
  orderBy = 1
  type = 1
  currentPage = 1
  active = false
  flag = true
  handleActive (n) {
    if (n === 1) {
      this.active = false;
      this.orderBy = 2;
    } else {
      this.active = true;
      this.orderBy = 1;
    }
    this.initial();
  }
  handleClickTab (n) {
    if (n === 1) {
      this.type = this.orderBy = 1;
    } else if (n === 2) {
      this.orderBy = 1;
      this.type = 2;
    } else {
      this.orderBy = 2;
      this.type = 3;
    }
    this.initial();
  }
  created () {
    this.handleClickTab(0);
  }
  initial () {
    if (this.flag) {
      const params = {
        'store_id': this.storeId,
        'page': this.currentPage,
        'page_size': 10,
        'order_by_type': this.type,
        'order_by': this.orderBy
      };
      this.init(params).then(msg => {
        if (msg) {
          this.$vux.toast.text(msg, 'middle');
        }
      });
      this.flag = false;
      let timer = setTimeout(() => {
        this.flag = true;
        clearTimeout(timer);
      }, 1000);
    } else {
      this.$vux.toast.text('您的操作过于频繁', 'middle');
    }
  }
  handleLayoutType () {
    this.layoutType ? this.layoutType = false : this.layoutType = true;
  }
}
</script>
<style lang="less" scoped>
.classification{
  width: 100%;
  .active {
    color: #B79E74 !important;
  }
  .vux-tab .vux-tab-item {
    display: flex;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .order-by {
    margin-left: 0.054rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
  }
  .order-by span {
    height: 0.15rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000;
  }
  .card-list1-right-top {
    width: 100%;
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .card-list1-right-bot {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-list1-left {
    width: 38%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-list1-left img {
    width: 100%;
    border: none;
  }
  .card-list1-right {
    width: 62%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding-left: 0.1rem;
  }
  .card-list1 {
    height: 1.05rem;
    background: #ffffff;
    margin-top: 0.15rem;
    display: flex;
    padding: 0.1rem;
  }
  .app-icon {
    font-size: 0.2rem;
    color: #B79E74;
  }
  .tab{
    position: fixed;
    width: 100%;
  }
  button.weui-btn, input.weui-btn {
    width: 0.8rem !important;
    padding: 0 !important;
  }
  .card-list-wrap {
    padding-top: 0.46rem;
  }
  .card-list {
    margin-left: 2px;
    margin-top: 2px;
    float: left;
    width: 49%;
    background: #ffffff;
  }
  .card-list div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card-list-img {
    height: 1.8rem;
  }
  .card-list-title {
    height: 0.35rem;
    color: #3C3C3C;
    justify-content: flex-start !important;
    align-items: flex-start !important;
    padding: 0 5px;
    line-height: 0.18rem;
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .card-list-price {
    height: 0.25rem;
    font-size: 0.14rem;
    font-weight: bolder;
    color: #C61A2A;
  }
  .card-list-btn {
    height: 0.5rem;
  }
  .card-list-img img {
    width: 95%;
    border: none;
  }
}
</style>