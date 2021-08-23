import axios from "axios";

const actions = {
  sign_in({ commit }, payload) {
    return new Promise((resolve,reject) => {
      try {
       
        axios.defaults.headers.common.Authorization = payload.token;
       

        window.sessionStorage.setItem("token", payload.token);
       

        commit("setLogin", payload);
       
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
