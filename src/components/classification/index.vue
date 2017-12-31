<template>
  <div class="classification">
    <div class="top-bar"></div>
    <grid :cols="2">
      <grid-item v-for="recommend of recommend.list" :key="recommend.id">
        <card :item="recommend"></card>
      </grid-item>
    </grid>    
  </div>    
</template>
<script>
import {Flexbox, FlexboxItem, Grid, GridItem} from 'vux'
export default {
  data () {
    return {
      recommends: []
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
