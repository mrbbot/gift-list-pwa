<template>
  <div>
    <nav class="navbar is-white" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"><img src="../../assets/logo.png" alt="Gift List"></router-link>

        <div v-if="signedIn" class="navbar-burger" @click="isActive = !isActive" :class="{'is-active': isActive}">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div v-if="signedIn" class="navbar-menu" :class="{'is-active': isActive}">
        <div class="navbar-start">
          <router-link to="/app/lists/" class="navbar-item">My Lists</router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link to="/app/" class="navbar-link">Friends<span class="tag is-rounded is-warning">1</span></router-link>
            <div class="navbar-dropdown is-boxed">
              <router-link to="/app/lists/brendan" class="navbar-item">
                <friend name="Brendan Coll" email="mrbbot@gmail.com" photo="http://via.placeholder.com/112x112/03A9F4/FFFFFF?text=B"/>
              </router-link>
              <router-link to="/app/lists/rose" class="navbar-item">
                <friend name="Rose Coll" email="mrbbot@gmail.com" photo="http://via.placeholder.com/112x112/FF9800/FFFFFF?text=R"/>
              </router-link>
              <router-link to="/app/lists/jessica" class="navbar-item">
                <friend name="Jessica White" email="mrbbot@gmail.com" photo="http://via.placeholder.com/112x112/009688/FFFFFF?text=J"/>
              </router-link>
              <div class="navbar-item has-text-grey-light">
                <friend name="Kate White" email="Friend request sent" photo="http://via.placeholder.com/112x112/F44336/FFFFFF?text=K"/>
              </div>

              <hr class="navbar-divider">
              <div class="navbar-item">Friend Requests</div>

              <div class="navbar-item">
                <friend name="Tony Coll" email="apc36@cam.ac.uk" photo="http://via.placeholder.com/112x112/673AB7/FFFFFF?text=T" :request="true"/>
              </div>

              <hr class="navbar-divider">
              <a class="navbar-item" @click="addFriendModalShown = true">Add Friend</a>
            </div>
          </div>

        </div>

        <div class="navbar-end">

          <div class="navbar-item has-dropdown is-hoverable is-hidden-mobile">
            <a class="navbar-link">
              <img class="profile-picture" :src="user.photoURL">
            </a>

            <div class="navbar-dropdown is-boxed is-right">
              <a class="navbar-item" @click="signOut">
                Sign out
              </a>
            </div>
          </div>
          <a class="navbar-item is-hidden-tablet" @click="signOut">
            Sign out
          </a>

        </div>
      </div>
    </nav>
    <add-friend-modal :shown="addFriendModalShown" @close="addFriendModalShown = false"/>
  </div>
</template>

<script>
import Friend from './Friend'
import AddFriendModal from './AddFriendModal'
import { mapState, mapGetters } from 'vuex'
import { signOut } from '../../firebase'

export default {
  name: 'navbar',
  components: {
    Friend,
    AddFriendModal
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
