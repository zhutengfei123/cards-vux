<template>
  <div>
    <div class="mer">
       <img :src="merberImg" width="60" height="60">
       <p v-show="status == 0" class="logintxt">请登录</p>
       <ul class="merinfo" v-show="status == 1">
         <li>
           <label class="lableft labcom">李松鹏</label>
           <label class="labright labcom">三级会员</label>
         </li>
         <li class="company">杭州礼管家网络科技有限公司</li>
       </ul>
    </div>

    <group>
      <cell title="我的订单"  is-link link="/"></cell>
    </group>
  </div>
</template>
<script>
   import {Cell, Group} from 'vux'
   export default {
     data () {
       return {
         merberImg: require('../../img/online.png'),
         status: 1
       }
     },
     created () {
       this.init()
     },
     components: {
       Cell,
       Group
     },
     methods: {
       init () {

       },
       back () {
         this.$router.go(-1)
       }
     }
   }
</script>
<style lang="less" scoped>

.disflex{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.mer{
     width: 100%;
     height: 1rem;
     .disflex();
     background: #fff;
     img{
       border-radius: 70%;
       margin:0 0.15rem;
     }
     .merinfo{
       width: 50%;
       .lableft{
         font-size: 0.18rem;
         color: #3c3c3c;
       }
       li{
         .disflex();
       }
        .labright{
         font-size: 0.14rem;
         color: #4386F4;
         margin-left: 0.1rem;
       }
       .labcom{
         float: left;
       }
     }
     .company{
       font-size: 0.14rem;
       color: #a6a6a6;
     }
     .logintxt{
       color: #B79E74;
       font-size: 0.18rem;
     }
}   
</style>

