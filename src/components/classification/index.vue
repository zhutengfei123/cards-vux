<template>
  <div class="classification">
    <tab bar-active-color="transparent">
      <tab-item @on-item-click="">主题</tab-item>
      <tab-item @on-item-click="">对象</tab-item>
      <tab-item @on-item-click="">场合</tab-item>
      <tab-item @on-item-click="">排序</tab-item>
    </tab>
    <grid :cols="2">
      <grid-item v-for="item of list" :key="item.id">
        <card :item="item"></card>
      </grid-item>
    </grid>
     <load-more tip="正在加载" v-show="loading" ref="loadMore"></load-more>   
  </div>    
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import {Tab, TabItem, Flexbox, FlexboxItem, Grid, GridItem, LoadMore} from 'vux'
import {isBottom} from '../../js'
import Card from '../index/card'
export default {
  data () {
    return {
      showType: '',
      order: '',
      orderType: '',
      category: '',
      page: 1,
      pageSize: 10,
      loading: false
    }
  },
  components: {
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    GridItem,
    Grid,
    LoadMore,
    Card
  },
  watch: {
    orderType () {
      this.resetList()
    }
  },
  computed: {
    ...mapState('products', {
      list: 'list'
    })
  },
  methods: {
    ...mapActions('products', {getProducts: 'getProducts'}),
    ...mapMutations('products', {resetList: 'resetList'})
  },
  created () {
    this.getProducts({page: this.page, pageSize: this.pageSize}).then(() => {
      this.page++
    }).catch(error => console.log(error))
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
<style lang="less" scoped>
.classification{
    .top-bar{
        height:0.44rem;
        width:100%;
    }
}
</style>
