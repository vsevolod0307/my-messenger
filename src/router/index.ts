/* eslint-disable */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/SignIn.vue")
  },
  {
    path: "/registration",
    name: "registration",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/profile/:id",
    name: "profile",
    component: () => import("../views/Profile.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
