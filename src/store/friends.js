import * as friendsService from "./services/friends";
import { immutablePush, immutableDelete } from "./immutable";

// noinspection JSUnusedGlobalSymbols
export default {
  namespaced: true,
  state: {
    current: [],
    requests: []
  },
  mutations: {
    updateFriends(state, friends) {
      state.current = friends.current;
      state.requests = friends.requests;
    },
    addFriend(state, friend) {
      state.current = immutablePush(state.current, friend);
    },
    acceptFriend(state, id) {
      let index = state.requests.findIndex(f => f.id === id);
      let friend = state.requests[index];
      friend.state = true;
      state.requests = immutableDelete(state.requests, index);
      state.current = immutablePush(state.current, friend);
    },
    rejectFriend(state, id) {
      let index = state.requests.findIndex(f => f.id === id);
      state.requests = immutableDelete(state.requests, index);
    },
    removeFriend(state, id) {
      let index = state.current.findIndex(f => f.id === id);
      state.current = immutableDelete(state.current, index);
    }
  },
  actions: {
    updateFriends({ commit, dispatch }) {
      commit('startTask', null, { root: true });
      friendsService.getFriends().then(result => {
        if(result.ok) {
          commit('updateFriends', result.body);
        } else {
          dispatch('addMessage', {
            title: "Error",
            message: `An unexpected error occurred whilst getting your friends!`,
            type: "danger"
          }, { root: true });
        }
        commit('finishTask', null, { root: true });
      });
    },
    addFriend({ commit, dispatch }, email) {
      friendsService.addFriend(email).then(result => {
        if(result.ok) {
          commit('addFriend', result.body);
          dispatch('addMessage', {
            title: "Success",
            message: `A friend request has been sent to <b>${email}</b>`,
            type: "success"
          }, { root: true });
        } else {
          if(result.status === 401) {
            dispatch('addMessage', {
              title: "Error",
              message: `You are already friends with <b>${email}</b>`,
              type: "warning"
            }, { root: true });
          } else if(result.status === 404) {
            dispatch('addMessage', {
              title: "Not Found",
              message: `No user could be found with that email address!`,
              type: "danger"
            }, { root: true });
          } else {
            dispatch('addMessage', {
              title: "Error",
              message: `An unexpected error occurred whilst sending the request!`,
              type: "danger"
            }, { root: true });
          }
        }
      });
    },
    acceptFriend({ commit, dispatch }, id) {
      friendsService.acceptFriend(id).then(result => {
        if(result.ok) {
          commit('acceptFriend', id);
        } else {
          dispatch('addMessage', {
            title: "Error",
            message: `An unexpected error occurred whilst accepting the request!`,
            type: "danger"
          }, { root: true });
        }
      });
    },
    rejectFriend({ commit, dispatch }, id) {
      friendsService.rejectFriend(id).then(result => {
        if(result.ok) {
          commit('rejectFriend', id);
        } else {
          dispatch('addMessage', {
            title: "Error",
            message: `An unexpected error occurred whilst rejecting the request!`,
            type: "danger"
          }, { root: true });
        }
      });
    },
    removeFriend({ commit, dispatch }, id) {
      friendsService.removeFriend(id).then(result => {
        if(result.ok) {
          commit('removeFriend', id);
          dispatch('addMessage', {
            title: "Success",
            message: `You are no longer friends`,
            type: "success"
          }, { root: true });
        } else {
          dispatch('addMessage', {
            title: "Error",
            message: `An unexpected error occurred whilst removing your friend!`,
            type: "danger"
          }, { root: true });
        }
      });
    }
  }
};
