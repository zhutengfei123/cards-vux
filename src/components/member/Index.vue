<template>
  <div class="member">
    <div class="mer">
       <x-img class="avatar" :default-src="initImg" :src="`${avatar.split('?')[0]}?x-oss-process=image/resize,w_60/format,jpg`" :webp-src="`${avatar.split('?')[0]}?x-oss-process=image/resize,w_60/format,webp`" container="#vux_view_box_body"/>
       <p v-if="!token" class="logintxt" @click="toLogin">请登录</p>
       <ul class="merinfo" v-else>
         <li>
           <label class="lableft labcom">{{realname}}</label>
           <label class="labright labcom">{{level}}</label>
         </li>
         <li class="text gray">杭州礼管家网络科技有限公司</li>
       </ul>
    </div>
    <group>
      <cell title="我的订单" is-link link="/order"></cell>
    </group>
    <group>
      <cell title="现金账户" :value="`￥${balance}`" is-link link="/member/money"></cell>
      <cell title="收货地址" is-link link="/address"></cell>
      <cell title="我的卡券商城" :value="sta" is-link link="/mine"></cell>
    </group>
    <group v-once>
      <cell title="客户服务" value="0571-12345678"></cell>
      <cell title="帮助中心" is-link link="/help"></cell>
    </group>
    <div class="exit text" @click="exit" v-if="token">退出登录</div>  
    <p v-once class="text gray bottom-txt">飞象企服提供技术支持</p>
  </div>
</template>
<script>
import { Cell, Group, XImg } from 'vux';
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, namespace } from 'vuex-class';
import initImg from '../../assets/init.png';
const UserState = namespace('user', State);
const UserAction = namespace('user', Action);
@Component({
  components: {
    Cell,
    Group,
    XImg
  }
})
export default class Member extends Vue {
  sta = '有新的订单';
  initImg=initImg;
  @UserState avatar
  @UserState balance
  @UserState realname
  @UserState level
  @UserState token
  @UserAction getInfo
  created () {
    this.getInfo().then(msg => msg && this.$vux.toast.text(msg));
  }
  toLogin () {
    this.$router.push('/login');
  }
  exit () {}
}
</script>
<style lang="less" scoped>
.member{
  .avatar{
    width:0.6rem;
    height:0.6rem;
  }
  .disflex {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .mer {
    width: 100%;
    height: 1rem;
    .disflex();
    background: #fff;

    img {
      border-radius: 50%;
      margin: 0 0.15rem;
    }
    .merinfo {
      width: 50%;
      .lableft {
        font-size: 0.18rem;
        color: #3c3c3c;
      }
      li {
        .disflex();
      }
      .labright {
        font-size: 0.14rem;
        color: #4386f4;
        margin-left: 0.1rem;
      }
      .labcom {
        float: left;
      }
    }
    .logintxt {
      color: #b79e74;
      font-size: 0.18rem;
    }
  }
  .exit {
    width: 100%;
    height: 0.44rem;
    text-align: center;
    line-height: 0.44rem;
    background: #fff;
    margin-top: 0.15rem;
  }
  .bottom-txt{
      position:fixed;
      bottom:0.6rem;
      text-align: center;
      width:100%;
  }
}
</style>

