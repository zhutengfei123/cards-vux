<template>
  <flexbox class="item" align="center">
      <flexbox-item :span="0.4">
          <check-icon :value.sync="item.select" class="check-icon">
               <x-img class="image" :src="`${item.pic_url.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth}/format,jpg`" :webp-src="`${item.pic_url.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth}/format,webp`" container="#vux_view_box_body"/>
          </check-icon>
      </flexbox-item>
      <flexbox-item>
          <flexbox orient="vertical">
              <flexbox-item>
                <p class="text">{{item.title}}</p>
              </flexbox-item>
              <flexbox-item style="margin-top:0.5rem">
                <flexbox justify="space-between">
                    <label class="text red">{{item.price}}</label>
                    <inline-x-number width="0.4rem" :min="1" :max="item.store" v-model="item.count" :fillable="true"></inline-x-number>
                </flexbox>
              </flexbox-item>
          </flexbox>
      </flexbox-item>
  </flexbox>
</template>
<script>
import { CheckIcon, Flexbox, FlexboxItem, InlineXNumber, Group, XImg } from 'vux'
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  components: {CheckIcon, Flexbox, FlexboxItem, InlineXNumber, Group, XImg}
})
export default class Item extends Vue {
  @Prop([Object]) item
  imgWidth=parseInt(screen.width / 2)
}
</script>
<style lang="less" scoped>
.item{
    background: #ffffff;
    .image{
        width:1rem;
    }
    .check-icon{
        display:flex;
        align-items: center;
    }
}
</style>
