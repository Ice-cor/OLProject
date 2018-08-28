<template>
  <div class="bannerWrap">
    <swiper :options="swiperOption" ref="mySwiper" v-if="carouselData?carouselData.length > 0:false">
      <!-- slides -->
      <swiper-slide v-for="(banner,index) in carouselData" :key="index">
        <div class="picWrap">
          <img :src="banner.imageURL" alt="">
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>

</template>


<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'carousel',
  data() {
    return {
      swiperOption: {
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    carouselData() {
      return this.$store.state.homePageData.adList
    }
  },
  mounted() {},
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss" scoped>
.bannerWrap {
  width: 100%;
  height: 310px;
  background: #e5e5e5;
  > .swiper-container {
    height: 100%;
  }
  > .picWrap{
    width: 100%;
  }
}
</style>
