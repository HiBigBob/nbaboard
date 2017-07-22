<template>
  <div>
    <Table size="small" border no-data-text="Loading" :columns="players.headers" :data ="players.values" @on-sort-change="sortOrder"> </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="playersLength" :current="currentPage" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions,
  } from 'vuex';

  export default {
    computed: mapGetters({
      players: 'dashPlayer',
      playersLength: 'dashPlayerLength',
      currentPage: 'currentPage',
      sort: 'sort',
    }),
    methods: mapActions([
      'changePage',
      'sortOrder',
    ]),
    created() {
      this.$store.dispatch('getAllDashPlayer');
    },
  };
</script>
