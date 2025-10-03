<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <button class="button" :class="props.class">
    <slot />
  </button>
</template>

<style scoped>
.button {
  padding: 8px 16px;
  background: var(--vt-c-primary);
  color: var(--vt-c-white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
