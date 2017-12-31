<template>
  <div class="scroller" :style="{'background-image':backgroundImage}">
           <a class="list-top">
               <label>{{title}}</label>
               <i class="iconfont icon-gengduo1"></i>
           </a>
           <div class="scroll-x">
              <flexbox align="center" class="container">
                <flexbox-item v-for="item of list" :key="item.id" span="154">
                  <card :item="item"></card>
                </flexbox-item>  
              </flexbox>
           </div>
  </div>
</template>

<script>
import { Scroller, Flexbox, FlexboxItem } from 'vux'
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
    Card,
    Flexbox,
    FlexboxItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.scroller{
    padding-bottom: 0.16rem;
    margin-top: 0.15rem;
    .scroll-x{
        width:100%;
        overflow-x: scroll;
        .container{
          padding: 0 0.08rem;
        }
    }
    .list-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.5rem;
        color: #fff;
        padding: 0px 0.08rem;
        label{
            font-size: 14px;
            font-weight: bold;
        }
    }

}
</style>
