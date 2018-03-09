<template>
  <div>
    <div class="message-list">
      <transition-group name="fade">
        <message v-for="message of messages"
                 :key="message.id"
                 :title="message.title"
                 :message="message.message"
                 :type="message.type"
                 @remove="remove(message.id)"/>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Message from './Message';
import store from '../../store';
import { mapState } from 'vuex';

export default {
  name: 'message-list',
  components: {
    Message
  },
  computed: {
    ...mapState(['messages'])
  },
  methods: {
    remove(id) {
      store.commit('removeMessage', id);
    }
  },
}
</script>

<style lang="scss">
.message-list {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  width: 20rem;
}

@media(max-width: 768px) {
  .message-list {
    width: calc(100% - 2rem);
  }
}
</style>
