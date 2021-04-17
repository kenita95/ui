import Vue from "vue";

import axios from "axios";
import Vuelidate from "vuelidate";
import moment from "moment";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";

import router from "./router";
import store from "./store";

Vue.use(Vuelidate);

Vue.prototype.$http = axios;
axios.defaults.baseURL = process.env.VUE_APP_BASED_URL;
Vue.prototype.moment = moment;
axios.defaults.headers.common.Authorization = window.sessionStorage.getItem(
  "token"
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
