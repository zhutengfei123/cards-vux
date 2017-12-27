<template>
  <div class="scroller" :style="{'background-image':backgroundImage}">
           <a class="list-top">
               <label>{{title}}</label>
               <i class="iconfont icon-gengduo1"></i>
           </a>
           <div class="scroll-x">
                <ul class="swiperlist">
                    <li v-for="item in list" :key="item.id">
                        <img :src="item.image" />
                        <p>{{item.title}}</p>
                        <p class="price">尊享价:{{item.price}}</p>
                        <div class="btn" @click="addCart(item.id)">加入购物车</div>
                    </li>
                </ul>
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
    float: left;
    width: 100%;
    padding-bottom: 0.16rem;
    margin-top: 0.15rem;
    .scroll-x{
        width:100%;overflow-x: scroll;
    }
    .list-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 0.5rem;
        color: #fff;
        padding: 0px 0.1rem;
        label{
            font-size: 14px;
            font-weight: bold;
        }
    }
    .swiperlist{
        overflow-x: scroll;
        width:100%;
        li{
            display: inline-block;
            float: left;
            width: 1.54rem;
            height: 2rem;
            background: #fff;
            margin-left: 0.1rem;
            padding:0px 0.1rem;
            img{
                width: 100%;
                vertical-align: middle;
                margin: 0.2rem 0px;
            }
            p{
                font-size: 14px;
                color: #3c3c3c;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                margin: 0px 0px !important;
            }
            .price{
                color: #C61A2A;
                font-size: 12px;
                width: 100%;
                text-align: center;
            }
            .btn{
                width: 80%;
                height: 0.23rem;
                text-align: center;
                color: #B79E74;
                margin-left: 10%;
                float: left;
                border-radius: 2px;
                font-size: 12px;
                margin-top: 0.05rem;
            }
        }
    }
}
</style>
