<template>
  <div class="about-us">
    <back-header title="关于我们"></back-header>
    <div class="aboutus-box">
      <div class="abouts-box-bg">
        版本号：V 1.0.0
      </div>
      <div class="abouts-box-item border-1px">公司介绍</div>
      <div class="abouts-box-item border-1px">给我打分</div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";

export default {
  name: "about-us",
  components: {
    [Header.name]: Header
  }
}
</script>

<style lang="scss">
  .aboutus-box {
    position: absolute;
    top: 90px;
    left: 0;
    width: 100%;
    .abouts-box-bg {
      padding-top: 320px;
      width: 100%;
      height: 440px;
      font-size: 28px;
      color: #666;
      background: url(../../assets/images/aboutus_icon_logo.png) no-repeat center 105px;
      background-size: 208px 166px;
    }
    .abouts-box-item {
      background-color: #fff;
      height: 90px;
      line-height: 90px;
      width: 100%;
      padding-left: 37px;
      font-size: 30px;
      color: #333;
      text-align: left;
      background: url(../../assets/images/setting_icon_into.png) no-repeat right 37px center;
      background-size: 20px 30px;
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
  }
</style>
