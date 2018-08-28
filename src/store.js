import Vue from "vue";
import Vuex from "vuex";
import { userInfo } from "os";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    homePageData: {},
    token: '',
    userInfo: null,
  },
  mutations: {
    setHomePageData(state,data){
      state.homePageData =  data.data
    },
    clearUserInfoAndToken(state) {
      sessionStorage.clear();
      state.token = '';
      state.userInfo = null;
    },
    saveUserInfoAndToken (state, loginInfo) {
      state.token = loginInfo.token;
      state.userInfo = loginInfo.userInfo
      sessionStorage.setItem('token', loginInfo.token);
      sessionStorage.setItem('userInfo', loginInfo.userInfo);
    },
  },
  actions: {
    saveHomePageDate({commit},data){
      commit('setHomePageData',data)
    },
    clearUserInfoAndToken ({commit}) {
      commit('clearUserInfoAndToken');
    },
    saveUserInfoAndToken ({commit}, loginInfo) {
      commit('saveUserInfoAndToken',loginInfo);
    }
  },
  getters: {
    getHomepageData(state){
      return state.homePageData
    },
    getToken (state) {
      if (!state.token) {
        state.token = sessionStorage.getItem('token');
      }
      return state.token;
    },
    getUserInfo (state) {
      if (!state.userInfo) {
        state.token = sessionStorage.getItem('userInfo');
      }
      return state.userInfo;
    }
  }
});
