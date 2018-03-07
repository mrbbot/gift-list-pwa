<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <h1 class="title">{{name}} Lists</h1>
        <div class="tile is-ancestor can-wrap">
          <div class="tile is-parent is-4">
            <div class="tile is-child">
              <list-card
                name="Birthday"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, consequuntur."
                :claimed="7"
                :total="10"
              />
            </div>
          </div>
          <div class="tile is-parent is-4">
            <div class="tile is-child">
              <list-card
                name="Christmas"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, consequuntur."
                :claimed="3"
                :total="5"
              />
            </div>
          </div>
          <div class="tile is-parent is-4">
            <div class="tile is-child">
              <list-card
                name="Easter"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, consequuntur."
                :claimed="1"
                :total="1"
              />
            </div>
          </div>
          <div class="tile is-parent is-4">
            <div class="tile is-child">
              <list-card
                name="Birthday"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, consequuntur."
                :yours="true"
              />
            </div>
          </div>
          <div class="tile is-parent is-4">
            <div class="tile is-child">
              <list-card
                name="Christmas"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, consequuntur."
                :yours="true"
              />
            </div>
          </div>
          <div class="tile is-parent is-4">
            <div class="tile is-child">
              <list-card
                name="Easter"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, consequuntur."
                :yours="true"
              />
            </div>
          </div>
        </div>
        <button class="button" @click="listModalShown = true">Create List</button>
        <transition name="fade">
          <list-modal v-if="listModalShown" :list="listModalList" @close="listModalShown = false"/>
        </transition>
      </div>
    </section>
  </div>
</template>

<!--suppress JSUnresolvedVariable -->
<script>
import ListCard from './ListCard';
import ListModal from './ListModal';

export default {
  name: 'lists',
  components: {
    ListCard,
    ListModal
  },
  data() {
    return {
      listModalShown: false,
      listModalList: {
        id: -1,
        name: '',
        description: ''
      }
    }
  },
  computed: {
    name() {
      if(this.$route.params.uid)
        return this.$route.params.uid + '\'s';
      else
        return 'Your';
    }
  },
}
</script>

<style>

</style>
