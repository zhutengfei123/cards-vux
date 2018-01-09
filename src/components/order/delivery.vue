<template>
  <div class="delivery">
    <flexbox class="text lg">
        <flexbox-item :span="0.3">物流状态</flexbox-item>
        <flexbox-item>{{status}}</flexbox-item>
    </flexbox>
    <flexbox class="text lg">
        <flexbox-item :span="0.3">快递单号</flexbox-item>
        <flexbox-item>{{id}}</flexbox-item>
    </flexbox>
    <flexbox orient="vertical" v-for="(item,index) of list" :key="item.id" :class="`text ${index>0&&'gray'}`">
        <flexbox-item>{{item.content}}</flexbox-item>
        <flexbox-item>{{item.time}}</flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import {Flexbox, FlexboxItem} from 'vux'
// import { axios } from '../../js'
@Component({
  components: {Flexbox, FlexboxItem}
})
export default class Delivery extends Vue {
  status=''
  id=''
  list=[]
}
</script>
<style lang="less" scoped>
.delivery{
    .text{
        font-size: 0.14rem;
        color: #3C3C3C;
        letter-spacing: -0.0034rem;
        &.lg{
            font-size: 0.16rem;
        }
        &.gray{
            color: #A6A6A6;
        }
    }
}
</style>
