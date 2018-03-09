<template>
  <div class="page is-friends">
    <section class="section">
      <div class="container">
        <h1 class="title">Friends</h1>
        <friend-list :removable="true"/>
        <div class="navbar-item">Add Friend</div>
        <div class="navbar-item is-add-friend-item">
          <div class="field has-addons">
            <div class="control is-expanded">
              <input v-model="email" class="input is-fullwidth" :class="emailInputClasses" type="text" placeholder="E-mail">
            </div>
            <div class="control">
              <a class="button" :disabled="!emailValid" @click="addFriend">Add</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<!--suppress JSIgnoredPromiseFromCall -->
<script>
import FriendList from '../components/FriendList'
import store from '../store';

const emailRegularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  name: 'friends',
  components: {
    FriendList
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
      if(this.emailValid) {
        console.log(this.email);
        store.dispatch('friends/addFriend', this.email);
        this.email = '';
      }
    }
  },
}
</script>

<style lang="scss">
.page.is-friends {
  .container {
    max-width: 400px;
  }

  .is-add-friend-item {
    padding-top: 0;

    .field {
      width: 100%;
    }
  }
}
</style>
