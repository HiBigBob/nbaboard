import axios from 'axios';

export default {
  getDashPlayer(cb) {
    const URL = 'http://localhost:9081/leaguedashplayerstats';
    axios.get(URL).then((response) => {
      console.log(response.data);
      cb(response.data);
    })
    .catch(() => {
    });
  },
};
