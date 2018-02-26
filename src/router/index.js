import Vue from 'vue'
import Router from 'vue-router'
import Landing from '../pages/Landing'
import Login from '../pages/Login'

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
      name: 'landing-login',
      component: Login
    }
  ]
})
