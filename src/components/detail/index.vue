<template>
  <div class="detail">
      <flexbox orient="vertical">
         <flexbox-item class="image">
            <span class="app-icon left"></span>
            <span class="app-icon right"></span>
            <swiper class="image-display">
                <swiper-item></swiper-item>
            </swiper>
         </flexbox-item>
         <flexbox-item>
             <p class="banner">{{name}}</p>
             <p class="price">￥{{price}}</p>
             <group>
                 <cell-box :border-intent="false"><flexbox justify="space-between"><p class="cell-title">库存</p><p class="cell-title">{{stock}}</p></flexbox></cell-box>
                 <cell-box is-link :border-intent="false"><flexbox justify="space-between"><p class="cell-title">查看可兑换商品</p></flexbox></cell-box>
             </group>
         </flexbox-item>
      </flexbox>
      <flexbox align="center" class="bottom-bar">
        <flexbox-item :span="0.6">
            <flexbox>
                <label class="cell-title">数量</label>
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
} from 'vux'
import { axios } from '../../js'
import {mapState} from 'vuex'
export default {
  name: 'detail',
  data () {
    return { count: 1, stock: 1, pic_url: '', name: '', price: 0 }
  },
  methods: {
    getInfo () {
      axios
        .get('/card-shop/info', {
          params: { store_id: this.storeId, id: this.$route.params.id }
        })
        .then(({ result, status: { code, msg } }) => {
          this.stock = result.stock
          this.pic_url = result.pic_url
          this.name = result.name
          this.price = result.price
        })
    }
  },
  computed: {
    ...mapState('global', {
      storeId: 'storeId'
    })
  },
  components: {
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem,
    CellBox,
    Group,
    InlineXNumber,
    XButton
  },
  created () {
    this.getInfo()
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
  .banner {
    font-size: 0.16rem;
    color: #3c3c3c;
    letter-spacing: -0.0039rem;
    padding: 0 0.16rem;
  }
  .price {
    font-size: 0.16rem;
    color: #c61a2a;
    letter-spacing: -0.0039rem;
    padding: 0 0.16rem;
  }
  .cell-title {
    font-size: 0.14rem;
    color: #a6a6a6;
    letter-spacing: -0.0034rem;
  }
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
