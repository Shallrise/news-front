import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from '@/router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


// import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'


const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')
