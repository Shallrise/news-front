<template>
  <div>
    <div>
      <button @click="printHtml">发布新闻</button>
    </div>

    <div>
      <el-input placeholder="请输入标题" v-model="news.title"></el-input>
      <el-input
        placeholder="请输入文章简介"
        v-model="news.introduce"
      ></el-input>
      <!-- <el-input placeholder="请输入优先级" v-model="news.level"></el-input> -->
      <el-input placeholder="请输入标签" v-model="news.tag"></el-input>

      <el-upload
          class="avatar-uploader"
          action="/api/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
        <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><i-ep-Plus /></el-icon>
        
        </el-upload>
    </div>

    <div style="border: 1px solid #ccc; margin-top: 10px">
      <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        :defaultConfig="editorConfig"
        :mode="mode"
        v-model="valueHtml"
        style="height: 400px; overflow-y: hidden"
        @onCreated="handleCreated"
        @onChange="handleChange"
        @onDestroyed="handleDestroyed"
        @onFocus="handleFocus"
        @onBlur="handleBlur"
        @customAlert="customAlert"
        @customPaste="customPaste"
      />
    </div>
    <div style="margin-top: 10px">
      <textarea
        v-model="valueHtml"
        readonly
        style="width: 100%; height: 200px; outline: none"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { Boot } from "@wangeditor/editor";
import markdownModule from "@wangeditor/plugin-md";
Boot.registerModule(markdownModule);
import "@wangeditor/editor/dist/css/style.css";
import { onBeforeUnmount, ref, shallowRef } from "vue";
import { useRouter } from 'vue-router'
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

import { ElMessage } from "element-plus";
import { addNews } from "@/api/news.js";

export default {
  components: { Editor, Toolbar },
  setup() {
    const token = localStorage.getItem("token");
    const router = useRouter();

    const news = ref({
      title: "",
      introduce: "",
      picture: "",
      content: "",
      tag: "",
      level: "",
    });

    // 编辑器实例，必须用 shallowRef，重要！
    const editorRef = shallowRef();

    // 内容 HTML
    const valueHtml = ref("");

    // 模拟 ajax 异步获取内容
    // onMounted(() => {
    //     setTimeout(() => {
    //         valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    //     }, 1500)
    //     // console.log(editor.getHtml());
    // })

    const toolbarConfig = {};
    const editorConfig = { MENU_CONF: {} };

    //代码高亮
    editorConfig.MENU_CONF["codeSelectLang"] = {
      codeLangs: [
        { text: "CSS", value: "css" },
        { text: "HTML", value: "html" },
        { text: "XML", value: "xml" },
      ],
    };

    // 组件销毁时，也及时销毁编辑器，重要！
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;

      editor.destroy();
    });

    // 编辑器回调函数
    const handleCreated = (editor) => {
      console.log("created", editor);
      editorRef.value = editor; // 记录 editor 实例，重要！
    };
    const handleChange = (editor) => {
      console.log("change:", editor.getHtml());
    };
    const handleDestroyed = (editor) => {
      console.log("destroyed", editor);
    };
    const handleFocus = (editor) => {
      console.log("focus", editor);
    };
    const handleBlur = (editor) => {
      console.log("blur", editor);
    };
    const customAlert = (info, type) => {
      alert(`【自定义提示】${type} - ${info}`);
    };
    const customPaste = (editor, event, callback) => {
      console.log("ClipboardEvent 粘贴事件对象", event);

      // 自定义插入内容
      editor.insertText("xxx");

      // 返回值（注意，vue 事件的返回值，不能用 return）
      // callback(false) // 返回 false ，阻止默认粘贴行为
      callback(true); // 返回 true ，继续默认的粘贴行为
    };

    const insertText = () => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.insertText("hello world");
    };

    //获取HTML内容
    const printHtml = () => {
      const editor = editorRef.value;
      if (editor == null) return;
      news.value.content = editor.getHtml();
    //   console.log(news.value.content);
    //   console.log(token);
      addNews(token, news.value,imgUrl.value).then((res) => {
        if ((res.data.msg = "success")) {
          ElMessage({
            message: "发布成功",
            type: "success",
          });
          router.push({
					path:'/news-list',
				})
        } else {
          ElMessage({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    };

    const disable = () => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.disable();
    };

    const handleRemove= (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const imgUrl = ref('')
const handleAvatarSuccess = (res) => {
  console.log(res.data.url);
  imgUrl.value = res.data.url;
};

    return {
      editorRef,
      mode: "default",
      valueHtml,
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
      handleDestroyed,
      handleFocus,
      handleBlur,
      customAlert,
      customPaste,
      insertText,
      printHtml,
      disable,
      news,
      handleRemove,
      handleAvatarSuccess
    };
  },
};
</script>
