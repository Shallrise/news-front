<template>
  <div>
    <!-- <h1>用户基本信息</h1> -->
    <div class="mainbox">
      <div class="avatar">
        <el-upload
          class="avatar-uploader"
          action="/api/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
        <el-avatar :size="100" :src="avatar">
          <el-icon  class="avatar-uploader-icon"><i-ep-Plus /></el-icon>
        </el-avatar>
        
          <!-- <img v-if="imageUrl" :src="passform.images" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon> -->
        </el-upload>
      </div>
      <!-- <div class="info"> -->
      <el-form ref="form" label-width="80px">
        <el-form-item> </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="userInfo.nickName"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="userInfo.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-if="userInfo.sex" placeholder="女" disabled></el-input>
          <el-input v-else placeholder="男" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="userInfo.createTime" disabled></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="margin-left: 100px" @click="editUserName"
        >修改用户名</el-button
      >
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { editName } from "@/api/user.js";
const userInfo = ref({
  nickName: "",
  username: "",
  roleId: "",
  phone: "",
  sex: "",
  createTime: "",
});
userInfo.value.nickName = localStorage.getItem("nickName");
userInfo.value.roleId = localStorage.getItem("roleId");
userInfo.value.phone = localStorage.getItem("phone");
userInfo.value.sex = localStorage.getItem("sex");
userInfo.value.createTime = localStorage.getItem("createTime");
userInfo.value.username = localStorage.getItem("username");
const token = localStorage.getItem("token");

const avatar = ref("");

const editUserName = () => {
  editName(token, userInfo.value.username, userInfo.value.nickName).then(
    (res) => {
      if (res.data.code === 200) {
        ElMessage({
          message: "修改成功",
          type: "success",
        });
      } else {
        ElMessage({
          message: res.data.msg,
          type: "error",
        });
      }
    }
  );
};

const handleAvatarSuccess = (res) => {
  console.log(res.data.url);
  // console.log(res.data.data.url);
  avatar.value = res.data.url;
  // passform.images= res.data.data.url;
};
</script>

<style>
.mainbox {
  width: 700px;
  height: 600px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.avatar {
  height: 100px;
  width: 100px;
  /* float: left; */
  margin-left: 300px;
  border-radius: 50%;
  margin-top: 35px;
}

.form_input {
  padding: 0 30px;
  box-sizing: border-box;
  display: flex;
  margin-top: 20px;
}
.inputs {
  height: 40px;
  width: 400px;
  border-radius: 5px;
  border: none;
  background-color: #eee;
  color: #666;
}
</style>
