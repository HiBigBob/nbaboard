import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: require('@/components/App'),
      children: [
        {
          path: '',
          name: 'index',
          component: require('@/components/DashPlayer')
        },
        {
          path: '/test',
          name: 'test',
          component: require('@/components/TestPlayer')
        }
      ],
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next('/login');
        }

        next();
      }
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/Login'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

export default router;
