import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    user: null,
    dialog: false,
    textoSnack: '',
    colorSnack: '',
    modelSnack: false
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    },
    setToken: (state, payload) => {
      state.token = payload;
    },
    setOcupado: (state, payload) => {
      state.dialog = payload;
    },
    setSnack: (state, payload) => {
      state.textoSnack = payload.textoSnack;
      state.colorSnack = payload.colorSnack;
      state.modelSnack = payload.modelSnack;
    },
  },
  actions: {
    signIn: ({commit}, payload) => {
      commit('setUser', payload.usuarioDB);
      commit('setToken', payload.token);
    },
    signOut: ({commit}) => {
      commit('setUser', null);
      commit('setToken', null);
    },
    ocupado: ({commit}, payload) => {
      commit('setOcupado', payload);
    },
    handleSnack: ({commit}, payload) => {
      commit('setSnack', payload);
    }
  },
  getters: {
    user: state => state.user,
    token: state => state.token,
    dialog: state => state.dialog,
    textoSnack: state => state.textoSnack,
    colorSnack: state => state.colorSnack,
    modelSnack: state => state.modelSnack
  }
});
