<template>
    <div class="add-address">        
        <group gutter="0">
            <x-input title="收货人" v-model="name" placeholder="请填写收货人姓名"></x-input>
            <x-input title="联系电话" v-model="phone" placeholder="请填写联系电话"></x-input>
            <x-address title="所在地区" v-model="address" :list="addressData" placeholder="请选择"></x-address>
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
  ChinaAddressV4Data,
  XButton
} from 'vux';
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
    ChinaAddressV4Data,
    XButton
  }
})
export default class AddAddress extends Vue {
  name = '';
  phone = '';
  address = [];
  addressDetail = '';
  addressData = ChinaAddressV4Data;

  @AddressGetter findById;

  @AddressAction add;
  @AddressAction update;

  get isAdd () {
    return this.$route.path === 'add';
  }

  get id () {
    return this.$route.params.id;
  }

  actived () {
    if (!this.isAdd) {
      const { name, phone, province, city, district, address } = this.findById(
        this.id
      );
      this.name = name;
      this.phone = phone;
      this.address = [province, city, district];
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
  .bottom-button {
    padding: 0 0.16rem;
    position: fixed;
    bottom: 0;
    margin: 0.16rem;
    width: calc(~"100% - 0.32rem");
  }
}
</style>
