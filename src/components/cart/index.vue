<template>
    <div class="cart">
        <flexbox align="center" justify="space-between" class="top-bar" ref="topBar">
            <p class="text">共{{list.length}}件</p>
            <p class="text button" @click.native="edit">编辑</p>
        </flexbox>
        <flexbox orient="vertical" align="center" justify="center" :style="{marginTop:this.marginTop+'px'}">
            <flexbox-item v-for="item of list" :key="item.id">
                <item :item="item"></item>
            </flexbox-item>
        </flexbox>
        <flexbox align="center" class="bottom-bar">
            <flexbox-item :span="0.7">
                <flexbox align="center">
                    <check-icon class="text">全选</check-icon>
                </flexbox>
            </flexbox-item>
            <flexbox-item :spam="0.3">
                <x-button class="btn">删除</x-button>
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
      marginTop: 0,
      list: [{select: true, title: '飞象X苏宁联名圣诞卡 面值500元', price: 49000, count: 1, pic_url: ''}]}
  },
  mounted () {
    const rect = this.$refs.topBar.$el.getBoundingClientRect()
    this.marginTop = rect.height
  },
  components: {Flexbox, FlexboxItem, Item, XButton, CheckIcon}
}
</script>
<style lang="less" scoped>
.cart{
    .top-bar{
        background: #ffffff;
        padding: 0.08rem 0;
        position: fixed;
        top:46px;
    }
    .text{
        font-size: 0.14rem;
        letter-spacing: -0.0034rem;
        padding: 0 0.08rem;
        &.button{
            color: #B79E74;
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
}
</style>
