<template>
  <div>
    <section class="single-post-wrapper blog-list-wrapper section-padding">
      <div class="container">
        <div class="section-head">
          <h2 class="heading-secondary">文章详情</h2>
          <ul class="c-bredcrumb">
            <li><a>首页 </a></li>
            <li v-if="token">
              <el-button round @click="starNews"
                ><el-icon :color="color"><i-ep-Star /></el-icon>收藏</el-button
              >
            </li>
          </ul>
        </div>
        <div class="row gy-5">
          <div>
            <div class="left-content">
              <!-- Post card -->
              <div class="post-card">
                <div>
                  <img
                    class="card-thumb bg-cover"
                    :src="articalContent.picture"
                    alt=""
                  />
                </div>
                <div class="card-content">
                  <div class="card-meta">
                    <div class="meta-item post-author">
                      <span class="category">{{ articalContent.tag }}</span
                      ><a class="author-name">{{
                        articalContent.authorName
                      }}</a>
                    </div>
                    <span class="meta-item">{{
                      articalContent.publishedTime
                    }}</span
                    ><span class="meta-item"
                      ><el-icon><i-ep-Star /></el-icon
                      >{{ articalContent.hot }}</span
                    >
                  </div>
                  <div class="post-content">
                    <div>
                      <h3 class="heading-primary">
                        {{ articalContent.title }}
                      </h3>
                      <p class="body-text">
                        {{ articalContent.introduce }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Tags -->
              <div class="tags">
                <h3 class="heading-secondary">Tags</h3>
                <div class="categories-tags">
                  <a>{{ articalContent.tag }}</a>
                </div>
              </div>
              <!-- Comments -->
              <div
                class="post-comments"
                v-for="(item, index) in comment"
                :key="index"
              >
                <h3 class="heading-secondary">评论</h3>
                <!-- 一级评论 -->
                <div class="comment-card">
                  <div class="card-top">
                    <div class="card-meta">
                      <div class="meta-item post-author">
                        <div>
                          <img
                          v-if="item.avatar != ''"
                            class="author-avatar bg-cover"
                            :src="item.avatar"
                            alt=""
                          />
                          <img
                            v-else
                            class="author-avatar bg-cover"
                            :src="defaultAva"
                            alt=""
                          />
                        </div>
                        <a class="author-name">{{ item.nickName }}</a>
                      </div>
                      <span class="meta-item">{{ item.createTime }} </span
                      ><span class="meta-item">{{ item.readerId }}</span>
                      <el-button
                        class="meta-item"
                        type="info"
                        round
                        @click="openReplay(item.id)"
                        >Replay</el-button
                      >
                    </div>
                    <el-icon
                      color="red"
                      @click="deleteComment(item.id)"
                      v-if="item.readerId == roleId"
                      ><i-ep-Delete />delete</el-icon
                    >
                  </div>
                  <p class="body-text">
                    {{ item.content }}
                  </p>
                </div>
                <!-- 二级评论 -->
                <div
                  class="comment-card replay"
                  v-for="(y, t) in item.childrenComments"
                >
                  <div class="card-top">
                    <div class="card-meta">
                      <div class="meta-item post-author">
                        <div>
                          <img
                            v-if="y.avatar!= ''"
                            class="author-avatar bg-cover"
                            :src="y.avatar"
                            alt=""
                          />
                          <img
                            v-else
                            class="author-avatar bg-cover"
                            :src="adefaultAva"
                            alt=""
                          />
                        </div>
                        <a class="author-name">{{ y.nickname }}</a>
                      </div>
                      <span class="meta-item">{{ y.createTime }}</span
                      ><span class="meta-item">{{ y.id }}</span>
                    </div>
                    <a
                      class="button button-replay"
                      v-if="y.readerId == roleId"
                      @click="deleteComment(y.id)"
                      ><el-icon color="red"><i-ep-Delete />delete</el-icon>
                    </a>
                  </div>
                  <p class="body-text">
                    {{ y.content }}
                  </p>
                </div>
              </div>
              <!-- Comments box -->
              <div class="comment-box">
                <h3 class="heading-secondary">发表评论</h3>
                <form class="comment-form">
                  <div class="row">
                    <div class="col-md-4">
                      <input type="text" placeholder="Your Name" />
                    </div>
                    <div class="col-md-4">
                      <input type="email" placeholder="Your Email" />
                    </div>
                    <div class="col-md-4">
                      <input type="text" placeholder="+1 (___) __ __ ___" />
                    </div>
                    <div class="col-12">
                      <textarea
                        placeholder="Enter your comment"
                        v-model="content"
                      ></textarea>
                    </div>
                  </div>
                  <el-button
                    class="button button-primary"
                    @click="addComment"
                    size="large"
                  >
                    Post Comment
                  </el-button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- 添加对话框 -->
  <el-dialog
    v-model="dialogVisible"
    title="Replay"
    width="30%"
    :before-close="handleClose"
  >
    <el-input
      type="textarea"
      placeholder="Enter your comment"
      v-model="reContent"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="replayConfirm"> Confirm </el-button>
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";

import defaultAva from '@/assets/images/avatar.jpg'

import {
  getDetail,
  getComment,
  star,
  cancelStar,
  getStar,
  deleteComm,
  addCom,
} from "@/api/news.js";

const router = useRoute();

const id = ref(router.query.id);

const token = localStorage.getItem("token");
const roleId = localStorage.getItem("roleId");

const articalContent = ref({
  picture: "",
  title: "",
  introduce: "",
  content: "",
  publishedTime: "",
  tag: "",
  level: "",
  hot: "",
  authorName: "",
});
const color = ref("");

const comment = ref([]);
const starList = ref([]);
const content = ref("");
const reContent = ref("");
const parentId = ref("");

const dialogVisible = ref(false);

const articalDetail = () => {
  getDetail(id.value).then((res) => {
    articalContent.value = res.data.data;
  });
  getComment(id.value).then((res) => {
    comment.value = res.data.data.records;
  });
  getStar(token).then((res) => {
    starList.value = res.data.data.records;
    starList.value.map((item, index) => {
      if ((item.id = id.value)) {
        color.value = "red";
      }
    });
  });
};

const starNews = () => {
  if (color.value != "red") {
    star(token, id.value).then((res) => {
      if (res.data.code === 200) {
        ElMessage({
          message: "收藏成功",
          type: "success",
        });
        color.value = "red";
      } else {
        ElMessage({
          message: res.data.msg,
          type: "error",
        });
      }
    });
  } else {
    cancelStar(token, id.value).then((res) => {
      if (res.data.code === 200) {
        ElMessage({
          message: "取消成功",
          type: "success",
        });
        color.value = "";
      } else {
        ElMessage({
          message: res.data.msg,
          type: "error",
        });
      }
    });
  }
};

const deleteComment = (delid) => {
  deleteComm(token, delid).then((res) => {
    if (res.data.code === 200) {
      ElMessage({
        message: "删除成功",
        type: "success",
      });
    } else {
      ElMessage({
        message: res.data.msg,
        type: "error",
      });
    }
  });
  6;
};

const addComment = () => {
  addCom(token, content.value, id.value, roleId).then((res) => {
    if (res.data.code === 200) {
      ElMessage({
        message: "评论成功",
        type: "success",
      });
      getComment(id.value).then((res) => {
        comment.value = res.data.data.records;
      });
    } else {
      ElMessage({
        message: res.data.msg,
        type: "error",
      });
    }
  });
};

const handleClose = () => {
  dialogVisible.value = false;
};

const openReplay = (reid) => {
  dialogVisible.value = true;
  parentId.value = reid;
};

const replayConfirm = () => {
  addCom(token, reContent.value, id.value, roleId, parentId.value).then(
    (res) => {
      if (res.data.code === 200) {
        ElMessage({
          message: "评论成功",
          type: "success",
        });
        getComment(id.value).then((res) => {
          comment.value = res.data.data.records;
        });
        dialogVisible.value = false;
      } else {
        ElMessage({
          message: res.data.msg,
          type: "error",
        });
      }
    }
  );
};

onMounted(() => {
  articalDetail();
});
</script>

<style src="@/styles/artical-detail.css" scoped></style>
<style src="@/styles/new-list.css" scoped></style>
