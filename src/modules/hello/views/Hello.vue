<template>
  <div class="hello">
    <h1>Hello</h1>
    <div class="hello__block">
      <div v-if="text" class="hello__text">{{ text }}</div>
      <button @click="onGetText">Get Text</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hello",
  data() {
    return {
      text: ""
    }
  },
  methods: {
    async onGetText() {
      this.text = "Some text"
      // this.text = await this.$textService.getText()
      // this.$alert.error("Some error")
      // this.$modal.show("hello")
    }
  }
}
</script>

<style lang="scss" scoped>
.hello {
  &__block {
    margin-top: 10px;
  }

  &__text {
    color: purple;
  }
}
</style>
