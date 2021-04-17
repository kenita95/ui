import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";
import store from "../store/index";
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state["token"]) {
      // check user has permission to the route
      if (store.state["role"] === "admin") {
        next();
      } else {
        console.log("path", to.path);
        if (
          store.state["permissions"].includes(to.path) ||
          [
            "/create-customer/true/false",
            "/update-customer/true",
            "/create-customer/false/false",
            "/update-customer/false",
          ].includes(to.path)
        ) {
          next();
        } else {
          alert("permission denied");
        }
      }
    } else {
      store.dispatch("logout");

      next("/");
    }
  } else {
    next();
  }
});

export default router;
