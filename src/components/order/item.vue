<template>
    <flexbox class="item" align="center">
        <flexbox-item :span="0.25" class="image-container"><x-img class="image" :src="item.pic_url"/></flexbox-item>
        <flexbox-item :span="0.5" class="content">{{item.content}}</flexbox-item>
        <flexbox-item>
            <flexbox orient="vertical">
                <flexbox-item class="red">￥{{item.price}}</flexbox-item>
                <flexbox-item class="count">x {{item.count}}</flexbox-item>
            </flexbox>
        </flexbox-item>
    </flexbox>  
</template>
<script>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Flexbox, XImg, FlexboxItem } from 'vux'
@Component({
  components: { Flexbox, XImg, FlexboxItem }
})
export default class Item extends Vue {
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
    .content{
        font-size: 0.14rem;
        color: #3C3C3C;
        letter-spacing: -0.0034rem;
    }
    .red{
        font-size: 0.14rem;
        color: #C61A2A;
        letter-spacing: -0.0034rem;
    }
    .count{
        font-size: 0.1rem;
        color: #A6A6A6;
        letter-spacing: -0.0024rem;
    }
}
</style>
