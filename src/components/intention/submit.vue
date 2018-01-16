<template>
    <div class='submit'>
        <l-input v-for="(item,index) of list" :key="index" :textarea="item.textarea" :type="item.type" :placeholder="item.placeholder" :label="item.label" v-model="item.value"></l-input>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import LInput from '../common/input';
@Component({
  components: {LInput}
})
export default class IntentionSubmit extends Vue {
    list=[{
      label: '姓名',
      placeholder: '请填写姓名',
      value: '',
      textarea: false
    }, {
      label: '联系方式',
      placeholder: '请填写联系方式',
      value: '',
      textarea: false
    }, {
      label: '企业名称',
      placeholder: '请填写企业全称',
      value: '',
      textarea: false
    }, {
      label: '收货地址',
      placeholder: '请填写收货地址',
      value: '',
      textarea: true
    }]
}
</script>
<style lang="less" scoped>
.submit{

}
</style>
