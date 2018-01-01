<template>
    <div class="card">
        <x-img container="#vux_view_box_body" :src="`${item.pic_url.split('?')[0]}?x-oss-process=image/format,jpg`" :webp-src="`${item.pic_url.split('?')[0]}?x-oss-process=image/format,webp`"/>
        <p>{{item.name}}</p>
        <p class="price">尊享价:{{item.price}}</p>
        <x-button mini class="btn-color" @click="addCart(item.id)">加入购物车</x-button>
    </div>
</template>
<script>
import {XImg, XButton} from 'vux'
export default {
  name: 'Card',
  props: {item: Object},
  components: {XImg, XButton},
  methods: {
    addCart (id) {
      console.log(id)
    }
  }
}
</script>
<style lang="less" scoped>
.card{
    display: flex;
    flex-direction: column;
    padding:0.08rem;
    background: #FFFFFF;
    text-decoration: none;
    img{
        width: 100%;
        vertical-align: middle;
        margin: 0.08rem 0;
    }
    p{
        font-size: 0.14rem;
        color: #3c3c3c;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin: 0 !important;
        text-align: center;
    }
    .price{
        color: #C61A2A;
        font-size: 0.12rem;
    }
}
</style>
