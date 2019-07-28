import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    user: null 
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    },
    setToken: (state, payload) => {
      state.token = payload;
    }
  },
  actions: {
    signIn: ({commit}, payload) => {
      commit('setUser', payload.usuarioDB);
      commit('setToken', payload.token);
    },
    signOut: ({commit}) => {
      commit('setUser', null);
      commit('setToken', null);
    }
  },
  getters: {
    user: state => state.user,
    token: state => state.token
  }
});
