<template v-if="loginVisible">
  <div class="login">
    <div class="logo">
      <img src="./images/logo.png" alt="logo">
    </div>
    <div class="logininfos">
      <form action="" @submit.prevent="submit">
        <div class="photoNumWrap">
          <div>
            <span>
              <img src="./images/sign in_icon_user.png" alt="icon_user">
            </span>
          </div>
          <input type="text" name="phoneNum" placeholder="请输入手机号码" v-model.trim="phoneNum">
        </div>
        <div class="passwordWrap">
          <div>
            <span>
              <img src="./images/icon_mask.png" alt="icon_user">
            </span>
          </div>
          <input type="password" name="password" v-if="!active" v-model.trim="password" placeholder="请输入密码">
          <input type="text" v-model.trim="password" v-else name="password" placeholder="请输入密码">
          <div class="eyes" @click="active = !active">
            <span>
              <img src="./images/icon_hide.png" alt="" v-if="!active">
              <img src="./images/icon_visual.png" alt="" v-else>
            </span>
          </div>
        </div>
        <input class="submitBtn" type="submit" value="立即登录" :disabled="!valCheck" />
      </form>
      <div class="forgetPassword">
        <router-link class="findPassword" to="/findPassword">忘记密码</router-link>
      </div>
      <div class="signUpWrap">
        <span>
          还没账号？
          <router-link class="TosignUp" to="/signUp">快速注册</router-link>
        </span>
      </div>
    </div>
    <span class="close" @click="$router.back()">
      <img src="./images/sign in_icon_cancel.png" alt="关闭">
    </span>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'login',
  data() {
    return {
      phoneNum: '',
      password: '',
      active: false,
      isRight: false,
      loginVisible: false
    }
  },
  components: {},
  methods: {
    getList(e) {
      console.log(e)
    },
    submit() {
      // console.log(this.$store.state)
      this.$axios
        .post('/user/login', {
          phone: this.phoneNum,
          password: this.password
        })
        .then(res => {
          if (res.data.status == 0) {
            let { token, userInfo } = res.data
            // console.log(res)
            this.$store.dispatch('saveUserInfoAndToken',
              {
                token: token,
                userInfo: userInfo
              })
            // console.log(this.$store.state)
            this.$toast('登陆成功')
            let timeId = setTimeout(() => {
              this.$router.push({ path: '/' })
              clearTimeout(timeId)
            }, 500)
          } else {
            this.$toast(res.data.des)
          }
        })
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
    },
  },
  computed: {
    valCheck() {
      if (
        this.check({ type: 'phone', val: this.phoneNum }) &&
        this.check({ type: 'password', val: this.password })
      ) {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100vw;
  background: white;
  padding: 0 80px;
  z-index: 1;
  & input {
    border: none;
    font-size: 32px;
    border-radius: 0;
    border-left: 4px solid #3886f8;
    padding-left: 38px;
    flex: 1;
  }
  > .logo {
    padding-top: 160px;
    width: 220px;
    margin: 0 auto;
  }
  > .logininfos {
    padding-top: 138px;
    & .photoNumWrap {
      border-bottom: 1px solid #dddddd;
      padding-bottom: 16px;
      display: flex;
      align-items: center;
      > div {
        flex-shrink: 0;
        width: 112px;
        display: flex;
        justify-content: center;
        align-items: center;
        > span {
          width: 48px;
          display: inline-block;
        }
      }
      & input[name='phoneNum'] {
      }
    }
    & .passwordWrap {
      margin-top: 34px;
      border-bottom: 1px solid #dddddd;
      padding-bottom: 16px;
      display: -webkit-box;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      > div:first-child {
        flex-shrink: 0;
        width: 112px;
        display: flex;
        justify-content: center;
        align-items: center;
        > span {
          width: 42px;
          display: inline-block;
        }
      }
      > .eyes {
        width: 60px;
        > span {
          display: block;
          width: 36px;
        }
      }
      & input[name='password'] {
      }
    }
    & .submitBtn {
      margin-top: 100px;
      width: 100%;
      border: none;
      border-radius: 10px;
      padding: 30px 0;
      background: linear-gradient(to right, #4fd2ff, #2178f7);
      color: white;
      font-size: 32px;
    }
    & .submitBtn:disabled {
      background: #cccccc;
    }
    & .forgetPassword {
      margin-top: 30px;
      text-align: right;
      > .findPassword {
        color: #3886f8;
        font-size: 28px;
        text-decoration: underline;
      }
    }
    & .signUpWrap {
      padding-top: 150px;
      color: #999;
      font-size: 28px;
      > span .TosignUp {
        color: #3886f8;
        text-decoration: underline;
      }
    }
  }
  > .close {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 40px;
    right: 60px;
  }
}
</style>
