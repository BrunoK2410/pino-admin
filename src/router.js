import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../src/pages/LoginPage.vue";
import ListDogsPage from "./pages/list/ListDogsPage.vue";
import ListCatsPage from "./pages/list/ListCatsPage.vue";
import ListNewsPage from "./pages/list/ListNewsPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: {
      requiresUnauth: true,
    },
  },
  {
    path: "/dogs",
    name: "Dogs",
    component: ListDogsPage,
    meta: {
      requiresAuth: true,
      plural: "Psi",
    },
  },
  {
    path: "/cats",
    name: "Cats",
    component: ListCatsPage,
    meta: {
      requiresAuth: true,
      plural: "Mačke",
    },
  },
  {
    path: "/news",
    name: "News",
    component: ListNewsPage,
    meta: {
      requiresAuth: true,
      plural: "Novosti",
    },
  },
  { path: "/:notFound(.*)", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else if (to.meta.requiresUnauth && token) {
    next("/dogs");
  } else {
    next();
  }
});

export default router;
