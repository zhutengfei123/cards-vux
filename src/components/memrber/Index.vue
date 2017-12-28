<template>
  <div>
    <div class="">ssss</div>
  </div>
</template>
<script>
import { PopupHeader } from 'vux'
export default {
  data () {
    return {}
  },
  created () {
    this.init()
  },
  components: {
    PopupHeader
  },
  methods: {
    init () {},
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>

</style>

