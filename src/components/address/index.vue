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
        <x-button class="bottom-button">添加新地址</x-button>
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
import { Group, Cell, CheckIcon, Confirm, TransferDomDirective as TransferDom, XButton } from 'vux';
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, namespace } from 'vuex-class';

const AddressState = namespace('address', State);
const AddressAction = namespace('address', Action);

@Component({
  directives: {
    TransferDom
  },
  components: { Group, Cell, CheckIcon, Confirm, XButton }
})
export default class Address extends Vue {
    show=false

    @AddressState list

    @AddressAction remove
    @AddressAction getData

    onCancel () {
      this.show = false;
    }

    onConfirm () {
      this.show = false;
    }

    actived () {
      this.getData();
    }
}
</script>
<style lang="less" scoped>
.address{
    .bottom-button{
        padding:0 0.16rem;
        position: fixed;
        bottom:0;
        margin: 0.16rem;
        width: calc(~"100% - 0.32rem");
    }
}
</style>
