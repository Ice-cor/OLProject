<template>
  <transition name="mask-fade">
    <div class="weixinmask" v-show="isShow">
      <div class="weixinmask-box">
        <p class="weixinmask-box-p1">【急用超市】公众号已复制成功~</p>
        <p class="weixinmask-box-p2">打开微信>点击搜索框>粘贴>搜一搜</p>
        <p class="weixinmask-box-p3">点击公众号即可关注！</p>
        <div class="weixinmask-box-img"></div>
        <button class="weixinmask-box-open" @click="isShow = false">去打开微信</button>
        <i class="weixinmask-box-close" @click="isShow = false"></i>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'weixin-mask',
  props: {
    hasShow: Boolean
  },
  computed: {
    isShow: {
      get () {
        return this.hasShow;
      },
      set (value) {
        this.$emit('change', value);
      }
    }
  },
  methods: {
    closeMask () {}
  }
}
</script>

<style lang="scss">
  .weixinmask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, .5);
    .weixinmask-box {
      position: relative;
      padding-top: 45px;
      width: 582px;
      height: 726px;
      margin: 180px auto 0;
      background-color: #fff;
      border-radius: 18px;
      .weixinmask-box-p1 {
        font-size: 30px;
        color: #1E8AFC;
        margin-bottom: 20px;
      }
      .weixinmask-box-p2 {
        font-size: 30px;
        color: #000;
        margin-bottom: 20px;
      }
      .weixinmask-box-p3 {
        font-size: 30px;
        color: #000;
        margin-bottom: 30px;
      }
      .weixinmask-box-img {
        width: 410px;
        height: 370px;
        margin: 0 auto 38px;
        background: url(../assets/images/weixin_img_mask.jpg) no-repeat center center;
        background-size: 100% 100%;
      }
      .weixinmask-box-open {
        width: 290px;
        height: 78px;
        margin: 0 auto;
        background-color: #04A811;
        border-radius: 10px;
        font-size: 30px;
        color: #fff;
      }
      .weixinmask-box-close {
        width: 58px;
        height: 58px;
        position: absolute;
        left: 50%;
        margin-left: -26px;
        bottom: -95px;
        background: url(../assets/images/mine_icon_cancel.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
  .mask-fade-enter-active,
  .mask-fade-leave-active {
    transition: opacity .5s;
  }
  .mask-fade-enter,
  .mask-fade-leave-to {
    opacity: 0;
  }
</style>
