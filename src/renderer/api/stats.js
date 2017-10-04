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
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
        }
        reject(error);
      });
    });
  },

  getFilters() {
    return new Promise((resolve, reject) => {
      Vue.http.get('/player/filter', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }).then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
        }
        reject(error);
      });
    });
  },
};
