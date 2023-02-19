<template>
  <div>
    <section class="blog-list-wrapper section-padding">
      <div class="container">
        <div class="section-head">
          <h2 class="heading-secondary">文章列表</h2>
          <ul class="c-bredcrumb">
            <li><el-button round @click="goIndex">首页</el-button></li>
            <li><a>Lifestyle</a></li>
          </ul>
        </div>
        <!-- 文章内容 -->
        <div class="row gy-5">
          <div>
            <div class="left-content">
              <!-- Post card -->
              <div
                class="post-card"
                v-for="(item, index) in newList"
                :key="index"
                @click="getDetail(item.id)"
              >
                <div>
                  <img
                    class="card-thumb bg-cover"
                    :src="item.picture"
                    alt=""
                  />
                </div>
                <div class="card-content">
                  <div class="card-meta">
                    <div class="meta-item post-author">
                      <span class="category">{{ item.tag }}</span>
                    </div>
                    <span class="meta-item">{{ item.publishedTime }}</span
                    ><span class="meta-item"
                      ><el-icon><i-ep-Star /></el-icon>{{ item.hot }}</span
                    ><span class="meta-item"
                      ><i class="fal fa-share-alt"></i
                    ></span>
                  </div>
                  <div class="post-content">
                    <div>
                      <a
                        ><h3 class="heading-primary">
                          {{ item.title }}
                        </h3></a
                      >
                      <p class="body-text">
                        {{ item.introduce }}
                      </p>
                    </div>
                    <a class="button icon-button"
                      ><span class="icon"
                        ><i class="fas fa-chevron-right"></i></span
                    ></a>
                  </div>
                </div>
              </div>

              <!-- Post card -->
              <div class="post-card">
                <div class="card-content">
                  <div class="post-content">
                    <div>
                      <a
                        ><h3 class="heading-primary">
                          It Really Have Good Feeling When You Enjoy Nature
                        </h3></a
                      >
                    </div>
                  </div>
                </div>
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
import { useRouter } from "vue-router";

import { getNews } from "@/api/news.js";

const router = useRouter();

const newList = ref([]);

const newsList = () => {
  getNews().then((res) => {
    newList.value = res.data.data.records;
  });
};

const getDetail = (id) => {
  router.push({
    path: "/artical-detail",
    query: {
      id,
    },
  });
};

const goIndex = () => {
  router.push({
    path: "/index",
  });
};

onMounted(() => {
  newsList();
});
</script>

<style src="@/styles/new-list.css"></style>
