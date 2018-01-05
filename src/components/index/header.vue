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
    <marquee :item-height="56">
      <marquee-item v-for="item of focus.list" :key="item.id" class="marquee-height">
          <span class="focus">{{focus.title}}</span>
          <span class="text">{{item.title}}</span>
      </marquee-item>
    </marquee>
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
    }
    .swiper-image{
      width: 100%;
    }
    .swiper-height{
      height: 1.6rem;
      overflow: hidden;
    }
    .marquee-height{
      height:56px;
    }
}

</style>
