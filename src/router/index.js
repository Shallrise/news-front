import { createRouter, createWebHistory } from "vue-router";


const routes = [
  {
    name:'首页',
    path: "/index",
    component: () => import("@/views/index.vue"),
  },
  {
    name:'注册',
    path: "/register",
    component: () => import("@/views/register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
