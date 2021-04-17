const mutations = {
  setLogin(state, payload) {
    state.name = payload.name;
    state.token = payload.token;
    state.role = payload.role;
    if (payload.permissions) {
      state.permissions = payload.permissions.split(',');
    }
  },
  setLogout(state) {
    state.token = null;
    state.role = null;
    state.name = null;
    state.permissions = null;
  },
  set_user(state, payload) {
    state.user = payload;
  },
  set_category(state, payload) {
    state.category = payload;
  },
  set_subcategory(state, payload) {
    state.subcategory = payload;
  },
  set_product(state, payload) {
    state.product = payload;
  },
  setCustomer(state, payload) {
    state.isCustomer = payload.isCustomer;
    state.isCustomerUpdate = payload.isCustomerUpdate;
    state.customerId = payload.customerId;
  },
};

export default mutations;
