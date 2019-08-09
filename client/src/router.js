import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Deudores from './views/Deudores.vue'
import Dash from './views/Dash.vue'
import Login from './views/Login.vue'
import Logup from './views/Logup.vue'
import Home from './views/Home.vue'
import Grupos from './views/Grupos.vue'

import axios from 'axios'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/deudores',
      name: 'deudores',
      component: Deudores,
      meta: {
        autenticado: true
      }
    },
    {
      path: '/ndeudor',
      name: 'ndeudor',
      component: () => import(/* webpackChunkName: "about" */ './views/Deudor.vue'),
      meta: {
        autenticado: true
      }
    },
    {
      path: '/dashboard',
      name: 'inicio',
      component: Dash,
      meta: {
        autenticado: true
      }
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
    },
    {
      path: '/grupos',
      name: 'grupos',
      component: Grupos,
      meta: {
        autenticado: true,
        administrador:true
      }
    }
  ]
})

router.beforeEach( async (to, from, next) => {


  if(to.matched.some(record => record.meta.autenticado)) {
    let itemStorage = {
      token: localStorage.getItem('token')
    }
    try {
      let response = await axios.post('http://localhost:3000/middle/verify', itemStorage);
      
      if(response) {
        if(!response.data.flag) {
          store.dispatch('signOut');
          localStorage.removeItem('token');
          next({ name: 'signin' });
        }
        else {
          console.log();
          
          let payloadSignIn = {
            usuarioDB: response.data.usuario,
            token: localStorage.getItem('token')
          };
          store.dispatch('signIn', payloadSignIn);
          next();
        }
      }
      else {
        next({ name: 'login' });
      }

    } catch (error) {
      console.log('error bobo');
      store.dispatch('signOut');
      this.$router.push("/signin");
      localStorage.removeItem('token');
    }

  }
  else {
    next()
  }

  if(to.matched.some(record => record.meta.administrador)) {
    let user = store.state.user.usuario;
    console.log(user);
    if (user.role == "ADMIN") {
      next();
    }
    else{
      next({path: '/'});
    }
  }
  else {
    next()
  }

});

export default router