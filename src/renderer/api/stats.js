import Vue from 'vue';

export default {
  getDashPlayer() {
    return new Promise((resolve, reject) => {
      Vue.http.get('/player', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }).then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
    });
  },
};
