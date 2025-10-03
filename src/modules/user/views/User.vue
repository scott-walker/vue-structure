<script setup lang="ts">
import { computed, inject, watch } from "vue"
import { type SharedContext } from "@types"
import { type UserStore } from "../types"

const { useStored, useRouter } = inject<SharedContext>("context")!
const userStore = useStored<UserStore>("user")
const router = useRouter()

const isLogged = computed(() => userStore.isLogged)
const name = computed(() => userStore.name)

watch(isLogged, () => {
  if (!isLogged.value) {
    router.push({ name: "Login" })
  }
})
</script>

<template>
  <div class="user">
    <h1>User: {{ name }}</h1>
    <p>This is user page</p>
  </div>
</template>

<style scoped>
.user {
  margin: 20px;
}
</style>
