<template>
    <div class="order-detail">
        <group>
            <cell>
                <flexbox slot="title" class="text lg">
                    <span class="bold">{{name}}</span>
                    <span>&nbsp;{{phone}}</span>
                </flexbox>
                <span slot="inline-desc" class="text">{{address}}</span>
            </cell>
        </group>
        <group>
            <flexbox><span class="text label">订单状态</span><span class="text brown" :style="{'color':setColor}">{{type}}</span></flexbox>
            <flexbox><span class="text label">订单号</span><span class="text">{{orderSn}}</span></flexbox>
            <flexbox v-if="orderStatus!=='1'"><span class="text label">快递单号</span><span class="text">{{`${expressNo}（${expressName}）`}}</span></flexbox>
            <cell v-if="orderStatus!=='1'&&time!==''" is-link class="link" :link="`/order/delivery/${orderSn}`">
                <p slot="inline-desc" class="text gray">{{time}}</p>
                <p slot="inline-desc" class="text gray">{{context}}</p>
            </cell>
        </group>
        <group>
            <cell><p slot="title" class="text">共{{list.length}}件商品</p></cell>
            <item v-for="(item, index) in list" :key="index" :item="item"></item>
        </group>
        <group>
            <cell-form-preview :list="preview"></cell-form-preview>
            <cell>
                <span slot="title" class="text gray">实际付款</span>
                <span class="text red">￥{{totalPrice}}</span>
            </cell>
        </group>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import { Cell, Group, CellFormPreview, Flexbox, FlexboxItem } from 'vux';
import { State, Action, namespace } from 'vuex-class';
import Item from './item';
const OrderAction = namespace('order', Action);
const OrderState = namespace('order', State);
@Component({
  components: {
    Cell,
    Group,
    CellFormPreview,
    Item,
    Flexbox,
    FlexboxItem
  }
})
export default class OrderDetail extends Vue {
  @OrderState detailData;
  @OrderAction getDetail;
  name = '';
  phone = '';
  address = '';
  list = [];
  count = 0;
  orderStatus = 0;
  orderSn = '';
  expressNo = '';
  expressName = '';
  time = '';
  context = '';
  totalPrice = 0;
  setColor = localStorage.getItem('setColor')
  preview = [
    {
      label: '下单时间',
      value: ''
    },
    {
      label: '运费',
      value: ''
    },
    {
      label: '合计',
      value: ''
    }
  ];
  get type () {
    switch (this.orderStatus) {
      case '1':
        return '待发货';
      case '2':
        return '待收货';
      case '3':
        return '已完成';
    }
  }
  getInfo () {
    const params = {
      order_sn: this.$route.params.id || ''
    };
    this.getDetail(params).then(msg => {
      if (msg) {
        this.$vux.toast.text(msg);
      } else {
        const {name, phone, address} = this.detailData.address_info;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.list = this.detailData.goods_list[0].list;
        this.orderStatus = this.detailData.order_status;
        this.orderSn = this.detailData.order_sn;
        this.totalPrice = this.detailData.total_price;
        this.preview[0].value = this.detailData.create_time;
        this.preview[1].value = `￥${this.detailData.freight}`;
        this.preview[2].value = `￥${this.detailData.price}`;
        if (this.orderStatus !== '1') {
          this.expressNo = this.detailData.express.express_no;
          this.expressName = this.detailData.express.express_name;
          if (this.detailData.express.data.length > 0) {
            this.time = this.detailData.express.data[0].time;
            this.context = this.detailData.express.data[0].context;
          }
        }
      }
    });
  }
  created () {
    this.getInfo();
  }
}
</script>
<style lang="less">
.order-detail {
  .gray {
    width: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .my-item {
    position: relative;
  }
  .my-item:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
  .weui-cells:after {
    content: initial;
  }
  .weui-cell:before {
    left: 0 !important;
  }
  .vux-flexbox {
    height: 0.44rem;
  }
  .link {
    width: calc(~"70% - 0.32rem");
    float: right;
    min-height: 0.68rem;
  }
  .label {
    width: 30%;
    padding-left: 0.16rem;
  }
  .weui-cells,.vux-no-group-title {
    margin-top: 0 !important;
    margin-bottom: 0.15rem;
    min-height: 0.95rem;
  }
  .weui-form-preview__label {
    font-size: 0.14rem;
    color: #a6a6a6;
    letter-spacing: -0.0034rem;
  }
  .weui-form-preview__value {
    font-size: 0.14rem;
    color: #3c3c3c;
    letter-spacing: -0.0034rem;
  }
}
</style>
