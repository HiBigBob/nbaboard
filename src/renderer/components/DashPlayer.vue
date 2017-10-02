<template>
  <div>
    <div style="margin-bottom: 10px;">
      <Select v-if="filters.position && filters.position.results" :value="filterPositionSelect" placeholder="Poste" style="width:200px" clearable filterable multiple not-found-text="Loading" remote :remote-method="filterPosition" @on-change="filterPositionChange">
        <Option v-for="position in filters.position.results" :value="position.name" :key="position.name">{{ position.name }}</Option>
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
        filterPositionSelect: [],
      };
    },
    computed: mapGetters({
      filters: 'filters',
      players: 'dashPlayer',
      playersLength: 'dashPlayerLength',
      currentPage: 'currentPage',
      sort: 'sort',
    }),
    methods: {
      ...mapActions([
        'changePage',
        'sortOrder',
        'filterAction',
        'filterChange',
      ]),
      filterPosition(query) {
        this.$store.dispatch('filterAction', { key: 'position', query });
      },
      filterPositionChange(query) {
        const selected = query.length > 0 ? query : [];
        this.$store.dispatch('filterChange', { key: 'position', selected });
      }
    },
    created() {
      this.$store.dispatch('getAllDashPlayer');
      this.$store.dispatch('getFilters');
    },
  };
</script>
