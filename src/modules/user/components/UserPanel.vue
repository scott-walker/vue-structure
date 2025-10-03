<template>
  <div class="application__user">
    <div class="application__user-panel user-panel" v-if="isLogged">
      <span class="user-panel__name">{{ name }}</span>
      <button class="user-panel__buttom" @click="onLogout()">Выйти</button>
    </div>

    <div class="application__user-form user-form" v-else>
      <div class="user-form__form">
        <div class="user-form__fields">
          <input class="user-form__field" type="text" v-model="email" placeholder="Email" />
          <input class="user-form__field" type="password" v-model="password" placeholder="Password" />
        </div>
        <div v-if="error" class="user-form__error">{{ error }}</div>
      </div>

      <button class="user-form__buttom" @click="onLogin()">Войти</button>
    </div>

    <div v-show="loading" class="application__user-loader">Идет загрузка...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from "vue"
import type { SharedContext } from "@types"
import type { UserStore } from "../types"

const { useStored } = inject<SharedContext>("context")!

// Реактивные данные
const email = ref("")
const password = ref("")
const error = ref<string | null>(null)

// Используем Store stores
const userStore = useStored<UserStore>("user")

// Computed свойства
const loading = computed(() => userStore.loading)
const name = computed(() => userStore.name)
const isLogged = computed(() => userStore.isLogged)

/**
 * Обработать логин
 */
const onLogin = async (): Promise<void> => {
  if (!email.value || !password.value) {
    error.value = "Заполните все поля"
    return
  }

  try {
    error.value = null

    await userStore.login(email.value, password.value)

    email.value = ""
    password.value = ""
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Ошибка входа"
  }
}

/**
 * Обработать выход
 */
const onLogout = async (): Promise<void> => {
  await userStore.logout()
}
</script>

<style scoped>
.application__user {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f3f3f3;
}
.user-panel__name {
  margin-right: 10px;
}
.user-panel__buttom {
  padding: 8px 16px;
  background: var(--vt-c-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.user-form {
  display: flex;
  align-items: flex-start;
}
.user-form__form {
  display: flex;
  flex-direction: column;
}
.user-form__fields {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.user-form__error {
  padding: 5px;
  font-size: 12px;
  color: #dc3545;
  margin-bottom: 10px;
}
.user-form__field {
  margin-right: 20px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
.user-form__field:focus {
  outline: none;
  border-color: var(--vt-c-primary);
}
.user-form__buttom {
  padding: 8px 16px;
  background: var(--vt-c-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.application__user-loader {
  margin: 0 20px;
  font-size: 12px;
  font-weight: bold;
  color: var(--vt-c-primary);
}
</style>
