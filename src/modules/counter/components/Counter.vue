<template>
  <div class="counter">
    <h3>Counter Component</h3>
    <div class="counter__display">
      <p>Count: {{ count }}</p>
      <p>Double: {{ doubleCount }}</p>
      <p>Even: {{ isEven ? "Yes" : "No" }}</p>
    </div>
    <div class="counter__controls">
      <button @click="increment" :disabled="loading">+</button>
      <button @click="decrement" :disabled="loading">-</button>
      <button @click="reset" :disabled="loading">Reset</button>
    </div>
    <div v-if="loading" class="counter__loading">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useCounterStore } from "../store"

// Имя компонента
defineOptions({
  name: "Counter"
})

// Используем store модуля
const counterStore = useCounterStore()

// Computed свойства
const count = computed(() => counterStore.getCount)
const doubleCount = computed(() => counterStore.getDoubleCount)
const isEven = computed(() => counterStore.getIsEven)
const loading = computed(() => false) // Можно добавить loading состояние

// Методы
const increment = (): void => counterStore.increment()
const decrement = (): void => counterStore.decrement()
const reset = (): void => counterStore.reset()
</script>

<style scoped>
.counter {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  background: #f9f9f9;
}

.counter__display {
  margin-bottom: 15px;
  text-align: center;
}

.counter__display p {
  margin: 5px 0;
  font-size: 18px;
}

.counter__controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 15px;
}

.counter__controls button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  min-width: 60px;
}

.counter__controls button:hover:not(:disabled) {
  background: #0056b3;
}

.counter__controls button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.counter__loading {
  text-align: center;
  color: #666;
  font-style: italic;
}
</style>
