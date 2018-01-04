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
             <p class="banner">123123</p>
             <p class="price">12313</p>
             <group>
                 <cell-box :border-intent="false"><flexbox justify="space-between"><p class="cell-title">库存</p><p class="cell-title">999</p></flexbox></cell-box>
                 <cell-box is-link :border-intent="false"><flexbox justify="space-between"><p class="cell-title">查看可兑换商品</p></flexbox></cell-box>
             </group>
         </flexbox-item>
      </flexbox>
  </div>
</template>
<script>
import {Swiper, SwiperItem, Flexbox, FlexboxItem, CellBox, Group} from 'vux'
export default {
  name: 'detail',
  data () {
    return {}
  },
  components: {
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem,
    CellBox,
    Group
  }
}
</script>
<style lang="less" scoped>
.detail{
    padding: 0.16rem 0;
    .image{
        position: relative;
        width:3.45rem;
        height:3.45rem;
        background: #ffffff;
       
        .left{
            position: absolute;
            left: 0;
            top:0;
            border-radius:50%;
            width:0.35rem;
            height:0.35rem;
        }
        .right{
            position:absolute;
            right:0;
            top:0;
            border-radius:50%;
            width:0.35rem;
            height:0.35rem;
        }
    }
     .banner{
            font-size: 0.16rem;
            color: #3C3C3C;
            letter-spacing: -0.0039rem;
            padding:0 0.16rem;
        }
        .price{
            font-size: 0.16rem;
            color:#C61A2A;
            letter-spacing: -0.0039rem;
            padding:0 0.16rem;
        }
        .cell-title{
            font-size: 0.14rem;
            color: #A6A6A6;
            letter-spacing: -0.0034rem;
        }
}
</style>
