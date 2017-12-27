<template>
  <div class="scroller" :style="{'background-image':backgroundImage}">
      <div>
          <p class="title">{{ title }}</p>
          <i></i>
      </div>

        <div>
            <div v-for="item of list" :key="item.id">
                <div class="card">
                    <img class="header-image" :src="item.image"/>
                    <p class="title">{{item.title}}</p>
                    <p class="price">{{item.price}}</p>
                    <button class="button" @click="addCart(item.id)"><p class="text">加入购物车</p></button>
                </div>
            </div>
        </div>
 
  </div>
</template>

<script>
import { Scroller } from 'vux'
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
    Scroller
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.scroller{
    .title{
        font-family: PingFang-SC-Heavy;
        font-size: 0.14rem;
        color: #FFFFFF;
        letter-spacing: -0.0034rem;
    }
    .card{
        background: #FFFFFF;
        .header-image{
            width:100%;
            height:1.54rem;
        }
        .title{
            font-family: PingFangSC-Regular;
            font-size: 0.14rem;
            color: #3C3C3C;
            letter-spacing: -0.0034rem;
            line-height: 0.2rem;
        }
        .price{
            font-family: PingFangSC-Semibold;
            font-size: 0.12rem;
            color: #C61A2A;
            letter-spacing: -0.0029rem;
            line-height: 0.18rem;
        }
        .button{
            background: #B79E74;
            border-radius: 0.03rem;
            height:0.24rem;
            .text{
                font-family: PingFangSC-Semibold;
                font-size: 0.12rem;
                color: #FFFFFF;
                letter-spacing: -0.0029rem;
                line-height: 0.24rem;
            }
        }
    }
}
</style>
