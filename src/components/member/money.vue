<template>
    <div class="money">
        <flexbox class="top" orient="vertical" justify="space-around">
            <flexbox-item class="title">余额</flexbox-item>
            <flexbox-item>
                <flexbox align="center" style="height:100%">
                    <flexbox-item class="price">￥{{money}}</flexbox-item>
                    <flexbox-item>
                        <x-button class="button">充值</x-button>
                    </flexbox-item>
                </flexbox>
            </flexbox-item>
        </flexbox>
        <group class="list">
            <cell is-link>
                <span slot="title" class="title">交易记录</span>
                <span class="content">更多</span>
            </cell>
            <cell v-for="item of list" :key="item.id" class="card">
                <flexbox slot="title" justify="space-between">
                    <span class="text">{{item.type}}</span>
                    <span class="text">{{item.money}}</span>
                </flexbox>
                <span slot="inline-desc" class="content">{{item.time}}</span>
            </cell>
        </group>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import { Flexbox, FlexboxItem, XButton, Cell, Group } from 'vux'
@Component({
  components: {Flexbox, FlexboxItem, XButton, Cell, Group}
})
export default class Money extends Vue {
  money=0
  list=[{type: '账户充值', time: new Date(), money: 1000}]
}
</script>
<style lang="less" scoped>
.money{
    .top{
        padding: 0 0.16rem;
        width: unset;
        height:2rem;
        background: url("../../assets/bg.png") center center no-repeat;
        .title{
            font-size: 0.18rem;
            color: #FFFFFF;
            letter-spacing: -0.0043rem;
            display: flex;
            align-items: center;
        }
        .price{
            font-size: 0.32rem;
            color: #FFFFFF;
        }
        .button{
            font-size: 0.18rem;
            color: #B79E74;
            letter-spacing: -0.0043rem;
            background: #FFFFFF;
            border-radius: 0.03rem;
        }
    }
    .list{
        .title{
            font-size: 0.16rem;
            color: #3C3C3C;
            letter-spacing: -0.0039rem;
        }
        .content{
            font-size: 0.14rem;
            color: #3C3C3C;
            letter-spacing: -0.0034rem;
        }
        .card{
            background: #FFFFFF;
            .text{
                font-size: 0.16rem;
                color: #3C3C3C;
                letter-spacing: -0.0039rem;
            }
            .content{
                font-size: 0.16rem;
                color: #A6A6A6;
                letter-spacing: -0.0039rem;
            }
        }
    }
}
</style>
