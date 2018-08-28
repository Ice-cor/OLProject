<template>
  <div class="recommend">
    <div class="title">
      <h2>
        <i><img src="./icon_recommend.png" alt=""></i>
        <span>今日推荐</span>
      </h2>
    </div>
    <main>
      <div class="recommendItemWrap" v-for="(item,index) in recommendData" :key="index" @click="linkTo(item.link)">
        <div class="recommendItemBorder">
          <div class="recommendItem">
            <span class="companyLogo">
              <img :src="item.logoUrl" :alt="item.name">
            </span>
            <div class="recommendItemInfo">
              <h3>{{item.name}}</h3>
              <h4>{{item.loanRange}}</h4>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'recommend',
  data() {
    return {}
  },
  computed: {
    recommendData() {
      return this.$store.state.homePageData.proRecommendVOs
    }
  },
  methods: {
    linkTo(url) {
      window.location.href = url
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  margin-top: 20px;
  background: white;
  .title {
    border-bottom: 1px solid #ddd;
    > h2 {
      font-size: 30px;
      padding: 26px 0;
      display: flex;
      display: -webkit-box;
      align-items: center;
      justify-content: center;
      > i {
        display: inline-block;
        width: 38px;
        margin-right: 18px;
      }
      > span {
        display: block;
      }
    }
  }
  main {
    display: flex;
    flex-flow: wrap;
  }
  .recommendItemWrap {
    padding: 28px 0 28px 40px;
    width: 50%;
    border-bottom: 1px solid #ddd;
    .recommendItemBorder {
      padding: 8px 0;
      .recommendItem {
        display: flex;
        align-items: center;
        .companyLogo {
          display: block;
          width: 106px;
          height: 106px;
          background: #989898;
          border-radius: 25px;
          box-shadow: 0 0 0 4px rgba(152, 152, 152, 0.4);
          margin-right: 24px;
          overflow: hidden;
          text-align: center;
          line-height: 106px;
        }
        .recommendItemInfo {
          font-size: 32px;
          text-align: left;
          h4 {
            padding-top: 24px;
            color: #fe5c0d;
          }
        }
      }
    }
  }
  .recommendItemWrap:nth-child(2n-1) .recommendItemBorder {
    border-right: 1px solid #ddd;
  }
}
</style>
