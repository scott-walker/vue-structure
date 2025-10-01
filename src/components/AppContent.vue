<template>
  <div class="application__content">
    <Breadcrumbs />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from "./Breadcrumbs.vue"
</script>

<style scoped>
.application__content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 200px);
}
</style>
