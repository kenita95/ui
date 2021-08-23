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
  apiKey: "AIzaSyDzSfXxC6-kBBWDJMQ0fkEPjzm82vKGBCg",
  authDomain: "bug-manager-8189a.firebaseapp.com",
  projectId: "bug-manager-8189a",
  storageBucket: "bug-manager-8189a.appspot.com",
  messagingSenderId: "193587336578",
  appId: "1:193587336578:web:5b4fbf6465053262a82b9b",
  measurementId: "G-XQMZJBC3C8"
};
Vue.prototype.$firebase = firebase.initializeApp(config);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
