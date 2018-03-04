<template>
  <div id="app">
    <navbar/>
    <main>
      <transition :name="transitionName">
        <router-view v-if="userLoaded"/>
        <div class="page is-centered" v-else>
          <spinning-logo :size="125" :ease="false"/>
        </div>
      </transition>
    </main>
  </div>
</template>

<script>
import Navbar from './components/navbar/Navbar';
import SpinningLogo from './components/SpinningLogo';
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Navbar,
    SpinningLogo
  },
  data() {
    return {
      transitionName: 'fade'
    }
  },
  computed: {
    ...mapState('user', ['user', 'userLoaded']),
  },
  watch: {
    '$route' (toRoute, fromRoute) {
      const toDepth = toRoute.path.split('/').length;
      const fromDepth = fromRoute.path.split('/').length;
      // const toLength = toRoute.path.length;
      // const fromLength = fromRoute.path.length;

      this.transitionName = this.userLoaded ?
        (toDepth === fromDepth ?
          /*(toLength < fromLength ? 'slide-right' : 'slide-left') :*/
          'fade' :
          (toDepth < fromDepth ? 'slide-right' : 'slide-left'))
        : 'fade';

      console.log(this.transitionName);
    }
  }
}
</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="scss">
$primary: #E91E63;
$dark: #1A1A1A;
$navbar-background-color: transparent;

@import '~bulma';

.spacer {
  flex-grow: 1;
}

.page {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;

  transition: all .5s cubic-bezier(.55,0,.1,1);

  &.is-centered {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &:not(.is-centered) {
    top: $navbar-height;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}

.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}

img.profile-picture {
  border-radius: 50%;
}

.navbar-link .tag.is-rounded {
  margin: 0.1rem 0 0 0.5rem
}
</style>
