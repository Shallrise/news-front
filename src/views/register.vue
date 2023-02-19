<template>
  <div class="my">
    <img class="bgc" :src="bgc" alt="" />
    <div class="submit">
      <span class="form_title">注册</span>
      <el-form :model="registerForm">
        <div class="form_input">
          <span>用户名：</span>
          <el-form-item>
            <el-input
              class="inputs"
              type="text"
              v-model="registerForm.username"
            />
          </el-form-item>
        </div>
        <div class="form_input">
          <span>密码：</span>
          <el-form-item>
            <el-input
              class="inputs"
              type="password"
              v-model="registerForm.password"
              show-password
            />
          </el-form-item>
        </div>
        <div class="form_input">
          <span>姓名：</span>
          <el-form-item>
            <el-input class="inputs" v-model="registerForm.nickName" />
          </el-form-item>
        </div>
        <div class="form_input">
          <span>电话：</span>
          <el-form-item>
            <el-input class="inputs" v-model="registerForm.phone" />
          </el-form-item>
        </div>
        <div class="form_input">
          <span>邮箱：</span>
          <el-form-item>
            <el-input
              class="inputs"
              v-model="registerForm.email"
            />
          </el-form-item>
        </div>
        <div class="form_input">
          <span>性别：</span>
          <el-form-item>
            <el-select
              v-model="registerForm.sex"
              class="m-2"
              placeholder="Select"
              size="large"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <div class="b_submit">
        <el-button class="b">重置</el-button>
        <el-button class="home_href" @click="register">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive,ref } from "vue";
import { useRouter } from 'vue-router'
import { ElMessage } from "element-plus";
import bgcImage from "@/assets/images/pur.jpg";
import { getRegistor } from "@/api/login.js";

const router = useRouter();

const registerForm = ref({
  username: "",
  password: "",
  nickName: "",
  phone: "",
  sex: "",
  email: "",
});
const bgc = reactive(bgcImage);
const options = [
    {
        value:0,
        label:'男'
    },{
        value:1,
        label:'女'
    }
]

const register = () => {
    console.log(registerForm);
  getRegistor(registerForm.value).then((res) => {
    console.log(res);
    if (res.data.code == 200) {
        ElMessage({
          message: "注册成功",
          type: "success",
        });
        router.push({
					path:'/login',
				})
    } else {
        ElMessage({
        message: "注册失败",
        type: "error",
      });
    }
  });
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.from {
  overflow: hidden;
  position: relative;
}

.bgc {
  width: 100%;
  height: 100%;
}

.submit {
  position: absolute;
  z-index: 9;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  margin-top: 80px;
  width: 600px;
  height: 650px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.form_title {
  text-align: center;
  margin-top: 40px;
  font-size: 18px;
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

.form_input span {
  width: 85px;
  align-self: center;
}

.b_submit {
  align-self: center;
}

.b {
  border: none;
  width: 80px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  background: #999;
  margin-top: 40px;
}

.b:hover {
  background: #666;
}

.back {
  margin-left: 10px;
}

.home_href {
  border: none;
  width: 80px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  background: rgb(1, 114, 213);
}
</style>
