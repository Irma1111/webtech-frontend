import { createRouter, createWebHistory } from 'vue-router';
import Todo from '../components/ToDoComponent.vue'; // Importieren Sie Ihre Todo-Komponente
import UserManagement from '../components/UserManagement.vue'; // Importieren Sie die UserManagement-Komponente aus components

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // Der Pfad, unter dem die Nutzerverwaltung erreichbar sein soll
      name: 'userManagement',
      component: UserManagement
    },
    {
      path: '/todo', // Der Pfad, unter dem Ihre Todo-Komponente erreichbar sein soll
      name: 'todo',
      component: Todo
    },
  ]
});

export default router;

