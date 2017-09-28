import Vue from 'vue';
import * as types from './mutation-types';

export const login = ({ commit }, creds) => {
  commit(types.LOGIN);
  return Vue.http.post('/login', creds).then((response) => {
    localStorage.setItem('token', response.data.token);
    commit(types.LOGIN_SUCCESS);
  }).catch(() => {
    commit(types.LOGIN_FAIL);
  });
};

export const logout = ({ commit }) => {
  localStorage.removeItem('token');
  commit(types.LOGOUT);
};
