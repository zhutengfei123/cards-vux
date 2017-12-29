<template>
    <li class="card">
        <div class="card-content">
            <img :src="`${item.pic_url.split('?')[0]}?x-oss-process=image/format,jpg`"/>
            <p>{{item.name}}</p>
            <p class="price">尊享价:{{item.price}}</p>
            <button class="btn" @click="addCart(item.id)">加入购物车</button>
        </div>
    </li>
</template>
<script>
import {XImg} from 'vux'
export default {
  name: 'Card',
  props: ['item'],
  components: {XImg},
  methods: {
    addCart (id) {
      console.log(id)
    }
  }
}
</script>
<style lang="less" scoped>
.card{
    width: 1.54rem;
    margin: 0.08rem;
    display: flex;
    flex-direction: column;
    .card-content{
        display: flex;
        flex-direction: column;
        background: #fff;
        img{
            width: 100%;
            vertical-align: middle;
            margin: 0.08rem 0;
        }
        p{
            font-size: 0.14rem;
            color: #3c3c3c;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            margin: 0 !important;
            text-align: center;
        }
        .price{
            color: #C61A2A;
            font-size: 0.12rem;
        }
    }

}
</style>
