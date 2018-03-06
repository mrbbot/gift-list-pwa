<template>
  <div>
    <router-link to="/app/lists/brendan" class="navbar-item">
      <friend name="Brendan Coll" email="mrbbot@gmail.com" photo="http://via.placeholder.com/112x112?text=B" :removable="removable"/>
    </router-link>
    <router-link to="/app/lists/rose" class="navbar-item">
      <friend name="Rose Coll" email="mrbbot@gmail.com" photo="http://via.placeholder.com/112x112?text=R" :removable="removable"/>
    </router-link>
    <router-link to="/app/lists/jessica" class="navbar-item">
      <friend name="Jessica White" email="mrbbot@gmail.com" photo="http://via.placeholder.com/112x112?text=J" :removable="removable"/>
    </router-link>
    <div class="navbar-item has-text-grey-light">
      <friend name="Kate White" email="Friend request sent" photo="http://via.placeholder.com/112x112?text=K" :removable="removable"/>
    </div>

    <hr class="navbar-divider">
    <div class="navbar-item">Friend Requests</div>

    <div class="navbar-item">
      <friend name="Tony Coll" email="mrbbot@gmail.com" photo="http://via.placeholder.com/112x112?text=T" :request="true" :removable="removable"/>
    </div>
  </div>
</template>

<script>
import Friend from './Friend'

export default {
  name: 'friend-list',
  props: {
    removable: {
      type: Boolean,
      default: false
    },
  },
  components: {
    Friend
  }
}
</script>

<style>

</style>
