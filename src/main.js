import Vue from 'vue';

import router from './router';
import store from './store';

import * as firebase from './firebase';

import App from './App';

firebase.init();

Vue.config.productionTip = false;

// noinspection JSUnusedGlobalSymbols
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
