import firebase from 'firebase'

export function init() {
  // noinspection JSUnresolvedVariable
  firebase.initializeApp(process.env.FIREBASE_CONFIG);
}
