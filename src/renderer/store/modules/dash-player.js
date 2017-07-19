import stats from '../../api/stats';
import * as types from '../mutation-types';

// initial state
const state = {
  all: {
    headers: [],
    values: [],
  },
  page: 1,
};

// getters
const getters = {
  allDashPlayer: state => state.all,
  dashPlayer: state => {
    const begin = state.page - 1;
    const end = begin + 10;
    const tmp = {
      headers: state.all.headers,
      values: state.all.values.slice(begin, end),
    };
    return tmp;
  },
  dashPlayerLength: state => state.all.values.length,
  currentPage: state => state.page,
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
