import Vue from 'vue';

export default {
  getDashPlayer(cb) {
    Vue.http.get('/player', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((response) => {
      cb(response.data);
    })
    .catch(() => {
    });
  },
};
