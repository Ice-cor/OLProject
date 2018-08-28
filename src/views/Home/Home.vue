<template>
  <div class="home">
    <header>
      <span></span>
      <div class="iconTitle">
        <img src="./home_icon_title.png" alt="">
      </div>
      <span></span>
    </header>
    <Main v-if="ready">
      <carousel/>
      <new-swiper />
      <recommend/>
      <tabs />

    </Main>
  </div>
</template>

<script>
import Carousel from './Carousel'
import NewSwiper from './NewSwiper'
import Tabs from './Tabs'
import Recommend from './recommend'
export default {
  created() {
    this.getList()
  },
  data() {
    return {
      newsList: [],
      ready: false
    }
  },
  methods: {
    getList() {
      this.$axios
        .post('/pub/info', {})
        .then(res => {
          if (res.data.status === 0) {
            this.newsList = res.data.noticeList
            this.$store.dispatch({type:'saveHomePageDate',data: res.data})
            // console.l
            this.ready = true
            // console.log(this.$store,'this.newsList')
          } else {
            this.$toast(res.data.des)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    Carousel,
    NewSwiper,
    Tabs,
    Recommend
  }
}
</script>

<style lang="scss">
.home {
  padding-bottom: 13.2vw;
  > header {
    background: white;
    display: flex;
    padding: 25px 0;
    span {
      flex: 1;
      font-size: 32px;
      color: var(--mainColor);
    }
    & .iconTitle {
      width: 160px;
    }
  }
  & .recommendWrap {
    margin-top: 20px;
    & main > .recommendLine {
      padding: 28px 40px;
    }
  }
}
</style>
