<template>
    <div class="card">
        <img :src="item.pic_url" alt="">
        <p class="text">{{item.name}}</p>
        <p class="text red">尊享价:￥{{item.price}}</p>
        <x-button  mini @click.native.stop="handleAddCart(item)" :style="{'background-color':setColor}">加入购物车</x-button>
    </div>
</template>
<script>
import {XButton} from 'vux';
import {Action, namespace, State} from 'vuex-class';
import { Component, Vue, Prop } from 'vue-property-decorator';
const CartAction = namespace('cart', Action);
const IndexState = namespace('index', State);
@Component({
  components: {XButton}
})
export default class Card extends Vue {
  @Prop([Object]) item
  @CartAction addReduce
  @IndexState setColor
  flag = true
  showEdit = localStorage.getItem('showEdit')
  tempData = JSON.parse(localStorage.getItem('tempData') || '[]')
  handleAddCart (item) {
    if (this.showEdit === '1') {
      let bStop = true;
      this.tempData.forEach(project => {
        if (project.id === item.shop_id) {
          bStop = false;
        }
      });
      if (bStop) {
        this.tempData.push({
          'id': item.shop_id,
          'num': 1,
          'is_selected': 1
        });
        localStorage.setItem('tempData', JSON.stringify(this.tempData));
      }
      this.$vux.toast.text('加入购物车成功', 'middle');
    } else {
      if (localStorage.getItem('token') === '') {
        this.$router.push('/login');
      } else {
        if (this.flag) {
          const params = {
            'shop_id': item.shop_id
          };
          this.addReduce(params).then(msg => {
            if (msg) {
              this.$vux.toast.text(msg, 'middle');
            } else {
              this.$vux.toast.text('加入购物车成功', 'middle');
              this.$bus.emit('addToCart', 'ok');
            }
          });
          this.flag = false;
          let timer = setTimeout(() => {
            this.flag = true;
            clearTimeout(timer);
          }, 500);
        } else {
          this.$vux.toast.text('您的操作过于频繁', 'middle');
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:0.08rem;
    text-decoration: none;
    background: #ffffff;
    box-shadow: 0 0 0.1rem 0 rgba(0,0,0,0.05);
    .weui-btn_mini {
        font-size: 0.12rem !important;
        width: 1.1rem !important;
        height: 0.24rem;
        line-height: 0.24rem;
    }
    img{
        width: 100%;
        vertical-align: middle;
        margin: 0.08rem 0;
    }
    p{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin: 0 !important;
        text-align: center;
        width: 1.3rem;
    }
    .red{
        font-size: 0.12rem;
        font-weight: bold;
    }
}
</style>
