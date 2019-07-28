import Vue from 'vue'
import Router from 'vue-router'
import Deudores from './views/Deudores.vue'
import Dash from './views/Dash.vue'
import Login from './views/Login.vue'
import Logup from './views/Logup.vue'
import Home from './views/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/deudores',
      name: 'deudores',
      component: Deudores
    },
    {
      path: '/ndeudor',
      name: 'ndeudor',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Deudor.vue')
    },
    {
      path: '/dashboard',
      name: 'inicio',
      component: Dash
    },
    {
      path: '/signin',
      name: 'signin',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Logup
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
