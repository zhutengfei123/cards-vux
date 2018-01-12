<template>
  <div class="detail">
      <flexbox orient="vertical">
         <flexbox-item class="image">
            <span class="app-icon left"></span>
            <span class="app-icon right"></span>
            <swiper class="image-display">
                <swiper-item><img :src="`${picUrl.split('?')[0]}x-oss-process=image/resize,w_${imgWidth}/format,jpg`"></swiper-item>
            </swiper>
         </flexbox-item>
         <flexbox-item>
             <p class="text lg padding">{{name}}</p>
             <p class="text lg red padding">￥{{price}}</p>
             <group>
                 <cell-box :border-intent="false"><flexbox justify="space-between"><p class="text gray">库存</p><p class="text gray">{{stock}}</p></flexbox></cell-box>
                 <cell-box is-link :border-intent="false"><flexbox justify="space-between"><p class="text gray">查看可兑换商品</p></flexbox></cell-box>
             </group>
         </flexbox-item>
      </flexbox>
      <flexbox align="center" class="bottom-bar">
        <flexbox-item :span="0.6">
            <flexbox>
                <label class="text gray">数量</label>
                <inline-x-number class="price" width="0.4rem" :min="1" :max="Number(stock)" v-model="count" :fillable="true"></inline-x-number>
            </flexbox>
        </flexbox-item>
        <flexbox-item>
            <x-button class="btn">加入购物车</x-button>
        </flexbox-item>
     </flexbox>
  </div>
</template>
<script>
import {
  Swiper,
  SwiperItem,
  Flexbox,
  FlexboxItem,
  CellBox,
  Group,
  InlineXNumber,
  XButton
} from 'vux';
import { axios } from '../../js';
import {State, namespace} from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';
const GlobalState = namespace('global', State);
@Component({
  components: {
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem,
    CellBox,
    Group,
    InlineXNumber,
    XButton
  }
})
export default class Detail extends Vue {
  count=0
  stock=0
  price=0
  picUrl=''
  name=''
  imgWidth= parseInt(screen.width)

  @GlobalState storeId

  getInfo () {
    axios
      .get('/card-shop/info', {
        params: { store_id: this.storeId, id: this.$route.params.id }
      })
      .then(({ result, status: { code, msg } }) => {
        this.stock = result.stock;
        this.picUrl = result.pic_url;
        this.name = result.name;
        this.price = result.price;
      });
  }

  created () {
    this.getInfo();
  }
}
</script>
<style lang="less" scoped>
.detail {
  padding: 0.16rem 0;
  .image {
    position: relative;
    width: 3.45rem;
    height: 3.45rem;
    background: #ffffff;

    .left {
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 50%;
      width: 0.35rem;
      height: 0.35rem;
    }
    .right {
      position: absolute;
      right: 0;
      top: 0;
      border-radius: 50%;
      width: 0.35rem;
      height: 0.35rem;
    }
  }
  .padding{
    padding: 0 0.16rem;
  }
  // .banner {
  //   font-size: 0.16rem;
  //   color: #3c3c3c;
  //   letter-spacing: -0.0039rem;
  //   padding: 0 0.16rem;
  // }
  // .price {
  //   font-size: 0.16rem;
  //   color: #c61a2a;
  //   letter-spacing: -0.0039rem;
  //   padding: 0 0.16rem;
  // }
  .bottom-bar {
    position: fixed;
    bottom: 0;
    background: #ffffff;
    label {
      padding-left: 0.16rem;
    }
    .btn {
      border-radius: unset;
    }
  }
}
</style>
