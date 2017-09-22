import Vue from 'vue';
import axios from 'axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import router from './router';
import store from './store';
Vue.use(iView);
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common = {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
};
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  template: '<router-view></router-view>',
}).$mount('#app');
