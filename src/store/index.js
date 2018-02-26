import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// noinspection JSUnusedGlobalSymbols
const auth = {
  namespaced: true,
  state: {
    user: {},
    userLoaded: false
  },
  mutations: {
    changeAuthState(state, user) {
      state.user = user;
      state.userLoaded = true;
    }
  }
};

export default new Vuex.Store({
  modules: {
    auth
  }
});
