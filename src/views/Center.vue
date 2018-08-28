<template>
  <div class="center">
    <div class="center-top">
      <div class="center-top-avtar">
        <img v-if="isLogin && userInfo.imageFast" :src="userInfo.imageFast" alt="">
        <img v-else :src="require('../assets/images/mine_icon_avatar.png')" alt="">
      </div>
      <div class="center-top-info" @click="toLogin">
        <span class="info-text" v-if='isLogin'>欢迎您，{{userInfo.phone}}</span>
        <span class="info-text" v-else>立即登录</span>
      </div>
    </div>
    <div class="center-box">
      <div class="center-box-item setup" @click="goNext('/settings')">
        设置
      </div>
      <div class="split"></div>
      <div class="center-box-item feedback" @click="goNext('/feedback')">
        意见反馈
      </div>
      <div class="split"></div>
      <div class="center-box-item service" @click="goNext('/contactkf')">
        联系客服
      </div>
      <div class="center-box-item aboutus" @click="goNext('/aboutus')">
        关于我们
      </div>
      <div class="split"></div>
      <div class="center-box-item weixin" @click="openWeixin" data-clipboard-text="JYCSPRO">
        微信公众号
      </div>
    </div>
    <weixin-mask :hasShow="isShow" @change="hasChange"></weixin-mask>
  </div>
</template>

<script>
import WeixinMask from '@/components/weixinMask';
import Clipboard from 'clipboard';

export default {
  name: 'center',
  data () {
    return {
      isShow: false ,
      userInfo: this.$store.getters.getUserInfo
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.getters.getToken
    }
  },
  methods: {
    goNext (path) {
      if (this.isLogin) {
        this.$router.push({path: path});
      } else {
        this.$toast('请先登录!');
      }
    },
    toLogin () {
      if (!this.isLogin) {
        this.$router.push({name: 'login'});
      }
    },
    hasChange (value) {
      this.isShow = value;
    },
    openWeixin () {
      this.isShow = true;
      let clipboard = new Clipboard('.weixin');
      clipboard.on('success', e => {  
        console.log('复制成功')  
        // 释放内存  
        clipboard.destroy(); 
      })
    }
  },
  components: {
    [WeixinMask.name]: WeixinMask
  }
}
</script>

<style lang="scss">
  .center {
    .center-top {
      height: 228px;
      width: 100%;
      background: url(../assets/images/mine_bg.jpg) no-repeat center;
      background-size: 100% 228px;
      padding: 70px 0 21px 44px;
      display: flex;
      align-items: center;
      .center-top-avtar {
        height: 136px;
        width: 136px;
        border-radius: 50%;
        border: 9px solid #7d97f8;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .center-top-info {
        text-align: left;
        width: 488px;
        margin-left: 38px;
        font-size: 36px;
        color: #fff;
        background: url(../assets/images/mine_icon_arrow.png) no-repeat right center;
        background-size: 20px 36px;
      }
    }
    .center-box {
      margin-top: 30px;
      width: 100%;
      background-color: #fff;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .center-box-item {
        width: 248px;
        height: 150px;
        padding-top: 105px;
        font-size: 28px;
        color: #333;
        &.setup {
          background: url(../assets/images/mine_icon_setup.png) no-repeat center 40px;
          background-size: 50px 48px;
        }
        &.feedback {
          background: url(../assets/images/mine_icon_feedback.png) no-repeat center 40px;
          background-size: 50px 48px;
        }
        &.service {
          background: url(../assets/images/mine_icon_service.png) no-repeat center 40px;
          background-size: 50px 48px;
        }
        &.aboutus {
          background: url(../assets/images/icon_aboutUs.png) no-repeat center 40px;
          background-size: 50px 48px;
        }
        &.weixin {
          background: url(../assets/images/mine_icon_weixin.png) no-repeat center 40px;
          background-size: 50px 48px;
        }
      }
      .split {
        height: 70px;
        width: 1px;
        background-color: #ddd;
      }
    }
  }
</style>
