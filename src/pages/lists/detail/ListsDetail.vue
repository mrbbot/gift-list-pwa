<template>
  <div class="list">
    <h1 class="title">{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'lists-detail',
  props: {
    title: {
      type: String,
      required: true
    },
  },
}
</script>

<style>

</style>
