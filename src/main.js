/** @format */

import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

import './assets/main.css';
import './assets/main.scss';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "login" */ './components/table.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () =>
      import(/* webpackChunkName: "login" */ './components/table.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const app = createApp(App);
app.use(router);
app.mount('#app');
