<template>
  <div class="tipsWrap">
    <div class="peopleNums">{{homePageData.number}}</div>
    <swiper :options="swiperOption" ref="mySwiper" v-if="homePageData.noticeList?homePageData.noticeList.length>0:false">
      <!-- slides -->
      <swiper-slide v-for="(item,index) in homePageData.noticeList" :key="index">
        <div class="infoWrap">
          <div class="mainInfo">
            <span class="company">
              <span class="icon_logo">
                <img :src="item.logoUrl" :alt="item.name">
                <!-- <span>{{item.name}}</span> -->
              </span>
              <span class="name">{{item.name}}</span>
            </span>
            <span class="phoneNum">{{item.phone}}</span>
            <span class="msg">{{item.moneyText}}
              <span style="color: red">{{item.money}}</span>
            </span>
            <span class="time">{{item.time}}</span>
          </div>
        </div>

      </swiper-slide>
      <!-- Optional controls -->
    </swiper>
  </div>
</template>


<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'carrousel',
  props: ['newsList'],
  data() {
    return {
      swiperOption: {
        direction: 'vertical',
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        allowTouchMove: false, //禁止主动滑动切换
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
      },
      dataList: {}
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    homePageData() {
      return this.$store.state.homePageData
    }
  },
  mounted() {
    // this.swiper.slideTo()
  },
  watch: {
    deep: true
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss">
.tipsWrap {
  padding: 15px 30px;
  background: white;
  height: 110px;
  .peopleNums {
    font-size: 22px;
    text-align: left;
    padding-bottom: 15px;
  }
  .mainInfo {
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
    align-items: center;
    overflow-y: hidden;
    & > span {
      font-size: 24px;
      margin-right: 20px;
    }
    & > span:last-child {
      margin-right: 0px;
    }
    span.company {
      display: flex;
      align-items: center;
      .name {
        white-space: nowrap;
        font-size: 26px;
        font-weight: bold;
      }
    }
    .icon_logo {
      display: block;
      width: 40px;
      font-size: 26px;
      margin-right: 5px;
      border-radius: 8px;
      overflow: hidden;
    }
    span.msg {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .swiper-container {
    height: 100%;
  }
}
</style>
