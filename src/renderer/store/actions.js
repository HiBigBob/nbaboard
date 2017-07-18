import * as types from './mutation-types';

export const changePage = ({ commit }, page) => {
  commit(types.CHANGE_PAGE_DASH_PLAYER, {
    currentPage: page
  });
};

export const test = () => {};
