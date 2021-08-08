import Vue from "vue";

import axios from "axios";
import Vuelidate from "vuelidate";
import moment from "moment";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

Vue.use(Vuelidate);

Vue.prototype.$http = axios;
axios.defaults.baseURL = process.env.VUE_APP_BASED_URL;
Vue.prototype.moment = moment;
axios.defaults.headers.common.Authorization = window.sessionStorage.getItem(
  "token"
);

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyAH_mashdIxej3GG15lg8h72Aboo91CXYI",
  authDomain: "retirement-cal.firebaseapp.com",
  databaseURL: "https://retirement-cal.firebaseio.com",
  projectId: "retirement-cal",
  storageBucket: "retirement-cal.appspot.com",
  messagingSenderId: "253083084191",
  appId: "1:253083084191:web:05fc8c2b34df67029bc9aa"
};
Vue.prototype.$firebase = firebase.initializeApp(config);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
