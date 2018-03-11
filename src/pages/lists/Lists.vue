<template>
  <div class="page is-lists">
    <section class="section">
      <div class="container">
        <transition name="fade">
          <lists-master v-if="isMaster" :title="title" :uid="uid" :lists="masterLists" :yours="yours"/>
          <lists-detail v-else :title="title" :uid="uid" :list="detailList" :yours="yours"/>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
  import ListsMaster from './master/ListsMaster';
  import ListsDetail from './detail/ListsDetail';
  import SpinningLogo from '../../components/SpinningLogo';
  import store from '../../store';
  import {mapState} from 'vuex';

  export default {
    name: 'lists',
    components: {
      ListsMaster,
      ListsDetail,
      SpinningLogo
    },
    computed: {
      ...mapState('lists', ['lists']),
      ...mapState('friends', ['current']),
      ...mapState('user', ['user']),
      uid() {
        // noinspection JSUnresolvedVariable
        return this.$route.params.uid;
      },
      id() {
        // noinspection JSUnresolvedVariable
        return parseInt(this.$route.params.id);
      },
      isMaster() {
        return !this.id;
      },
      masterLists() {
        return (this.lists[this.uid] || {lists: []}).lists;
      },
      detailList() {
        return this.masterLists.find(l => l.id === this.id) || {
          id: -1,
          name: 'Unknown'
        };
      },
      yours() {
        return this.uid === this.user.uid;
      },
      title() {
        let name = this.yours ? 'Your' :
          (this.current.find(f => f.friend === this.uid) || {name: 'Unknown'}).name.split(' ')[0] + '\'s';
        return this.isMaster ? name + ' Lists' :
          name + ' ' + this.detailList.name + (this.detailList.name.toLowerCase().endsWith('list') ? '' : ' List');
      }
    },
    beforeRouteUpdate(toRoute, fromRoute, next) {
      store.dispatch('lists/getLists', toRoute.params.uid);
      next();
    },
    mounted() {
      store.dispatch('lists/getLists', this.uid);
    }
  }
</script>

<style>

</style>
