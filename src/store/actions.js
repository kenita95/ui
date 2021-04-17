import axios from "axios";

const actions = {
  sign_in({ commit }, payload) {
    return new Promise((resolve,reject) => {
      try {
        console.log('come to action')
        axios.defaults.headers.common.Authorization = payload.token;
        console.log('come to action 2')

        window.sessionStorage.setItem("token", payload.token);
        console.log('come to action 3')

        commit("setLogin", payload);
        console.log('here')
        resolve();
      } catch (error) {

        console.error(error)
        reject()
      }
    });
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      axios.defaults.headers.common.Authorization = null;
      resolve(commit("setLogout"));
    });
  },
  handleCustomer({ commit }, payload) {
    return new Promise((resolve, reject) => {
      try {
        commit("setCustomer", payload);
        resolve();
      } catch (error) {
        reject();
      }
    });
  },
};

export default actions;
