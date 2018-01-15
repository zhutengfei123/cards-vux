<template>
    <div class="order">
        <tab class="tab" ref="topBar" bar-active-color="#B79E74">
            <tab-item @on-item-click="filter('all')">全部</tab-item>
            <tab-item @on-item-click="filter('delivery')">待发货</tab-item>
            <tab-item @on-item-click="filter('pay')">待支付</tab-item>
            <tab-item @on-item-click="filter('deliveried')">已发货</tab-item>
        </tab>
        <group v-for="order of orders" :key="order.id">
            <cell>
                <p slot="title" class="text">订单编号：{{id}}</p>
                <p class="text brown">{{type}}</p>
            </cell>
            <item v-for="(item,index) of order.list" :key="item.id" :item="item" v-if="index<2"></item>
            <item v-for="(item,index) of order.list" :key="item.id" :item="item" v-if="index>=2" v-show="order.show"></item>
            <p class="text gray">查看全部{{order.list.length}}件商品</p>
            <cell>
                <p slot="title" class="text">共{{order.list.length}}件商品<span class="text gray"></span></p>
                <p class="text bold">合计：{{order.sum}}</p>
            </cell>
        </group>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import {Tab, TabItem, Cell, Group} from 'vux';
import Item from './item';
@Component({
  components: {Tab, TabItem, Cell, Group, Item}
})
export default class Order extends Vue {
  filter (type) {
    switch (type) {
      case 'all':break;
      case 'delivery':break;
      case 'pay':break;
      case 'deliveried':break;
    }
  }
}
</script>
<style lang="less" scoped>
.order{
    .tab{
      position: fixed;
      width: 100%;
    }
}
</style>
