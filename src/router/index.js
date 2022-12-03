import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/board",
  },

  {
    path: "/board",
    name: "board",
    component: () =>
      import(/* webpackChunkName: "Board" */ "../views/Board.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
