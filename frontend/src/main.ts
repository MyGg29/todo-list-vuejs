import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

axios.defaults.baseURL = "http://localhost:3000"
const app = createApp(App)
app.component("QuillEditor", QuillEditor)
app.use(router)

app.mount('#app')
