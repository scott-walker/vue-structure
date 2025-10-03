<template>
  <div class="counter-view">
    <h1>{{ message }}</h1>

    <!-- Основной счетчик -->
    <div class="counter-view__main">
      <Counter />
    </div>

    <!-- Дополнительные контролы -->
    <div class="counter-view__controls">
      <div class="counter-view__input-section">
        <input v-model="newMessage" placeholder="Enter new message" @keyup.enter="updateMessage" />
        <button @click="updateMessage">Update Message</button>
      </div>

      <div class="counter-view__number-section">
        <input v-model.number="newCount" type="number" placeholder="Set count value" @keyup.enter="setCount" />
        <button @click="setCount">Set Count</button>
      </div>
    </div>

    <!-- Информация о состоянии -->
    <div class="counter-view__info">
      <p>Current count: {{ count }}</p>
      <p>Double count: {{ doubleCount }}</p>
      <p>Is even: {{ isEven ? "Yes" : "No" }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useCounterStore } from "../store"
import Counter from "../components/Counter.vue"

// Имя компонента
defineOptions({
  name: "CounterView"
})

// Используем store модуля
const counterStore = useCounterStore()

// Реактивные данные
const newMessage = ref("")
const newCount = ref(0)

// Computed свойства
const message = computed(() => counterStore.getMessage)
const count = computed(() => counterStore.getCount)
const doubleCount = computed(() => counterStore.getDoubleCount)
const isEven = computed(() => counterStore.getIsEven)

// Методы
const updateMessage = (): void => {
  if (newMessage.value.trim()) {
    counterStore.setMessage(newMessage.value.trim())
    newMessage.value = ""
  }
}

const setCount = (): void => {
  if (!isNaN(newCount.value)) {
    counterStore.setCount(newCount.value)
    newCount.value = 0
  }
}
</script>

<style scoped>
.counter-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.counter-view__main {
  margin: 2rem 0;
}

.counter-view__controls {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.counter-view__input-section,
.counter-view__number-section {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.counter-view__input-section input,
.counter-view__number-section input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 200px;
}

.counter-view__input-section button,
.counter-view__number-section button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.counter-view__input-section button:hover,
.counter-view__number-section button:hover {
  background: #0056b3;
}

.counter-view__info {
  margin-top: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: left;
}

.counter-view__info p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}
</style>
