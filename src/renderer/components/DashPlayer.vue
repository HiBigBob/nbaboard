<template>
  <Table size="small" :columns="players.headers" :data ="players.values"> </Table>
</template>

<script>
  import {
    mapGetters,
    mapActions,
  } from 'vuex';

  export default {
    computed: mapGetters({
      players: 'allDashPlayer',
    }),
    methods: mapActions([
      'addToCart',
    ]),
    created() {
      this.$store.dispatch('getAllDashPlayer');
    },
  };
</script>
