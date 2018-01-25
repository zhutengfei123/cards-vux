<template>
    <div class="add-address">        
        <group gutter="0">
            <x-input title="收货人" v-model="name" placeholder="请填写收货人姓名"></x-input>
            <x-input title="联系电话" v-model="phone" placeholder="请填写联系电话"></x-input>
            <x-address class="address-input-border" title="所在地区" v-model="address" :list="addressData" placeholder="请选择"></x-address>
            <x-textarea title="详细地址" v-model="addressDetail" placeholder="请填写详细地址"></x-textarea>
        </group>
        <x-button class="bottom-button" @click="save">保存</x-button>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import {
  Group,
  XInput,
  Cell,
  XTextarea,
  XAddress,
  XButton
} from 'vux';
import addressData from '../../js/addressData.json';
import { Getter, Action, namespace } from 'vuex-class';
const AddressGetter = namespace('address', Getter);
const AddressAction = namespace('address', Action);
@Component({
  components: {
    Group,
    XInput,
    Cell,
    XTextarea,
    XAddress,
    XButton
  }
})
export default class AddAddress extends Vue {
  name = '';
  phone = '';
  address = [];
  addressDetail = '';
  addressData = addressData;
  @AddressGetter findById;
  @AddressAction add;
  @AddressAction update;
  get isAdd () {
    return this.$route.path === '/address/add';
  }
  get id () {
    return this.$route.params.id;
  }
  created () {
    if (!this.isAdd) {
      const { name, phone, province_id: provinceId, city_id: cityId, district_id: districtId, address } = this.findById(
        this.id
      );
      this.name = name;
      this.phone = phone;
      this.address = [provinceId, cityId, districtId];
      this.addressDetail = address;
    }
  }
  save () {
    const func = this.isAdd ? this.add : this.update;
    func({
      name: this.name,
      phone: this.phone,
      province: this.address[0],
      city: this.address[1],
      district: this.address[2],
      address: this.addressDetail,
      id: this.id
    }).then(msg => msg && this.$vux.toast.text(msg));
  }
}
</script>
<style lang="less" scoped>
.add-address {
  .address-input-border {
    position: relative;
  }
  .address-input-border:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }
  height: 100%;
  padding-bottom: 0.44rem;
  .weui-cell:before {
    left: 0 !important;
  }
  .bottom-button {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
  }
}
</style>
