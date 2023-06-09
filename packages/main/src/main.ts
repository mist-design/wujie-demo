import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from "element-plus"
import WujieVue from "wujie-vue3"
import "element-plus/dist/index.css"
const app =  createApp(App)
app.use(ElementPlus)
app.use(WujieVue)
app.mount('#app')
