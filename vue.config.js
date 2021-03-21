const path = require("path")

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [".js", ".json", ".vue", ".css", ".scss"],
      alias: {
        "@root": path.resolve(__dirname, "src"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@base": path.resolve(__dirname, "src/base"),
        "@config": path.resolve(__dirname, "src/config"),
        "@modules": path.resolve(__dirname, "src/modules"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@plugins": path.resolve(__dirname, "src/plugins")
      }
    }
  }
}
