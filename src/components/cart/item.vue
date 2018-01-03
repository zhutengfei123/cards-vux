<template>
  <flexbox class="item" align="center">
      <flexbox-item :span="0.4">
          <check-icon :value.sync="item.select" class="check-icon">
               <x-img class="image" :src="`${item.pic_url.split('?')[0]}?x-oss-process=image/format,jpg`" :webp-src="`${item.pic_url.split('?')[0]}?x-oss-process=image/format,webp`" container="#vux_view_box_body"/>
          </check-icon>
      </flexbox-item>
      <flexbox-item>
          <flexbox orient="vertical">
              <flexbox-item>
                  <p class="title">{{item.title}}</p>
              </flexbox-item>
              <flexbox-item>
                    <group>
                        <x-number class="price" :title="item.price+''" width="0.4rem" :min="1" :max="item.store" v-model="item.count" :fillable="true"></x-number>
                    </group>
              </flexbox-item>
          </flexbox>
      </flexbox-item>
  </flexbox>
</template>
<script>
import { CheckIcon, Flexbox, FlexboxItem, XNumber, Group, XImg } from 'vux'
export default {
  name: 'item',
  props: {item: Object},
  components: {CheckIcon, Flexbox, FlexboxItem, XNumber, Group, XImg}
}
</script>
<style lang="less" scoped>
.item{
    background: #ffffff;
    .image{
        width:1rem;
        height:1rem;
    }
    .price{
        font-size: 0.14rem;
        color: #C61A2A;
        letter-spacing: -0.0034rem;
    }
    .title{
        font-size: 0.14rem;
        color: #3C3C3C;
        letter-spacing: -0.0034rem;
        line-height: 0.16rem;
    }
    .check-icon{
        display:flex;
        align-items: center;
    }
}
</style>
