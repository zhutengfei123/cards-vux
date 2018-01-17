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
            <x-button class="button">发送验证码</x-button>
        </flexbox-item>
      </flexbox>
      <x-button class="button">登录</x-button>
      <flexbox justify="space-between" class="line">
          <p class="text brown"><span class="gray">没有账号？</span><span @click="$router.push('/register')">马上注册</span></p>
          <p class="text brown" @click="type=!type">短信登录 >></p>
      </flexbox>
  </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import {Flexbox, FlexboxItem, XButton, XImg} from 'vux';
@Component({
  components: {Flexbox, FlexboxItem, XButton, XImg}
})
export default class Login extends Vue {
  type=false
  phone=''
  password=''
  code=''
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
