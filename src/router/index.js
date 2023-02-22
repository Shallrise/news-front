import { createRouter, createWebHistory } from "vue-router";


const routes = [
  // {
  //   path:'/',
  //   redirect:'/index'
  // },
  {
    name:'首页',
    path: "/index",
    component: () => import("@/views/index.vue"),
  },
  {
    name:'登录',
    path: "/",
    component: () => import("@/views/login.vue"),
  },
  {
    name:'注册',
    path: "/register",
    component: () => import("@/views/register.vue"),
  },
  {
    name:'编辑文章',
    path: "/edit-artical",
    component: () => import("@/components/editArticle.vue"),
  },
  {
    name:'userEdit',
    path:'/user-editNews',
    component: () => import("@/components/userEditArtical.vue")
  },
  {
    name:'文章列表',
    path: "/news-list",
    component: () => import("@/components/newList.vue"),
  },
  {
    name:'个人文章列表',
    path:"/user-newList",
    component: () => import("@/components/userDetail.vue")
  },
  {
    name:'文章详情',
    path: "/artical-detail",
    component: () => import("@/components/articleDetails.vue"),
  },
  {
    name:'个人主页',
    path: "/user-edit",
    component: () => import("@/views/user.vue"),
    children:[
      {
        path:"/user-edit/user-news",
        name:"editNews",
        component:() => import("@/components/userNewList.vue")
      },
      {
        name:'用户信息',
        path: "/user-edit/userInfo",
        component: () => import("@/components/userInfo.vue"),
      },
      {
        name:'修改密码',
        path:"/user-edit/password",
        component:() => import("@/components/editPassword.vue")
      }
    ]
  },
  {
    name:'管理员修改',
    path: "/admin",
    component: () => import("@/components/admin.vue"),
  },
  {
    name:'收藏列表',
    path: "/star-list",
    component: () => import("@/components/startList.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
