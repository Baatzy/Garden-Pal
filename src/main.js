// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import hello from './components/Hello';
import hello2 from './components/Hello2';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  { path: '/hello', alias: '/', component: hello },
  { path: '/hello2', component: hello2 }
];

// Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
