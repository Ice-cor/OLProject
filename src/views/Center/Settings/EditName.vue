<template>
  <div class="editname">
    <back-header title="用户名"></back-header>
    <div class="editname-box">
      <div class="editname-box-item">
        <label>用户名</label>
        <input type="text" placeholder="请输入您的用户名" v-model="userName" maxlength="8">
      </div>
      <div class="editname-box-tips">
        请输入2~8位字符，不能以数字开头
      </div>
      <common-btn @click.native="editName"></common-btn>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import CommonBtn from "@/components/commonBtn";

export default {
  name: "edit-name",
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    editName () {
      // this.userName = this.userName.replace(/^[a-zA-Z][0-9a-zA-Z]{1,9}$/g, '');
      if (/^[a-zA-Z][0-9a-zA-Z]{1,9}$/.test(this.userName)) {
        window.alert('修改用户名'+this.userName);
      } else {
        this.$toast('用户名格式不正确！');
        this.userName = '';
      }
    }
  },
  components: {
    [Header.name]: Header,
    [CommonBtn.name]: CommonBtn
  }
}
</script>

<style lang="scss">
  .editname-box {
    position: absolute;
    top: 130px;
    left: 0;
    width: 100%;
    .editname-box-item {
      background-color: #fff;
      height: 90px;
      display: flex;
      align-items: center;
      label {
        width: 175px;
        padding-left: 40px;
        color: #333;
        font-size: 30px;
        text-align: left;
      }
      input {
        width: 500px;
        font-size: 30px;
      }
    }
    .editname-box-tips {
      margin: 22px 0 50px 40px;
      font-size: 28px;
      color: #666;
      text-align: left;
    }
  }
</style>
