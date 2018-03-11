<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{creating ? 'Add' : 'Edit'}} Gift</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" v-model="gift.name" type="text" placeholder="Name">
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea class="textarea" v-model="gift.description" placeholder="Description"></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">URL</label>
          <div class="control">
            <input class="input" v-model="gift.url" type="text" placeholder="URL">
          </div>
        </div>
        <div class="field">
          <label class="label">Image URL</label>
          <div class="control">
            <input class="input" v-model="gift.imageUrl" type="text" placeholder="Image URL">
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-info" @click="ok" :disabled="!valid">{{creating ? 'Add' : 'Save'}}</button>
        <button class="button" @click="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gift-modal',
  props: {
    gift: {
      type: Object,
      required: true
    }
  },
  computed: {
    creating() {
      return this.gift.id === -1;
    },
    valid() {
      return this.gift.name !== '';
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    ok() {
      if(this.creating) {
        this.$emit('create', this.gift);
      } else {
        this.$emit('edit', this.gift);
      }
    }
  },
}
</script>

<style>

</style>
