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

export const test = () => {};
