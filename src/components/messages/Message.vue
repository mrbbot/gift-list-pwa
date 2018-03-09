<template>
  <article class="message" :class="classes">
    <div class="message-header">
      <p>{{title}}</p>
      <button class="delete" aria-label="delete" @click="$emit('remove')"></button>
    </div>
    <div class="message-body" v-html="message"></div>
  </article>
</template>

<script>
export default {
  name: 'message',
  props: {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'none'
    }
  },
  computed: {
    classes() {
      let classes = [];
      if(this.type === 'info') classes.push('is-info');
      if(this.type === 'success') classes.push('is-success');
      if(this.type === 'warning') classes.push('is-warning');
      if(this.type === 'danger') classes.push('is-danger');
      return classes;
    }
  },
}
</script>

<style>

</style>
