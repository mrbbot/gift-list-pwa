<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Remove {{type}}</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <p>Are you sure you want to remove this {{type.toLowerCase()}}?</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="$emit('remove', id)">Remove</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'remove-modal',
  props: {
    type: {
      type: String,
      default: 'thing'
    },
    id: {
      type: Number,
      default: -1
    }
  },
}
</script>

<style>

</style>
