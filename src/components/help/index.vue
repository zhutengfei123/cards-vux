<template>
    <div class="help">
        <group>
            <cell is-link :link="help.url" v-for="(help, index) in list" :key="index">
                <span class="text" slot="title">{{help.title}}</span>
                <span class="text gray" slot="inline-desc">{{help.content}}</span>
            </cell>
        </group>
        <p class="text gray bottom-txt">飞象企服提供技术支持</p>
    </div>
</template>
<script>
import { Cell, Group } from 'vux';
import { Component, Vue } from 'vue-property-decorator';
import {State, namespace} from 'vuex-class';
const HelpState = namespace('help', State);
@Component({
  components: {Cell, Group}
})
export default class Help extends Vue {
  @HelpState list
}
</script>
<style lang="less" scoped>
.help{
    .bottom-txt{
        position:fixed;
        bottom:0.6rem;
        text-align: center;
        width:100%;
        font-size: 0.14rem;
    }
}
</style>
