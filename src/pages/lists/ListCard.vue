<template>
  <div class="card is-list">
    <header class="card-header">
      <p class="card-header-title">{{name}}</p>
      <a v-if="yours" class="card-header-icon">
        <span class="delete"></span>
      </a>
    </header>
    <div class="card-content">
      <div class="content">
        <p>{{description}}</p>
        <p v-if="!yours" class="claim-progress">
          <progress class="progress is-primary" :value="claimed" :max="total"></progress>
          <span class="has-text-grey-light">{{claimed}} out of {{total}} gifts claimed</span>
        </p>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">View</a>
      <a v-if="yours" href="#" class="card-footer-item">Edit</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'list-card',
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    yours: {
      type: Boolean,
      default: false
    },
    claimed: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 1
    }
  },
}
</script>

<style lang="scss">
.claim-progress {
  .progress {
    margin-bottom: 0.25rem;
  }

  span {
    font-size: 0.8rem;
  }
}
</style>
