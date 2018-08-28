<template>
  <div class="message-mask" v-show="messageObj.isShow">
    <div class="message-box">
      <div class="message-box-title">{{messageObj.title}}</div>
      <div class="message-box-desc">{{messageObj.desc}}</div>
      <div class="message-box-btn">
        <div class="box-btn-two" v-if="messageObj.cancel !== undefined">
          <button class="btn-cancle">取消</button>
          <button class="btn-cancle">确定</button>
        </div>
        <div class="box-btn-one" v-else>
          <button class="btn-cancle" @click="">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'message',
  props: {
    messageObj: Object
  }
}
</script>

<style lang="scss">
  .message-mask {
    position: fixed;
    z-index: 99;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    .message-box {
      position: absolute;
      z-index: 100;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 80%;
      height: 250px;
      background: #fff;
      border-radius: 20px;
      .message-box-title {
        text-align: center;
        padding: 20px 0;
        font-weight: 600;
        color: #333;
      }
      .message-box-desc {
        text-align: center;
      }
      .message-box-btn {
        margin: 24px 42px 0;
        height: 68px;
        .box-btn-two {
          display: flex;
          justify-content: space-between;
          button {
            height: 68px;
            line-height: 68px;
            width: 45%;
          }
        }
        .box-btn-one {
          button {
            display: block;
            height: 68px;
            line-height: 68px;
            width: 75%;
            margin: 0 auto;
          }
        }
      }
    }
  }
</style>