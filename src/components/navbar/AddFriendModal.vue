<template>
  <div class="modal" :class="{'is-active': shown}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Friend</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input v-model="email" class="input" :class="emailInputClasses" type="email" placeholder="Email">
            <span class="icon is-small is-left">
              <font-awesome-icon icon="envelope"/>
            </span>
          </p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-info" @click="addFriend" :disabled="!emailValid">Add Friend</button>
        <button class="button" @click="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
// noinspection RegExpRedundantEscape
const emailRegularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  name: 'add-friend-modal',
  props: {
    shown: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      email: ''
    }
  },
  computed: {
    emailInputClasses() {
      return {
        'is-danger': this.email !== '' && !this.emailValid,
        'is-success': this.emailValid
      }
    },
    emailValid() {
      return this.email !== '' && emailRegularExpression.test(this.email.toLowerCase());
    }
  },
  methods: {
    addFriend() {

    },
    close() {
      this.$emit('close');
    }
  },
}
</script>

<style>

</style>
