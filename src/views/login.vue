<template>
  <section>
    <div class="color"></div>
    <div class="color"></div>
    <div class="color"></div>
    <div class="box">
      <div class="square" style="--i: 0"></div>
      <div class="square" style="--i: 1"></div>
      <div class="square" style="--i: 2"></div>
      <div class="square" style="--i: 3"></div>
      <div class="square" style="--i: 4"></div>
      <div class="container">
        <div class="form">
          <h2>登录</h2>
          <form>
            <div class="inputBox">
              <input
                type="text"
                placeholder="Username"
                v-model="loginform.username"
              />
            </div>
            <div class="inputBox">
              <input
                type="password"
                placeholder="Password"
                v-model="loginform.password"
                show-password
              />
            </div>
            <!-- <div class="inputBox">
              <div class="select">
                <el-select
              v-model="loginform.roleId"
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
              </div>
            </div> -->

            <div>
              <el-button class="loginbutton" @click="userlogin"
                >Login</el-button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from 'vue-router'
import { ElMessage } from "element-plus";
import { login } from "@/api/login.js";

const router = useRouter();

const loginform = reactive({
  username: "",
  password: "",
});

// const options=[
//   {
//     value:1,
//     label:"管理员"
//   },
//   {
//     value:2,
//     label:"新闻发布者"
//   },
//   {
//     value:3,
//     label:"读者"
//   }
// ]

const userlogin = () => {
  login(loginform.username, loginform.password)
    .then((res) => {
      if (res.data.code === 200) {
        localStorage.setItem('token',res.data.data.token);
        localStorage.setItem('roleId',res.data.data.userInfo.roleId);
        localStorage.setItem('username',res.data.data.userInfo.username)
        localStorage.setItem('nickName',res.data.data.userInfo.nickName)
        localStorage.setItem('phone',res.data.data.userInfo.phone)
        localStorage.setItem('sex',res.data.data.userInfo.sex)
        localStorage.setItem('createTime',res.data.data.userInfo.createTime)
        // console.log(JSON.parse(sessionStorage.getItem("userInfo")));
        ElMessage({
          message: "登录成功",
          type: "success",
        });
        router.push({
					path:'/index',
				})
      } else {
        ElMessage({
          message: res.data.msg,
          type: "error",
        });
      }
    })
    .catch((err) => {
      ElMessage({
        message: err.data.msg,
        type: "error",
      });
    });
};
</script>

<style src="../assets/font/googleapis.css"></style>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  overflow: hidden;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-height:100vh; */
  background: linear-gradient(to bottom, #f1f4f9, #dff1ff);
}

section .color {
  position: absolute;
  filter: blur(150px);
}

section .color:nth-child(1) {
  top: -35px;
  width: 600px;
  height: 600px;
  background: #ff359b;
}

section .color:nth-child(2) {
  bottom: -150px;
  left: 100px;
  width: 500px;
  height: 500px;
  background: #fffd87;
}

section .color:nth-child(3) {
  bottom: 50px;
  right: 100px;
  width: 300px;
  height: 300px;
  background: #00d2ff;
}

.box {
  position: relative;
}

.box .square {
  position: absolute;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  animation: animate 10s linear infinite;
  animation-delay: calc(-1s * var(--i));
}
@keyframes animate {
  0%,
  100% {
    transform: translateY(-40px);
  }
  50% {
    transform: translateY(40px);
  }
}

.box .square:nth-child(1) {
  top: -50px;
  right: -60px;
  width: 100px;
  height: 100px;
}

.box .square:nth-child(2) {
  top: 150px;
  left: -100px;
  width: 120px;
  height: 120px;
  z-index: 2;
}

.box .square:nth-child(3) {
  bottom: 50px;
  right: -60px;
  width: 80px;
  height: 80px;
  z-index: 2;
}

.box .square:nth-child(4) {
  bottom: -80px;
  left: 100px;
  width: 50px;
  height: 50px;
}

.box .square:nth-child(5) {
  top: -80px;
  left: 140px;
  width: 60px;
  height: 60px;
}

.container {
  position: relative;
  width: 400px;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.form {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 40px;
}

.form h2 {
  position: relative;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 40px;
}

.form h2::before {
  content: "";
  position: absolute;
  left: 37%;
  bottom: -10px;
  width: 80px;
  height: 4px;
  background: #fff;
}

.form .inputBox {
  width: 100%;
  margin-top: 20px;
}

.form .inputBox input {
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  outline: none;
  padding: 10px 20px;
  border-radius: 35px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  letter-spacing: 1px;
  color: #fff;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.05);
}

.form .inputBox .select {
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  outline: none;
  padding: 10px 20px;
  border-radius: 35px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  letter-spacing: 1px;
  color: #fff;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.05);
}

.form .inputBox input::placeholder {
  color: #fff;
}

.loginbutton {
  background: #fff;
  color: #666;
  max-width: 100px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: 600;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  outline: none;
  padding: 10px 20px;
  border-radius: 35px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  letter-spacing: 1px;
  color: #fff;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.05);
  margin-top: 40px;
}
</style>
