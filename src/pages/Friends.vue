<template>
  <div class="page is-friends">
    <section class="section">
      <div class="container">
        <friend-list :removable="true"/>
        <hr class="navbar-divider">

        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input is-fullwidth" type="text" placeholder="E-mail">
          </div>
          <div class="control">
            <a class="button is-success">
              Add
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import FriendList from '../components/FriendList'

export default {
  name: 'friends',
  components: {
    FriendList
  }
}
</script>

<style lang="scss">
.page.is-friends {
  .container {
    max-width: 400px;
  }
}
</style>
