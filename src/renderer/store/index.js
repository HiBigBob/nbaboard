import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import dashPlayer from './modules/dash-player';
import * as types from './mutation-types';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token')
  },
  actions,
  getters,
  mutations: {
    [types.LOGIN](state) {
      state.pending = true;
    },
    [types.LOGIN_SUCCESS](state) {
      state.isLoggedIn = true;
      state.pending = false;
    },
    [types.LOGIN_FAIL](state) {
      state.isLoggedIn = false;
    },
    [types.LOGOUT](state) {
      state.isLoggedIn = false;
    }
  },
  modules: {
    dashPlayer,
  },
  strict: debug,
});
