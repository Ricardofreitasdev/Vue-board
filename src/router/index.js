import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
  },
  {
    path: "/board",
    name: "board",
    component: () =>
      import(/* webpackChunkName: "Board" */ "../views/Board.vue"),
  },
];

function isAuthenticated() {
  const hasToken = JSON.parse(localStorage.getItem("token"));
  return hasToken ? true : false;
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !isAuthenticated()) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
