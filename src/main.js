import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "./assets/css/index.scss";

import toast from '@/components/toast/toast';
import message from '@/components/message/message'
import ajax from '@/api/index.js';
// import "./assets/css/reset.scss";

Vue.config.productionTip = false;



const host = process.env.NODE_ENV === 'development' ? '' : 'http://market.nilaiya.com/api/app/fast2'
const instance = axios.create({
  baseURL: host
})
Vue.prototype.$axios = instance;
// console.log(host,'host')
//axios方法放到vue原型上供其他组件调用

// axios.interceptors.request.use(config => {
//   config.url = `http://market.nilaiya.com/api/app/fast2${config.url}`
//   console.log(config.url)
//   return config;
// });
// axios.interceptors.response.use(config => {
//   console.log(222)
//   return config;
// });
Vue.use(toast);
Vue.use(message);
Vue.use(ajax, axios);
//axios拦截器

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
