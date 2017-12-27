<template>
  <div class="scroller" :style="{'background-image':backgroundImage}">
           <a class="list-top">
               <label>{{title}}</label>
               <i class="iconfont icon-gengduo1"></i>
           </a>
           <div class="scroll-x">
                <ul class="swiperlist">
                    <card :item="item"></card>
                </ul>
           </div>
  </div>
</template>

<script>
import { Scroller } from 'vux'
import Card from './card'
export default {
  name: 'Scroller',
  props: ['color', 'title', 'list'],
  data () {
    return {
      backgroundImage: `linear-gradient(-29deg, ${this.color === 'blue' ? '#0F4AB0' : '#D51717'} 0%, ${this.color === 'blue' ? '#34D4F1' : '#F1D134'} 100%)`
    }
  },
  methods: {
    addCart (id) {
      console.log(id)
    }
  },
  components: {
    Scroller,
    Card
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.scroller{
    float: left;
    width: 100%;
    padding-bottom: 0.16rem;
    margin-top: 0.15rem;
    .scroll-x{
        width:100%;overflow-x: scroll;
    }
    .list-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 0.5rem;
        color: #fff;
        padding: 0px 0.1rem;
        label{
            font-size: 14px;
            font-weight: bold;
        }
    }
    .swiperlist{
        overflow-x: scroll;
        width:100%;
    }
}
</style>
