<template>
   <el-menu
   :router="true"
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
  <el-menu-item ></el-menu-item>
    <el-sub-menu index="2">
      <template #title>信息管理</template>
      <el-menu-item index="/user-edit/password">修改密码</el-menu-item>
      <el-menu-item index="/user-edit/userInfo">修改信息</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/user-edit/user-news"></el-menu-item>
    <el-menu-item index="/user-edit/user-news">文章列表</el-menu-item>
  </el-menu>
  <el-main>
    <router-view></router-view>
  </el-main>
  </template>
  
  <script setup>
 
    
    const  handleOpen=(key, keyPath)=> {
        console.log(key, keyPath);
      }
    const  handleClose=(key, keyPath)=> {
        console.log(key, keyPath);
      }
    
  
  </script>
  
  