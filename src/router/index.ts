/* eslint-disable */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/SignIn.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/registration",
    name: "registration",
    component: () => import("../views/Register.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/profile/:id",
    name: "profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/all-users",
    name: "allUsers",
    component: () => import('../views/AllUsers.vue'),
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
