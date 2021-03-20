<template>
  <div class="home">
    <h1>Home</h1>
    <div>
      <div v-if="text" class="home__text">{{ text }}</div>
      <button @click="onGetText">Get Text</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      text: ""
    }
  },
  depends: ["alert", "modal", "textService"],
  methods: {
    async onGetText() {
      this.text = await this.$textService.getText()

      this.$alert.error("Some error")
      this.$modal.show("hello")
    }
  }
}
</script>

<style lang="scss">
.home {
  padding: 20px;

  &__text {
    color: purple;
  }
}
</style>
