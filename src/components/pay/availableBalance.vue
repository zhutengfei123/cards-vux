<template>
  <div class="available-balance">
    <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200" style="overflow:initial">
      <div>
        <group v-for="(item, i) in list" :key="i">
          <cell class="r-d-g">
            <p class="r-d-con1">
              <span class="con1-desc">{{item.title}}</span>
              <span class="con1-desc">{{item.income}}元</span>
            </p>
            <p class="r-d-con1">
              <span class="con2-time">{{item.create_time}}</span>
            </p>
          </cell>
        </group>
        <load-more v-show="onFetching" tip="正在加载中"></load-more>
      </div>
    </scroller>
  </div>
</template>
<script>
import { Group, Cell, Toast, Scroller, LoadMore } from 'vux';
import { Component, Vue } from 'vue-property-decorator';
import {State, Action, Mutation, namespace} from 'vuex-class';
const rechargeState = namespace('recharge', State);
const rechargeAction = namespace('recharge', Action);
const rechargeMutation = namespace('recharge', Mutation);
@Component({
  components: {
    Group,
    Cell,
    Toast,
    Scroller,
    LoadMore
  }
})
export default class AvailableBalance extends Vue {
  @rechargeState availableBalanceData
  @rechargeAction initGetAvailableBalance
  @rechargeMutation getAvailableBalance
  list = []
  isLoading = true
  onFetching = false
  currentPage = 1
  onScrollBottom () {
    if (!this.onFetching && this.isLoading) {
      this.onFetching = true;
      setTimeout(() => {
        this.currentPage++;
        this.getInitData();
        this.$nextTick(() => {
          this.$refs.scrollerBottom.reset();
        });
        this.onFetching = false;
      }, 2000);
    }
  }
  created () {
    this.getInitData();
  }
  mounted () {
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({top: 0});
    });
  }
  getInitData () {
    const params = {
      'page': this.currentPage
    };
    this.initGetAvailableBalance(params).then(msg => {
      if (msg) {
        this.$vux.toast.text(msg, 'middle');
      } else {
        if (this.availableBalanceData.list.length > 0) {
          this.list = this.list.concat(this.availableBalanceData.list);
        } else {
          this.isLoading = false;
          this.$vux.toast.text('暂无更多数据', 'middle');
        }
      }
    });
  }
}
</script>
<style lang="less">
  .available-balance {
    font-size: 0.14rem;
    .weui-loadmore {
      height: 0.44rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 !important;
    }
    .weui-cell__ft {
      width: 100%;
    }
    .weui-cells:before {
      border: none !important;
    }
    .con2-time {
      color: #A6A6A6;
    }
    .con1-desc {
      color: #3c3c3c;
    }
    .weui-cell_access .weui-cell__ft {
      width: 100%;
      padding-right: 0.2rem;
    }
    .r-d-con1 {
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.16rem;
    }
    .r-d-num {
      color: #000000;
    }
    .weui-cells {
      margin: 0!important;
    }
    .r-d-g {
      height: 0.5rem;
      padding: 0.1rem 0.15rem;
    }
    .r-d-top {
      height: 0.44rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 0.15rem;
      color: #3c3c3c;
    }
  }
</style>

