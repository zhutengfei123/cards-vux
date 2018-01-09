<template>
    <div class="order">
        <tab class="tab" ref="topBar">
            <tab-item @on-item-click="">全部</tab-item>
            <tab-item @on-item-click="">待发货</tab-item>
            <tab-item @on-item-click="">待支付</tab-item>
            <tab-item @on-item-click="">已发货</tab-item>
        </tab>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Order extends Vue {

}
</script>
<style lang="less" scoped>

</style>
