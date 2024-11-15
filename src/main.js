import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './axiosConfig';

const app = createApp(App);

app.config.globalProperties.$axios = axios; // axios global

app.use(store).use(router).mount('#app');