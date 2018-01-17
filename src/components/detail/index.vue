<template>
  <div class="detail">
      <flexbox orient="vertical">
         <flexbox-item class="image">
            <span class="app-icon left" @click="$router.go(-1)"></span>
            <span class="app-icon right" @click="$router.push('/main/cart')"></span>
            <x-img :src="`${picUrl.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth}/format,jpg`" :webp-src="`${picUrl.split('?')[0]}?x-oss-process=image/resize,w_${imgWidth}/format,webp`" container="#vux_view_box_body"/>
         </flexbox-item>
         <flexbox-item>
             <p class="text lg padding">{{name}}</p>
             <p class="text lg red padding">￥{{price}}</p>
             <group>
                 <cell-box :border-intent="false"><flexbox justify="space-between"><p class="text gray">库存</p><p class="text gray">{{stock}}</p></flexbox></cell-box>
                 <cell-box is-link :border-intent="false"><flexbox justify="space-between"><p class="text gray">查看可兑换商品</p></flexbox></cell-box>
             </group>
         </flexbox-item>
      </flexbox>
      <div class="card">
        <p class="text" style="text-align: center">使用规则</p>
        <p class="text" style="font-size: 0.12rem">{{useService}}</p>
      </div>
      <flexbox align="center" class="bottom-bar">
        <flexbox-item :span="0.6">
            <flexbox>
                <label class="text gray">数量</label>
                <inline-x-number class="price" width="0.4rem" :min="0" :max="Number(stock)" v-model="count" :fillable="true"></inline-x-number>
            </flexbox>
        </flexbox-item>
        <flexbox-item>
            <x-button class="btn" @click.native="addCart">加入购物车</x-button>
        </flexbox-item>
     </flexbox>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem,
  CellBox,
  Group,
  InlineXNumber,
  XButton,
  XImg
} from 'vux';
import { axios } from '../../js';
import {State, Action, namespace} from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';
const GlobalState = namespace('global', State);
const CartAction = namespace('cart', Action);
@Component({
  components: {
    Flexbox,
    FlexboxItem,
    CellBox,
    Group,
    InlineXNumber,
    XButton,
    XImg
  }
})
export default class Detail extends Vue {
  count=0
  stock=0
  price=0
  picUrl=''
  name=''
  shopId=''
  useService=''
  imgWidth= parseInt(screen.width)

  @GlobalState storeId

  @CartAction addReduce

  getInfo () {
    axios
      .get('/card-shop/info', {
        params: { store_id: this.storeId, id: this.$route.params.id }
      })
      .then(({ result, status: { code, msg } }) => {
        this.stock = result.stock;
        this.picUrl = result.pic_url;
        this.name = result.name;
        this.price = result.price;
        this.shopId = result.id;
        this.useService = result.use_service;
      });
  }

  addCart () {
    this.addReduce({num: this.count, shopId: this.shopId}).then(msg => msg && this.$vux.toast.text(msg));
  }

  created () {
    this.getInfo();
  }
}
</script>
<style lang="less" scoped>
.detail {
  padding: 0.16rem 0;
  .image {
    position: relative;
    width: 3.45rem;
    height: 3.45rem;
    background: #ffffff;
    display: flex;
    align-items: center;
    .left {
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 50%;
      width: 0.35rem;
      height: 0.35rem;
    }
    .right {
      position: absolute;
      right: 0;
      top: 0;
      border-radius: 50%;
      width: 0.35rem;
      height: 0.35rem;
    }
  }
  .padding{
    padding: 0 0.16rem;
  }
  .bottom-bar {
    position: fixed;
    bottom: 0;
    background: #ffffff;
    label {
      padding-left: 0.16rem;
    }
    .btn {
      border-radius: unset;
    }
  }
  .card{
    margin:0.16rem;
    padding:0.08rem 0;
    background: #F0F0F0;
    .text{
      padding:0 0.08rem;
    }
  }
}
</style>
