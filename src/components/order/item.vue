<template>
    <flexbox class="item" align="center">
        <flexbox-item :span="0.25" class="image-container">
            <x-img class="image" :src="`${item.goods_pic.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth}/format,jpg`" :webp-src="`${item.goods_pic.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth}/format,webp`" container="#vux_view_box_body"/></flexbox-item>
        <flexbox-item :span="0.5" class="text">{{item.goods_name}}</flexbox-item>
        <flexbox-item>
            <flexbox orient="vertical">
                <flexbox-item class="text red">￥{{item.price}}</flexbox-item>
                <flexbox-item class="count">x {{item.num}}</flexbox-item>
            </flexbox>
        </flexbox-item>
    </flexbox>  
</template>
<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Flexbox, XImg, FlexboxItem } from 'vux';
@Component({
  components: { Flexbox, XImg, FlexboxItem }
})
export default class Item extends Vue {
    imgWidth=parseInt(screen.width / 2)

    @Prop([Object]) item
}
</script>
<style lang="less" scoped>
.item{
    .image-container{
        display: flex;
        justify-content: center;
        padding: 0.08rem;
        .image{
            height:0.6rem;
        }
    }
    .count{
        font-size: 0.1rem;
        color: #A6A6A6;
        letter-spacing: -0.0024rem;
    }
}
</style>
