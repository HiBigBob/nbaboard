import stats from '../../api/stats';
import * as types from '../mutation-types';

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
        a = a[state.sort.key].split(' ')[0];
        b = b[state.sort.key].split(' ')[0];
        let order = 1;
        if (state.sort.order === 'desc') {
          order = -1;
        }
        if (a < b) {
          return (-1 * order);
        }
        if (a > b) {
          return (1 * order);
        }
        return 0;
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
