<template>
  <div class="register">
      <div class="top-image"><img :src="bgImgUrl" alt=""></div>
      <flexbox class="box">
        <input placeholder="请填写企业全称" v-model="company"/>
      </flexbox>
      <flexbox class="box">
        <input placeholder="请输入密码" v-model="password" type="password"/>
      </flexbox>
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
            <x-button class="button send-code" @click.native="sendCodeClick" v-show="time===0">发送验证码</x-button>
            <x-button class="button send-code" v-show="time>0">已发送{{time}}s</x-button>
        </flexbox-item>
      </flexbox>
      <div class="bottom">
        <x-button class="button" @click.native="signUp">{{type?'关联账号':'注册'}}</x-button>
        <span class="text brown" v-if="!type" @click="$router.push('/login')">马上登录</span>
      </div>
  </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import { Flexbox, FlexboxItem, XButton } from 'vux';
import { Action, namespace } from 'vuex-class';
const UserAction = namespace('user', Action);
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
export default class Register extends Vue {
  company = '';
  password = '';
  phone = '';
  code = '';
  time = 0;
  bStop = false;
  bgImgUrl = localStorage.getItem('bgImgUrl') || '';
  @UserAction register;
  @UserAction sendCode;
  get type () {
    return this.$route.path === '/register/wechat';
  }
  sendCodeClick () {
    let reg = /^(((1[0-9]{2}))+\d{8})$/;
    if (!reg.test(this.phone)) {
      this.$vux.toast.text('请输入有效的手机号码', 'middle');
    } else {
      const params = {
        store_id: localStorage.getItem('store_id'),
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
  signUp () {
    let flag = true;
    let reg = /^(((1[0-9]{2}))+\d{8})$/;
    if (this.code === '') {
      this.$vux.toast.text('请输入验证码', 'middle');
      flag = false;
    }
    if (this.phone === '' || !reg.test(this.phone)) {
      this.$vux.toast.text('请输入有效的手机号码', 'middle');
      flag = false;
    }
    if (this.password === '') {
      this.$vux.toast.text('请输入密码', 'middle');
      flag = false;
    }
    if (this.company === '') {
      this.$vux.toast.text('请输入企业名称', 'middle');
      flag = false;
    }
    if (flag && this.bStop) {
      const params = {
        store_id: localStorage.getItem('store_id'),
        mobile: this.phone,
        company: this.company,
        password: this.password,
        code: this.code
      };
      this.register(params).then(
        msg =>
          msg
            ? this.$vux.toast.text(msg, 'middle')
            : this.$router.push('/login')
      );
    }
  }
}
</script>
<style lang="less" scoped>
.register {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
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
    border: 1px solid #979797;
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
    position: absolute;
    bottom: 0.64rem;
    width: calc(~"100% - 0.32rem");
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
