<template>
  <div id="app">
    <div id="nav" v-if="isTabbar">
      <router-link class="home" to="/">首页</router-link>
      <router-link class="mine" to="/center">我的</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isTabbar: false
    }
  },
  watch: {
    $route (to) {
      this.isTabbar = to.meta.isTabbar || false;
    }
  }
}
</script>

<style lang="scss">
body {
  background: var(--bgColor);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  #nav {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 99px;
    border-top: 1px solid #ddd;
    background-color: #fff;
    z-index: 99;
    display: flex;
    a {
      flex: 1;
      font-size: 22px;
      color: #777;
      padding-top: 66px;
      &.home {
        background: url(./assets/images/home_icon_home_unselected.png) no-repeat center 10px;
        background-size: 52px 52px;
        &.router-link-exact-active {
          background: url(./assets/images/home_icon_home_selected.png) no-repeat center 10px;
          background-size: 52px 52px;
          color: #3886F8;
        }
      }
      &.mine {
        background: url(./assets/images/home_icon_mine_unselected.png) no-repeat center 10px;
        background-size: 52px 52px;
        &.router-link-exact-active {
          background: url(./assets/images/home_icon_mine_selected.png) no-repeat center 10px;
          background-size: 52px 52px;
          color: #3886F8;
        }
      }
    }
  }
}
</style>
