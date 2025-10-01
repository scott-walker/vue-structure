<template>
  <div class="hello-page">
    <h1>Hello Module</h1>
    <div class="hello-page__block">
      <div v-if="text" class="hello-page__text">{{ text }}</div>
      <button @click="onGetText" :disabled="loading">Get Text</button>
      <div v-if="loading" class="hello-page__loading">Loading...</div>
    </div>

    <!-- Ссылка на модуль counter -->
    <div class="hello-page__navigation">
      <router-link to="/counter" class="hello-page__link"> Go to Counter Module </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue"

// Имя компонента
defineOptions({
  name: "HelloPage"
})

// Реактивные данные
const text = ref("")
const loading = ref(false)

// Контекст для внедрения зависимостей
// В Vue 3 с Composition API контекст будет доступен через provide/inject
// или через глобальные свойства

/**
 * Получить текст
 */
const onGetText = async (): Promise<void> => {
  loading.value = true
  text.value = "Please wait..."

  await nextTick()

  try {
    // Имитация получения текста через сервис
    await new Promise(resolve => setTimeout(resolve, 1000))
    text.value = "Hello from Vue 3 + TypeScript + Store!"
  } catch (error) {
    text.value = "Error occurred"
    console.error("Error getting text:", error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.hello-page__block {
  margin-top: 10px;
}

.hello-page__text {
  color: purple;
  margin-bottom: 10px;
}

.hello-page__loading {
  color: #666;
  font-style: italic;
  margin-top: 10px;
}

.hello-page__navigation {
  margin-top: 20px;
  text-align: center;
}

.hello-page__link {
  display: inline-block;
  padding: 10px 20px;
  background: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.hello-page__link:hover {
  background: #218838;
}

.hello-page button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.hello-page button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.hello-page button:hover:not(:disabled) {
  background: #0056b3;
}
</style>
