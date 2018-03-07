import Vue from 'vue'
import Router from 'vue-router'
import store from "../store";

import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Legal from '../pages/Legal'
import Dashboard from '../pages/Dashboard'
import Friends from '../pages/Friends'
import Lists from '../pages/lists/Lists'
import List from '../pages/lists/detail/List'

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
      path: '/login/',
      name: 'landing-login',
      component: Login,
      beforeEnter: (toRoute, fromRoute, next) => {
        if(store.state.user.userLoaded && store.state.user.user) {
          next('/app/');
          return;
        }
        next();
      }
    },
    {
      path: '/legal/',
      name: 'legal',
      component: Legal
    },
    {
      path: '/app/',
      name: 'app-dashboard',
      component: Dashboard
    },
    {
      path: '/app/friends/',
      name: 'app-friends',
      component: Friends
    },
    {
      path: '/app/lists/',
      name: 'app-lists',
      component: Lists
    },
    {
      path: '/app/lists/:uid',
      name: 'app-lists-user',
      component: Lists
    },
    {
      path: '/app/lists/detail/:id',
      name: 'app-list-detail',
      component: List
    }
  ]
});

router.beforeEach((toRoute, fromRoute, next) => {
  if(toRoute.matched.length === 0) {
    next('/');
    return;
  }
  if(toRoute.name.startsWith('app') && store.state.user.userLoaded && !store.state.user.user) {
    next('/login/');
    return;
  }
  next();
});

export default router;
