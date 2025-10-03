<script setup lang="ts">
import { ref, computed, inject } from "vue"
import type { SharedContext } from "@types"
import type { UserStore } from "../types"
import Button from "@shared/ui/Button.vue"

const { useStored, useRouter } = inject<SharedContext>("context")!
const userStore = useStored<UserStore>("user")
const router = useRouter()

const email = ref("")
const password = ref("")
const error = ref<string | null>(null)

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

    router.push({ name: "User" })
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

<template>
  <div class="user-panel">
    <div class="user-panel__item" v-if="isLogged">
      <span class="user-panel__name">{{ name }}</span>
      <Button class="user-panel__buttom" @click="onLogout()">Выйти</Button>
    </div>

    <form v-else class="user-panel__item user-form" @submit.prevent="onLogin()">
      <div class="user-form__form">
        <input
          class="user-form__field"
          name="email"
          type="text"
          v-model="email"
          placeholder="Email"
          autocomplete="email"
        />
        <input
          class="user-form__field"
          name="password"
          type="password"
          v-model="password"
          placeholder="Password"
          autocomplete="current-password"
        />
        <Button class="user-form__buttom" type="submit">Войти</Button>
      </div>
      <div v-if="error" class="user-form__error">{{ error }}</div>
    </form>

    <div v-show="loading" class="user-panel__item">
      <span class="user-panel__loader">Идет загрузка...</span>
    </div>
  </div>
</template>

<style scoped>
.user-panel {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: var(--color-background-soft);
}
.user-panel__item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--color-background-soft);
}
.user-panel__loader {
  margin: 0 20px;
  font-size: 12px;
  font-weight: bold;
  color: var(--vt-c-primary);
}
.user-form {
  display: flex;
  flex-direction: column;
}
.user-form__form {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-form__field {
  padding: 8px 12px;
  border: 1px solid var(--vt-c-border);
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline-color: var(--vt-c-primary);
    border-color: var(--vt-c-primary);
  }
}
.user-form__error {
  padding: 5px;
  font-size: 12px;
  color: #dc3545;
}
</style>
