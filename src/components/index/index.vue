<template>
  <div class="index">
      <l-header :list="[]"></l-header>
      <div class="hot">
          <p>热门主推</p>
          <x-img src="http://lgjweb.oss-cn-hangzhou.aliyuncs.com/webs/wx-login/images/logo.png?x-oss-process=image/format,jpg" webp-src="http://lgjweb.oss-cn-hangzhou.aliyuncs.com/webs/wx-login/images/logo.png?x-oss-process=image/format,webp" container="#vux_view_box_body"></x-img>
          <x-img src="http://lgjweb.oss-cn-hangzhou.aliyuncs.com/webs/wx-login/images/logo.png?x-oss-process=image/format,jpg" webp-src="http://lgjweb.oss-cn-hangzhou.aliyuncs.com/webs/wx-login/images/logo.png?x-oss-process=image/format,webp" container="#vux_view_box_body"></x-img>
      </div>
      <div class="hot-len">
          <x-img src="http://lgjweb.oss-cn-hangzhou.aliyuncs.com/webs/wx-login/images/logo.png?x-oss-process=image/format,jpg" webp-src="http://lgjweb.oss-cn-hangzhou.aliyuncs.com/webs/wx-login/images/logo.png?x-oss-process=image/format,webp" container="#vux_view_box_body"></x-img>
      </div>
      <scroller v-for="block of blocks" :key="block.id" color="blue" :title="block.title" :list="block.card_list"></scroller>
      <!-- <scroller color="red" title="欢喜节庆系列"></scroller> -->
      <div class="hot">
        <p>{{recommend.title}}</p>
        <grid :cols="2">
          <grid-item v-for="recommend of recommend.list" :key="recommend.id">
            <card :item="recommend"></card>
          </grid-item>
        </grid>
      </div>
  </div>
</template>

<script>
import Header from './header'
import Scroller from './scroller'
import { XImg, Flexbox, FlexboxItem, Grid, GridItem } from 'vux'
import Card from './card'
export default {
  name: 'Index',
  data () {
    return {
      recommend: {title: '', list: []},
      blocks: []
    }
  },
  mounted () {

  },
  components: {
    LHeader: Header,
    Scroller,
    XImg,
    Card,
    Flexbox,
    FlexboxItem,
    GridItem,
    Grid
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$api.getblocks({ store_id: this.$store.state.global.storeId, source: 1 })
      .then(({ result, status }) => {
        this.blocks = result[3].block_content
        this.recommend.title = result[4].block_content.title
        this.recommend.list = result[4].block_content.list
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.index {
  height: 100vh;
  .hot {
    width: 100%;
    position: relative;
    margin-top: 0.3rem;
    max-height: 1.3rem;
    p {
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
    }
    img {
      width: 50%;
      vertical-align: middle;
      float: left;
    }
  }
  .hot-len {
    width: 100%;
    height: 1.3rem;
    overflow: hidden;
  }
}
</style>
