<template>
  <div class="header-myIndex">
    <flexbox align="center" v-if="$route.path==='mine'">
      <flexbox-item :span="0.25" class="avatar-container">
        <x-img class="avatar" :default-src="initImg" container="#vux_view_box_body"/>
      </flexbox-item>
      <flexbox-item :span="0.5">
        <p class="head-title">某某某某的小店</p>
      </flexbox-item>
      <flexbox-item :span="0.25">
        <p class="text lg white">编辑<span class="app-icon"></span></p>
      </flexbox-item>
    </flexbox>
     <swiper v-show="headerImages.is_show==='1'" loop ref="swiper">
       <swiper-item @click.native="handleClickSwiper(image)" v-for="(image, index) in headerImages.block_content" :key="index">
         <div class="swiper-height">
             <img class="swiper-image" :src="image.pic_url" alt=""/>
         </div>
         <p class="title">{{image.title}}</p>
         <p class="text">{{image.describe}}</p>
       </swiper-item>
     </swiper>
     <flexbox v-show="focus.is_show==='1'" class="marqueediv">
        <span class="focus">热点关注</span>
        <marquee>
            <marquee-item v-for="(item, index) in focus.block_content.list" :key="index" class="marquee-height text">{{item.title}}</marquee-item>
        </marquee>
     </flexbox>
  </div>
</template>
<script>
import {Swiper, SwiperItem, Marquee, MarqueeItem, Flexbox, FlexboxItem, XImg} from 'vux';
import { Component, Vue } from 'vue-property-decorator';
import {State, namespace} from 'vuex-class';
import initImg from '../../assets/init.png';
const IndexState = namespace('index', State);
@Component({
  components: {Swiper, SwiperItem, Marquee, MarqueeItem, Flexbox, FlexboxItem, XImg}
})
export default class LHeader extends Vue {
  imgWidth=screen.width
  index=0
  initImg=initImg
  @IndexState headerImages
  @IndexState focus
  handleClickSwiper (item) {
    if (item.jump_type === '1') {
      localStorage.setItem('cardId', item.jump_type_value);
      this.$router.push('/cardList');
    }
    if (item.jump_type === '2') {
      this.$router.push(`/detail/${item.jump_type_value}`);
    }
    if (item.jump_type === '3') {
      let url = item.jump_type_value;
      if (!/http/.test(url)) {
        url = `http://${url}`;
      }
      window.location.href = url;
    }
  }
  indexChange (index) {
    this.index = index;
  }
}
</script>
<style lang="less">
.header-myIndex {
    background-image: linear-gradient(0deg, #FFFFFF 27%, #4386F4 100%);
    width: 100%;
    .vux-slider, .vux-swiper {
      height: 3.3rem !important;
    }
    .swiper-image {
      height: 100%;
      border: none;
      width: 100%;
    }
    .avatar-container{
      display:flex;
      justify-content:center;
      padding:0.08rem 0;
      .avatar{
        width: 0.4rem;
        height: 0.4rem;
        border-radius:50%;
      }
    }
    .head-title{
      font-size: 0.18rem;
      color: #FFFFFF;
      letter-spacing: -0.0043rem;
    }
    .title{
      font-size: 0.2rem;
      color: #3C3C3C;
      letter-spacing: -0.0048rem;
      font-weight: bold;  
      line-height: 0.28rem;
      padding-left: 0.2rem;
    }
    .text{
      line-height: 0.2rem;
      padding-left: 0.2rem;
      width: 2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .focus{
      color:red;
      font-size: 0.2rem;
      letter-spacing: -0.0048rem;
      font-weight: bold;
      margin:0 0.16rem;  
      width: 50%;
    }
    .swiper-height{
      height: 2.5rem;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .marquee-height{
      height:0.17rem;
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
