<template>
    <div class="address">
        <group v-for="item of list" :key="item.id">
            <cell>
                <p class="text lg" slot="title"><span class="bold">{{item.name}}</span>&nbsp;{{item.tel}}</p>
                <p class="text">{{item.address}}</p>
            </cell>
            <cell>
                <check-icon slot="title"><span class="text brown">默认地址</span></check-icon>
                <div class="text brown"><span @click="editAddress(item.id)">编辑</span>&nbsp;&nbsp;<span @click="deleteAddress(item.id)">删除</span></div>
            </cell>
        </group>
        <div v-transfer-dom>
            <confirm
            v-model="show"
            title="提示"
            @on-cancel="onCancel"
            @on-confirm="onConfirm">
                <p class="text">确定要删除该地址吗？</p>
            </confirm>
        </div>
    </div>
</template>
<script>
import { Group, Cell, CheckIcon, Confirm, TransferDomDirective as TransferDom } from 'vux'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  directives: {
    TransferDom
  },
  components: { Group, Cell, CheckIcon, Confirm }
})
export default class Address extends Vue {
    show=false

    onCancel () {
      this.show = false
    }
    onConfirm () {
      this.show = false
    }
    deleteAddress (id) {
      this.show = true
    }
    editAddress (id) {}
}
</script>
<style lang="less" scoped>

</style>
