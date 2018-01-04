<template>
  <div class="index">
      <l-header :header-images="headerImages" :focus="focus.list" :title="focus.title"></l-header>
      <div class="block image-block">
        <p class="recommend-title">{{mainRecommend.title}}</p>
        <template v-for="(item,index) of mainRecommend.list">
          <div :key="index" class="hot" v-if="item.show_type===1&&index%2===0">
              <x-img :src="`${item.pic_url.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth/2}/format,jpg`" :webp-src="`${item.pic_url.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth/2}/format,webp`" container="#vux_view_box_body"></x-img>
              <x-img :src="`${mainRecommend.list[index+1].pic_url.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth/2}/format,jpg`" :webp-src="`${mainRecommend.list[index+1].pic_url.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth/2}/format,webp`" container="#vux_view_box_body"></x-img>
          </div>
          <div :key="index" class="hot-len" v-else-if="item.show_type===2">
              <x-img :src="`${item.pic_url.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth}/format,jpg`" :webp-src="`${item.pic_url.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth}/format,webp`" container="#vux_view_box_body"></x-img>
          </div>
        </template>
      </div>
      <scroller v-for="scroller of scrollers" :key="scroller.id" color="blue" :title="scroller.title" :list="scroller.card_list"></scroller>
      <!-- <scroller color="red" title="欢喜节庆系列"></scroller> -->
      <div class="hot block">
        <p class="recommend-title">{{recommend.title}}</p>
        <grid :cols="2">
          <grid-item v-for="item of recommend.list" :key="item.id">
            <card :item="item"></card>
          </grid-item>
        </grid>
      </div>
      <load-more tip="正在加载" v-show="loading" ref="loadMore"></load-more>
  </div>
</template>

<script>
import Header from './header'
import Scroller from './scroller'
import { XImg, Flexbox, FlexboxItem, Grid, GridItem, LoadMore } from 'vux'
import { mapState, mapActions, mapMutations } from 'vuex'
import Card from './card'
import {isBottom} from '../../js'
export default {
  name: 'Index',
  data () { return {loading: false, page: 2, pageSize: 6, imgWidth: screen.width} },
  computed: {
    ...mapState('index', {
      recommend: ({recommend}) => recommend,
      mainRecommend: ({mainRecommend}) => mainRecommend,
      scrollers: ({scrollers}) => scrollers,
      headerImages: ({headerImages}) => headerImages,
      focus: ({focus}) => focus,
      inited: 'inited'
    }),
    ...mapState({
      route: 'route'
    })
  },
  components: {
    LHeader: Header,
    Scroller,
    XImg,
    Card,
    Flexbox,
    FlexboxItem,
    GridItem,
    Grid,
    LoadMore
  },

  methods: {
    ...mapActions('index', {init: 'init', loadMore: 'loadMore'}),
    ...mapMutations('index', {setInit: ({init}) => init})
  },

  created () {
    if (!this.inited) {
      this.init().then(() => { this.setInit(true) }).catch(error => console.log(error))
    }
  },
  mounted () {
    const element = document.querySelector('#vux_view_box_body')
    isBottom(element, () => {
      this.loading = true
      this.loadMore({page: this.page, pageSize: this.pageSize}).then(() => {
        this.loading = false
        this.page++
        element.scrollTop -= (this.$refs.loadMore.$el.getBoundingClientRect().height + 10)
      }).catch(error => console.log(error))
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.index {
  .recommend-title{
      position: absolute;
      top: -0.27rem;
      left: 0;
      width: 1rem;
      height: 0.3rem;
      line-height: 0.3rem;
      border-radius: 0 0.25rem 0.25rem 0;
      background: #f76868;
      text-align: center;
      color: #fff;
      font-weight: bold;
      font-size: 0.16rem;
      z-index:50;
  }
  .hot {
    width: 100%;
    position: relative;
    img {
      width: 50%;
      vertical-align: middle;
      float: left;
    }
  }
  .block{
    margin:0.16rem 0;
    &.image-block{      
      width: 100%;
      position: relative;
    }
  }
  .hot-len {
    width: 100%;
    height: 1.3rem;
    overflow: hidden;
  }
}
</style>
