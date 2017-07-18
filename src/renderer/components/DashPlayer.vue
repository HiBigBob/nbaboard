<template>
  <div>
    <Table size="small" :columns="players.headers" :data ="players.values"> </Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="players.values.length" :current="currentPage" @on-change="changePage"></Page>
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
      currentPage: 'currentPage',
    }),
    methods: mapActions([
      'changePage',
    ]),
    created() {
      this.$store.dispatch('getAllDashPlayer');
    },
  };
</script>
