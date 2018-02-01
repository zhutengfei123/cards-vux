<template>
    <div class="intention-detail">
        <div class="detail-top-1">下单信息</div>
        <div class="detail-top-2">
            <div class="detail-top-con"><span class="desc">姓名</span><span>{{intentionDetail.name}}</span></div>
            <div class="detail-top-con"><span class="desc">联系电话</span><span>{{intentionDetail.phone}}</span></div>
            <div class="detail-top-con"><span class="desc">企业信息</span><span>{{intentionDetail.company}}</span></div>
            <div class="detail-top-con"><span class="desc">地址</span><span>{{intentionDetail.full_address}}</span></div>
            <div class="detail-top-con"><span class="desc">下单时间</span><span>{{intentionDetail.create_time}}</span></div>
        </div>
        <div class="detail-con-title">共{{intentionDetail.goods_list.length}}件商品</div>
        <div class="detail-con-list" v-for="(item, index) in intentionDetail.goods_list" :key="index">
            <div class="img-box"><img class="img" :src="item.pic" alt=""></div>
            <div class="product-name">{{item.name}}</div>
            <div class="price-num">
                <span class="price">￥{{item.price}}</span>
                <span class="num">x{{item.num}}</span>
            </div>
        </div>
        <div class="detail-top-con foot"><span class="desc">订单金额</span><span class="price">￥{{intentionDetail.total_price}}</span></div>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import {Toast} from 'vux';
import { State, namespace, Action } from 'vuex-class';
const ProductsState = namespace('products', State);
const ProductsAction = namespace('products', Action);
@Component({
  components: {Toast}
})
export default class IntentionDetail extends Vue {
    @ProductsState intentionDetail
    @ProductsAction initGetIntentionDetail
    created () {
      const params = {
        'id': this.$route.params.id
      };
      this.initGetIntentionDetail(params).then(msg => {
        if (msg) {
          this.$vux.toast.text(msg, 'middle');
        }
      });
    }
}
</script>
<style lang="less">
.intention-detail{
    font-size: 0.14rem;
    padding-bottom: 0.55rem;
    .img-box {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .product-name {
        min-width: 1.5rem;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 0 0.1rem;
        display: -webkit-box !important;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        line-height: 0.2rem;
    }
    .price-num {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        flex-direction: column;
    }
    .num {
        color: #a6a6a6;
        font-size: 0.1rem;
    }
    .img {
        border: none;
        width: 0.6rem;
    }
    .foot {
        margin-top: 0.15rem;
        background: #ffffff;
    }
    .desc {
        color: #a6a6a6;
    }
    .price {
        color: #C61A2A;
    }
    .detail-top-1, .detail-con-title {
        height: 0.44rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 0.15rem;
    }
    .detail-con-title {
        background: #ffffff;
    }
    .detail-top-2 {
        background: #ffffff;
        margin-bottom: 0.15rem;
    }
    .detail-top-con {
        height: 0.44rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.15rem;
    }
    .detail-con-list:before {
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
    .detail-con-list {
        position: relative;
        background: #ffffff;
        height: 0.6rem;
        padding: 0.15rem 0.15rem !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.15rem;
    }
    .detail-con-list div {
        height: 100%;
    }
}
</style>
