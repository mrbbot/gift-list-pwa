import Vue from 'vue';

import router from './router';
import store from './store';

import * as firebase from './firebase';

import fontawesome from '@fortawesome/fontawesome';
import fontawesomeSolid from '@fortawesome/fontawesome-free-solid';
import fontawesomeBrands from '@fortawesome/fontawesome-free-brands';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

import App from './App';

firebase.init();

Vue.config.productionTip = false;

fontawesome.library.add(fontawesomeSolid, fontawesomeBrands);
// noinspection JSUnresolvedFunction
Vue.component('font-awesome-icon', FontAwesomeIcon);

// noinspection JSUnusedGlobalSymbols
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
