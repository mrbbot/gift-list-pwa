import * as listsService from "./services/lists";
import * as giftsService from "./services/gifts";
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
      state.lists[uid].lists = immutablePush(state.lists[uid].lists || [], list);
    },
    editList(state, {uid, list}) {
      let index = state.lists[uid].lists.findIndex(l => l.id === list.id);
      state.lists[uid].lists[index].name = list.name;
      state.lists[uid].lists[index].description = list.description;
    },
    removeList(state, {uid, id}) {
      let index = state.lists[uid].lists.findIndex(l => l.id === id);
      state.lists[uid].lists = immutableDelete(state.lists[uid].lists, index);
    },
    addGift(state, {uid, listId, gift}) {
      let index = state.lists[uid].lists.findIndex(l => l.id === listId);
      state.lists[uid].lists[index].gifts = immutablePush(state.lists[uid].lists[index].gifts, gift);
    },
    editGift(state, {uid, listId, gift}) {
      let listIndex = state.lists[uid].lists.findIndex(l => l.id === listId);
      let giftIndex = state.lists[uid].lists[listIndex].gifts.findIndex(g => g.id === gift.id);
      state.lists[uid].lists[listIndex].gifts[giftIndex].name = gift.name;
      state.lists[uid].lists[listIndex].gifts[giftIndex].description = gift.description;
      state.lists[uid].lists[listIndex].gifts[giftIndex].url = gift.url;
      state.lists[uid].lists[listIndex].gifts[giftIndex].imageUrl = gift.imageUrl;
    },
    claimGift(state, {uid, listId, giftId, claim}) {
      let listIndex = state.lists[uid].lists.findIndex(l => l.id === listId);
      let giftIndex = state.lists[uid].lists[listIndex].gifts.findIndex(g => g.id === giftId);
      state.lists[uid].lists[listIndex].gifts[giftIndex].claim = claim;
    },
    removeGift(state, {uid, listId, giftId}) {
      let listIndex = state.lists[uid].lists.findIndex(l => l.id === listId);
      let giftIndex = state.lists[uid].lists[listIndex].gifts.findIndex(g => g.id === giftId);
      state.lists[uid].lists[listIndex].gifts = immutableDelete(
        state.lists[uid].lists[listIndex].gifts, giftIndex
      );
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
    },

    createGift({commit, dispatch, state}, {uid, listId, gift}) {
      commit('startTask', null, {root: true});
      giftsService.createGift(listId, gift.name, gift.description, gift.url, gift.imageUrl).then(res => {
        if(res.ok) {
          commit('addGift', {
            uid: uid,
            listId: listId,
            gift: res.body
          });
        } else {
          dispatch('addMessage', {
            title: "Error",
            message: `An unexpected error occurred whilst adding the gift!`,
            type: "danger"
          }, {root: true});
        }
        commit('finishTask', null, {root: true});
      });
    },
    editGift({commit, dispatch, state}, {uid, listId, gift}) {
      commit('startTask', null, {root: true});
      giftsService.editGift(listId, gift.id, gift.name, gift.description, gift.url, gift.imageUrl).then(res => {
        if(res.ok) {
          commit('editGift', {
            uid: uid,
            listId: listId,
            gift: res.body
          });
        } else {
          dispatch('addMessage', {
            title: "Error",
            message: `An unexpected error occurred whilst editing the gift!`,
            type: "danger"
          }, {root: true});
        }
        commit('finishTask', null, {root: true});
      });
    },
    claimGift({commit, dispatch, state}, {uid, listId, gift}) {
      commit('startTask', null, {root: true});
      let newClaimState = gift.claim.state === 0 ? 1 : 0;
      giftsService.claimGift(listId, gift.id, newClaimState).then(res => {
        if(res.ok) {
          commit('claimGift', {
            uid: uid,
            listId: listId,
            giftId: gift.id,
            claim: res.body
          });
        } else {
          if(res.status === 401) {
            dispatch('addMessage', {
              title: "Just Claimed",
              message: `The gift has just been claimed! Please refresh your browser.`,
              type: "warning"
            }, {root: true});
          } else {
            dispatch('addMessage', {
              title: "Error",
              message: `An unexpected error occurred whilst claiming the gift! It may have been deleted. Please refresh your browser.`,
              type: "danger"
            }, {root: true});
          }
        }
        commit('finishTask', null, {root: true});
      });
    },
    removeGift({commit, dispatch, state}, {uid, listId, giftId}) {
      commit('startTask', null, {root: true});
      giftsService.removeGift(listId, giftId).then(res => {
        if(res.ok) {
          commit('removeGift', {
            uid: uid,
            listId: listId,
            giftId: giftId
          });
        } else {
          dispatch('addMessage', {
            title: "Error",
            message: `An unexpected error occurred whilst removing the gift!`,
            type: "danger"
          }, {root: true});
        }
        commit('finishTask', null, {root: true});
      });
    },
  }
}
