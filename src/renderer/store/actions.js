import * as types from './mutation-types';

export const changePage = ({ commit }, page) => {
  commit(types.CHANGE_PAGE_DASH_PLAYER, {
    currentPage: page
  });
};

export const sortOrder = ({ commit }, sort) => {
  commit(types.SORT_ORDER_DASH_PLAYER, {
    sort,
  });
};

export const login = ({ commit }, creds) => {
  commit(types.LOGIN);
  return new Promise(resolve => {
    setTimeout(() => {
      localStorage.setItem('token', 'JWT');
      commit(types.LOGIN_SUCCESS);
      resolve();
    }, 1000);
  });
};

export const logout = ({ commit }) => {
  localStorage.removeItem('token');
  commit(types.LOGOUT);
};
