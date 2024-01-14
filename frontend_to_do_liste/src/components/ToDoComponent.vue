<template>
  <div :class="{ 'dark-mode': isDarkMode }" class="todo-container">
    <h1>To-do-Liste</h1>
    <input v-model="newTodo" type="text" placeholder="Neues Todo hinzufügen" @keyup.enter="addOrUpdateTodo">
    <button @click="addOrUpdateTodo">{{ editingTodo ? 'Update' : 'Hinzufügen' }}</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.description }}
        <button @click="editTodo(todo)">Ändern</button>
        <button @click="deleteTodo(todo.id)">Löschen</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

interface Todo {
  id: number;
  description: string;
  isCompleted: boolean;
}

const apiUrl = 'http://localhost:8080/api/tasks';
const newTodo = ref<string>('');
const editingTodo = ref<Todo | null>(null);
const todos = ref<Todo[]>([]);
const router = useRouter();

const userId = router.currentRoute.value.params.userId;
const isDarkMode = inject('isDarkMode');

const loadTodos = async () => {
  try {
    const response = await axios.get(`${apiUrl}?userId=${userId}`); // URL anpassen
    todos.value = response.data;
  } catch (error) {
    console.error('Fehler beim Laden der To-Dos: ', error);
  }
};

const addOrUpdateTodo = async () => {
  if (newTodo.value.trim()) {
    const todoData = { description: newTodo.value, isCompleted: false };
    try {
      if (editingTodo.value) {
        const response = await axios.put<Todo>(`${apiUrl}/${editingTodo.value.id}`, todoData);
        todos.value = todos.value.map(todo => todo.id === editingTodo.value!.id ? response.data : todo);
      } else {
        const response = await axios.post<Todo>(apiUrl, todoData);
        todos.value.push(response.data);
      }
      newTodo.value = '';
      editingTodo.value = null;
    } catch (error) {
      console.error('Fehler beim Hinzufügen/Ändern des To-Dos: ', error);
    }
  }
};

const editTodo = (todo: Todo) => {
  editingTodo.value = todo;
  newTodo.value = todo.description;
};

const deleteTodo = async (id: number) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    todos.value = todos.value.filter(todo => todo.id !== id);
  } catch (error) {
    console.error('Fehler beim Löschen des To-Dos: ', error);
  }
};

onMounted(loadTodos);
</script>

<style scoped>

.todo-container {
  max-width: 800px; /* Breite anpassbar */
  margin-left: 400px;
  min-height: 500px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.todo-container h1 {
  text-align: center;
  font-size: 5em; /* Größe anpassbar */
  margin-bottom: 20px; /* Abstand zur Eingabe */
  white-space: nowrap; /* Verhindert den Textumbruch */
  overflow: hidden; /* Schneidet überstehenden Text ab */
  text-overflow: ellipsis; /* Zeigt '...' an, wenn der Text abgeschnitten wird */
}

.todo-container button {
  padding: 12px 20px;
  font-size: 15px;
  height: 40px;
  width: 120px;
  border-radius: 4px; /* Abgerundete Ecken */
  border: none; /* Keine Umrandung */
  background-color: #add8e6; /* Hellblauer Hintergrund */
  color: white; /* Weißer Text */
  cursor: pointer; /* Cursor ändert sich zum Zeiger */
  transition: background-color 0.3s; /* Weiche Farbübergänge */
}

.todo-container button:hover {
  background-color: #00008b; /* Dunkelblau */
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1.2em; /* Größere Schriftgröße */
}

button {
  padding: 10px 15px; /* Anpassung der Button-Größe /
border: none;
border-radius: 4px;
background-color: #333; / Einheitliche Farbe für alle Buttons */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #555; /* Dunkleres Grau beim Hover */
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;

  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Buttons nebeneinander anordnen */
}

li button {
  background-color: #d9534f; /* Einheitliche Farbe für Aktionsbuttons */
}

li button:hover {
  background-color: #c9302c; /* Dunklere Farbe beim Hover für Aktionsbuttons */
}

.dark-mode {
  background-color: #333; /* Dunkler Hintergrund für Dark Mode /
color: #fff; / Heller Text für Dark Mode */
}

/* Anpassen anderer Elemente im Dark Mode /
.dark-mode input[type="text"],
.dark-mode button,
.dark-mode ul {
/ Spezifische Stile für den Dark Mode können hier hinzugefügt werden */

</style>


