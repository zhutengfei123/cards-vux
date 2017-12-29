<template>
  <div class="classification">
    <div class="top-bar"></div>
    <div class="bottom-list">
        <ul><card v-for="(recommend,index) of recommends" :key="recommend.id" :item="recommend" v-if="index%2===0"></card></ul>
        <ul><card v-for="(recommend,index) of recommends" :key="recommend.id" :item="recommend" v-if="index%2===1"></card></ul>
    </div>
  </div>    
</template>
<script>
export default {
  data () {
    return {
      recommends: []
    }
  }
}
</script>
<style lang="less" scoped>
.classification{
    .top-bar{
        height:0.44rem;
        width:100%;
    }
    .bottom-list{
        display:flex;
        padding-top: 0.08rem;
        ul{
            padding:0.08rem;
            width:50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
}
</style>
