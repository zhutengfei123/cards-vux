<template>
  <div class="classification-index">
    <tab bar-active-color="transparent" class="tab" ref="topBar">
      <tab-item :selected="true" @on-item-click="handleClickTab(1)">全部</tab-item>
      <tab-item @on-item-click="handleClickTab(2)">销量</tab-item>
      <tab-item @on-item-click="handleClickTab(3)">
        <span>价格</span>
        <div class="order-by">
          <span :class="active?'':'active'" class="app-icon" style="font-size:0.18rem;">&#xe627;</span>
          <span :class="active?'active':''" class="app-icon" style="font-size:0.14rem;">&#xe611;</span>
        </div>
      </tab-item>
      <tab-item @on-item-click="layoutType=!layoutType"><span class="app-icon">{{layoutType?'&#xe62c;':'&#xe7e7;'}}</span></tab-item>
    </tab>
    <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200" style="overflow:initial">
      <div v-if="layoutType" class="card-list-wrap">
        <div @click="handleClickToDetail(item.id)" class="card-list" v-for="(item, index) in dataList" :key="index">
          <div class="card-list-img"><img :src="item.pic_url" alt=""></div>
          <div class="card-list-title">{{item.category_name}}</div>
          <div class="card-list-price">尊享价:￥ {{item.price}}</div>
          <div class="card-list-btn"><x-button mini @click.native.stop="handleAddCart(item.id)">加入购物车</x-button></div>
        </div>
      </div>
      <div v-else class="card-list-wrap">
        <div @click="handleClickToDetail(item.id)" class="card-list1" v-for="(item, index) in dataList" :key="index">
          <div class="card-list1-left"><img :src="item.pic_url" alt=""></div>
          <div class="card-list1-right">
            <div class="card-list1-right-top">{{item.category_name}}</div>
            <div class="card-list1-right-bot">
              <span class="card-list-price">尊享价:￥ {{item.price}}</span>
              <span><x-button mini @click.native.stop="handleAddCart(item.id)">加入购物车</x-button></span>
            </div>
          </div>
        </div>
      </div>
      <load-more v-show="onFetching" tip="正在加载中"></load-more>
    </scroller>
  </div>
</template>
<script>
import {State, Action, Mutation, namespace} from 'vuex-class';
import {Tab, TabItem, XButton, Toast, Scroller, LoadMore} from 'vux';
import {Component, Vue} from 'vue-property-decorator';
const ProductsState = namespace('products', State);
const ProductsAction = namespace('products', Action);
const ProductsMutation = namespace('products', Mutation);
const CartAction = namespace('cart', Action);
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
  @ProductsState initData
  @ProductsAction init
  @ProductsMutation getInitData
  @CartAction addReduce
  layoutType = false
  orderBy = 2
  type = 1
  isLoading = true
  onFetching = false
  currentPage = 1
  active = false
  flag = true
  flag1 = true
  dataList = []
  handleClickToDetail (id) {
    this.$router.push(`/detail/${id}`);
  }
  onScrollBottom () {
    if (!this.onFetching && this.isLoading) {
      this.onFetching = true;
      setTimeout(() => {
        this.currentPage++;
        this.initial();
        this.$nextTick(() => {
          this.$refs.scrollerBottom.reset();
        });
        this.onFetching = false;
      }, 2000);
    }
  }
  handleAddCart (id) {
    if (this.flag1) {
      const params = {
        'shop_id': id
      };
      this.addReduce(params).then(msg => {
        if (msg) {
          this.$vux.toast.text(msg, 'middle');
        } else {
          this.$vux.toast.text('加入购物车成功', 'middle');
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
  handleClickTab (n) {
    this.toTop();
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
  toTop () {
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({top: 0});
    });
  }
  mounted () {
    this.toTop();
  }
  initial () {
    if (this.flag) {
      const params = {
        'store_id': localStorage.getItem('store_id') || '',
        'page': this.currentPage,
        'page_size': 8,
        'order_by_type': this.type,
        'order_by': this.orderBy
      };
      this.init(params).then(msg => {
        if (msg) {
          this.$vux.toast.text(msg, 'middle');
        } else {
          if (this.initData.list.length > 0) {
            this.dataList = this.dataList.concat(this.initData.list);
          } else {
            this.isLoading = false;
            this.$vux.toast.text('暂无更多数据', 'middle');
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
.classification-index {
  font-size: 0.14rem;
  width: 100%;
  .xs-container {
    padding-top: 0.44rem !important;
    padding-bottom: 0.44rem !important;
  }
  .weui-btn_mini {
    font-size: 0.12rem !important;
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
    height: 0.24rem;
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
    color: #3c3c3c;
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
  .card-list-btn {
    height: 0.5rem;
  }
  .card-list-img img {
    width: 94%;
    border: none;
  }
}
</style>