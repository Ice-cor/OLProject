import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "*",
      redirect: "/login",
    }, {
      path: "/login",
      name: "login",
      component: () =>
        import ( /* webpackChunkName: "login" */ "./views/Login/Login.vue")
    },
    {
      path: "/signUp",
      name: "signUp",
      component: () =>
        import ( /* webpackChunkName: "login" */ "./views/Login/signUp.vue")
    },
    {
      path: "/findPassword",
      name: "findPassword",
      component: () =>
        import ( /* webpackChunkName: "login" */ "./views/Login/findPassword.vue")
    },
    {
      path: "/",
      name: "home",
      meta: {
        isTabbar: true
      },
      component: () =>
        import ( /* webpackChunkName: "home" */ "./views/Home/Home.vue")
    },
    {
      path: "/center",
      name: "center",
      meta: {
        isTabbar: true
      },
      component: () =>
        import ( /* webpackChunkName: "center" */ "./views/Center.vue")
    },
    {
      path: "/settings",
      name: "settings",
      component: () =>
        import ( /* webpackChunkName: "settings" */ "./views/Center/Settings/Settings.vue"),
    },
    {
      path: "/settings/editname",
      name: "editname",
      component: () =>
        import ( /* webpackChunkName: "editname" */ "./views/Center/Settings/EditName.vue")
    },
    {
      path: "/settings/editpass",
      name: "editpass",
      component: () =>
        import ( /* webpackChunkName: "editpass" */ "./views/Center/Settings/EditPass.vue")
    },
    {
      path: "/aboutus",
      name: "aboutus",
      component: () =>
        import ( /* webpackChunkName: "aboutus" */ "./views/Center/AboutUs.vue")
    },
    {
      path: "/contactkf",
      name: "contactkf",
      component: () =>
        import ( /* webpackChunkName: "contactkf" */ "./views/Center/ContactKf.vue")
    },
    {
      path: "/feedback",
      name: "feedback",
      component: () =>
        import ( /* webpackChunkName: "feedback" */ "./views/Center/FeedBack.vue")
    }
  ]
});