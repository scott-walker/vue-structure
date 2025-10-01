<template>
  <div class="application">
    <UserPanel />
    <AppNavigation />
    <AppContent />
  </div>
</template>

<script setup lang="ts">
import UserPanel from "@/components/UserPanel.vue"
import AppNavigation from "@/components/AppNavigation.vue"
import AppContent from "@/components/AppContent.vue"
</script>

<style>
.application {
  width: 100vw;
  height: 100vh;
}
</style>
