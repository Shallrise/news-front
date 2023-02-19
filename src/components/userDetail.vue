<template>
  <div>
    <section class="single-post-wrapper blog-list-wrapper section-padding">
      <div class="container">
        <div class="section-head">
          <h2 class="heading-secondary">文章详情</h2>
          <ul class="c-bredcrumb">
            <li><a>首页 </a></li>
            <li>
              <el-button type="info" round @click="userEdit">编辑</el-button>
            </li>
            <li>
              <el-button type="danger" round @click="opendelete"
                >删除</el-button
              >
            </li>
          </ul>
        </div>
        <div class="row gy-5">
          <div>
            <div class="left-content">
              <!-- Post card -->
              <div class="post-card">
                <div class="card-thumb bg-cover">
                    <el-image
                      :src="articalContent.picture"
                      style="width: 100%; height: 100%"
                    ></el-image>
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
                      <p class="body-text">
                        {{ articalContent.content }}
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
                    </div>
                   <el-icon
                        color="red"
                        @click="deleteComment(item.id)"
                        v-if="(item.readerId == roleId)"
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
                      ><span class="meta-item">{{ y.readerId }}</span>
                    </div>
                    <a
                      class="button button-replay"
                      v-if="(y.readerId == roleId)"
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
                      <textarea placeholder="Enter your comment"></textarea>
                    </div>
                  </div>
                  <button class="button button-primary">Post Comment</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { ElMessageBox, ElMessage } from "element-plus";

import defaultAva from '@/assets/images/avatar.jpg'

import { getDetail, getComment, deleteComm } from "@/api/news.js";
import { deleteNews } from "@/api/user.js";

const router = useRoute();
const route = useRouter();

const id = ref(router.query.id);
const token = localStorage.getItem("token");
const roleId = localStorage.getItem('roleId')

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
const comment = ref([]);

const articalDetail = () => {
  getDetail(id.value).then((res) => {
    articalContent.value = res.data.data;
  });
  getComment(id.value).then((res) => {
    comment.value = res.data.data.records;
    console.log(comment.value);
  });
};

const userEdit = () => {
  const useid = id.value;
  route.push({
    path: "/user-editNews",
    query: {
      id: useid,
    },
  });
};

const opendelete = () => {
  ElMessageBox.alert("确认删除这条新闻吗", "删除", {
    callback: () => {
      deleteNews(token, id.value).then((res) => {
        console.log(res.msg);
        if (res.code === 200) {
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
    },
  });
};

const deleteComment = (comId) => {
  deleteComm(token, comId).then((res) => {
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
};

onMounted(() => {
  articalDetail();
});
</script>

<style src="@/styles/artical-detail.css"></style>
<style src="@/styles/new-list.css"></style>
