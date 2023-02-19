<template>
    <div>
      <Head></Head>
        <!-- topic -->
    <div class="topic">
        <section class="featured-topics-wrapper section-padding">
      <div class="container">
        <div class="section-head">
          <h2 class="heading-primary">热点新闻</h2>
          <el-button round class="button button-minimal"
          @click="goNewList"  >阅读更多<el-icon><i-ep-Position /></el-icon></el-button>
        </div>
        <div class="row gy-5">
          <div class="col-lg-9 left-content" v-for="(item, index) in newList"
                :key="index">
            <!-- 新闻列表 -->
            <div class="featured-topics-card">
              <div>
                  <img
                    style="width: 550px;height: 350px;"
                    :src="item.picture"
                    alt=""
                  />
                </div>
              <span class="topic-category">News</span>
              <div class="card-content">
                <a
                  ><h3 class="heading-secondary">
                    {{ item.title }}
                  </h3></a
                >
                <p class="body-text">
                  {{ item.introduce }}
                </p>
                <div class="post-meta">
                  <p class="author">{{ item.tag }}</p>
                  <span class="post-date">{{ item.publishedTime }} </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="featured-topic-slidebar">
              <div
                class="widget-ad-banner two bg-cover"
              >
                <div class="content">
                  <span class="discount">100% open</span>
                  <h2 class="heading-secondary">Homepage</h2>
                  <p class="body-text">
                    Welcome your coming.This is an interesting news site
                  </p>
                </div>
              </div>
              <div class="widget-newsletter">
                <h3 class="heading-secondary">suggestion</h3>
                <p class="body-text">Do you have any suggestions to make our website better?</p>
                <form>
                  <input type="text" placeholder="Your email" /><button
                    class="button button-primary"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>

    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useRouter } from "vue-router";
import Head from '../components/head.vue'
import { getNews } from "@/api/news.js";

const newList = ref([]);
const router = useRouter();

const getNewList= () =>{
  getNews().then((res)=>{
    newList.value = res.data.data.records;
  })
}

const goNewList = () =>{
  router.push({
    path: "/news-list",
  });
}

onMounted(()=>{
  getNewList()
})

</script>

<stle src="@/styles/homepage.css"></stle>
<style lang="scss" scoped>

</style>