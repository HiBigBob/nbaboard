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
  const filterDraftYear = all.values.map((value) => {
    return {
      label: value.draft_year,
      value: value.draft_year,
    };
  }).filter((item, pos, arr) => {
    return arr.findIndex((elem) => {
      return elem.value === item.value;
    }) === pos;
  });
  console.log('draft ', filterDraftYear);

  const tmp = all.headers.map((header) => {
    if (header.key === 'draft_year') {
      header.filterMultiple = false;
      header.filters = filterDraftYear;
      header.filterMethod = (value, row) => {
        return row.draft_year.indexOf(value) > -1;
      };
    }
    return header;
  });

  return tmp;
};

const transformCurrent = (state) => {
  let values = state.all.values;
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
  };
};

// initial state
const state = {
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
  dashPlayerLength: state => state.all.values.length,
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
};

// mutations
const mutations = {
  [types.RECEIVE_DASH_PLAYER](state, { players }) {
    state.all = transformSameLevel(players);
    state.current = transformCurrent(state);
    console.log('state ', state);
  },

  [types.CHANGE_PAGE_DASH_PLAYER](state, { currentPage }) {
    state.page = currentPage;
    state.current = transformCurrent(state);
  },

  [types.SORT_ORDER_DASH_PLAYER](state, { sort }) {
    state.sort = sort;
    state.current = transformCurrent(state);
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
