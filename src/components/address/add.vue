<template>
    <div class="add-address">        
        <group gutter="0">
            <x-input title="收货人" v-model="name" placeholder="请填写收货人姓名"></x-input>
            <x-input title="联系电话" v-model="tel" placeholder="请填写联系电话"></x-input>
            <x-address title="所在地区" v-model="address" raw-value :list="addressData" placeholder="请选择"></x-address>
            <x-textarea title="详细地址" v-model="addressDetail" placeholder="请填写详细地址"></x-textarea>
        </group>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import { Group, XInput, Cell, XTextarea, XAddress, ChinaAddressV4Data } from 'vux'
@Component({
  components: { Group, XInput, Cell, XTextarea, XAddress, ChinaAddressV4Data }
})
export default class AddAddress extends Vue {
    name=''
    tel=''
    address=[]
    addressDetail=''
    addressData=ChinaAddressV4Data
}
</script>
<style lang="less" scoped>
.add-address{

}
</style>
