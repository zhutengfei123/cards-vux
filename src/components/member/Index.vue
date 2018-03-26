<template>
  <div class="member">
    <div class="mer">
      <avatar backgroundColor="#B79E74" color="#ffffff" :size="60" :src="token===''?'':userInfo.head_pic" username="Avatar"></avatar>
       <p v-if="token===''" class="logintxt" @click="toLogin">请登录</p>
       <ul class="merinfo" v-else>
         <li>
           <label class="lableft labcom">{{userInfo.realname}}</label>
           <label class="labright labcom">{{userInfo.lever_name}}</label>
         </li>
         <li class="text gray">{{userInfo.company}}</li>
       </ul>
    </div>
    <group>
      <cell title="我的订单" is-link :link="token===''?'/login':'/order'"></cell>
    </group>
    <group>
      <cell title="现金账户" :value="`￥${token===''?0:userInfo.balance}`" is-link :link="token===''?'/login':'/member/money'"></cell>
      <cell title="收货地址" is-link :link="token===''?'/login':'/address'"></cell>
      <cell title="我的卡券商城" @click.native="handleSetShowEdit" is-link>{{isRead.is_read==='0'?'':'有新的订单'}}</cell>
    </group>
    <group v-once>
      <cell title="客户服务" @click.native="handleClickTel" is-link>0571-12345678</cell>
      <cell title="帮助中心" is-link link="/help"></cell>
    </group>
    <div class="exit text" @click="exit" v-if="token!==''">退出登录</div>  
    <div class="support">飞象企服提供技术支持</div>
  </div>
</template>
<script>
import { Cell, Group, XImg, Toast } from 'vux';
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, namespace } from 'vuex-class';
import Avatar from 'vue-avatar';
const UserState = namespace('user', State);
const UserAction = namespace('user', Action);
@Component({
  components: {
    Cell,
    Group,
    XImg,
    Toast,
    Avatar
  }
})
export default class Member extends Vue {
  @UserState token;
  @UserState userInfo;
  @UserState isRead;
  @UserAction initGetIsRead;
  @UserAction getInfo;
  handleClickTel () {
    window.location.href = 'wtai://wp//mc;0571-12345678';
  }
  handleSetShowEdit () {
    if (this.token === '') {
      this.$router.push('/login');
    } else {
      localStorage.setItem('showEdit', JSON.stringify(true));
      this.$router.push('/mine');
    }
  }
  created () {
    if (this.token !== '') {
      this.initial();
    }
  }
  initial () {
    const params = {};
    this.getInfo(params).then(msg => {
      if (msg) {
        this.$vux.toast.text(msg, 'middle');
      } else {
        localStorage.setItem('balancePrice', this.userInfo.balance);
      }
    });
    this.initGetIsRead(params).then(msg => {
      if (msg) {
        this.$vux.toast.text(msg, 'middle');
      }
    });
  }
  toLogin () {
    this.$router.push('/login');
  }
  exit () {
    localStorage.setItem('token', '');
    this.$store.commit('user/setToken', '');
  }
}
</script>
<style lang="less">
.member {
  .weui-cell:before {
    left: 0 !important;
  }
  .vue-avatar--wrapper {
    margin: 0 0.15rem;
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
  .support {
    height: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a6a6a6;
    font-size: 0.14rem;
  }
}
</style>

