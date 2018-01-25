<template>
    <div class="add-address">
        <group gutter="0">
            <x-input title="收货人" v-model="addressForm.name" placeholder="请填写收货人姓名"></x-input>
            <x-input title="联系电话" v-model="addressForm.phone" placeholder="请填写联系电话"></x-input>
            <x-address class="address-input-border" title="所在地区" v-model="addressForm.addressArr" :list="addressDataList" placeholder="请选择"></x-address>
            <x-textarea title="详细地址" v-model="addressForm.addressDetail" placeholder="请填写详细地址"></x-textarea>
        </group>
        <x-button class="bottom-button" @click.native="saveAddress">保存</x-button>
    </div>
</template>
<script>
import addressData from '../../js/addressData.json';
import { Component, Vue } from 'vue-property-decorator';
import { Group, XInput, Cell, XTextarea, XAddress, XButton, Toast } from 'vux';
import { Action, namespace } from 'vuex-class';
const AddressAction = namespace('address', Action);
@Component({
  components: { Group, XInput, Cell, XTextarea, XAddress, XButton, Toast }
})
export default class AddAddress extends Vue {
  @AddressAction editAddress
  @AddressAction addAddress
  addressDataList = addressData
  addressInfo = {}
  flag = true
  isEditAddress = true
  addressForm = {
    'name': '',
    'phone': '',
    'addressArr': [],
    'addressDetail': ''
  }
  created () {
    this.isEditAddress = /address\/edit/.test(this.$route.path);
    if (this.isEditAddress) {
      this.addressInfo = JSON.parse(localStorage.getItem('addressInfo'));
      if (this.addressInfo !== '') {
        const {name, phone, address} = this.addressInfo;
        this.addressForm = {
          'name': name,
          'phone': phone,
          'addressArr': [this.addressInfo.province_id, this.addressInfo.city_id, this.addressInfo.district_id],
          'addressDetail': address
        };
      }
    }
  }
  saveAddress () {
    if (this.addressForm.addressDetail === '') {
      this.$vux.toast.text('请填写详细地址', 'middle');
      this.flag = false;
    }
    if (this.addressForm.addressArr.length === 0) {
      this.$vux.toast.text('请填写所在地区', 'middle');
      this.flag = false;
    }
    if (this.addressForm.phone === '') {
      this.$vux.toast.text('请填写手机号码', 'middle');
      this.flag = false;
    }
    if (this.addressForm.name === '') {
      this.$vux.toast.text('请填写收货人', 'middle');
      this.flag = false;
    }
    if (this.flag) {
      let params = {
        'name': this.addressForm.name,
        'phone': this.addressForm.phone,
        'province': this.addressForm.addressArr[0],
        'city': this.addressForm.addressArr[1],
        'district': this.addressForm.addressArr[2],
        'town': this.addressInfo.town,
        'address': this.addressForm.addressDetail,
        'id': this.isEditAddress ? this.addressInfo.id : ''
      };
      if (this.isEditAddress) {
        this.editAddress(params).then(msg => {
          if (msg) {
            this.$vux.toast.text(msg, 'middle');
          } else {
            this.$vux.toast.text('地址修改成功', 'middle');
            this.$router.push('/address');
          }
        });
      } else {
        this.addAddress(params).then(msg => {
          if (msg) {
            this.$vux.toast.text(msg, 'middle');
          } else {
            this.$vux.toast.text('地址添加成功', 'middle');
            this.$router.push('/address');
          }
        });
      }
    }
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
