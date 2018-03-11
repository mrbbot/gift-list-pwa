<template>
  <div class="list">
    <h1 class="title">{{title}}</h1>
    <div class="tile is-ancestor can-wrap">
      <div v-for="gift of list.gifts" :key="gift.id" class="tile is-parent is-4">
        <div class="tile is-child">
          <gift-card
            :id="gift.id"
            :name="gift.name"
            :description="gift.description"
            :url="gift.url"
            :imageUrl="gift.imageUrl"
            :claim="gift.claim"
            :yours="yours"
            @edit="openEditGiftModal(gift)"
            @claim="claimGift(gift)"
            @remove="openRemoveGiftModal(gift.id)"
          />
        </div>
      </div>
    </div>
    <button v-if="yours" class="button" @click="openAddGiftModal">Add Gift</button>
    <transition name="modal">
      <gift-modal v-if="giftModalShown"
                  :gift="giftModalGift"
                  @close="giftModalShown = false"
                  @create="createGift"
                  @edit="editGift"/>
    </transition>
    <transition name="modal">
      <remove-modal v-if="removeModalShown"
                    type="Gift"
                    :id="removeModalId"
                    @close="removeModalShown = false"
                    @remove="removeGift"/>
    </transition>
  </div>
</template>

<script>
import GiftCard from './GiftCard';
import GiftModal from './GiftModal'
import RemoveModal from '../../../components/RemoveModal'

import store from '../../../store'

export default {
  name: 'lists-detail',
  components: {
    GiftCard,
    GiftModal,
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
    list: {
      type: Object,
      required: true
    },
    yours: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      giftModalShown: false,
      giftModalGift: {},
      removeModalShown: false,
      removeModalId: 0
    }
  },
  methods: {
    openAddGiftModal() {
      this.giftModalGift = {
        id: -1,
        name: '',
        description: '',
        url: '',
        imageUrl: ''
      };
      this.giftModalShown = true;
    },
    openEditGiftModal(gift) {
      this.giftModalGift = {
        id: gift.id,
        name: gift.name,
        description: gift.description,
        url: gift.url,
        imageUrl: gift.imageUrl
      };
      this.giftModalShown = true;
    },
    openRemoveGiftModal(id) {
      this.removeModalId = id;
      this.removeModalShown = true;
    },
    createGift(gift) {
      this.giftModalShown = false;
      store.dispatch('lists/createGift', {uid: this.uid, listId: this.list.id, gift: gift});
    },
    editGift(gift) {
      this.giftModalShown = false;
      store.dispatch('lists/editGift', {uid: this.uid, listId: this.list.id, gift: gift});
    },
    claimGift(gift) {
      this.giftModalShown = false;
      store.dispatch('lists/claimGift', {uid: this.uid, listId: this.list.id, gift: gift});
    },
    removeGift(id) {
      this.removeModalShown = false;
      store.dispatch('lists/removeGift', {uid: this.uid, listId: this.list.id, giftId: id});
    }
  },
}
</script>

<style>

</style>
