<template>
    <div class="money">
        <flexbox class="top" orient="vertical" justify="space-around">
            <flexbox-item v-once class="title">余额</flexbox-item>
            <flexbox-item>
                <flexbox align="center" style="height:100%">
                    <flexbox-item class="price">￥{{balance}}</flexbox-item>
                    <flexbox-item v-once>
                        <x-button class="button">充值</x-button>
                    </flexbox-item>
                </flexbox>
            </flexbox-item>
        </flexbox>
        <group class="list">
            <cell is-link v-once>
                <span slot="title" class="text lg">交易记录</span>
                <span class="text">更多</span>
            </cell>
            <cell v-for="item of list" :key="item.id" class="card">
                <flexbox slot="title" justify="space-between">
                    <span class="text lg">{{item.title}}</span>
                    <span class="text lg">{{item.income}}</span>
                </flexbox>
                <span slot="inline-desc" class="text lg gray">{{item.create_time}}</span>
            </cell>
        </group>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import { Flexbox, FlexboxItem, XButton, Cell, Group } from 'vux';
import {State, Action, namespace} from 'vuex-class';

const UserState = namespace('user', State);
const BalanceState = namespace('balance', State);
const BalanceAction = namespace('balance', Action);

@Component({
  components: {Flexbox, FlexboxItem, XButton, Cell, Group}
})
export default class Money extends Vue {
  @UserState balance
  @BalanceState list

  @BalanceAction getRecords

  created () {
    this.getRecords().then(msg => msg && this.$vux.toast.text(msg));
  }
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
        .card{
            background: #FFFFFF;
        }
    }
}
</style>
