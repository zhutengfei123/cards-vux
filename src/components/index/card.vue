<template>
    <div class="card">
        <x-img container="#vux_view_box_body" :src="`${item.pic_url.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth}/format,jpg`" :webp-src="`${item.pic_url.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth}/format,webp`"/>
        <p class="text">{{item.name}}</p>
        <p class="text red">尊享价:{{item.price}}</p>
        <x-button mini @click.native="addCart(item.id)">加入购物车</x-button>
    </div>
</template>
<script>
import {XImg, XButton} from 'vux';
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({
  components: {XImg, XButton}
})
export default class Card extends Vue {
  @Prop([Object]) item

  imgWidth= parseInt(screen.width / 2)

  addCart (id) {
    console.log(id);
  }
}
</script>
<style lang="less" scoped>
.card{
    display: flex;
    flex-direction: column;
    padding:0.08rem;
    text-decoration: none;
    background: #ffffff;
    img{
        width: 100%;
        vertical-align: middle;
        margin: 0.08rem 0;
    }
    p{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin: 0 !important;
        text-align: center;
    }
    .red{
        font-size: 0.12rem;
    }
}
</style>
