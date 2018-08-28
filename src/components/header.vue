<template>
  <div class="back-header">
    <span class="arrow" @click='$router.back()'></span>
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  name: 'back-header',
  props: {
    title: {
      type: String,
      default: '标题'
    }
  }
}
</script>

<style lang="scss">
  .back-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 90px;
    line-height: 90px;
    background-color: #fff;
    text-align: center;
    font-size: 36px;
    color: #333;
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
    .arrow {
      padding: 0 40px 0;
      position: absolute;
      top: 28px;
      left: 0;
      width: 19px;
      height: 33px;
      background: url(../assets/images/header_icon_back.png) no-repeat center center;
      background-size: 19px 33px;
    }
  }
</style>
