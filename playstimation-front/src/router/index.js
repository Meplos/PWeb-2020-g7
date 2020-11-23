import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "../components/HelloWorld";
import GameInfo from "../components/GameInfo";
import NotFound from "../components/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/game/:game",
    name: "Search",
    component: GameInfo,
  },
  {
    path: "/NotFound",
    name: "NotFound",
    component: NotFound,
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
