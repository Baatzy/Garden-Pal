// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import axios from 'axios';

import hello from './components/Hello';
import hello2 from './components/Hello2';
import signup from './components/signup';
import login from './components/login';
import friends from './components/friends'

let isLoggedIn = false;



Vue.use(VueRouter);
Vue.use(VueResource);


const routes = [
  { path: '/landing', alias: '/', component: hello, meta: { requiresAuth: false } },
  { path: '/profile', component: hello2, meta: { requiresAuth: true } },
  { path: '/signup', component: signup, meta: { requiresAuth: false } },
  { path: '/login', component: login, meta: { requiresAuth: false } },
  { path: '/friends', component: friends, meta: { requiresAuth: true } },

];

// Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes
});



router.beforeEach((to, from, next) => {
  axios.get('/api/token')
  .then((res) => {
    isLoggedIn = res.data
  })
  .then(() => {
    if(to.meta.requiresAuth){
      if (isLoggedIn) {
        next()
      } else {
        next({ path: '/'})
      }
    }

    if (!to.meta.requiresAuth) {
      if(!isLoggedIn) {
        next()
      } else {
        next({ path: '/profile'})
      }
    }

  })
  .catch((err) => {
    console.error(err);
  })




})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
