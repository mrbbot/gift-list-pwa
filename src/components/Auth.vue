<template>
  <div class="auth">
    <div class="field">
      <div class="control has-icons-left has-icons-right">
        <input class="input" name="email" type="email" placeholder="Email">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="envelope" />
        </span>
      </div>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" name="password" type="password" placeholder="Password">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="lock" />
        </span>
      </p>
    </div>
    <div class="field">
      <div class="columns is-mobile">
        <div class="column control">
          <button class="button">
            Register
          </button>
        </div>
        <div class="column control">
          <button class="button is-info is-outlined">
            Sign in
          </button>
        </div>
      </div>

    </div>
    <hr>
    <div class="field">
      <div class="control">
        <a class="button">
          <span class="icon">
            <img src="../assets/google.svg" alt="Google" width="18" height="18">
          </span>
          <span class="spacer"></span>
          <span>Sign in with Google</span>
          <span class="spacer"></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'auth',
}
</script>

<style lang="scss">
.auth {
  .button {
    width: 100%;
  }

  .column.control {
    &:first-child {
      padding-right: 6px;
    }

    &:last-child {
      padding-left: 6px;
    }
  }
}
</style>
