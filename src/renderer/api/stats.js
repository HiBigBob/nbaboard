import Vue from 'vue';

export default {
  getDashPlayer(cb) {
    Vue.http.get('/player').then((response) => {
      cb(response.data);
    })
    .catch(() => {
    });
  },
};
