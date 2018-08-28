<template>
  <div class="contack-kf">
    <back-header title="联系客服"></back-header>
    <div class="contack-box">
      <div class="contack-box-bg"></div>
      <div class="contack-box-content">
        <p class="box-content-text1">关注急用超市微信公众号</p>
        <p class="box-content-text2">jiogosok</p>
        <p class="box-content-text3">点击复制</p>
        <div class="box-content-img"></div>
        <div class="box-content-tel">
          QQ客服：  1025886940
        </div>
      </div>
      <div class="contack-box-time">
        <p>客服工作时间：</p>
        <p>周一至周五9：00-18：00</p>
      </div>
    </div>
    <div class="contack-footer-tel">
      电话客服：  0755-2866726
    </div>
  </div>

</template>

<script>
import Header from "@/components/header";

export default {
  name: "contack-kf",
  components: {
    [Header.name]: Header
  }
}
</script>

<style lang="scss">
  .contack-box {
    position: absolute;
    top: 90px;
    left: 0;
    width: 100%;
    .contack-box-bg {
      height: 150px;
      width: 100%;
      background: url(../../assets/images/service_bg.jpg) no-repeat center center;
      background-size: 100% 150px;
    }
    .contack-box-content {
      padding-top: 40px;
      margin: 80px auto 0;
      width: 576px;
      background-color: #fff;
      border-radius: 28px;
      overflow: hidden;
      .box-content-text1 {
        color: #333;
        font-size: 32px;
        text-align: center;
        margin-bottom: 29px;
      }
      .box-content-text2 {
        margin-bottom: 20px;
        text-align: center;
        font-size: 36px;
        color: #898989;
      }
      .box-content-text3 {
        color: #3886F8;
        font-size: 28px;
        margin-bottom: 33px;
        text-align: center;
      }
      .box-content-img {
        width: 222px;
        height: 228px;
        margin: 0 auto;
        background: url(../../assets/images/server_img_qrCode.jpg) no-repeat center center;
        background-size: 100% 100%;
      }
      .box-content-tel {
        margin-top: 56px;
        padding-left: 165px;
        border-top: 1px solid #ddd;
        width: 100%;
        height: 100px;
        line-height: 100px;
        color: #333;
        font-size: 30px;
        text-align: left;
        background: url(../../assets/images/service_icon_qq.png) no-repeat 94px center;
        background-size: 48px 48px;
      }
    }
    .contack-box-time {
      margin-top: 35px;
      & > p {
        line-height: 45px;
        font-size: 28px;
        color: #666;
      }
    }
  }
  .contack-footer-tel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding-left: 224px;
    background-color: #fff;
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    color: #333;
    text-align: left;
    background: url(../../assets/images/service_icon_phone.png) no-repeat 160px center;
    background-size: 40px 40px;
  }
</style>
