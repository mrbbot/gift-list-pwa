<template>
  <div id="app">
    <navbar/>
    <main>
      <transition :name="transitionName">
        <router-view/>
      </transition>
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'app',
  components: {
    'navbar': Navbar
  },
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    '$route' (toRoute, fromRoute) {
      const toDepth = toRoute.path.split('/').length;
      const fromDepth = fromRoute.path.split('/').length;
      const toLength = toRoute.path.length;
      const fromLength = fromRoute.path.length;

      this.transitionName = toDepth === fromDepth ?
        (toLength < fromLength ? 'slide-right' : 'slide-left') :
        (toDepth < fromDepth ? 'slide-right' : 'slide-left');
      console.log(this.transitionName);
    }
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

.page-centered {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  transition: all .5s cubic-bezier(.55,0,.1,1);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}

.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
