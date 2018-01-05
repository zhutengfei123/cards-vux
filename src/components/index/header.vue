<template>
  <div class="header">
     <swiper loop height="2.5rem" ref="swiper">
       <swiper-item v-for="image of headerImages" :key="image.id">
         <div class="swiper-height">
             <img class="swiper-image" :src="`${image.pic_url.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth}/format,jpg`"/>
         </div>
         <p class="title">{{image.title}}</p>
         <p class="text">{{image.describe}}</p>
       </swiper-item>
     </swiper>
     <div class="marqueediv" style="display:flex;">
        <span class="focus">热点关注</span>
       <marquee>
          <marquee-item v-for="(item,index) in focus.list" :key="index" class="marquee-height">{{item.title}}</marquee-item>
       </marquee>
     </div>
   
   
  </div>
</template>

<script>
import {Swiper, SwiperItem, Marquee, MarqueeItem} from 'vux'
import {mapState} from 'vuex'
export default {
  name: 'Header',
  components: {
    Swiper,
    SwiperItem,
    Marquee,
    MarqueeItem
  },
  data () {
    return {
      imgWidth: screen.width,
      index: 0
    }
  },
  computed: {
    ...mapState('index', {
      headerImages: ({headerImages}) => headerImages,
      focus: ({focus}) => focus
    })
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
    .title{
      font-size: 0.2rem;
      color: #3C3C3C;
      letter-spacing: -0.0048rem;
      font-weight: bold;  
      line-height: 0.28rem;
      padding-left: 0.2rem;
    }
    .text{
      font-size: 0.14rem;
      color: #3C3C3C;
      letter-spacing: -0.0034rem;
      line-height: 0.2rem;
      padding-left: 0.2rem;
    }
    .focus{
      color:red;
      font-size: 0.2rem;
      letter-spacing: -0.0048rem;
      font-weight: bold;
      margin:0 0.16rem 0 0.16rem;  
      width: 50%;
    }
    .swiper-image{
      width: 100%;
    }
    .swiper-height{
      height: 1.6rem;
      overflow: hidden;
    }
    .marquee-height{
      height:0.17rem;
      font-size: 0.14rem;
      color:#3C3C3C;
    }
    .marqueediv{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.4rem;
      padding-bottom: 0.15rem;
    }
}

</style>
