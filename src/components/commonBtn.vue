<template>
  <div class="common-btn">
    <button type="button">{{name}}</button>
  </div>
</template>

<script>
export default {
  name: 'common-btn',
  props: {
    name: {
      type: String,
      default: '确定'
    }
  }
}
</script>

<style lang="scss">
  .common-btn {
    height: 90px;
    width: 100%;
    button {
      display: block;
      width: 670px;
      margin: 0 auto;
      line-height: 90px;
      text-align: center;
      font-size: 32px;
      color: #fff;
      font-weight: 500;
      border-radius: 10px;
      background: linear-gradient(to right, #46D2FF , #1674FB);  
    }
  }
</style>
