<template>
  <div class="header">
     <swiper loop height="3rem" >
       <swiper-item><img class="swiper-image" src="http://lgjweb.oss-cn-hangzhou.aliyuncs.com/webs/wx-login/images/logo.png?x-oss-process=image/format,jpg" webp-src="http://lgjweb.oss-cn-hangzhou.aliyuncs.com/webs/wx-login/images/logo.png?x-oss-process=image/format,webp"/><p class="title">飞象X苏宁联名卡发布</p><p class="text">强强合作，圣诞相伴</p></swiper-item>
       <swiper-item><img class="swiper-image" src="http://lgjweb.oss-cn-hangzhou.aliyuncs.com/webs/wx-login/images/logo.png?x-oss-process=image/format,jpg" webp-src="http://lgjweb.oss-cn-hangzhou.aliyuncs.com/webs/wx-login/images/logo.png?x-oss-process=image/format,webp"/><p class="title">飞象X苏宁联名卡发布</p><p class="text">强强合作，圣诞相伴</p></swiper-item>
       <swiper-item><img class="swiper-image" src="http://lgjweb.oss-cn-hangzhou.aliyuncs.com/webs/wx-login/images/logo.png?x-oss-process=image/format,jpg" webp-src="http://lgjweb.oss-cn-hangzhou.aliyuncs.com/webs/wx-login/images/logo.png?x-oss-process=image/format,webp"/><p class="title">飞象X苏宁联名卡发布</p><p class="text">强强合作，圣诞相伴</p></swiper-item>
       <swiper-item><img class="swiper-image" src="http://lgjweb.oss-cn-hangzhou.aliyuncs.com/webs/wx-login/images/logo.png?x-oss-process=image/format,jpg" webp-src="http://lgjweb.oss-cn-hangzhou.aliyuncs.com/webs/wx-login/images/logo.png?x-oss-process=image/format,webp"/><p class="title">飞象X苏宁联名卡发布</p><p class="text">强强合作，圣诞相伴</p></swiper-item>
     </swiper>
     <div class="bar">
       <label class="focus">热点关注</label>
       <label class="text">飞象企服新版本12月8日正式上线！</label>
     </div>
  </div>
</template>

<script>
import {Swiper, SwiperItem, XImg} from 'vux'
export default {
  name: 'Header',
  components: {
    Swiper,
    SwiperItem,
    XImg
  },
  props: ['list'],
  data () {
    return {
      index: 0
    }
  },
  methods: {
    indexChange (index) {
      this.index = index
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.header{
    background-image: linear-gradient(0deg, #FFFFFF 27%, #4386F4 100%);
    width: 100%;
    .image{
      padding-top: 0.16rem;
      height:1.6rem;
    }
    .title{
      font-family: PingFang-SC-Heavy;
      font-size: 0.2rem;
      color: #3C3C3C;
      letter-spacing: -0.0048rem;
      font-weight: bold;  
      line-height: 0.28rem;
    }
    .text{
      font-family: PingFang-SC-Medium;
      font-size: 0.14rem;
      color: #3C3C3C;
      letter-spacing: -0.0034rem;
      line-height: 0.2rem;
    }
    .focus{
      color:red;
      font-size: 0.2rem;
      letter-spacing: -0.0048rem;
      font-weight: bold;
      margin-right: 0.16rem;  
    }
    .bar{
      display: flex;
      align-items: center;
      height:0.44rem;
    }
    .swiper-image{
      height:1.6rem;
    }
}

</style>
