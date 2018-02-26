<template>
  <div class="page-centered page-landing has-text-centered">
    <spinning-logo :ease="true"/>
    <h1 class="title">Gift List</h1>
    <h2 class="subtitle">Never buy the wrong present again...</h2>
    <router-link to="/login" class="button is-primary">Sign in</router-link>
  </div>
</template>

<script>
import SpinningLogo from '../components/SpinningLogo';

export default {
  name: 'landing',
  components: {
    'spinning-logo': SpinningLogo
  }
}
</script>

<style lang="scss">
.page-landing {
  .title {
    margin: 0.75rem 0 2rem 0;
  }

  .subtitle {
    margin: 2rem 0 1.5rem 0;
    max-width: 200px;
  }
}
</style>
