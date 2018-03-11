<template>
  <div class="list">
    <h1 class="title">{{title}}</h1>
    <div class="tile is-ancestor can-wrap">
      <div v-for="list of lists" :key="list.id" class="tile is-parent is-4">
        <div class="tile is-child">
          <!--suppress JSUnresolvedVariable -->
          <list-card
            :id="list.id"
            :name="list.name"
            :description="list.description"
            :claimed="claimedItems(list.gifts)"
            :total="list.gifts.length"
            :yours="yours"
            @edit="openEditListModal(list)"
            @remove="openRemoveListModal(list.id)"
          />
        </div>
      </div>
    </div>
    <button v-if="yours" class="button" @click="openCreateListModal">Create List</button>
    <transition name="modal">
      <list-modal v-if="listModalShown"
                  :list="listModalList"
                  @close="listModalShown = false"
                  @create="createList"
                  @edit="editList"/>
    </transition>
    <transition name="modal">
      <remove-modal v-if="removeModalShown"
                  type="List"
                  :id="removeModalId"
                  @close="removeModalShown = false"
                  @remove="removeList"/>
    </transition>
  </div>
</template>

<script>
import ListCard from './ListCard'
import ListModal from './ListModal'
import RemoveModal from '../../../components/RemoveModal'

import store from '../../../store'

export default {
  name: 'lists-master',
  components: {
    ListCard,
    ListModal,
    RemoveModal
  },
  props: {
    title: {
      type: String,
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    lists: {
      type: Array,
      required: true
    },
    yours: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      listModalShown: false,
      listModalList: {},
      removeModalShown: false,
      removeModalId: 0
    }
  },
  methods: {
    claimedItems(gifts) {
      let claimed = 0;
      for(let gift of gifts)
        claimed += gift.claim.state;
      return claimed;
    },
    openCreateListModal() {
      this.listModalList = {
        id: -1,
        name: '',
        description: ''
      };
      this.listModalShown = true;
    },
    openEditListModal(list) {
      this.listModalList = {
        id: list.id,
        name: list.name,
        description: list.description
      };
      this.listModalShown = true;
    },
    openRemoveListModal(id) {
      this.removeModalId = id;
      this.removeModalShown = true;
    },
    createList(list) {
      this.listModalShown = false;
      store.dispatch('lists/createList', {uid: this.uid, list: list});
    },
    editList(list) {
      this.listModalShown = false;
      store.dispatch('lists/editList', {uid: this.uid, list: list});
    },
    removeList(id) {
      this.removeModalShown = false;
      store.dispatch('lists/removeList', {uid: this.uid, id: id});
    }
  },
}
</script>

<style>

</style>
