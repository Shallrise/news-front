<template>
 <div class="adminBox">
    <div style="margin-top: 20px;">
    <el-button @click="openAddDialog"
      ><el-icon><i-ep-Plus /></el-icon>新增</el-button
    >
  </div>
  <!-- 课程列表 -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="用户id" width="120" />
    <el-table-column
      prop="nickName"
      label="用户姓名"
      width="230"
    ></el-table-column>
    <el-table-column prop="phone" label="电话号码" width="120" />
    <el-table-column prop="sex" label="性别" width="120" />
    <el-table-column prop="email" label="邮箱" width="120" />
    <el-table-column
      prop="createTime"
      label="创建时间"
      width="170"
      align="center"
      style="white-space: pre-wrap; text-align: center"
    />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          links
          size="large"
          type="danger"
          @click.prevent="confirmDelClass(scope.row.id)"
        >
          <el-icon><i-ep-Delete /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
 </div>

 <!-- 添加用户 -->
 <el-dialog v-model="addDialogVisible">
    <el-form :model="addFormList">
      <el-form-item label="用户名">
        <el-input v-model="addFormList.username" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="addFormList.nickName" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select
          v-model="addFormList.sex"
          placeholder="请选择性别"
        >
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
        </el-select>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" show-password v-model="addFormList.password" />
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="addFormList.phone" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="addFormList.email" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">确认</el-button>
        <el-button @click="closeAddDialog">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";

import {  ElMessageBox } from 'element-plus'

import { getUser,addUser } from "@/api/admin.js";

const token = localStorage.getItem("token");

const tableData = ref([{
  id: "",
  createTime: "",
  nickName: "",
  phone: "",
  sex: "",
  email: "",
}]);
const addFormList = ref({
    username:'',
    password:'',
    nickName:'',
    phone:'',
    sex:'',
    email:''
})

const addDialogVisible = ref(false)
const options = [
    {
        value:0,
        label:'男'
    },{
        value:1,
        label:'女'
    }
]

const getUserList = () => {
  getUser(token).then((res)=>{
    tableData.value = res.data.data.records
  })
};

const openAddDialog = () =>{
    addDialogVisible.value = true;
}

const closeAddDialog = () => {
  addDialogVisible.value = false;
};

const handleConfirm = () =>{
    addUser(token,addFormList.value).then((res)=>{
        if(res.data.code === 200){
            ElMessage({
              message: "添加成功",
              type: "success",
            });
            getUserList();
            closeAddDialog();
        }else{
            ElMessage({
              message: res.data.msg,
              type: "error",
            });
        }
    })
}

onMounted(() => {
  getUserList();
});
</script>

<style lang="scss" scoped>
.adminBox{
    width: 1200px;
    height: 500px;
    position: absolute;
            left: 0;
            right: 0;
            margin: auto;
}
//   .dialog-footer button:first-child {
//     margin-right: 10px;
//   }
//   .el-table .cell {
//     white-space: pre-wrap !important;
//     text-align: center;
//   }
</style>
