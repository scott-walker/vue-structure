<template>
  <nav v-if="isLogged" class="application__nav">
    <div class="nav-container">
      <h3 class="nav-title">Навигация</h3>
      <div class="nav-links">
        <router-link class="application__nav-item" :to="{ name: 'Home' }" active-class="nav-item--active">
          🏠 Главная
        </router-link>
        <router-link class="application__nav-item" :to="{ name: 'Hello' }" active-class="nav-item--active">
          👋 Приветствие
        </router-link>
        <router-link class="application__nav-item" :to="{ name: 'Counter' }" active-class="nav-item--active">
          🔢 Счетчик
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useUserStore } from "@/modules/app/stores"

// Используем Store
const userStore = useUserStore()

// Computed свойства
const isLogged = computed(() => userStore.isLogged)
</script>

<style scoped>
.application__nav {
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  padding: 15px 20px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
}

.nav-title {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 600;
  color: #495057;
}

.nav-links {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.application__nav-item {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  color: #495057;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-weight: 500;
  border: 1px solid transparent;
}

.application__nav-item:hover {
  background: #e9ecef;
  color: #007bff;
  border-color: #dee2e6;
  text-decoration: none;
}

.nav-item--active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.nav-item--active:hover {
  background: #0056b3;
  color: white;
  border-color: #0056b3;
}
</style>
