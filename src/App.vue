<template>
  <div id="app">
    <navbar/>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'app',
  components: {
    'navbar': Navbar
  }
}
</script>

<style lang="scss">
$primary: #E91E63;
$dark: #1A1A1A;
$navbar-background-color: transparent;

@import '~bulma';

.spacer {
  flex-grow: 1;
}
</style>
