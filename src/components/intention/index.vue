<template>
    <div class="intention">
        <group gutter="0">
            <cell is-link v-for="item of list" :key="item.id" :link="`/intention/${item.id}`" style="height:0.6rem;">
                <flexbox slot="title" align="center">
                    <flexbox-item :span="0.6" class="text">{{item.time}}</flexbox-item>
                    <flexbox-item class="text">{{item.user}}</flexbox-item>
                </flexbox>                
                <flexbox>
                    <div class="dot"></div>
                </flexbox>
            </cell>
        </group>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import {Flexbox, FlexboxItem, Group, Cell} from 'vux';
@Component({
  components: {Flexbox, FlexboxItem, Group, Cell}
})
export default class Intention extends Vue {
    list=[{ time: new Date(), user: 'user', id: 1 }]
}
</script>
<style lang="less" scoped>
.intention{
    .dot{
        width:0.08rem;
        height:0.08rem;
        border-radius:50%;
        background: #F76868;
    }
}
</style>
