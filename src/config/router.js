import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/pages/login/Login';
import Home from '@/pages/home/Home';
import Ranking from '@/pages/ranking/Ranking';
import Messages from '@/pages/messages/Messages';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { title: 'Login' }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { title: 'Home' }
    },
    {
      path: '/ranking',
      name: 'Ranking',
      component: Ranking,
      meta: { title: 'Ranking' }
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages,
      meta: { title: 'Messages' }
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    }
    return { x: 0, y: 0 };
  }
});

export default router;
