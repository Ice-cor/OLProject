<template>
  <div class="settings">
    <back-header title="设置"></back-header>
    <ul class="settings-list">
      <li class="settings-list-item border-1px">
        <!-- <input type="file" @change="upLoadImg"> -->
        <span>头像</span>
        <div class="avatar">
          <img v-if="userInfo.imageFast" :src="userInfo.imageFast" alt="">
          <img v-else :src="require('../../../assets/images/mine_icon_avatar.png')" alt="">
        </div>
      </li>
      <li class="settings-list-item border-1px">
        <span>用户名</span>
        <span class="btntext">急速超市</span>
      </li>
      <li class="settings-list-item border-1px">
        <span>手机号</span>
        <span class="btntext">{{userInfo.phone}}</span>
      </li>
      <li class="settings-list-item border-1px" @click="goNext('/settings/editpass')">
        <span>修改密码</span>
      </li>
      <li class="settings-list-out border-1px" @click="outSign">退出登录</li>
    </ul>
  </div>
</template>

<script>
import Header from "@/components/header";
import Message from "@/components/message";

export default {
  name: "settings",
  data () {
    return {
      userInfo: this.$store.getters.getUserInfo,
      token: this.$store.getters.getToken
    }
  },
  methods: {
    goNext (path) {
      this.$router.push({path: path});
    },
    upLoadImg (e) {},
    outSign () {
      if (this.token) {
        this.$message({
          message: '你确定要退出登录吗？',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {
            const _this = this;
            this.$ajax({
              url: '/user/logout',
              data: {
                userId: this.userInfo.userId
              },
              success (res) {
                _this.$store.dispatch('clearUserInfoAndToken');
                _this.$router.push({path: '/'});
              }
            })
          }
        })
      }
    }
  },
  components: {
    [Header.name]: Header
  }
}
</script>

<style lang="scss">
  //1物理边框
  @mixin border-1px ($fx: top) {
    position: relative;
    border:none;
    &::after{
      content: '';
      position: absolute;
      left: 0;
      #{$fx}: 0;
      background: #ddd;
      width: 100%;
      height: 1px;
      transform: scaleY(0.5);
      transform-origin: 0 0;
    }
  }

  .settings-list {
    position: absolute;
    top: 130px;
    left: 0;
    width: 100%;
    .settings-list-item {
      position: relative;
      padding: 18px 80px 18px 40px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 55px;
      background: url(../../../assets/images/setting_icon_into.png) no-repeat right 30px center;
      background-size: 20px 30px;
      & > span {
        font-size: 30px;
      }
      & > input[type='file'] {
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 99;
      }
      .btntext {
        font-size: 30px;
        color: #aaa;
      }
      .avatar {
        width: 98px;
        height: 98px;
        border-radius: 50%;
        overflow: hidden;
        & > img {
          width: 98px;
          height: 98px;
        }
      }
      &.border-1px {
        @include border-1px (top);
      }
    }
    .settings-list-out {
      margin-top: 92px;
      width: 100%;
      height: 90px;
      line-height: 90px;
      text-align: center;
      color: #3886F8;
      font-size: 32px;
      background-color: #fff;
      &.border-1px {
        position: relative;
        border:none;
        &::after{
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          background: #ddd;
          width: 100%;
          height: 1px;
          transform: scaleY(0.5);
          transform-origin: 0 0;
        }
        &::before{
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          background: #ddd;
          width: 100%;
          height: 1px;
          transform: scaleY(0.5);
          transform-origin: 0 0;
        }
      }
    }
  }
</style>
