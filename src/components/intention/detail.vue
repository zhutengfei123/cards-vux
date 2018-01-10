<template>
    <div class="intention-detail">
        <group title="下单信息" title-color="#3C3C3C">
            <cell-form-preview :list="form"></cell-form-preview>
        </group>
        <group>
            <cell><span class="text" slot="title">共{{count}}件商品</span></cell>
            <item v-for="item of list" :key="item.id" :item="item"></item>
        </group>
        <group>
            <cell><span class="text gray" slot="title">订单金额</span><span class="text red">￥{{total}}</span></cell>
        </group>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import {Flexbox, FlexboxItem, Group, CellFormPreview, Cell} from 'vux'
import Item from '../order/item'
@Component({
  components: {Flexbox, FlexboxItem, Group, CellFormPreview, Cell, Item}
})
export default class IntentionDetail extends Vue {
    form=[{label: '姓名', value: ''}, {label: '联系电话', value: ''}, {label: '企业信息', value: ''}, {label: '地址', value: ''}, {label: '下单时间', value: ''}]
    total=0
    list=[]
    count=0
}
</script>
<style lang="less" scoped>
.intention-detail{

}
</style>
