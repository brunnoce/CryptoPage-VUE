import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import ComprarView from '../views/ComprarView.vue';  // Componente para Comprar
import VenderView from '../views/VenderView.vue';  // Componente para Vender
import HistorialView from '../views/HistorialView.vue'; // Componente para Historial

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
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
