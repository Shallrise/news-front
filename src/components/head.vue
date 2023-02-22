<template>
  <header class="header-wrapper">
    <div class="header-content">
      <div class="content-left">
        <nav class="main-nav">
          <ul class="navmenu-items">
            <li class="navmenu-item">
              <a class="navmenu-link">主页</a>
            </li>
            <li class="navmenu-item submenu-wrapper">
              <a class="navmenu-link" @click="goNewList"
                >新闻列表
                <span class="icon"><i class="fal fa-chevron-down"></i></span
              ></a>
            </li>
            <li class="navmenu-item">
              <a class="navmenu-link" @click="goUser">用户信息</a>
            </li>
            <li class="navmenu-item mega-menu-wrapper" v-if="roleId == 1">
              <a  class="navmenu-link" @click="goAdmin"
                >管理员
                <span class="icon"><i class="fal fa-chevron-down"></i></span
              ></a>
            </li>
            <li class="navmenu-item">
              <a class="navmenu-link" @click="goStar">收藏列表 </a>
            </li>
            <li class="navmenu-item">
              <a  class="navmenu-link" @click="goPostNews">发布新闻</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="content-right" v-if="!token">
          <el-button  @click="gologin">登录</el-button>
          <el-button  @click="goregister">注册</el-button>
        </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const token = localStorage.getItem('token')
const roleId = localStorage.getItem('roleId')

const goNewList = () =>{
  router.push({
    path: "/news-list",
  });
}

const goUser = () =>{
  router.push({
    path: "/user-edit",
  });
}

const goAdmin = () =>{
  router.push({
    path: "/admin",
  });
}

const goStar = () =>{
  router.push({
    path: "/star-list",
  });
}

const goPostNews = () =>{
  router.push({
    path: "/edit-artical",
  });
}

const gologin = () =>{
  router.push({
    path:'/login'
  })
}

const goregister = () =>{
  router.push({
    path:'/register'
  })
}


</script>

<style src="@/styles/head.css" scoped></style>
