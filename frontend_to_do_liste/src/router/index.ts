import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Todo from '../components/icons/ToDoComponent.vue'; // Importieren Sie Ihre Todo-Komponente

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/todo', // Der Pfad, unter dem Ihre Todo-Komponente erreichbar sein soll
      name: 'todo',
      component: Todo
    }
  ]
});

export default router;

