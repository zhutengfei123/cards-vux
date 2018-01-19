<template>
  <div class="classification">
    <tab bar-active-color="transparent" class="tab" ref="topBar">
      <tab-item :selected="index===0?true:false" v-for="(item, index) in tabsList" :key="index" @on-item-click="handleClickTabs(index)">{{item.title}}<span :class="index===isActive?'active':''" class="app-icon">&#xe611;</span></tab-item>
      <div class="drop-down-box" v-show="isShowBox">
        <div class="drop-t">
          <div @click="handleSelectCon(index)" :class="index===isActive1?'active1':''" class="con-box" v-for="(item, index) in categoryData[isActive].children" :key="index">{{item.name}}</div>
        </div>
        <div class="drop-b">
          <span class="drop-b-l">重 置</span>
          <span class="drop-b-r">确 定</span>
        </div>
      </div>
    </tab>
    <div class="card-list-wrap">
      <div class="card-list" v-for="(item, index) in initData.list" :key="index">
        <div class="card-list-img"><img :src="item.pic_url" alt=""></div>
        <div class="card-list-title">{{item.category_name}}</div>
        <div class="card-list-price">尊享价:￥ {{item.price}}</div>
        <div class="card-list-btn"><x-button mini>加入购物车</x-button></div>
      </div>
    </div>
    <div v-show="isShowBox" class="msk-box"></div>
  </div>
</template>
<script>
import {State, Action, Mutation, namespace} from 'vuex-class';
import {Tab, TabItem, XButton, Toast} from 'vux';
import {Component, Vue} from 'vue-property-decorator';
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
export default class Classification extends Vue {
  @ProductsState initData
  @ProductsState categoryData
  @ProductsAction init
  @ProductsAction initCategoryData
  @ProductsMutation getInitData
  @GlobalState storeId
  currentPage = 1
  isShowBox = false
  isActive = 0
  isActive1 = 0
  tabsList = [
    {title: '主题'},
    {title: '对象'},
    {title: '场合'},
    {title: '排序'}
  ]
  handleSelectCon (n) {
    this.isActive1 = n;
  }
  handleClickTabs (n) {
    this.isActive = n;
    this.isShowBox = !this.isShowBox;
  }
  created () {
    this.initial();
    const params = {};
    this.initCategoryData(params).then(msg => {
      if (msg) {
        this.$vux.toast.text(msg, 'middle');
      }
    });
  }
  initial () {
    const params = {
      'store_id': this.storeId,
      'page': this.currentPage,
      'page_size': 8,
      'category_id': '100',
      'order_by_type': '2',
      'order_by': 1
    };
    this.init(params).then(msg => {
      if (msg) {
        this.$vux.toast.text(msg, 'middle');
      }
    });
  }
}
</script>
<style lang="less" scoped>
.classification{
  width: 100%;
  .msk-box {
    position: fixed;
    width: 100%;
    height: 60%;
    left: 0;
    bottom: 0;
    opacity: 0.7;
    background: #000000;
    z-index: 999;
  }
  .con-box {
    height: 0.44rem;
    width: 50%;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #F6F6F6;
  }
  .drop-t {
    height: 1.35rem;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
  }
  .drop-b {
    display: flex;
    box-sizing: border-box;
  }
  .drop-b-l, .drop-b-r {
    height: 0.44rem;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .drop-b-r {
    background: #B79E74;
    color: #ffffff;
  }
  .drop-down-box {
    background: #ffffff;
    position: absolute;
    width: 100%;
    top: 0.44rem;
    left: 0;
    border-bottom: 1px solid #F6F6F6;
    box-sizing: border-box;
  }
  .active {
    color: #B79E74 !important;
  }
  .active1 {
    color: #B79E74 !important;
    border-bottom: 1px solid #B79E74 !important;
  }
  .app-icon {
    font-size: 0.15rem;
    color: #3c3c3c;
    margin-left: 0.05rem;
  }
  .tab{
    position: fixed;
    width: 100%;
  }
  button.weui-btn, input.weui-btn {
    width: 1.1rem !important;
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