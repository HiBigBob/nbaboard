import stats from '../../api/stats';
import * as types from '../mutation-types';

// initial state
const state = {
  all: {
    headers: [],
    values: [],
  },
  currentDashPlayer: {
    headers: [],
    values: [],
  },
  page: 1,
};

// getters
const getters = {
  allDashPlayer: state => state.all,
  dashPlayer: state => state.currentDashPlayer,
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
    state.currentDashPlayer = players;
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
