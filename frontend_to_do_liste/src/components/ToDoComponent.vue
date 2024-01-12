<script setup lang="ts">
import {onMounted, ref} from 'vue';
import axios from 'axios';

interface Todo {
  id: number;
  description: string;
  isCompleted: boolean;
}

const apiUrl = 'http://localhost:8080/api/tasks'; // Update auf die korrekte URL
const newTodo = ref('');
const todos = ref<Todo[]>([]);

const loadTodos = () => {
  axios.get<Todo[]>(apiUrl)
      .then(response => {
        todos.value = response.data;
      })
      .catch(error => console.error('Fehler beim Laden der To-Dos: ', error));
};

const addTodo = () => {
  if (newTodo.value.trim()) {
    const todoToAdd = { description: newTodo.value, isCompleted: false };
    axios.post(apiUrl, todoToAdd)
        .then(response => {
          todos.value.push(response.data);
          newTodo.value = '';
        })
        .catch(error => console.error('Fehler beim Hinzufügen des To-Dos: ', error));
  }
};

const deleteTodo = (id: number) => {
  axios.delete(`${apiUrl}/${id}`)
      .then(() => {
        todos.value = todos.value.filter(todo => todo.id !== id);
      })
      .catch(error => console.error('Fehler beim Löschen des To-Dos: ', error));
};

onMounted(loadTodos);
</script>

<template>
  <div class="todo-container">
    <input v-model="newTodo" type="text" placeholder="Neues Todo hinzufügen" @keyup.enter="addTodo">
    <button @click="addTodo">Hinzufügen</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.description }} <!-- Anstatt todo.text -->
        <button @click="deleteTodo(todo.id)">Löschen</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.todo-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #5cb85c;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #4cae4c;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

li button {
  background-color: #d9534f;
}

li button:hover {
  background-color: #c9302c;
}
</style>
