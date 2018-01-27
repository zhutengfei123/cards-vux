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
    justify-content: center;
    align-items: center;
    padding:0.08rem;
    text-decoration: none;
    background: #ffffff;
    box-shadow: 0 0 0.1rem 0 rgba(0,0,0,0.05);
    .weui-btn_mini {
        font-size: 0.12rem !important;
        width: 1.1rem !important;
        line-height: initial;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 !important;
        padding: 0 !important;
        height: 0.24rem;
    }
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
