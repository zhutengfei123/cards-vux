<template>
  <div class="register">
      <x-img class="top-image"/>
      <flexbox class="box">
        <input placeholder="请填写企业全称" v-model="company"/>
      </flexbox>
      <flexbox class="box">
        <input placeholder="请输入密码" v-model="password" type="password"/>
      </flexbox>
      <flexbox class="box">
        <input placeholder="请输入手机号" v-model="phone" type="tel"/>
      </flexbox>
      <flexbox align="center">
        <flexbox-item :span="0.6">
            <flexbox class="box">
                <input placeholder="请输入验证码" v-model="code"/>
            </flexbox>
        </flexbox-item>
        <flexbox-item>
            <x-button class="button" @click.native="sendCodeClick">发送验证码</x-button>
        </flexbox-item>
      </flexbox>
      <div class="bottom">
        <x-button class="button" @click.native="signUp">{{type?'关联账号':'注册'}}</x-button>
        <p class="text brown" v-if="!type" @click="$router.push('/login')">马上登录</p>
      </div>
  </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import { Flexbox, FlexboxItem, XButton, XImg } from 'vux';
import {Action, namespace} from 'vuex-class';

const UserAction = namespace('user', Action);

@Component({
  components: { Flexbox, FlexboxItem, XButton, XImg }
})
export default class Register extends Vue {
    company=''
    password=''
    phone=''
    code=''

    @UserAction register
    @UserAction sendCode

    get type () {
      return this.$route.path === '/register/wechat';
    }

    sendCodeClick () {
      this.sendCode({
        mobile: this.phone,
        type: 'login-shop'
      }).then(msg => msg && this.$vux.toast.text(msg));
    }

    signUp () {
      this.register({
        mobile: this.phone,
        company: this.company,
        password: this.password,
        code: this.code
      }).then(msg => msg && this.$vux.toast.text(msg));
    }
}
</script>
<style lang="less" scoped>
.register{
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
    .bottom{
        position:fixed;
        bottom:0.64rem;
        width: calc(~"100% - 0.32rem");
        .button{
            padding:0;
            margin:0;
            margin-bottom: 0.08rem;           
        }
        p{
            text-align: center;
        }
    }
}
</style>
