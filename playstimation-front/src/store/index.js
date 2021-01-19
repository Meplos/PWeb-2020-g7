import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: null,
    refresh: null,
    refreshTimer: null,
  },
  mutations: {
    CONNEXION(state, token) {
      state.token = token;
    },
    DECONNEXION(state) {
      state.token = null;
      state.refresh = null;

      clearInterval(state.refreshTimer);
    },
    SET_REFRESH(state, refresh) {
      state.refresh = refresh;
    },
  },
  actions: {
    refreshToken() {
      this.state.refreshTimer = setInterval(() => {
        console.log(this.state.refresh);
        if (this.state.refresh && this.state.token) {
          axios
            .post(`http://localhost:3000/refreshToken`, {
              refreshToken: this.state.refresh,
            })
            .then((res) => {
              this.commit("CONNEXION", res.data.token);
            });
        } else clearInterval(this.state.refreshTimer);
      }, 5000);
    },
  },
});

export default store;
