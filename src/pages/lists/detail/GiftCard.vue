<template>
  <div class="card is-gift">
    <a v-if="yours" class="delete" @click="$emit('remove')"></a>
    <div v-if="imageUrl" class="card-image" :style="{backgroundImage: 'url(\'' + imageUrl + '\')'}"></div>
    <div class="card-content">
      <div class="content">
        <h2>{{name}}</h2>
        <p>{{description}}</p>
      </div>
    </div>
    <footer class="card-footer">
      <a v-if="url" :href="url" target="_blank" class="card-footer-item">View</a>
      <template v-if="!yours">
        <a v-if="canClaim" @click="$emit('claim')" class="card-footer-item">{{claim.state ? 'Unclaim' : 'Claim'}}</a>
        <div v-else class="card-footer-item">Claimed by {{claimName}}</div>
      </template>
      <a v-if="yours" @click="$emit('edit')" class="card-footer-item">Edit</a>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'gift-card',
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    url: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    claim: {
      type: Object,
      required: true
    },
    yours: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('user', ['user']),
    canClaim() {
      return !this.yours && (this.claim.state ? this.user.uid === this.claim.user : true);
    },
    claimName() {
      return this.claim.name.split(' ')[0];
    }
  },
}
</script>

<style lang="scss">
.card.is-gift {
  .delete {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 5;
  }

  //noinspection CssOptimizeSimilarProperties
  .card-image {
    height: 15rem;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
