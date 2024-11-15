import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import ComprarView from '../views/ComprarView.vue';  
import VenderView from '../views/VenderView.vue';  
import HistorialView from '../views/HistorialView.vue'; 

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView, 
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/comprar',
    name: 'comprar',
    component: ComprarView,
  },
  {
    path: '/vender',
    name: 'vender',
    component: VenderView,
  },
  {
    path: '/historial',
    name: 'historial',
    component: HistorialView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
