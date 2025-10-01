<template>
  <div class="home">
    <h1>Home</h1>
    <p>This is home page</p>
    <div class="home__features">
      <h2>Features</h2>
      <ul>
        <li>Vue 3 with Composition API</li>
        <li>TypeScript support</li>
        <li>Store state management</li>
        <li>Modular architecture</li>
        <li>Dependency injection</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.home__features {
  margin-top: 20px;
}

.home__features h2 {
  color: #333;
  margin-bottom: 10px;
}

.home__features ul {
  list-style-type: disc;
  padding-left: 20px;
}

.home__features li {
  margin-bottom: 5px;
  color: #666;
}
</style>
