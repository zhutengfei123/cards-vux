<template>
  <div class="login">
      <div class="top-image"><img :src="bgImgUrl" alt=""></div>
      <div class="bot-con">
        <flexbox class="box">
          <input placeholder="请输入手机号" v-model="phone" type="tel"/>
        </flexbox>
        <flexbox class="box" v-show="!type">
          <input placeholder="请输入密码" v-model="password" type="password"/>
        </flexbox>
        <flexbox v-show="type">
          <flexbox-item :span="0.6">
              <flexbox class="box">
                  <input placeholder="请输入验证码" v-model="code"/>
              </flexbox>
          </flexbox-item>
          <flexbox-item>
              <x-button class="button send-code" @click.native="sendCodeClick" :style="{'background-color':setColor}" v-show="time===0">发送验证码</x-button>
              <x-button class="button send-code" v-show="time>0"  style="background-color:#d9d9d9" >已发送{{time}}s</x-button>
          </flexbox-item>
        </flexbox>
         <flexbox>
           <p class="resetPwd" :style="{'color':setColor}" @click="resetEvent">重置密码</p>
         </flexbox>
        <x-button class="button" @click.native="signIn" :style="{'background-color':setColor}">登录</x-button>
        <flexbox justify="space-between" class="line">
            <p class="text brown"><span class="gray">没有账号？</span><span @click="$router.push('/register')" :style="{'color':setColor}">马上注册</span></p>
            <span class="text brown " @click="type=!type" :style="{'color':setColor}">{{type?'密码登录':'短信登录'}} >></span>
        </flexbox>
      </div>
  </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import { Flexbox, FlexboxItem, XButton, Toast, Confirm } from 'vux';
import { Action, namespace, State } from 'vuex-class';
const UserAction = namespace('user', Action);
const IndexState = namespace('index', State);
let timer = null;
@Component({
  components: { Flexbox, FlexboxItem, XButton, Toast, Confirm },
  watch: {
    $route: function (val, oldval) {
      if (timer) {
        this.time = 0;
        clearInterval(timer);
      }
    }
  }
})
export default class Login extends Vue {
  @UserAction login;
  @UserAction sendCode;
  @IndexState bgImgUrl
  @IndexState setColor
  type = false;
  phone = '';
  password = '';
  code = '';
  time = 0;
  isType = 0;
  bStop = false;
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
          this.bStop = false;
          this.$vux.toast.text(msg, 'middle');
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
  resetEvent () {
    this.$router.push('/reset');
  }
  signIn () {
    let flag = true;
    let reg = /^(((1[0-9]{2}))+\d{8})$/;
    if (this.type && this.code === '') {
      this.$vux.toast.text('请输入验证码', 'middle');
      flag = false;
    }
    if (this.phone === '' || !reg.test(this.phone)) {
      this.$vux.toast.text('请输入有效的手机号码', 'middle');
      flag = false;
    }
    if (!this.type && this.password === '') {
      this.$vux.toast.text('请输入密码', 'middle');
      flag = false;
    }
    if (!this.type) {
      this.bStop = true;
      this.isType = 0;
    } else {
      this.isType = 1;
    }
    if (flag && this.bStop) {
      const params = {
        store_id: localStorage.getItem('store_id') || '',
        mobile: this.phone,
        pwd: this.type ? this.code : this.password,
        type: this.isType
      };
      this.login(params).then(msg => {
        if (msg) {
          this.$vux.toast.text(msg, 'middle');
        } else {
          clearInterval(timer);
          this.$router.push('/main');
        }
      });
    }
  }
}
</script>
<style lang="less" scoped>
.login {
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
  .bot-con {
    padding: 0 0.15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
    width: 100%;
    height: 0.4rem;
    input {
      padding: 0 0.08rem;
      border: none;
      width: 100%;
      height: 100%;
      font-size: 0.14rem;
    }
  }
  .button {
    margin-top: 0.16rem;
  }
  .line {
    margin-top: 0.16rem;
  }
  .resetPwd{
    width: 100%;
    text-align: right;
    margin-top: 0.1rem;
    font-size: 0.14rem;
  }
}
</style>
