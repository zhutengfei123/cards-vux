<template>
    <div class="help">
        <group>
            <cell is-link :link="help.url" v-for="(help, index) in list" :key="index">
                <span class="text" slot="title">{{help.title}}</span>
                <span class="text gray" slot="inline-desc">{{help.content}}</span>
            </cell>
        </group>
        <div class="support">飞象企服提供技术支持</div>
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
<style lang="less">
.help{
    position: relative;
    height: 100%;
    .weui-cells {
        margin-top: 0 !important;
    }
    .support{
        position: absolute;
        left: 0;
        bottom: 0;
        height: 0.8rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #a6a6a6;
        font-size: 0.14rem;
    }
}
</style>
