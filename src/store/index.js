import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// noinspection JSUnusedGlobalSymbols
const user = {
  namespaced: true,
  state: {
    user: {},
    userLoaded: false
  },
  mutations: {
    changeUser(state, user) {
      state.user = user;
      state.userLoaded = true;
    }
  },
  getters: {
    signedIn(state) {
      return state.userLoaded && !!state.user;
    }
  }
};

export default new Vuex.Store({
  modules: {
    user
  }
});
