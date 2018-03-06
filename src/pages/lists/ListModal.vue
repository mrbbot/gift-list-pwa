<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{creating ? 'Create' : 'Edit'}} List</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" v-model="list.name" type="text" placeholder="Name">
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea class="textarea" v-model="list.description" placeholder="Description"></textarea>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-info" @click="close" :disabled="!valid">{{creating ? 'Create' : 'Save'}}</button>
        <button class="button" @click="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list-modal',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  computed: {
    creating() {
      return this.list.id === -1;
    },
    valid() {
      return this.list.name !== '';
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  },
}
</script>

<style>

</style>
