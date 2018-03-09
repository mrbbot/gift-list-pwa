<template>
  <div>
    <template v-if="current.length > 0">
      <template v-for="friend of current">
        <!--suppress JSUnresolvedVariable -->
        <router-link v-if="friend.state" :to="'/app/lists/' + friend.friend + '/'" class="navbar-item">
          <friend :friend="friend" :removable="removable" @remove="remove"/>
        </router-link>
        <div v-else class="navbar-item has-text-grey-light">
          <friend :friend="friend" message="Friend request sent" :removable="removable" @remove="remove"/>
        </div>
      </template>
      <hr class="navbar-divider">
    </template>
    <template v-if="requests.length > 0">
      <div class="navbar-item">Friend Requests</div>
      <div v-for="friend of requests" class="navbar-item">
        <friend :friend="friend" :request="true" @accept="accept" @reject="reject"/>
      </div>
      <hr class="navbar-divider">
    </template>
  </div>
</template>

<script>
import Friend from './Friend'
import { mapState } from 'vuex'
import store from '../store'

export default {
  name: 'friend-list',
  components: {
    Friend
  },
  props: {
    removable: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    ...mapState('friends', ['current', 'requests'])
  },
  methods: {
    accept(id) {
      store.dispatch('friends/acceptFriend', id);
    },
    reject(id) {
      store.dispatch('friends/rejectFriend', id);
    },
    remove(id) {
      store.dispatch('friends/removeFriend', id);
    }
  },
}
</script>

<style>

</style>
