<template>
  <div>
    <nav class="navbar is-fixed-top is-white" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link :to="signedIn ? '/app/' : '/'" class="navbar-item"><img src="../assets/logo.png" alt="Gift List"></router-link>

        <div v-if="signedIn" class="navbar-burger" @click="isActive = !isActive" :class="{'is-active': isActive}">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div v-if="signedIn" class="navbar-menu" :class="{'is-active': isActive}">
        <div class="navbar-start">
          <router-link to="/app/lists/" class="navbar-item">My Lists</router-link>
          <div class="navbar-item has-dropdown is-hoverable is-hidden-touch">
            <router-link to="/app/friends/" class="navbar-link">Friends<span class="tag is-rounded is-warning">1</span></router-link>
            <div class="navbar-dropdown is-boxed">
              <friend-list/>
              <hr class="navbar-divider">
              <router-link to="/app/friends/" class="navbar-item">Manage Friends</router-link>
            </div>
          </div>
          <router-link to="/app/friends/" class="navbar-link is-hidden-desktop">Friends<span class="tag is-rounded is-warning">1</span></router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable is-hidden-touch">
            <a class="navbar-link">
              <img class="profile-picture" :src="user.photoURL">
            </a>
            <div class="navbar-dropdown is-boxed is-right">
              <a class="navbar-item" @click="signOut">
                Sign out
              </a>
            </div>
          </div>
          <a class="navbar-item is-hidden-desktop" @click="signOut">
            Sign out
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import FriendList from './FriendList'
import { mapState, mapGetters } from 'vuex'
import { signOut } from '../firebase'

export default {
  name: 'navbar',
  components: {
    FriendList,
  },
  data() {
    return {
      isActive: false,
      addFriendModalShown: false
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapGetters('user', ['signedIn'])
  },
  methods: {
    signOut() {
      signOut();
    }
  },
}
</script>

<style>

</style>
