// noinspection JSUnusedGlobalSymbols
export default {
  namespaced: true,
  state: {
    user: {},
    userLoaded: false
  },
  mutations: {
    updateUser(state, user) {
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
