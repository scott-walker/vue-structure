<template>
  <nav v-if="isLogged" class="breadcrumbs">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item">
        <router-link to="/" class="breadcrumb-link">🏠 Главная</router-link>
      </li>
      <li v-if="routeName !== 'Home'" class="breadcrumb-item">
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-current">{{ getPageTitle(routeName) }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useUserStore } from "@/modules/app/stores"

// Используем Store и роутер
const userStore = useUserStore()
const route = useRoute()

// Computed свойства
const isLogged = computed(() => userStore.isLogged)
const routeName = computed(() => route.name as string)

/**
 * Получить название страницы по имени роута
 */
const getPageTitle = (routeName: string): string => {
  const titles: Record<string, string> = {
    Home: "Главная",
    Hello: "Приветствие",
    Counter: "Счетчик"
  }
  return titles[routeName] || routeName
}
</script>

<style scoped>
/* Хлебные крошки */
.breadcrumbs {
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #dee2e6;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 8px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.breadcrumb-link {
  color: #007bff;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.breadcrumb-link:hover {
  background: #f8f9fa;
  text-decoration: none;
}

.breadcrumb-separator {
  color: #6c757d;
  margin: 0 4px;
}

.breadcrumb-current {
  color: #495057;
  font-weight: 500;
  padding: 4px 8px;
  background: #e9ecef;
  border-radius: 4px;
}
</style>
