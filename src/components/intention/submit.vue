<template>
    <div class="submit-index">
        <l-input v-for="(item, index) in list" :key="index" :textarea="item.textarea" :placeholder="item.placeholder" :label="item.label" v-model="item.value"></l-input>
        <x-button class="submit-btn" :style="{'background':setColor}" @click.native="handleSubmit">提 交</x-button>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import LInput from '../common/input';
import { XButton, Toast } from 'vux';
import { State, namespace, Action } from 'vuex-class';
const ProductsAction = namespace('products', Action);
const IndexState = namespace('index', State);
@Component({
  components: { LInput, XButton, Toast }
})
export default class IntentionSubmit extends Vue {
  @ProductsAction submitIntentionList;
  @IndexState shareInfo;
  @IndexState setColor
  list = [
    {
      label: '姓名',
      placeholder: '请填写姓名',
      value: '',
      textarea: false
    },
    {
      label: '联系方式',
      placeholder: '请填写联系方式',
      value: '',
      textarea: false
    },
    {
      label: '企业名称',
      placeholder: '请填写企业全称',
      value: '',
      textarea: false
    },
    {
      label: '收货地址',
      placeholder: '请填写收货地址',
      value: '',
      textarea: true
    }
  ];
  handleSubmit () {
    let flag = true;
    let arr = this.list;
    let len = this.list.length;
    for (let i = 0; i < len; i++) {
      if (arr[i].value === '') {
        this.$vux.toast.text('请您把表单填写完整', 'middle');
        flag = false;
        break;
      }
    }
    if (flag) {
      let reg = /^(1\d{10})$/;
      if (!reg.test(arr[1].value)) {
        this.$vux.toast.text('请输入有效的手机号码', 'middle');
      } else {
        let myTempData = localStorage.getItem('myTempData');
        const params = {
          store_id: localStorage.getItem('store_id') || '',
          shop_ids: myTempData,
          share_user_id: localStorage.getItem('shareId'),
          full_address: arr[3].value,
          phone: arr[1].value,
          name: arr[0].value,
          company: arr[2].value
        };
        this.submitIntentionList(params).then(msg => {
          if (msg) {
            this.$vux.toast.text(msg, 'middle');
          } else {
            localStorage.setItem('submitSuccess', '1');
            let arr = JSON.parse(localStorage.getItem('tempData'));
            if (arr && arr.length > 0) {
              this.$store.commit('index/getCartNum', arr.length + '');
            }
            this.$router.push('/submitSuccess');
          }
        });
      }
    }
  }
}
</script>
<style lang="less">
.submit-index {
  padding-bottom: 0.44rem;
  input::-webkit-input-placeholder{
      color:#d9d9d9;
  }
  input::-moz-placeholder{
      color:#d9d9d9;
  }
  input:-moz-placeholder{
      color:#d9d9d9;
  }
  input:-ms-input-placeholder{
      color:#d9d9d9;
  }
  textarea::-webkit-input-placeholder{
      color:#d9d9d9;
  }
  textarea::-moz-placeholder{
      color:#d9d9d9;
  }
  textarea:-moz-placeholder{
      color:#d9d9d9;
  }
  textarea:-ms-input-placeholder{
      color:#d9d9d9;
  }
  .weui-btn:after {
    content: initial;
  }
  .l-input {
    margin-bottom: 0.15rem;
    margin-top: 0 !important;
  }
  .box {
    border: 1px solid #d9d9d9 !important;
  }
  .submit-btn {
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 0.44rem;
    line-height: 0.44rem;
    border-radius: 0 !important;
  }
}
</style>
