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

// initial state
const state = {
  all: {
    headers: [],
    values: [],
  },
  page: 1,
  sort: null,
};

// getters
const getters = {
  allDashPlayer: state => state.all,
  dashPlayer: state => {
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
      headers: state.all.headers,
      values: values.slice(begin, end),
    };
  },
  dashPlayerLength: state => state.all.values.length,
  currentPage: state => state.page,
  sort: state => state.sort,
};

// actions
const actions = {
  getAllDashPlayer({ commit }) {
    stats.getDashPlayer((players) => {
      commit(types.RECEIVE_DASH_PLAYER, { players });
    });
  },
};

// mutations
const mutations = {
  [types.RECEIVE_DASH_PLAYER](state, { players }) {
    state.all = players;
  },

  [types.CHANGE_PAGE_DASH_PLAYER](state, { currentPage }) {
    state.page = currentPage;
  },

  [types.SORT_ORDER_DASH_PLAYER](state, { sort }) {
    state.sort = sort;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
