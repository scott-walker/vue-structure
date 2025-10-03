<script setup lang="ts">
import UserPanel from "@modules/user/shared/UserPanel.vue"
</script>

<template>
  <div class="app">
    <header class="app__header">
      <h1>VUE_MODULAR_STRUCTURE</h1>
    </header>

    <div class="app__panel">
      <UserPanel />
    </div>

    <nav class="app__nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/user">User</router-link>
    </nav>

    <main class="app__content">
      <router-view />
    </main>
  </div>
</template>

<style>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.app__header {
  padding: 20px;
  width: 100%;
  text-align: center;
}
.app__panel {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
  background: var(--color-background-soft);
}
.app__nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;

  & a {
    font-size: 26px;
    text-decoration: none;
    color: var(--color-text);

    &.router-link-active {
      font-weight: bold;
      color: var(--vt-c-primary);
    }
  }
}
.app__content {
  width: 100%;
  height: 100%;
}
</style>
