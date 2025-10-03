<script setup lang="ts">
import UserPanel from "@modules/user/components/UserPanel.vue"
</script>

<template>
  <div class="application">
    <UserPanel />
    <router-view />
  </div>
</template>

<style>
.application {
  width: 100vw;
  height: 100vh;
}
</style>
