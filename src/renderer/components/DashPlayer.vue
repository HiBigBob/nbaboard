<template>
  <div>
    <div style="margin: 10px;">
      <Select v-model="filtersPosition" style="width:200px">
        <Option v-for="position in filters.position" :value="position.name" :key="position.name">{{ position.name }}</Option>
      </Select>
    </div>
    <Table size="small" border no-data-text="Loading" :columns="players.headers" :data="players.values" @on-sort-change="sortOrder"> </Table>
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
    data() {
      return {
        filtersPosition: '',
      };
    },
    computed: mapGetters({
      filters: 'filters',
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
      this.$store.dispatch('getFilters');
    },
  };
</script>
