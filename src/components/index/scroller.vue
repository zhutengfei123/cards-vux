<template>
  <div class="scroller" :style="{backgroundImage}">
    <a class="list-top">
        <label class="text bold">{{title}}</label>
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
import { Scroller, Flexbox, FlexboxItem } from 'vux';
import Card from './card';
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({
  components: {Scroller, Card, Flexbox, FlexboxItem}
})
export default class LScroller extends Vue {
  @Prop([String]) color
  @Prop([String]) title
  @Prop([Array]) list

  backgroundImage= `linear-gradient(-29deg, ${this.color === 'blue' ? '#0F4AB0' : '#D51717'} 0%, ${this.color === 'blue' ? '#34D4F1' : '#F1D134'} 100%)`

  addCart (id) {
    console.log(id);
  }
}
</script>

<style lang="less" scoped>
.scroller{
    margin: 0.16rem 0;
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
        padding: 0 0.08rem;
    }
}
</style>
