import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import axios from "axios";

axios.defaults.headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
};

Vue.config.productionTip = false;
Vue.prototype.$appName = "Playstimation";

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
