<template>
    <div class="cart">
        <flexbox align="center" justify="space-between" class="top-bar" ref="topBar">
            <p class="text padding">共{{totalCount}}件</p>
            <p class="text button padding" @click="edit">{{showType==='normal'?'编辑':'完成'}}</p>
        </flexbox>
        <flexbox orient="vertical" class="block" v-for="(block,index) of blocks" :key="index" align="center" justify="center" :style="{paddingTop}">
            <flexbox-item>
                <check-icon class="text check-icon">{{block.title}}</check-icon>
            </flexbox-item>
            <flexbox-item v-for="item of block.list" :key="item.id" class="divider">
                <item :item="item"></item>
            </flexbox-item>
        </flexbox>
        <flexbox align="center" class="bottom-bar">
            <flexbox-item :span="0.7">
                <flexbox align="center">
                    <check-icon class="text">全选</check-icon>
                    <label v-show="showType==='normal'" class="text" style="margin-left:0.2rem">合计：<span class="price">￥{{total}}</span></label>
                </flexbox>
            </flexbox-item>
            <flexbox-item>
                <x-button class="btn">{{showType==='normal'?'结算':'删除'}}</x-button>
            </flexbox-item>
        </flexbox>
    </div>
</template>
<script>
import {Flexbox, FlexboxItem, XButton, CheckIcon} from 'vux'
import Item from './item'
export default {
  name: 'cart',
  data () {
    return {
      paddingTop: 0,
      showType: 'normal',
      blocks: [{title: '京东自营', list: [{select: true, title: '飞象X苏宁联名圣诞卡 面值500元', price: 49000, count: 1, pic_url: ''}]}]
    }
  },
  computed: {
    total () {
      let sum = 0
      this.blocks.map(({list}) => { list.map(item => { sum += item.price }) })
      return sum
    },
    totalCount () {
      let sum = 0
      this.blocks.map(({list}) => { sum += list.length })
      return sum
    }
  },
  methods: {
    edit () {
      switch (this.showType) {
        case 'edit':this.showType = 'normal'; break
        case 'normal':this.showType = 'edit'; break
      }
    }
  },
  components: {Flexbox, FlexboxItem, Item, XButton, CheckIcon},
  mounted () {
    const rect = this.$refs.topBar.$el.getBoundingClientRect()
    this.paddingTop = rect.height + 'px'
  }
}
</script>
<style lang="less" scoped>
.cart{
    .top-bar{
        background: #ffffff;  
        position: fixed;
        top:46px;
    }
    .text{
        font-size: 0.14rem;
        letter-spacing: -0.0034rem;
        line-height:0.16rem;
        &.button{
            color: #B79E74;
        }
        &.padding{
            padding: 0 0.08rem;
        }
    }
    .block{
        margin:0.16rem 0; 
        .divider{
            border-top:1px solid #D9D9D9;
            margin-top:0!important;
        }
    }
    .bottom-bar{
        position: fixed;
        bottom:55px;
        background:#ffffff;
        .btn{
            border-radius: unset;
        }
    }
    .check-icon{
        display:flex;
        align-items: center;
        padding:0.16rem 0;
        background: #ffffff;
    }
    .price{
        font-size: 0.14rem;
        color: #C61A2A;
        letter-spacing: -0.0034rem;
    }
}
</style>
