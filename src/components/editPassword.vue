<template>
  <div>
    <!-- <h1>用户基本信息</h1> -->
    <div class="mainbox">
        <el-upload
    class="avatar-uploader"
    action="/api/api/upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
  >
    <img v-if="imageUrl" :src="passform.images" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
      <!-- <div class="avatar">
        <el-avatar :size="100" :src="avatar"></el-avatar>
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          action="/api/upload"
          name="image"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          list-type="picture"
        >
        <el-button type="primary">点击上传图片</el-button>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </div> -->
      <!-- <div class="info"> -->
      <el-form ref="form" label-width="80px">
        <el-form-item> </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="passform.username"></el-input>
        </el-form-item>
        <el-form-item label="旧密码">
          <el-input type="oldpassword" oldpassword></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="passform.password" oldpassword></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="margin-left: 100px" @click="editPass"
        >修改密码</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus";
import { changePass } from "@/api/user.js";
const passform = ref({
  images:"",
  username: "",
  oldpassword: "",
  password: "",
  images:''
});
passform.value.username = localStorage.getItem("username");
const token = localStorage.getItem("token");
const editPass = () => {
  changePass(token, passform.value.username, passform.value.password).then((res) => {
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
  });
};

const handlePreview = (file) => {
  console.log(file);
};
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};
const handleAvatarSuccess = (res) => {
    console.log(res);
    passform.images= res.data.data.url;
};

</script>

<style lang="scss" scoped>
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
