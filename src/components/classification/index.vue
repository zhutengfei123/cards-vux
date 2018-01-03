<template>
  <div class="classification">
    <div class="top-bar"></div>
    <grid :cols="2">
      <grid-item v-for="item of recommend.list" :key="item.id">
        <card :item="item"></card>
      </grid-item>
    </grid>   
  </div>    
</template>
<script>
import {Flexbox, FlexboxItem, Grid, GridItem} from 'vux'
export default {
  data () {
    return {
      recommend: [],
      showType: '',
      order: '',
      env: ''
    }
  },
  components: {
    Flexbox,
    FlexboxItem,
    GridItem,
    Grid
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
