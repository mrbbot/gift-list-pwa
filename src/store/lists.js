import * as listsService from "./services/lists";
import {immutableDelete, immutablePush} from "./immutable";

const LIST_MAX_AGE = 60000;

// noinspection JSUnusedGlobalSymbols
export default {
  namespaced: true,
  state: {
    lists: {}
  },
  mutations: {
    updateLists(state, { uid, lists }) {
      state.lists[uid] = {
        time: Date.now(),
        lists: lists
      };
    },
    addList(state, {uid, list}) {
      state.lists[uid].lists = immutablePush(state.lists[uid].lists, list);
    },
    editList(state, {uid, list}) {
      let index = state.lists[uid].lists.findIndex(l => l.id === list.id);
      state.lists[uid].lists[index].name = list.name;
      state.lists[uid].lists[index].description = list.description;
    },
    removeList(state, {uid, id}) {
      let index = state.lists[uid].lists.findIndex(l => l.id === id);
      state.lists[uid].lists = immutableDelete(state.lists[uid].lists, index);
    }
  },
  actions: {
    getLists({commit, dispatch, state}, uid) {
      if (!(uid in state.lists) || ((Date.now() - state.lists[uid].time) > LIST_MAX_AGE)) {
        commit('startTask', null, {root: true});
        listsService.getLists(uid).then(res => {
          if (res.ok) {
            commit('updateLists', {
              uid: uid,
              lists: res.body
            });
          } else {
            dispatch('addMessage', {
              title: "Error",
              message: `An unexpected error occurred whilst getting the user's lists!`,
              type: "danger"
            }, {root: true});
            commit('updateLists', {
              uid: uid,
              lists: []
            });
          }
          commit('finishTask', null, {root: true});
        });
      }
    },
    createList({commit, dispatch, state}, {uid, list}) {
      commit('startTask', null, {root: true});
      listsService.createList(list.name, list.description).then(res => {
        if(res.ok) {
          commit('addList', {
            uid: uid,
            list: res.body
          });
        } else {
          dispatch('addMessage', {
            title: "Error",
            message: `An unexpected error occurred whilst creating the list!`,
            type: "danger"
          }, {root: true});
        }
        commit('finishTask', null, {root: true});
      });
    },
    editList({commit, dispatch, state}, {uid, list}) {
      commit('startTask', null, {root: true});
      listsService.editList(list.id, list.name, list.description).then(res => {
        if(res.ok) {
          commit('editList', {
            uid: uid,
            list: res.body
          });
        } else {
          dispatch('addMessage', {
            title: "Error",
            message: `An unexpected error occurred whilst editing the list!`,
            type: "danger"
          }, {root: true});
        }
        commit('finishTask', null, {root: true});
      });
    },
    removeList({commit, dispatch, state}, {uid, id}) {
      commit('startTask', null, {root: true});
      listsService.removeList(id).then(res => {
        if(res.ok) {
          commit('removeList', {
            uid: uid,
            id: id
          });
        } else {
          dispatch('addMessage', {
            title: "Error",
            message: `An unexpected error occurred whilst removing the list!`,
            type: "danger"
          }, {root: true});
        }
        commit('finishTask', null, {root: true});
      });

    }
  }
}
