<template>
  <div class="index">
      <l-header></l-header>
      <div class="block">
        <p class="recommend-title">{{mainRecommend.title}}</p>
        <flexbox wrap="wrap" :gutter="0">
            <flexbox-item style="display:flex" :key="item.id" :span="item.show_type===1?0.5:1/1.0001" v-for="item of mainRecommend.list" >
                <x-img v-if="item.show_type===1" :src="`${item.pic_url.split('?')[0]}?x-oss-process=image/resize,w_${parseInt(imgWidth/2)}/format,jpg`" :webp-src="`${item.pic_url.split('?')[0]}?x-oss-process=image/resize,w_${parseInt(imgWidth/2)}/format,webp`" container="#vux_view_box_body"></x-img>
                <x-img v-else-if="item.show_type===2" :src="`${item.pic_url.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth}/format,jpg`" :webp-src="`${item.pic_url.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth}/format,webp`" container="#vux_view_box_body"></x-img>
            </flexbox-item>
        </flexbox>
      </div>
      <scroller v-for="scroller of scrollers" :key="scroller.id" color="blue" :title="scroller.title" :list="scroller.card_list"></scroller>
      <div class="block">
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
import {page} from '../../mixin/page'
export default {
  name: 'Index',
  mixins: [page],
  data () { return {imgWidth: screen.width} },
  computed: {
    ...mapState('index', {
      recommend: ({recommend}) => recommend,
      mainRecommend: ({mainRecommend}) => mainRecommend,
      scrollers: ({scrollers}) => scrollers,
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
    ...mapMutations('index', {setInit: 'setInit'})
  },

  created () {
    if (!this.inited) {
      this.init().then(() => {
        this.setInit(true)
        this.page++
      }).catch(error => console.log(error))
    }
  },
  mounted () {
    const element = document.querySelector('#vux_view_box_body')
    isBottom(element,
      () => {
        !this.isEnd && !this.loading && (() => {
          this.loading = true
          this.loadMore({page: this.page, pageSize: this.pageSize}).then(({isEnd}) => {
            this.loading = false
            this.page++
            this.isEnd = isEnd
            element.scrollTop -= (this.$refs.loadMore.$el.getBoundingClientRect().height + 10)
          }).catch(error => console.log(error))
        })()
      }
    )
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
  .block{
    margin:0.16rem 0;
    width: 100%;
    position: relative;
  }
}
</style>
