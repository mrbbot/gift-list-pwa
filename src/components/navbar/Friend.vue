<template>
  <article class="media friend">
    <figure class="media-left">
      <div class="icon is-medium">
        <img class="profile-picture" :src="photo" style="margin-top: 0.6rem">
      </div>
    </figure>
    <div class="media-content">
      <p><b>{{name}}</b></p>
      <p>{{email}}</p>
      <p v-if="request" style="margin-top: 4px">
        <button class="button is-success is-outlined is-small" @click="accept">Accept</button>
        <button class="button is-danger is-outlined is-small" @click="reject">Reject</button>
      </p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'friend',
  props: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: true
    },
    request: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    accept() {
      this.$emit('accept');
    },
    reject() {
      this.$emit('reject');
    }
  },
}
</script>

<style>

</style>
