<template>
  <div class="page is-centered is-login">
    <article v-if="messageShown" class="message is-warning">
      <div class="message-header">
        <p>Accounts</p>
        <button class="delete" aria-label="delete" @click="messageShown = false"></button>
      </div>
      <div class="message-body">
        You've already signed in using <b>{{linkToProviderName}}</b>. Would you like to link your accounts and be able to sign in with this account as well?
        <div class="field">
          <div class="control">
            <a class="button is-warning is-inverted is-outlined is-small" @click="link">Link</a>
          </div>
        </div>
      </div>
    </article>
    <div class="form">
      <div class="field">
        <div class="control">
          <a class="button" @click="signInGoogle">
          <span class="icon">
            <img src="../assets/google.svg" alt="Google" width="18" height="18">
          </span>
            <span class="spacer"></span>
            <span>Sign in with Google</span>
            <span class="spacer"></span>
          </a>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <a class="button" @click="signInFacebook">
          <span class="icon">
            <img src="../assets/facebook.svg" alt="Google" width="18" height="18">
          </span>
            <span class="spacer"></span>
            <span>Sign in with Facebook</span>
            <span class="spacer"></span>
          </a>
        </div>
      </div>
      <!--<div class="field">
        <div class="control">
          <a class="button" @click="signInTwitter">
          <span class="icon">
            <img src="../assets/twitter.svg" alt="Google" width="18">
          </span>
            <span class="spacer"></span>
            <span>Sign in with Twitter</span>
            <span class="spacer"></span>
          </a>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import * as firebase from '../firebase';

export default {
  name: 'login',
  data() {
    return {
      messageShown: false,
      linkToProvider: {},
      linkToProviderName: '',
      pendingCred: {}
    }
  },
  methods: {
    signInGoogle() {
      firebase.signIn(firebase.GOOGLE_PROVIDER);
    },
    signInFacebook() {
      firebase.signIn(firebase.FACEBOOK_PROVIDER);
    },
    signInTwitter() {
      firebase.signIn(firebase.TWITTER_PROVIDER);
    },
    link() {
      this.messageShown = false;
      firebase.auth.signInWithPopup(this.linkToProvider).then((result) => {
        result.user.linkWithCredential(this.pendingCred);
      });
    }
  },
  mounted() {
    firebase.auth.getRedirectResult().catch((error) => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        this.pendingCred = error.credential;
        firebase.auth.fetchProvidersForEmail(error.email).then((providers) => {
          this.linkToProvider = firebase.getProviderForProviderId(providers[0]);
          this.linkToProviderName = firebase.getProviderNameForProviderId(providers[0]);
          this.messageShown = true;
        });
      }
    });
  }
}
</script>

<style lang="scss">
.is-login {
  .message {
    max-width: 350px;

    .button {
      margin-top: 1em;
    }
  }

  .form .button {
    width: 100%;
    min-width: 250px;
  }
}
</style>
