<template>
    <div class="order-index">
        <tab class="tab" ref="topBar" :bar-active-color="setColor">
            <tab-item :selected="index===0?true:false" :style="{'color':index===active?setColor:''}" :key="index" v-for="(item,index) in titleList" @on-item-click="handleClickTitle(item,index)">{{item.title}}</tab-item>
        </tab>
        <group v-for="(order,index) in orders" :key="index" :style="{paddingTop:index===0&&'44px'}" @click.native="$router.push(`/order/detail/${order.order_sn}`)">
            <cell>
                <p slot="title" class="text">订单编号：{{order.order_sn}}</p>
                <p class="text brown" :style="{'color':setColor}">{{getStatus(order.order_status)}}</p>
            </cell>
            <div v-for="(goods,index) in order.goods_list" :key="index">
                <item v-for="(item,index) in goods.list" :key="index" :item="item" v-if="index<2"></item>
                <item v-for="(item,index) in goods.list" :key="index" :item="item" v-if="index>=2" v-show="order.show"></item>
                <p class="text gray center"  @click.native="$router.push(`/order/detail/${order.order_sn}`)" >查看全部{{goods.list.length}}件商品</p>
                <cell>
                    <p slot="title" class="text">共{{goods.list.length}}件商品&nbsp;&nbsp;&nbsp;<span class="text gray">({{goods.targer_name}})</span></p>
                    <p class="text bold">合计：￥{{totalCount(goods).toFixed(2)}}</p>
                </cell>
            </div>
        </group>
    </div>
</template>
<script>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Tab, TabItem, Cell, Group } from 'vux';
import Item from './item';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { page } from '../../mixin/page';
const OrderAction = namespace('order', Action);
const OrderMutation = namespace('order', Mutation);
const OrderState = namespace('order', State);
@Component({
  mixins: [page],
  components: { Tab, TabItem, Cell, Group, Item }
})
export default class Order extends Vue {
  @OrderState orders;
  @OrderMutation setOrders;
  @OrderAction getOrders;
  orderStatus = 0;
  active = 0;
  setColor = localStorage.getItem('setColor')
  titleList = [
    {title: '全部', orderStatus: 0},
    {title: '待发货', orderStatus: 1},
    {title: '已发货', orderStatus: 3}
  ]
  @Watch('orderStatus')
  onStatusChange (newValue, oldValue) {
    if (newValue !== oldValue) {
      this.setOrders({ orders: [], page: 1 });
      this.getOrders({ orderStatus: this.orderStatus }).then(msg => {
        msg && this.$vux.toast.text(msg);
        this.orders.map(order => {
          !order.show && this.$set(order, 'show', false);
        });
      });
    }
  }
  get totalCount () {
    return goods => goods.list.reduce((sum, item) => sum + parseFloat(item.price) * parseInt(item.num), 0);
  }
  handleClickTitle (item, index) {
    this.active = index;
    this.orderStatus = item.orderStatus;
  }
  getStatus (n) {
    switch (n) {
      case '1':
        return '待发货';
      case '2':
        return '待收货';
      case '3':
        return '已完成';
    }
  }
  toggleShow (order) {
    order.show = !order.show;
  }
  created () {
    this.setOrders({ orders: [], page: 1 });
    this.getOrders({ orderStatus: this.orderStatus }).then(msg => {
      msg && this.$vux.toast.text(msg);
    });
  }
}
</script>
<style lang="less">
.order-index {
  .weui-cell {
    padding: 0 0.15rem !important;
  }
  .vux-flexbox-item {
    margin: 0 !important;
  }
  .text {
    height: 0.44rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .vux-flexbox {
    position: relative;
  }
  .vux-flex-col:before {
    border: none !important;
  }
  .vux-flexbox:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }
  .weui-cell:before {
    left: 0 !important;
  }
  .tab {
    top: 0;
    position: fixed;
    width: 100%;
    z-index: 99;
  }
  .center {
    justify-content: center !important;
  }
}
</style>
