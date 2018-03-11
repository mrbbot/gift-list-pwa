<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <h1 class="title">{{name}}</h1>
        <div class="tile is-ancestor can-wrap">
          <div class="tile is-parent is-4">
            <div class="tile is-child">
              <gift-card
                name="Thing"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, consequuntur."
                url="https://google.co.uk"
                image-url="https://images-na.ssl-images-amazon.com/images/I/51mCRRX2wqL._SL1200_.jpg"
                :claim="testClaimed"
              />
            </div>
          </div>
          <div class="tile is-parent is-4">
            <div class="tile is-child">
              <gift-card
                name="Item"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, consequuntur."
                url="https://google.co.uk"
                image-url="https://via.placeholder.com/200x100?text=Item"
                :claim="testUnclaimed"
                :yours="true"
              />
            </div>
          </div>
          <div class="tile is-parent is-4">
            <div class="tile is-child">
              <gift-card
                name="Part"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, consequuntur."
                url="https://google.co.uk"
                image-url="https://via.placeholder.com/500x300?text=Part"
                :claim="testClaimed"
                :yours="true"
              />
            </div>
          </div>
          <div class="tile is-parent is-4">
            <div class="tile is-child">
              <gift-card
                name="That"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, consequuntur."
                url=""
                :claim="testUnclaimed"
              />
            </div>
          </div>
        </div>
        <button class="button" @click="giftModalShown = true">Add Gift</button>
        <transition name="fade">
          <gift-modal v-if="giftModalShown" :gift="giftModalGift" @close="giftModalShown = false"/>
        </transition>
      </div>
    </section>
  </div>
</template>

<!--suppress JSUnresolvedVariable -->
<script>
import GiftCard from './GiftCard';
import GiftModal from './GiftModal';

export default {
  name: 'list',
  components: {
    GiftCard,
    GiftModal
  },
  data() {
    return {
      testClaimed: {
        state: 1,
        user: "5rF4G0zHzlPbAyH8rmvkdsFijMd2",
        name: "Brendan Coll",
        photo: "https://lh5.googleusercontent.com/-mOX5jEmh7Hc/AAAAAAAAAAI/AAAAAAAAABU/HBgCiaEU2Ww/photo.jpg"
      },
      testUnclaimed: {
        state: 0
      },
      giftModalShown: true,
      giftModalGift: {
        id: -1,
        name: '',
        description: '',
        url: '',
        imageUrl: ''
      }
    }
  },
  computed: {
    name() {
      return this.$route.params.id;
    }
  },
}
</script>

<style>

</style>
