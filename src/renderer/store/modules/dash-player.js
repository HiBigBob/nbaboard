import stats from '../../api/stats';
import * as types from '../mutation-types';

// initial state
const state = {
  all: {
    headers: [],
    values: [],
  },
};

// getters
const getters = {
  allDashPlayer: state => state.all,
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
