<template>
  <section class="page section">
    <div class="container welcome">
      <h1 class="title">Hello!</h1>
      <p>Welcome to <b>Gift List</b>!<p>
      <p>Create your first list by clicking <b>My Lists</b> above, or click on
        <b>Friends</b> to add a friend and start claiming items from their lists.</p>
      <article class="message is-warning">
        <div class="message-header">
          <p>Warning</p>
        </div>
        <div class="message-body">
          <p>Please note this is an early version of <b>Gift List</b>. It is <i>quite</i> likely that there will be bugs!</p>
          <p>If something breaks or doesn't work correctly, refreshing your browser might help. Otherwise, please contact
            <a href="mailto:me@mrbbot.co.uk">me@mrbbot.co.uk</a></p>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'dashboard'
  }
</script>

<style>
.welcome > p, .message-body > p:not(:last-child) {
  margin-bottom: 1rem;
}
</style>
