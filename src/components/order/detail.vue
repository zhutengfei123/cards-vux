<template>
    <div class="order-detail">
        <group>
            <cell>
                <flexbox slot="title" class="title">
                    <span class="bold">{{name}}</span>
                    <span>&nbsp;{{phone}}</span>
                </flexbox>
                <span slot="inline-desc" class="desc">{{address}}</span>
            </cell>
        </group>
        <group>
            <flexbox><span class="label">订单状态</span><span class="value highlight">{{type}}</span></flexbox>
            <flexbox><span class="label">订单号</span><span class="value">{{orderId}}</span></flexbox>
            <flexbox><span class="label">快递单号</span><span class="value">{{deliveryId}}</span></flexbox>
            <cell is-link class="link">
                <p slot="inline-desc" class="content">{{time}}</p>
                <p slot="inline-desc" class="content">{{status}}</p>
            </cell>
        </group>
        <group>
            <cell><p slot="title">共{{count}}件商品<span class="pray">&nbsp;({{productsType}})</span></p></cell>
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
                <span slot="title" class="cell">实际付款</span>
                <span class="red">￥{{cost}}</span>
            </cell>
        </group>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import {Cell, Group, CellFormPreview, Flexbox, FlexboxItem} from 'vux'
import { axios } from '../../js'
import Item from './item'
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
  name=''
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
    this.getInfo()
  }

  getInfo () {
    axios
      .get('', {
        params: { store_id: this.storeId, id: this.$route.params.id }
      })
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
    .title{
        font-size: 0.16rem;
        color: #3C3C3C;
        letter-spacing: -0.0039rem;
        .bold{
            font-weight: bold;
        }
    }
    .desc{
        font-size: 0.14rem;
        color: #3C3C3C;
        letter-spacing: -0.0034rem;
    }
    .link{
        width: calc( ~"70% - 0.32rem" );
        float: right;
        .content{
            font-size: 0.14rem;
            color: #A6A6A6;
            letter-spacing: -0.0034rem;
        }
    }
    .red{
        font-size: 0.14rem;
        color: #C61A2A;
        letter-spacing: -0.0034rem;
    }
    .cell{
        font-size: 0.14rem;
        color: #A6A6A6;
        letter-spacing: -0.0034rem;
    }
    .label{
        width: 30%;
        padding-left:0.16rem;
        font-size: 0.14rem;
        color: #3C3C3C;
        letter-spacing: -0.0034rem;
    }
    .value{
        font-size: 0.14rem;
        color: #3C3C3C;
        letter-spacing: -0.0034rem;
        &.highlight{
            color: #B79E74;
        }
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
