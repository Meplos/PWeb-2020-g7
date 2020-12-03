import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {
    CONNEXION(state, token) {
      state.token = token;
    },
    DECONNEXION(state) {
      state.token = null;
    },
  },
});

export default store;
