<template>
    <div class="address-index">
        <group v-for="(item, index) in addressList" :key="index">
            <cell>
                <p class="text lg" slot="title"><span class="bold">{{item.name}}</span>{{item.phone}}</p>
                <p class="text" slot="title">{{item.province+' '+item.city+' '+item.district+' '+item.address}}</p>
            </cell>
            <cell class="address-edit-row">
                <check-icon :value.sync="item.is_default==='1'?true:false" @click.native="handleSelectAdress(item)">
                  <span class="checked-title">默认地址</span>
                </check-icon>
                <div class="text brown">
                  <span @click="handleEditAddress(item)">编辑</span>
                  <span class="address-remove" @click="deleteAddress(item.id)">删除</span>
                </div>
            </cell>
        </group>
        <x-button class="bottom-button" @click.native="$router.push('/address/add')">添加新地址</x-button>
        <div v-transfer-dom>
            <confirm v-model="isShow" @on-cancel="onCancel" @on-confirm="onConfirm">
                <p class="text" style="font-size: 0.18rem;font-weight:bold">提示</p>
                <p class="text" style="margin-top:0.08rem;font-size:0.16rem;">确定要删除该地址吗？</p>
            </confirm>
        </div>
    </div>
</template>
<script>
import { Toast, Group, Cell, CheckIcon, Confirm, TransferDomDirective as TransferDom, XButton } from 'vux';
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, namespace } from 'vuex-class';
const AddressState = namespace('address', State);
const AddressAction = namespace('address', Action);
@Component({
  directives: {
    TransferDom
  },
  components: { Group, Cell, CheckIcon, Confirm, XButton, Toast }
})
export default class Address extends Vue {
  @AddressState addressList;
  @AddressAction remove;
  @AddressAction getData;
  @AddressAction setDefaultAdress;
  isShow = false;
  clickId = '';
  flag = true
  handleEditAddress (item) {
    localStorage.setItem('addressInfo', JSON.stringify(item));
    this.$router.push('/address/edit');
  }
  handleSelectAdress (item) {
    if (this.flag) {
      this.flag = false;
      this.addressList.forEach(list => {
        if (list.is_default === '1') {
          list.is_default = '0';
        }
      });
      item.is_default === '0' ? item.is_default = '1' : item.is_default = '0';
      const params = {
        'id': item.id
      };
      this.setDefaultAdress(params).then(msg => {
        if (msg) {
          this.$vux.toast.text(msg, 'middle');
        } else {
          this.$router.push({
            path: '/confirmOrder'
          });
        }
      });
      let timer = null;
      timer = setTimeout(() => {
        this.flag = true;
        clearTimeout(timer);
      }, 500);
    } else {
      this.$vux.toast.text('您的操作过于频繁', 'middle');
    }
  }
  onCancel () {
    this.isShow = false;
  }
  onConfirm () {
    this.isShow = false;
    const params = {
      'id': this.clickId
    };
    this.remove(params).then(msg => {
      if (msg) {
        this.$vux.toast.text(msg, 'middle');
      } else {
        this.getData();
        this.$vux.toast.text('删除成功', 'middle');
      }
    });
  }
  deleteAddress (id) {
    this.isShow = true;
    this.clickId = id;
  }
  created () {
    this.getData();
  }
}
</script>
<style lang="less">
.address-index {
  padding-bottom: 0.44rem;
  .weui-btn:after {
    content: initial;
  }
  .bold {
    padding-right: 0.15rem;
  }
  .checked-title {
    color: #B79E74;
  }
  .address-edit-row .weui-cell__ft {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .address-remove {
    margin-left: 0.1rem;
  }
  .vux-no-group-title,
  .weui-cells {
    margin-top: 0 !important;
    margin-bottom: 0.15rem;
  }
  .weui-cell:before {
    left: 0 !important;
  }
  .bottom-button {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    border-radius: 0 !important;
  }
}
</style>
