<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <div class="dark-mode-toggle">
      <button @click="toggleDarkMode">Dark/Light</button>
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterView } from 'vue-router';

const isDarkMode = ref(false);

watch(isDarkMode, (newValue) => {
  updateTheme(newValue);
});

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
}

function updateTheme(isDark: boolean) {
  document.documentElement.style.setProperty(
      '--background-color',
      isDark ? 'var(--background-color-dark)' : 'var(--background-color-light)'
  );
  document.documentElement.style.setProperty(
      '--text-color',
      isDark ? 'var(--text-color-dark)' : 'var(--text-color-light)'
  );
}
</script>

<style>
:root {
  --background-color-light: #fff;
  --background-color-dark: #333;
  --text-color-light: #333;
  --text-color-dark: #fff;
}

#app {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

.dark-mode-toggle {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* Weitere Stile */
</style>
