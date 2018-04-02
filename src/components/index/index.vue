<template>
  <div class="index-myIndex">
      <flexbox class="top" align="center" v-if="showEdit===''">
        <x-button mini link="/intention" :style="{'background-color':setColor}">意向单</x-button>
        <x-button mini @click.native="handleClickIsShow" :style="{'background-color':setColor}">立即推广</x-button>
      </flexbox>
      <div v-if="showEdit===''" class="info-edit-box">
        <div class="info-left">
          <span class="img-box2"><avatar :src="shareInfo.head_pic" :backgroundColor="setColor" color="#ffffff" :size="40" username="Avatar"></avatar></span>
          <span class="info-title my-desc">{{shareInfo.realname}}</span>
        </div>
        <div @click="handleToInfoEdit" class="info-right">
          <span class="info-title info-edit">编辑</span>
          <span class="app-icon info-title">&#xe684;</span>
        </div>
      </div>
      <span :class="{'point':showEdit===''}">
        <l-header></l-header>
        <div v-show="mainRecommend.is_show==='1'" class="block main-recommend">
          <p class="recommend-title">{{mainRecommend.block_content.title}}</p>
          <div @click="handleClickImg(item)" :class="{'img-box1':item.show_type===1}" class="img-box" v-for="(item, index) in mainRecommend.block_content.list" :key="index">
            <img class="my-img" :src="item.pic_url" alt="">
          </div>
        </div>
        <l-scroller :style="{'background':`linear-gradient(to right,${scroller.color_start},${scroller.color_end})`}" v-show="scrollers.is_show==='1'" v-for="(scroller, index) in scrollers.block_content" :key="index" :list="scroller" ></l-scroller>
        <div v-show="recommend.is_show==='1'" class="block">
          <p class="recommend-title">{{recommend.block_content.title}}</p>
          <grid :cols="2">
            <grid-item v-for="(item, index) in recommendList" :key="index">
              <card class="my-card" :item="item" @click.native="$router.push(`/detail/${item.shop_id}`)"></card>
            </grid-item>
          </grid>
        </div>
        <load-more tip="正在加载" v-show="loading&&showEdit!==''" ref="loadMore"></load-more>
        <div v-transfer-dom>
          <x-dialog :dialog-style="{width:'2.56rem',height:'2.08rem',background:'transparent'}" v-model="showTip" hide-on-blur>
            <img src="../../assets/share.png" style="width:100%;height:100%;"/>
          </x-dialog>
        </div>
        <div v-show="showEdit===''||showEdit==='1'" class="add-box"></div>
      </span>
  </div>
</template>
<script>
import LHeader from './header';
import LScroller from './scroller';
import { Toast, Flexbox, FlexboxItem, Grid, GridItem, LoadMore, XButton, XDialog, TransferDomDirective as TransferDom } from 'vux';
import { Component, Vue } from 'vue-property-decorator';
import {State, Action, Mutation, namespace} from 'vuex-class';
import Card from './card';
import Avatar from 'vue-avatar';
import {isBottom} from '../../js';
const IndexState = namespace('index', State);
const IndexAction = namespace('index', Action);
const IndexMutation = namespace('index', Mutation);
const UserState = namespace('user', State);
let wx = require('weixin-js-sdk');
@Component({
  directives: {
    TransferDom
  },
  components: {LHeader, LScroller, Card, Flexbox, FlexboxItem, GridItem, Grid, LoadMore, XButton, XDialog, Avatar, Toast}
})
export default class Index extends Vue {
  @IndexState recommend
  @IndexState shareInfo
  @IndexState WxShare
  @UserState userInfo
  @IndexState mainRecommend
  @IndexState scrollers
  @IndexState page
  @IndexState isEnd
  @IndexState dataList
  @IndexState getIndexInfo
  @IndexAction init
  @IndexAction loadMore
  @IndexAction initGetShareInfo
  @IndexAction initWxshare
  @IndexMutation setPage
  imgWidth= screen.width
  showTip=false
  loading=false
  recommendList = []
  showEdit = localStorage.getItem('showEdit')
  setColor = localStorage.getItem('setColor');

  handleClickImg (item) {
    if (item.jump_type === '1') {
      localStorage.setItem('cardId', item.jump_type_value);
      this.$router.push('/cardList');
    }
    if (item.jump_type === '2') {
      this.$router.push(`/detail/${item.jump_type_value}`);
    }
    if (item.jump_type === '3') {
      let url = item.jump_type_value;
      if (!/http/.test(url)) {
        url = `http://${url}`;
      }
      window.location.href = url;
    }
  }
  handleToInfoEdit () {
    this.$router.push('/editInfo');
  }
  handleClickIsShow () {
    this.showTip ? this.showTip = false : this.showTip = true;
  }
  created () {
    document.title = localStorage.getItem('storeName');
    this.init().then(msg => {
      if (msg) {
        this.$vux.toast.text(msg, 'middle');
      }
    }).catch(error => console.log(error));
    if (this.showEdit === '') {
      const params = {
        'share_user_id': localStorage.getItem('userId') || '',
        'store_id': localStorage.getItem('store_id') || ''
      };
      this.initGetShareInfo(params).then(msg => {
        if (msg) {
          this.$vux.toast.text(msg, 'middle');
        }
      });
    }
  }
  mounted () {
    if (this.showEdit === '') {
      const params = {
        'share_url': location.href.split('#')[0]
      };
      this.initWxshare(params).then(msg => {
        if (msg) {
          this.$vux.toast.text(msg, 'middle');
        } else {
          let {appId, timestamp, nonceStr, signature, jsApiList} = this.WxShare.wechat;
          let {share} = this.WxShare;
          wx.config({
            debug: false,
            appId: appId,
            timestamp: timestamp,
            nonceStr: nonceStr,
            signature: signature,
            jsApiList: jsApiList
          });
          wx.ready(() => {
            wx.checkJsApi({
              jsApiList: jsApiList,
              success: function (res) {}
            });
            wx.onMenuShareTimeline({
              title: share.share_title,
              link: share.link,
              imgUrl: share.share_img,
              success: function () {},
              cancel: function () {}
            });
            wx.onMenuShareAppMessage({
              title: share.share_title,
              desc: share.share_describe,
              link: share.link,
              imgUrl: share.share_img,
              type: 'link',
              dataUrl: '',
              success: function () {},
              cancel: function () {}
            });
          });
        }
      });
    } else {
      let element = document.querySelector('#vux_view_box_body');
      isBottom(element,
        () => {
          !this.isEnd && !this.loading && (() => {
            this.loading = true;
            this.loadMore().then(msg => {
              if (msg) {
                this.$vux.toast.text(msg, 'middle');
              } else {
                if (this.dataList.length > 0) {
                  this.recommendList = this.recommendList.concat(this.dataList);
                  this.loading = false;
                  this.setPage(this.page + 1);
                  element.scrollTop -= (this.$refs.loadMore.$el.getBoundingClientRect().height + 10);
                } else {
                  this.loading = false;
                  this.$vux.toast.text('暂无更多数据', 'middle');
                }
              }
            }).catch(error => console.log(error));
          })();
        }
      );
    }
  }
}
</script>

<style lang="less">
.index-myIndex {
  font-size: 0.14rem;
  .add-box {
    height: 0.55rem;
  }
  .point {
    pointer-events: none;
  }
  .img-box2 {
    margin: 0 0.15rem;
  }
  .my-desc {
    width: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .main-recommend {
    font-size: 0;
  }
  .img-box1 {
    width: 50% !important;
  }
  .img-box {
    width: 100%;
    height: 1.3rem;
    display: inline-block;
    margin: 0;
  }
  .my-img {
    width: 100%;
    height: 100%;
    border: none;
  }
  .my-card {
    height: 2.6rem !important;
  }
  .focus {
    margin-right: 0 !important;
    width: 40% !important;
  }
  .marquee-height {
    width: 2.4rem;
    padding: 0 !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 0.17rem !important;
  }
  .card img {
    height: 0.9rem;
  }
  .my-card img {
    height: 1.04rem;
  }
  .card {
    height: 2.05rem;
    justify-content: space-around !important;
  }
  .vux-flexbox {
    justify-content: flex-start;
  }
  .scroller {
    margin-top: 0.2rem !important;
    padding: 0 0.08rem;
  }
  .bold {
    color: #ffffff !important;
    font-weight: bold;
  }
  .block {
    margin-top: 0.3rem !important;
  }
  .title {
    height: 0.44rem;
    line-height: 0.44rem !important;
    width: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .marqueediv  {
    margin: 0 !important;
    padding: 0 !important;
    height: 0.44rem;
  }
  .vux-icon-dot {
    width: 0.12rem !important;
    height: 0.04rem !important;
    border-radius: 0 !important;
    background: #D9D9D9;
  }
  .active {
    background: #3c3c3c !important;
  }
  .weui-btn_mini {
    font-size: 0.12rem !important;
  }
  .weui-btn {
    width: 1rem;
    font-weight: bold;
    margin: 0 !important;
  }
  .app-icon {
    margin: 0 0.15rem;
  }
  .info-edit {
    font-size: 0.16rem !important;
  }
  .info-left, .info-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .info-title {
    font-size: 0.18rem;
    color: #3c3c3c;
  }
  .info-img {
    width: 0.4rem;
    height: 0.4rem;
    border: none;
  }
  .info-edit-box {
    height: 0.6rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    margin-top: 0.15rem;
  }
  .top{
      margin: 0 !important;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 0.44rem;
  }
  .recommend-title{
      position: absolute;
      top: -0.17rem;
      left: 0;
      width: 1rem;
      height: 0.3rem;
      line-height: 0.3rem;
      border-radius: 0 0.25rem 0.25rem 0;
      background: #f76868;
      text-align: center;
      color: #fff;
      font-weight: bold;
      font-size: 0.16rem;
      z-index:50;
      padding: 0 0.1rem;
  }
  .block{
    width: 100%;
    position: relative;
  }
}
</style>
