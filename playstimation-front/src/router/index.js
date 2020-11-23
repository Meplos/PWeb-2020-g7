import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "../components/HelloWorld";
import GameInfo from "../components/GameInfo";

Vue.use(VueRouter);

const routes = [
  {
    path: "/game/:game",
    name: "Search",
    component: GameInfo,
  },
  {
    path: "/",
    name: "Home",
    component: HelloWorld,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
