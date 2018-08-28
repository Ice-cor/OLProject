<template>
  <div class="feedback">
    <back-header title="意见反馈"></back-header>
    <div class="feedback-box">
      <div class="feedback-box-textarea">
        <textarea placeholder="如果有产品使用问题，请在这里大声吐槽..."></textarea>
      </div>
      <div class="feedback-box-imgbox">
        <ul class="box-imgbox-list fl" v-if="imgList.length > 0">
          <li class="box-imgbox-item fl"><img src="" alt=""></li>
          <li class="box-imgbox-item fl"><img src="" alt=""></li>
          <li class="box-imgbox-item fl"><img src="" alt=""></li>
        </ul>
        <div class="box-imgbox-add fl">
          <input type="file">
          <img :src="require('../../assets/images/feedback_icon_addImg.png')" alt="">
        </div>
        <div class="box-imgbox-info fl" v-if="imgList.length === 0">添加图片</div>
      </div>
      <div class="feedback-box-tel">
        <input type="text" placeholder="手机号/邮箱（选填，方便我们联系您）">
      </div>
      <common-btn class="feedback-submit" name="提交"></common-btn>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import CommonBtn from "@/components/commonBtn";

export default {
  name: "feed-back",
  data () {
    return {
      imgList: []
    }
  },
  components: {
    [Header.name]: Header,
    [CommonBtn.name]: CommonBtn
  }
}
</script>

<style lang="scss">
  .feedback-box {
    position: absolute;
    top: 130px;
    left: 0;
    width: 100%;
    .feedback-box-textarea {
      background-color: #fff;
      padding: 30px 40px 30px;
      & > textarea {
        width: 100%;
        height: 212px;
        color: #333;
        line-height: 50px;
        font-size: 30px;
      }
    }
    .feedback-box-imgbox {
      height: 100px;
      background-color: #fff;
      padding: 0 40px 30px;
      box-sizing: content-box;
      .box-imgbox-add {
        overflow: hidden;
        position: relative;
        width: 100px;
        height: 100px;
        & > input[type='file'] {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100px;
          height: 100px;
          opacity: 0;
          z-index: 99;
        }
        & > img {
          width: 100px;
          height: 100px;
        }
      }
      .box-imgbox-item {
        width: 100px;
        height: 100px;
        margin-right: 40px;
        background-color: pink; 
      }
      .box-imgbox-info {
        line-height: 100px;
        margin-left: 20px;
        font-size: 30px;
        color: #aaa;
      }
    }
    .feedback-box-tel {
      margin-top: 30px;
      padding: 0 40px;
      background-color: #fff;
      height: 90px;
      line-height: 90px;
      input {
        width: 100%;
        font-size: 30px;
      }
    }
    .feedback-submit {
      margin-top: 80px;
    }
  }
</style>