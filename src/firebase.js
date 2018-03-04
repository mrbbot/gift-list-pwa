import firebase from 'firebase'
import router from './router';
import store from './store';

export const GOOGLE_PROVIDER = 'google.com';
export const FACEBOOK_PROVIDER = 'facebook.com';
export const TWITTER_PROVIDER = 'twitter.com';

export let auth;

let providers = {};

export function init() {
  // noinspection JSUnresolvedVariable
  firebase.initializeApp(process.env.FIREBASE_CONFIG);
  auth = firebase.auth();

  providers[GOOGLE_PROVIDER] = new firebase.auth.GoogleAuthProvider();
  providers[FACEBOOK_PROVIDER] = new firebase.auth.FacebookAuthProvider();
  providers[FACEBOOK_PROVIDER].addScope('email');
  providers[TWITTER_PROVIDER] = new firebase.auth.TwitterAuthProvider();

  auth.onAuthStateChanged(function(user) {
    store.commit('user/changeUser', user);

    if(router.currentRoute.name.startsWith('landing') || router.currentRoute.name.startsWith('app')) {
      if (user) {
        console.log('onAuthStateChanged: Signed in: ' + user.email);

        if(router.currentRoute.name.startsWith('landing')) {
          router.push('/app/');
        }
      } else {
        console.log('onAuthStateChanged: Signed out');
        if (router.currentRoute.name.startsWith('app')) {
          router.push('/');
        }
      }
    }
  });
}

export function getProviderForProviderId(providerId) {
  return providers[providerId];
}

export function getProviderNameForProviderId(providerId) {
  let name = providerId.substring(0, providerId.indexOf('.'));
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function signIn(providerId) {
  // noinspection JSIgnoredPromiseFromCall
  auth.signInWithRedirect(providers[providerId]);
}

export function signOut() {
  auth.signOut();
}

window.requestToken = function() {
  firebase.auth().currentUser.getIdToken(false).then(function(idToken) {
    console.log(idToken);
  }).catch(function(error) {
    console.error(error);
  });
};
