<template>
  <div class="editpass">
    <back-header title="修改密码"></back-header>
    <div class="editpass-box">
      <div class="editpass-box-item border-1px">
        <label>原密码</label>
        <input type="password" v-model="formData.oldPassword" placeholder="请输入原密码" v-showPass="showPass['0']">
        <span :class="[showPass['0'] ? 'visual' : 'unseen']" @click="changeShowPass('0')"></span>
      </div>
      <div class="editpass-box-item border-1px">
        <label>新密码</label>
        <input type="password" v-model="formData.newPassword" placeholder="请输入6-20位新密码" v-showPass="showPass['1']">
        <span :class="[showPass['1'] ? 'visual' : 'unseen']" @click="changeShowPass('1')"></span>
      </div>
      <div class="editpass-box-item border-1px">
        <label>再次确认</label>
        <input type="password" v-model="formData.aginPassword" placeholder="请再次输入新的密码" v-showPass="showPass['2']">
        <span :class="[showPass['2'] ? 'visual' : 'unseen']" @click="changeShowPass('2')"></span>
      </div>
      <common-btn class="editpass-box-btn" @click.native="editPass"></common-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import CommonBtn from "@/components/commonBtn";

export default {
  name: "edit-pass",
  data () {
    return {
      userInfo: this.$store.getters.getUserInfo,
      showPass: {
        0: false,
        1: false,
        2: false
      },
      formData: {
        oldPassword: '',
        newPassword: '',
        aginPassword: ''
      }
    }
  },
  methods: {
    changeShowPass (index) {
      this.showPass[index] = !this.showPass[index];
    },
    editPass () {
      //校验
      if (this.valiData()) {
        const _this = this;
        this.$ajax({
          url: '/user/editPassword',
          data: {
            userId: _this.userInfo.userId,
            oldPassword: _this.formData.oldPassword,
            newPassword: _this.formData.newPassword
          },
          success (res) {
            _this.$toast('密码修改成功,请重新登录!');
            _this.$store.dispatch('clearUserInfoAndToken');
            _this.$router.push({path: '/'});
          },
          fail (res) {
            _this.$toast(res.des);
          }
        })
      }
    },
    valiData () {
      if (!this.formData.oldPassword) {
        this.$toast('原密码不能为空!');
        return false;
      } else if (!this.formData.newPassword) {
        this.$toast('新密码不能为空!');
        return false;
      } else if (!this.formData.aginPassword) {
        this.$toast('请再次输入新密码!');
        return false;
      } else if (this.formData.newPassword !== this.formData.aginPassword) {
        this.$toast('两次密码输入不一样!');
        return false;
      } else {
        return true;
      }
    } 
  },
  components: {
    [Header.name]: Header,
    [CommonBtn.name]: CommonBtn
  },
  directives: {
    showPass: {
      bind: function(el, binding) {
        if (binding.value) el.setAttribute('type', 'text');
        else el.setAttribute('type', 'password');
      },
      update: function(el, binding) {
        if (binding.value) el.setAttribute('type', 'text');
        else el.setAttribute('type', 'password');
      }
    }
  }
}
</script>

<style lang="scss">
  .editpass-box {
    position: absolute;
    top: 130px;
    left: 0;
    width: 100%;
    .editpass-box-item {
      background-color: #fff;
      height: 90px;
      display: flex;
      align-items: center;
      & > label {
        width: 208px;
        padding-left: 40px;
        color: #333;
        font-size: 30px;
        text-align: left;
      }
      & > input {
        width: 410px;
        font-size: 30px;
        letter-spacing:2px;
      }
      & > span {
        width: 55px;
        height: 100%;
        margin-left: 27px;
        &.unseen {
          background: url(../../../assets/images/icon_unseen.png) no-repeat center center;
          background-size: 36px 19px;
        }
        &.visual {
          background: url(../../../assets/images/icon_visual.png) no-repeat center center;
          background-size: 42px 26px;
        }
      }
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
      }
    }
    .editpass-box-btn {
      margin-top: 78px;
    }
  }
</style>
