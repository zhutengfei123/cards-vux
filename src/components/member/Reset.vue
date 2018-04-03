<template>
  <div class="reset">
      <div class="top-image"><img :src="bgImgUrl" alt=""></div>
      <flexbox class="box">
        <input placeholder="请输入手机号" v-model="phone" type="tel"/>
      </flexbox>
      <flexbox class="phone-code" align="center">
        <flexbox-item :span="0.6">
            <flexbox class="box my-box">
                <input placeholder="请输入验证码" v-model="code"/>
            </flexbox>
        </flexbox-item>
        <flexbox-item class="phone">
            <x-button class="button send-code" :style="{'background-color':setColor}" @click.native="sendCodeClick" v-show="time===0">发送验证码</x-button>
            <x-button class="button send-code" style="background-color:#d9d9d9" v-show="time>0">已发送{{time}}s</x-button>
        </flexbox-item>
      </flexbox>
       <flexbox class="box">
        <input placeholder="请设置新密码" v-model="password" type="password"/>
      </flexbox>
      <div class="bottom">
        <x-button class="button" @click.native="reset" :style="{'background-color':setColor}">确认重置</x-button>
      </div>
  </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import { Flexbox, FlexboxItem, XButton } from 'vux';
import { Action, namespace, State } from 'vuex-class';
const UserAction = namespace('user', Action);
const IndexState = namespace('index', State);
let timer = null;
@Component({
  components: { Flexbox, FlexboxItem, XButton },
  watch: {
    $route: function (val, oldval) {
      if (timer) {
        this.time = 0;
        clearInterval(timer);
      }
    }
  }
})
export default class Reset extends Vue {
  @UserAction resetPwd;
  @UserAction sendCode;
  @IndexState bgImgUrl
  @IndexState setColor
  password = '';
  phone = '';
  code = '';
  time = 0;
  bStop = false;
  get type () {
    return this.$route.path === '/register/wechat';
  }
  sendCodeClick () {
    let reg = /^(((1[0-9]{2}))+\d{8})$/;
    if (!reg.test(this.phone)) {
      this.$vux.toast.text('请输入有效的手机号码', 'middle');
    } else {
      const params = {
        store_id: localStorage.getItem('store_id') || '',
        mobile: this.phone,
        type: 'login-shop'
      };
      this.sendCode(params).then(msg => {
        if (msg) {
          this.$vux.toast.text(msg);
        } else {
          this.bStop = true;
          this.time = 60;
          timer = setInterval(() => {
            if (this.time > 0) {
              this.time--;
            } else {
              clearInterval(timer);
            }
          }, 1000);
        }
      });
    }
  }
  reset () {
    let flag = true;
    let reg = /^(((1[0-9]{2}))+\d{8})$/;
    if (this.phone === '' || !reg.test(this.phone)) {
      this.$vux.toast.text('请输入有效的手机号码', 'middle');
      flag = false;
      return false;
    }
    if (this.password === '') {
      this.$vux.toast.text('请输入密码', 'middle');
      flag = false;
      return false;
    }
    if (this.code === '') {
      this.$vux.toast.text('请输入验证码', 'middle');
      flag = false;
      return false;
    }
    if (flag && this.bStop) {
      const params = {
        store_id: localStorage.getItem('store_id') || '',
        mobile: this.phone,
        password: this.password,
        code: this.code
      };
      this.resetPwd(params).then(sta => {
        if (sta.code !== '00000') {
          this.$vux.toast.text(sta.msg, 'middle');
        } else {
          this.$vux.toast.text('重置成功', 'middle');
          let timer = setTimeout(() => {
            clearTimeout(timer);
            this.$router.push('/login');
          }, 1500);
        }
      });
    }
  }
}
</script>
<style lang="less" scoped>
.reset {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  .top-image {
    width: 100%;
    height: 1.25rem;
  }
  .top-image img {
    width: 100%;
    height: 100%;
    border: none;
  }
  .weui-btn:after {
    content: initial;
  }
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
  .send-code {
    font-size: 0.14rem;
    padding: 0;
  }
  .phone-code {
    width: 3.47rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .my-box {
    width: 2.3rem !important;
  }
  .weui-btn {
    height: 0.42rem;
    line-height: 0.42rem !important;
  }
  background: #ffffff;
  height: 100%;
  .top-image {
    width: 100%;
    height: 1.25rem;
  }
  .top-image img {
    width: 100%;
    height: 100%;
    border: none;
  }
  .box {
    margin-top: 0.16rem;
    border: 1px solid #d9d9d9;
    border-radius: 0.03rem;
    width: 3.45rem;
    height: 0.4rem;
    input {
      padding: 0 0.08rem;
      border: none;
      width: 100%;
      height: 100%;
      font-size: 0.14rem;
    }
  }
  .phone {
    flex: initial;
    width: initial;
    min-width: initial;
  }
  .phone .button {
    margin-top: 0.16rem;
    width: 1rem;
    margin-left: 0;
  }
  .bottom {
    text-align: center;
    width: calc(~"100% - 0.32rem");
    margin-top: 0.3rem;
    .button {
      padding: 0;
      margin: 0;
      margin-bottom: 0.08rem;
    }
    p {
      text-align: center;
    }
  }
}
</style>
