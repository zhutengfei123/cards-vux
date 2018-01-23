<template>
  <div class="login">
      <x-img class="top-image"/>
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
            <x-button class="button" @click.native="sendCodeClick" v-show="time===0">发送验证码</x-button>
            <x-button class="button" v-show="time>0">已发送{{time}}s</x-button>
        </flexbox-item>
      </flexbox>
      <x-button class="button" @click.native="signIn">登录</x-button>
      <flexbox justify="space-between" class="line">
          <p class="text brown"><span class="gray">没有账号？</span><a @click="$router.push('/register')">马上注册</a></p>
          <a class="text brown " @click="type=!type">{{type?'密码登录':'短信登录'}} >></a>
      </flexbox>
  </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import {Flexbox, FlexboxItem, XButton, XImg, Toast} from 'vux';
import {Action, namespace} from 'vuex-class';
const UserAction = namespace('user', Action);
@Component({
  components: {Flexbox, FlexboxItem, XButton, XImg, Toast}
})
export default class Login extends Vue {
    type=false
    phone=''
    password=''
    code=''
    time=0
    isType = 0
    bStop = false
    @UserAction login
    @UserAction sendCode
    sendCodeClick () {
      let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if (!reg.test(this.phone)) {
        this.$vux.toast.text('请输入有效的手机号码', 'middle');
      } else {
        this.sendCode({
          mobile: this.phone,
          type: 'login-shop'
        }).then(msg => {
          if (msg) {
            this.bStop = false;
            this.$vux.toast.text(msg, 'middle');
          } else {
            this.bStop = true;
            this.time = 60;
            const id = setInterval(() => {
              if (this.time > 0) {
                this.time--;
              } else {
                clearInterval(id);
              }
            }, 1000);
          }
        });
      }
    }
    signIn () {
      let flag = true;
      let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
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
        this.login({
          mobile: this.phone,
          password: this.type ? this.code : this.password,
          type: this.isType
        }).then(msg => msg ? this.$vux.toast.text(msg, 'middle') : this.$router.push('/main'));
      }
    }
}
</script>
<style lang="less" scoped>
.login{
    background: #FFFFFF;
    height: 100%;
    padding: 0 0.16rem;
    .top-image{
        width: 100%;
        max-height:1.25rem;
        overflow: hidden;
    }
    .box{
        margin-top: 0.16rem;
        border: 1px solid #979797;
        border-radius: 3px;
        width:100%;
        height:0.4rem;
        input{
            padding: 0 0.08rem;
            border:none;
            width:100%;
            height:100%;
            font-size:0.14rem;
        }
    }
    .button{
        margin-top: 0.16rem;
    }
    .line{
        margin-top: 0.16rem;
    }
}
</style>
