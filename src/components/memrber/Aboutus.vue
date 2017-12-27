<template>
    <div class="about-us">
       <popup-header left-text="cancel" right-text="done" title="Please select your card"></popup-header>
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
<style lang="less">
.about-us {
  background: #ffffff;
  width: 100%;
  height: 100%;
  .about-us-head {
    background: #1a1a1f;
    color: #fff;
  }

  .title {
    color: #fff !important;
  }
  .button-icon {
    color: #ffffff;
  }
  .logo {
    margin-top: 0.44rem;
    width: 100%;
    height: 1.29rem;
    img {
      width: 100%;
      height: 1.29rem;
    }
  }
  .maincon {
    padding: 0 0.16rem;
    margin-top: 0.25rem;
    color: #a6a6a6;
    font-size: 0.14rem;
  }
  .button,
  #title {
    color: #ffffff;
  }
}
</style>

