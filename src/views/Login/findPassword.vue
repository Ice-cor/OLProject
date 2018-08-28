<template>
  <div class="editpass">
    <back-header title="找回密码"></back-header>
    <div class="editpass-box">
      <div class="editpass-box-item border-1px">
        <label>手机号</label>
        <input type="text" placeholder="请输入注册手机号" v-model.number="phone">

      </div>
      <div class="editpass-box-item border-1px">
        <label>验证码</label>
        <input type="text" placeholder="请输入短信验证码" v-model.number="captcha">
        <button class="sendMsg" @click="sendMsg" :disabled="btnLock" v-if="msgBtnType===0">
          发送验证码
        </button>
        <button class="sendMsg" @click="sendMsg" :disabled="btnLock" v-else>
          {{btnLock?`${second}s`:'再次发送'}}
        </button>
      </div>
      <div class="editpass-box-item border-1px">
        <label>新密码</label>
        <input type="password" placeholder="请设置6-20位密码" v-showPass="showPass['2']" v-model="password">
        <span :class="[showPass['2'] ? 'visual' : 'unseen']" @click="changeShowPass('2')"></span>
      </div>
      <div class="editpass-box-item border-1px">
        <label>再次确认</label>
        <input type="password" placeholder="请再次输入新密码" v-showPass="showPass['1']" v-model="confirmPassword">
        <span :class="[showPass['1'] ? 'visual' : 'unseen']" @click="changeShowPass('1')"></span>
      </div>
      <common-btn class="editpass-box-btn" @click.native="submit" name="确定" />
    </div>
  </div>
  </div>
</template>

<script>
import Header from '@/components/header'
import CommonBtn from '@/components/commonBtn'

export default {
  name: 'edit-pass',
  data() {
    return {
      showPass: {
        0: false,
        1: false,
        2: false
      },
      phone: '',
      captcha: '',
      password: '',
      confirmPassword: '',
      btnLock: false,
      second: 60,
      msgBtnType: 0
    }
  },
  methods: {
    changeShowPass(index) {
      this.showPass[index] = !this.showPass[index]
    },
    submit() {
      if (this.password !== this.confirmPassword) {
        this.$toast('请确认密码是否相同')
        return
      }
      // this.$toast('标题')
      this.$axios
        .post('/user/resetPassword', {
          phone: this.phone,
          password: this.password,
          captcha: this.captcha,
        })
        .then(res => {
          if (res.data.status === 0) {
            this.$toast('修改成功')
            this.$route.push({ path: '/' })
          } else {
            this.$toast(res.data.des)
          }
        })
    },
    sendMsg() {
      if (!this.check({ type: 'phone', val: this.phone })) {
        this.$toast('请输入正确的手机号码')
        return
      }
      this.msgBtnType = 1
      this.btnLock = true
      this.$axios
        .post('/pub/getSendSms', {
          smsPhone: this.phone,
          smsType: 'RESET'
        })
        .then(res => {
          this.timeAnimate()
        })
        .catch(err => {
          console.log(err)
          this.btnLock = false
        })
    },
    timeAnimate() {
      let timeId = setInterval(() => {
        console.log(this.second)
        this.second--

        if (this.second <= 0) {
          this.second = 60
          this.btnLock = false
          window.clearInterval(timeId)
        }
      }, 1000)
    },
    check({ type, val }) {
      let Rex = /^1\d{10}$/
      if (type === 'phone' && Rex.test(val)) {
        return true
      } else if (type === 'password' && (val.length > 5) & (val.length < 16)) {
        return true
      } else {
        return false
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
        if (binding.value) el.setAttribute('type', 'text')
        else el.setAttribute('type', 'password')
      },
      update: function(el, binding) {
        if (binding.value) el.setAttribute('type', 'text')
        else el.setAttribute('type', 'password')
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
      letter-spacing: 2px;
    }
    & > span {
      width: 55px;
      height: 100%;
      margin-left: 27px;
      &.unseen {
        background: url(../../assets/images/icon_unseen.png) no-repeat center
          center;
        background-size: 36px 19px;
      }
      &.visual {
        background: url(../../assets/images/icon_visual.png) no-repeat center
          center;
        background-size: 42px 26px;
      }
    }
    &.border-1px {
      position: relative;
      border: none;
      &::after {
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
  .sendMsg {
    font-size: 22px;
    background: transparent;
    border: 1px solid #3886f8;
    width: 140px;
    height: 58px;
    border-radius: 50px;
    color: #3886f8;
  }
}
</style>
