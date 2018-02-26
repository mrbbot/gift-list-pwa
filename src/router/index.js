import Vue from 'vue'
import Router from 'vue-router'
import store from "../store";

import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Legal from '../pages/Legal'
import Dashboard from '../pages/Dashboard'

// noinspection JSUnresolvedFunction
Vue.use(Router);

// noinspection JSUnusedGlobalSymbols
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/login',
      name: 'landing-login',
      component: Login,
      beforeEnter: (toRoute, fromRoute, next) => {
        if(store.state.auth.userLoaded && store.state.auth.user) {
          next('/app/');
          return;
        }
        next();
      }
    },
    {
      path: '/legal',
      name: 'legal',
      component: Legal
    },
    {
      path: '/app/',
      name: 'app-dashboard',
      component: Dashboard
    }
  ]
});

router.beforeEach((toRoute, fromRoute, next) => {
  if(toRoute.matched.length === 0) {
    next('/');
    return;
  }
  if(toRoute.name.startsWith('app') && store.state.auth.userLoaded && !store.state.auth.user) {
    next('/login');
    return;
  }
  next();
});

export default router;
