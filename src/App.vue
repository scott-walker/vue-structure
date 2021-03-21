<template>
  <div class="application">
    <nav class="application__nav">
      <router-link class="application__nav-item" :to="{ name: 'Home' }">Home</router-link>
      <router-link class="application__nav-item" :to="{ name: 'Hello' }">Hello</router-link>
    </nav>

    <div class="application__content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.application {
  width: 100vw;
  height: 100vh;

  &__nav {
    padding: 10px;

    &-item {
      margin-right: 10px;
    }
  }
  &__content {
    padding: 10px;
  }
}
</style>
