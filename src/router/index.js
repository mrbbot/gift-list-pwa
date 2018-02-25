import Vue from 'vue'
import Router from 'vue-router'
import Landing from '../pages/Landing'
import Main from '../pages/Main'

// noinspection JSUnresolvedFunction
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/login',
      name: 'landing-auth',
      component: Landing
    },
    {
      path: '/app',
      name: 'main',
      component: Main
    }
  ]
})
