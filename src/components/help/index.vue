<template>
    <div class="help">
        <group>
            <cell is-link :link="help.url" v-for="help of list" :key="help.id">
                <span class="title" slot="title">{{help.title}}</span>
                <span class="content" slot="inline-desc">{{help.content}}</span>
            </cell>
        </group>
        <p class="bottom-txt">飞象企服提供技术支持</p>
    </div>
</template>
<script>
import { Cell, Group } from 'vux'
import { Component, Vue } from 'vue-property-decorator'
import {State, namespace} from 'vuex-class'
const HelpState = namespace('help', State)
@Component({
  components: {Cell, Group}
})
export default class Help extends Vue {
  @HelpState list
}
</script>
<style lang="less" scoped>
.help{
    .title{
        font-size: 0.14rem;
        color: #3C3C3C;
        letter-spacing: -0.0034rem;
    }
    .content{
        font-size: 0.14rem;
        color: #A6A6A6;
        letter-spacing: -0.0034rem;
    }
    .bottom-txt{
        font-size: 0.14rem;
        text-align: center;
        color: #a6a6a6;
        margin-top: 0.6rem;
    }
}
</style>
