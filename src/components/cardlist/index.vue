<template>
  <div class="classification-index1">
    <tab custom-bar-width="50px" default-color="#a6a6a6" :active-color="setColor" bar-active-color="transparent" class="tab" ref="topBar">
      <tab-item :selected="true" @on-item-click="handleClickTab(1)"><span class="title-bold">全部</span></tab-item>
      <tab-item @on-item-click="handleClickTab(2)"><span class="title-bold">销量</span></tab-item>
      <tab-item @on-item-click="handleClickTab(3)">
        <span class="title-bold">价格</span>
        <span class="order-by">
          <span :style="{'color':active?'':setColor}" class="app-icon" style="font-size:0.18rem;">&#xe627;</span>
          <span :style="{'color':active?setColor:''}" class="app-icon" style="font-size:0.14rem;">&#xe611;</span>
        </span>
      </tab-item>
      <tab-item @on-item-click="layoutType=!layoutType"><span :style="{'color':setColor}" class="app-icon">{{layoutType?'&#xe62c;':'&#xe7e7;'}}</span></tab-item>
    </tab>
    <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200" style="overflow:initial">
      <div>
        <div>
          <div v-if="layoutType" class="card-list-wrap">
            <div @click="$router.push(`/detail/${item.shop_id}`)" class="card-list" v-for="(item, index) in dataList" :key="index">
              <div class="card-list-img"><img :src="item.pic_url" alt=""></div>
              <div class="card-list-title">{{item.name}}</div>
              <div class="card-list-price">尊享价:￥{{item.price}}</div>
              <div class="card-list-btn">
                <x-button mini @click.native.stop="handleAddCart(item)"  :style="{'background-color':setColor}">加入购物车</x-button>
              </div>
            </div>
          </div>
          <div v-else class="card-list-wrap">
            <div @click="$router.push(`/detail/${item.shop_id}`)" class="card-list1" v-for="(item, index) in dataList" :key="index">
              <div class="card-list1-left"><img :src="item.pic_url" alt=""></div>
              <div class="card-list1-right">
                <div class="card-list1-right-top">{{item.name}}</div>
                <div class="card-list1-right-bot">
                  <span class="card-list-price price-2">尊享价:￥{{item.price}}</span>
                  <span><x-button mini @click.native.stop="handleAddCart(item)"  :style="{'background-color':setColor}">加入购物车</x-button></span>
                </div>
              </div>
            </div>
          </div>
          <div v-show="hideBox" class="hidebox"></div>
        </div>
        <load-more v-show="onFetching" tip="正在加载中"></load-more>
      </div>
    </scroller>
  </div>
</template>
<script>
import {State, Action, namespace} from 'vuex-class';
import {Tab, TabItem, XButton, Toast, Scroller, LoadMore} from 'vux';
import {Component, Vue} from 'vue-property-decorator';
const ProductsState = namespace('products', State);
const ProductsAction = namespace('products', Action);
const CartAction = namespace('cart', Action);
const IndexState = namespace('index', State);
@Component({
  components: {
    Tab,
    TabItem,
    XButton,
    Toast,
    Scroller,
    LoadMore
  }
})
export default class CardList extends Vue {
  @ProductsState initData1
  @ProductsAction init1
  @CartAction addReduce
  @IndexState setColor
  layoutType = true
  orderBy = 2
  type = 1
  isLoading = true
  onFetching = false
  currentPage = 1
  active = false
  flag = true
  flag1 = true
  dataList = []
  showEdit = localStorage.getItem('showEdit')
  hideBox = false
  onScrollBottom () {
    if (!this.onFetching && this.isLoading) {
      this.onFetching = true;
      setTimeout(() => {
        this.currentPage++;
        this.initial();
        this.onFetching = false;
      }, 2000);
    }
  }
  handleAddCart (item) {
    if (this.showEdit === '1') {
      let tempData = JSON.parse(localStorage.getItem('tempData') || '[]');
      let bStop = true;
      tempData.forEach(project => {
        if (project.id === item.shop_id) {
          bStop = false;
        }
      });
      if (bStop) {
        tempData.push({
          'id': item.shop_id,
          'num': 1,
          'is_selected': 1
        });
        localStorage.setItem('tempData', JSON.stringify(tempData));
      }
      this.$vux.toast.text('加入购物车成功', 'middle');
      let arr = JSON.parse(localStorage.getItem('tempData'));
      if (arr && arr.length > 0) {
        this.$store.commit('index/getCartNum', arr.length + '');
      }
    } else {
      if (this.flag1) {
        const params = {
          'shop_id': item.shop_id
        };
        this.addReduce(params).then(msg => {
          if (msg) {
            this.$vux.toast.text(msg, 'middle');
          } else {
            this.$vux.toast.text('加入购物车成功', 'middle');
            this.$bus.emit('addToCart', 'ok');
          }
        });
        this.flag1 = false;
        let timer = setTimeout(() => {
          this.flag1 = true;
          clearTimeout(timer);
        }, 500);
      } else {
        this.$vux.toast.text('您的操作过于频繁', 'middle');
      }
    }
  }
  handleClickTab (n) {
    this.isLoading = true;
    this.onFetching = false;
    this.dataList = [];
    this.currentPage = 1;
    this.type = n;
    if (n === 2) {
      this.orderBy = 1;
    }
    if (n === 3) {
      this.active = !this.active;
      this.active ? this.orderBy = 1 : this.orderBy = 2;
    }
    this.initial();
  }
  created () {
    this.initial();
  }
  initial () {
    if (this.flag) {
      const params = {
        'store_id': localStorage.getItem('store_id') || '',
        'page': this.currentPage,
        'page_size': 8,
        'order_by_type': this.type,
        'order_by': this.orderBy,
        'card_shop_special_id': localStorage.getItem('cardId') || ''
      };
      this.init1(params).then(msg => {
        if (msg) {
          this.$vux.toast.text(msg, 'middle');
        } else {
          if (this.initData1.list.length > 0) {
            this.dataList = this.dataList.concat(this.initData1.list);
          } else {
            this.isLoading = false;
            this.$vux.toast.text('暂无更多数据', 'middle');
            this.hideBox = true;
          }
        }
      });
      this.flag = false;
      let timer = setTimeout(() => {
        this.flag = true;
        clearTimeout(timer);
      }, 500);
    } else {
      this.$vux.toast.text('您的操作过于频繁', 'middle');
    }
  }
}
</script>
<style lang="less">
.classification-index1 {
  font-size: 0.14rem;
  width: 100%;
  .weui-btn:after {
    content: initial;
  }
  .title-bold {
    font-weight: bold;
  }
  .hidebox {
    height: 0.44rem;
  }
  .xs-container {
    padding-top: 0.44rem !important;
    padding-bottom: 0.44rem !important;
  }
  .weui-btn_mini {
    font-size: 0.12rem !important;
  }
  .weui-btn {
    font-weight: bold;
    width: 1.1rem;
  }
  .weui-loadmore {
    height: 0.44rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 !important;
  }
  .vux-tab {
    z-index: 9999;
  }
  .vux-tab .vux-tab-item {
    display: flex;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .order-by {
    height: 0.3rem;
    margin-left: 0.054rem;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-left: 0 !important;
    display: flex;
  }
  .order-by span {
    height: 0.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a6a6a6;
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
    width: 30%;
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
    width: 68%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding-left: 0.1rem;
  }
  .card-list1 {
    height: 1.05rem;
    margin-top: 0.07rem;
    display: flex;
    padding: 0.1rem;
    background: #FFFFFF;
    box-shadow: 0 0 0.1rem 0 rgba(0,0,0,0.05);
  }
  .app-icon {
    font-size: 0.2rem;
  }
  .tab{
    position: fixed;
    width: 100%;
  }
  button.weui-btn, input.weui-btn {
    padding: 0 !important;
  }
  .card-list-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 0.07rem;
    padding-right: 0.07rem;
  }
  .card-list {
    margin-top: 0.07rem;
    width: 49%;
    background: #ffffff;
    box-shadow: 0 0 0.1rem 0 rgba(0,0,0,0.05);
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
    padding: 0 0.05rem;
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
  .price-2 {
    overflow: hidden;
    width: 1.16rem;
    white-space: nowrap;
  }
  .card-list-btn {
    height: 0.5rem;
  }
  .card-list-img img {
    width: 94%;
    border: none;
  }
}
</style>