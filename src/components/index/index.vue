<template>
  <div class="index">
      <lHeader :list="[]"></lHeader>
      <div class="hot">
          <p>热门主推</p>
          <x-img src="http://a.hiphotos.baidu.com/image/pic/item/c75c10385343fbf29a4fa1e9b97eca8064388f9c.jpg"></x-img>
          <x-img src="http://a.hiphotos.baidu.com/image/pic/item/c75c10385343fbf29a4fa1e9b97eca8064388f9c.jpg"></x-img>
      </div>
      <div class="hot-len">
          <x-img src="http://a.hiphotos.baidu.com/image/pic/item/c75c10385343fbf29a4fa1e9b97eca8064388f9c.jpg"></x-img>
      </div>
      <scroller color="blue" title="经典商务系列"></scroller>
      <scroller color="red" title="欢喜节庆系列"></scroller>
      <div class="hot">
           <p>热门主推</p>
      </div>
  </div>
</template>

<script>
import header from './header'
import scroller from './scroller'
import {XImg} from 'vux'
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    lHeader: header,
    scroller,
    XImg
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.index{
  background-color: #F6F6F6 ;
  height:100vh;
  .hot{
      width: 100%;
      float:left;
      position: relative;
      margin-top: 0.3rem;
      max-height: 1.3rem;
      p{
          position: absolute;
          top:-0.17rem;
          left: 0px;
          width: 1rem;
          height: 0.3rem;
          line-height: 0.3rem;
          border-radius: 0 0.25rem 0.25rem 0;
          background: #F76868;
          text-align: center;
          color: #fff;
          font-weight: bold;
          font-size: 0.16rem;
      }
      img{
          width: 50%;
          vertical-align: middle;
          float: left;
      }
  }
  .hot-len{
    width: 100%;
    height: 1.3rem;
    overflow: hidden;
    img{
        width: 100%;
        vertical-align: middle;
    }
  }
}
</style>
