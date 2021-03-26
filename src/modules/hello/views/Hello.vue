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
  // context: ({ invoke }) => {
  //   return {
  //     textService: invoke("textService")
  //   }
  // },
  context: [{ name: "TextService", from: "@hello/services/TextService", method: "make" }],
  // context: {
  //   // textService: "@hello/services/TextService",
  //   textService: { name: "TextService", from: "@hello/services/TextService", method: "make" }
  // },
  // computed: {
  //   textService() {
  //     return this.$context.invoke("textService")
  //   }
  // },
  methods: {
    onGetText() {
      this.text = "Please wait..."
      this.$nextTick(async () => {
        // this.text = await this.$textService.getText()
        this.text = await this.$TextService.getText()
      })

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
