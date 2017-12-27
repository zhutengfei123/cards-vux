<template>
    <li class="card">
        <x-img :src="item.image" />
        <p>{{item.title}}</p>
        <p class="price">尊享价:{{item.price}}</p>
        <div class="btn" @click="addCart(item.id)">加入购物车</div>
    </li>
</template>
<script>
import {XImg} from 'vux'
export default {
  name: 'Card',
  props: ['item'],
  components: {XImg}
}
</script>
<style lang="less" scoped>
.card{
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
</style>
