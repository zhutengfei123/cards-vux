<template>
    <div class="order-detail">
        <group>
            <cell>
                <flexbox slot="title" class="title">
                    <span class="bold">张民洋</span>
                    <span>&nbsp;15868171185</span>
                </flexbox>
                <span slot="inline-desc" class="desc">浙江省 杭州市 西湖区 古荡社区西斗门路天堂软件园d幢5d礼管家</span>
            </cell>
        </group>
        <group label-width="0.5rem">
            <flexbox><span class="label">订单状态</span><span class="value highlight">123</span></flexbox>
            <flexbox><span class="label">订单号</span><span class="value">432</span></flexbox>
            <flexbox><span class="label">快递单号</span><span class="value">132</span></flexbox>
            <cell is-link class="link">
                <p slot="inline-desc" class="content">123</p>
                <p slot="inline-desc" class="content">123</p>
            </cell>
        </group>
        <group>
            <cell><p slot="title">共{{count}}件商品<span class="pray">&nbsp;({{type}})</span></p></cell>
            <item v-for="item of [{pic_url:'http://g.hiphotos.baidu.com/image/pic/item/b3119313b07eca800b6ae3f49b2397dda14483b2.jpg',content:'123',price:123,}]" :key="item.id" :item="item">
                <!-- <flexbox-item><x-img :src="item.pic_url"/></flexbox-item>
                <flexbox-item>{{item.content}}</flexbox-item>
                <flexbox-item>
                    <flexbox orient="vertical">
                        <flexbox-item class="red">￥{{item.price}}</flexbox-item>
                        <flexbox-item>x{{item.count}}</flexbox-item>
                    </flexbox>
                </flexbox-item> -->
            </item>
        </group>
        <group>
            <cell-form-preview :list="[{
                label: 'Apple',
                value: '3.29'
            }, {
                label: 'Banana',
                value: '1.04'
            }, {
                label: 'Fish',
                value: '8.00'
            }]"></cell-form-preview>
            <cell>
                <span slot="title" class="cell">实际付款</span>
                <span class="red">￥{{123}}</span>
            </cell>
        </group>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import {Cell, Group, CellFormPreview} from 'vux'
import Item from './item'
@Component({
  components: {
    Cell,
    Group,
    CellFormPreview,
    Item
  }
})
export default class OrderDetail extends Vue {
  list=[]
  count=0
  type=1
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
