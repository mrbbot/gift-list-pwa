<template>
  <article class="media friend">
    <figure class="media-left">
      <div class="icon is-medium">
        <img class="profile-picture" :src="friend.photo">
      </div>
    </figure>
    <div class="media-content">
      <p><b>{{friend.name}}</b></p>
      <p>{{message || friend.email}}</p>
      <p class="request-buttons" v-if="request">
        <button class="button is-success is-outlined is-small" @click="accept">Accept</button>
        <button class="button is-danger is-outlined is-small" @click="reject">Reject</button>
      </p>
    </div>
    <div v-if="removable" class="media-right">
      <button class="delete" @click="remove"></button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'friend',
  props: {
    friend: {
      type: Object,
      required: true
    },
    message: {
      type: String,
      default: ''
    },
    request: {
      type: Boolean,
      default: false
    },
    removable: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    accept() {
      this.$emit('accept', this.friend.id);
    },
    reject() {
      this.$emit('reject', this.friend.id);
    },
    remove(e) {
      e.preventDefault();
      this.$emit('remove', this.friend.id);
    }
  },
}
</script>

<style lang="scss">
.media.friend {
  width: 100%;

  .profile-picture {
    margin-top: 0.6rem;
  }

  .media-content p {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .media-right .delete {
    margin-top: 0.8rem;
  }

  .request-buttons {
    margin-top: 4px;
  }
}
</style>
