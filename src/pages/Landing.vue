<template>
  <div class="page-landing">
    <div class="page-landing-info has-text-centered" :class="{'shifted-left': authShown}">
      <spinning-logo :ease="true"/>
      <h1 class="title">Gift List</h1>
      <h2 class="subtitle">Never buy the wrong present again...</h2>
      <button class="button is-primary" @click="login()">Sign in</button>
    </div>
    <div class="page-landing-auth has-text-centered" :class="{'shifted-left': authShown}">
      <auth/>
    </div>
  </div>
</template>

<script>
import SpinningLogo from '../components/SpinningLogo';
import Auth from '../components/Auth';
import { eventBus } from "../main";

export default {
  name: 'landing',
  components: {
    'spinning-logo': SpinningLogo,
    'auth': Auth
  },
  data() {
    return {
      authShown: false
    }
  },
  beforeMount() {
    this.authShown = this.$route.name === 'landing-auth';
    eventBus.$on('logoClick', () => this.authShown = false);
  },
  methods: {
    login() {
      this.$router.push('/login');
      this.authShown = true
    }
  },
}
</script>

<style lang="scss">
.page-landing {
  overflow: hidden;

  .page-landing-info, .page-landing-auth {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: -1;
    transition: all 0.5s ease-in-out;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .page-landing-info {
    left: 0;
    right: 0;

    &.shifted-left {
      left: -100%;
      right: 100%;
    }

    .title {
      margin: 1rem 0 0 0;
    }

    .subtitle {
      margin: 0.5rem 0 1.5rem 0;
      max-width: 200px;
    }
  }

  .page-landing-auth {
    left: 100%;
    right: -100%;

    &.shifted-left {
      left: 0;
      right: 0;
    }
  }
}
</style>
