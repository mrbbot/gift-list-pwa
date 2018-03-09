import Vue from 'vue'
import Vuex from 'vuex'

import { immutableDelete, immutablePush } from "./immutable";

import user from './user';
import friends from './friends';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeTasks: 0,
    messageCount: 0,
    messages: []
  },
  mutations: {
    startTask(state) {
      state.activeTasks++;
    },
    finishTask(state) {
      state.activeTasks--;
    },
    reset(state) {
      state.friends.current = [];
      state.friends.requests = [];
    },
    addMessage(state, message) {
      state.messages = immutablePush(state.messages, message);
      state.messageCount++;
    },
    removeMessage(state, id) {
      let index = state.messages.findIndex(m => m.id === id);
      if(index !== -1)
        state.messages = immutableDelete(state.messages, index);
    }
  },
  getters: {
    loading(state) {
      return state.activeTasks > 0 || !state.user.userLoaded;
    }
  },
  actions: {
    addMessage({ commit, state }, message) {
      const id = state.messageCount;
      message.id = id;
      commit('addMessage', message);
      setTimeout(() => {
        commit('removeMessage', id);
      }, 5000);
    }
  },
  modules: {
    user,
    friends
  }
});
