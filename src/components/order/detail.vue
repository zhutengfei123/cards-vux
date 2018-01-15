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
            <flexbox><span class="text label">订单状态</span><span class="text brown">{{type}}</span></flexbox>
            <flexbox><span class="text label">订单号</span><span class="text">{{orderId}}</span></flexbox>
            <flexbox><span class="text label">快递单号</span><span class="text">{{deliveryId}}</span></flexbox>
            <cell is-link class="link">
                <p slot="inline-desc" class="text gray">{{time}}</p>
                <p slot="inline-desc" class="text gray">{{status}}</p>
            </cell>
        </group>
        <group>
            <cell><p slot="title" class="text">共{{count}}件商品<span class="gray">&nbsp;({{productsType}})</span></p></cell>
            <item v-for="item of list" :key="item.id" :item="item">
            </item>
        </group>
        <group>
            <cell-form-preview :list="[{
                label: '下单时间',
                value: '3.29'
            }, {
                label: '运费',
                value: '1.04'
            }, {
                label: '合计',
                value: '8.00'
            }, {
                label: '余额',
                value: '8.00'
            }, {
                label: '信用额度',
                value: '8.00'
            }]"></cell-form-preview>
            <cell>
                <span slot="title" class="text gray">实际付款</span>
                <span class="text red">￥{{cost}}</span>
            </cell>
        </group>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import {Cell, Group, CellFormPreview, Flexbox, FlexboxItem} from 'vux';
import { axios } from '../../js';
import Item from './item';
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
  name='sadsad'
  phone=''
  address=''
  list=[]
  count=0
  type=1
  orderId=''
  deliveryId=''
  time=''
  status=0
  productsType=''
  cost=0
  preview=[{
    label: '下单时间',
    value: ''
  }, {
    label: '运费',
    value: ''
  }, {
    label: '合计',
    value: ''
  }, {
    label: '余额',
    value: ''
  }, {
    label: '信用额度',
    value: ''
  }]

  created () {
    this.getInfo();
  }

  getInfo () {
    axios
      .get('', {
        params: { store_id: this.storeId, id: this.$route.params.id }
      });
    // .then(({ result, status: { code, msg } }) => {
    //   this.stock = result.stock
    //   this.picUrl = result.pic_url
    //   this.name = result.name
    //   this.price = result.price
    // })
  }
}
</script>
<style lang="less" scoped>
.order-detail{
    .link{
        width: calc( ~"70% - 0.32rem" );
        float: right;
    }
    .label{
        width: 30%;
        padding-left:0.16rem;
    }
}
</style>
<style lang="less">
.order-detail{
    .weui-form-preview__label{
        font-size: 0.14rem;
        color: #A6A6A6;
        letter-spacing: -0.0034rem;
    }
    .weui-form-preview__value{
        font-size: 0.14rem;
        color: #3C3C3C;
        letter-spacing: -0.0034rem;
    }
}
</style>
