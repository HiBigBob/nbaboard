import _ from 'lodash';

import stats from '../../api/stats';
import * as types from '../mutation-types';

const sortByType = (a, b, order) => {
  if (typeof a === 'number') {
    return order > 0 ? a - b : b - a;
  }

  a = a.split(' ')[0];
  b = b.split(' ')[0];
  if (a < b) {
    return (-1 * order);
  }
  if (a > b) {
    return (1 * order);
  }
  return 0;
};

const transformFilters = (filters) => {
  const value = JSON.parse(JSON.stringify(filters));
  Object.keys(value).map((current) => {
    value[current] = {
      items: value[current],
      results: [],
      selected: [],
      query: ''
    };

    return value[current];
  });

  return value;
};

const transformSameLevel = (players) => {
  const values = JSON.parse(JSON.stringify(players.values));
  values.map((value) => {
    return Object.keys(value).map((current) => {
      if (typeof value[current] === 'object') {
        value[current] = value[current].name;
      } else {
        value[current] = value[current];
      }

      return value[current];
    });
  });

  return {
    headers: players.headers,
    values
  };
};

const transformHeader = (all) => {
  const tmp = all.headers.map((header) => {
    if (header.key === 'first_name' || header.key === 'last_name') {
      header.fixed = 'left';
    }
    return header;
  });

  return tmp;
};

const transformWithFilters = (values, filters) => {
  const tmpArray = [];
  const hasFilters = Object.keys(filters)
      .filter(key => filters[key].selected.length);

  if (hasFilters.length) {
    values.forEach((value) => {
      hasFilters.forEach((key) => {
        const selected = _.concat(filters[key].selected);
        const element = value[key].toLowerCase();
        if (selected.findIndex((item) => {
          return element === item.toLowerCase();
        }) > -1) {
          tmpArray.push(value);
        }
      });
    });
  }

  return tmpArray.length ? tmpArray : values;
};

const transformCurrent = (state) => {
  let values = _.cloneDeep(state.all.values);
  values = transformWithFilters(values, state.filters);
  if (state.sort !== null) {
    values = values.sort((a, b) => {
      const order = state.sort.order === 'desc' ? -1 : 1;
      return sortByType(a[state.sort.key], b[state.sort.key], order);
    });
  }
  const begin = (state.page - 1) * 10;
  const end = begin + 10;
  return {
    headers: transformHeader(state.all),
    values: values.slice(begin, end),
    count: values.length,
  };
};

// initial state
const state = {
  filters: {},
  all: {
    headers: [],
    values: [],
  },
  current: {
    headers: [{ title: ' ' }],
    values: [],
  },
  page: 1,
  sort: null,
};

// getters
const getters = {
  allDashPlayer: state => state.all,
  dashPlayer: state => state.current,
  filters: state => state.filters,
  dashPlayerLength: state => state.current.count,
  currentPage: state => state.page,
  sort: state => state.sort,
};

// actions
const actions = {
  getAllDashPlayer({ commit }) {
    stats.getDashPlayer().then((players) => {
      commit(types.RECEIVE_DASH_PLAYER, { players });
    });
  },
  getFilters({ commit }) {
    stats.getFilters().then((filters) => {
      console.log('filters', filters);
      commit(types.RECEIVE_FILTERS, { filters });
    });
  },
  changePage({ commit }, page) {
    commit(types.CHANGE_PAGE_DASH_PLAYER, {
      currentPage: page
    });
  },
  sortOrder({ commit }, sort) {
    commit(types.SORT_ORDER_DASH_PLAYER, {
      sort,
    });
  },
  filterAction({ commit }, params) {
    commit(types.RECEIVE_FILTERS_QUERY, {
      params
    });
  },
  filterChange({ commit }, params) {
    commit(types.RECEIVE_FILTERS_CHANGE, {
      params
    });
  },
};

// mutations
const mutations = {
  [types.RECEIVE_DASH_PLAYER](state, { players }) {
    state.origin = transformSameLevel(players);
    state.all = transformSameLevel(players);
    state.current = transformCurrent(state);
    console.log('state ', state);
  },

  [types.RECEIVE_FILTERS](state, { filters }) {
    state.filters = transformFilters(filters);
  },

  [types.CHANGE_PAGE_DASH_PLAYER](state, { currentPage }) {
    state.page = currentPage;
    state.current = transformCurrent(state);
  },

  [types.SORT_ORDER_DASH_PLAYER](state, { sort }) {
    state.sort = sort;
    state.current = transformCurrent(state);
  },

  [types.RECEIVE_FILTERS_QUERY](state, { params }) {
    let results = [];
    if (params.query && params.query.length > 0) {
      results = state.filters[params.key].items.filter((item) => {
        return item.name.toLowerCase().indexOf(params.query.toLowerCase()) > -1;
      });
    }
    state.filters[params.key].query = params.query;
    state.filters[params.key].results = results;
  },

  [types.RECEIVE_FILTERS_CHANGE](state, { params }) {
    state.filters[params.key].selected = params.selected;
    state.current = transformCurrent(state);
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
