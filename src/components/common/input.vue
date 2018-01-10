<template>
    <div class="l-input">
        <div class="block"></div>
        <flexbox orient="vertical" justify="flex-start" class="container">
            <p class="text lg" style="width:100%">{{label}}</p>
            <flexbox class="box lg" v-if="textarea">
                <textarea :placeholder="placeholder" :value="value" @input="updateValue"/>
            </flexbox>
            <flexbox class="box" v-else>
                <input :placeholder="placeholder" :value="value" :type="type" @input="updateValue"/>
            </flexbox>
        </flexbox>
    </div>
</template>
<script>
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
import { Flexbox } from 'vux'
@Component({
  components: {Flexbox}
})
export default class LInput extends Vue {
    @Prop([Boolean]) textarea
    @Prop([String]) label
    @Prop([String]) placeholder
    @Prop({ type: String, default: 'text' }) type

    @Model('input') value

    updateValue () {
      this.$emit('input', event.currentTarget.value)
    }
}
</script>
<style lang="less" scoped>
.l-input{
    margin-top:0.16rem;
    position: relative;
    padding:0.08rem 0.16rem;
    background: #ffffff;
    .block{
        position: absolute;
        top:0.2rem;
        left:0;
        background: #B79E74;
        width: 0.08rem;
        height: 0.16rem;
    }
    .container{
        > *{
            margin:0.08rem 0;
        }
        .box{
            border: 1px solid #979797;
            border-radius: 3px;
            width:100%;
            height:0.4rem;
            &.lg{
                height:1.2rem;
            }
            textarea,input{
                padding: 0 0.08rem;
                border:none;
                width:100%;
                height:100%;
                font-size:0.14rem;
            }
        }
    }
}
</style>
