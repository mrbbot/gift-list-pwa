<template>
  <div class="nav">
    <nav class="navbar" :class="{'is-light': !isLanding}" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item" @click.native="logoClick"><img src="../assets/logo.png" alt="Gift List"></router-link>

        <div class="navbar-burger" @click="isActive = !isActive" :class="{'is-active': isActive}">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu" :class="{'is-active': isActive}">
        <div class="navbar-start">
          <!--<a class="navbar-item">My Lists</a>-->
          <!--<a class="navbar-item">Friends</a>-->
        </div>

        <div class="navbar-end">
          <!--<a class="navbar-item">Logout</a>-->
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: 'navbar',
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    isLanding() {
      return this.$route.name.startsWith('landing');
    }
  },
  methods: {
    logoClick() {
      eventBus.$emit('logoClick');
    }
  }
}
</script>

<style>

</style>
