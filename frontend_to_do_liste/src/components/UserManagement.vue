<template>
  <div class="user-management-container" :class="{ 'dark-mode': isDarkMode }">
    <h1>User Management</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="newUser.name" placeholder="Name" />
      <input v-model="newUser.email
" placeholder="Email" />
      <button type="submit">{{ editingUser ? 'Update' : 'Add' }}</button>
    </form>
    <ul>
      <li v-for="user in users" :key="user.id">
        <a @click="selectUser(user)">{{ user.name }} ({{ user.email }})</a>
        <button class="edit-button" @click="editUser(user)">Ändern</button>
        <button class="delete-button" @click="deleteUser(user.id)">Löschen</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.user-management-container {
  margin-left: 450px;
  max-width: 1000px;
  min-height: 300px;
}

.user-management-container li a {
  white-space: nowrap; /* Verhindert den Textumbruch */
  overflow: hidden; /* Schneidet überstehenden Text ab */
  text-overflow: ellipsis; /* Zeigt '...' an, wenn der Text abgeschnitten wird */
}

.user-management-container h1 {
  font-size: 2em; /* Größe anpassbar */
  white-space: nowrap; /* Verhindert den Textumbruch */
  overflow: hidden; /* Schneidet überstehenden Text ab */
  text-overflow: ellipsis; /* Zeigt '...' an, wenn der Text abgeschnitten wird */
}

.dark-mode button {
  background-color: #333; /* Dunkelgrau */
  color: white;
}

.edit-button.dark-mode:hover,
.delete-button.dark-mode:hover {
  background-color: #555; /* Dunkleres Dunkelgrau */
}

</style>

<script setup>
import { ref, onMounted, inject } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const apiUrl = 'http://localhost:8080/api/persons';
const users = ref([]);
const newUser = ref({ name: '', email: '' });
const editingUser = ref(null);
const router = useRouter();

// Injizieren des globalen isDarkMode Zustands
const isDarkMode = inject('isDarkMode');

const loadUsers = async () => {
  try {
    const response = await axios.get(apiUrl);
    users.value = response.data;
  } catch (error) {
    console.error('Fehler beim Laden der Benutzer: ', error);
  }
};

const handleSubmit = async () => {
  try {
    let response;
    if (editingUser.value) {
      response = await axios.put(`${apiUrl}/${editingUser.value.id}`, newUser.value);
    } else {
      response = await axios.post(apiUrl, newUser.value);
    }
    newUser.value = { name: '', email: '' };
    editingUser.value = null;
    await loadUsers();
  } catch (error) {
    console.error('Fehler beim Hinzufügen/Ändern des Benutzers: ', error);
  }
};

const editUser = (user) => {
  newUser.value = { ...user };
  editingUser.value = user;
};

const deleteUser = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    await loadUsers();
  } catch (error) {
    console.error('Fehler beim Löschen des Benutzers: ', error);
  }
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

const selectUser = (user) => {
  // Nutzer-ID speichern (z.B. in einem globalen Zustand oder als Route-Parameter)
  // Navigieren zur Todo-Liste des Nutzers
  router.push({ name: 'todo', params: { userId: user.id } });
};

onMounted(loadUsers);
</script>


