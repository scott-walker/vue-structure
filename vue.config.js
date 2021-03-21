const path = require("path")

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [".js", ".json", ".vue", ".css", ".scss"],
      alias: {
        "@root": path.resolve(__dirname, "src"),
        "@base": path.resolve(__dirname, "src/base"),
        "@config": path.resolve(__dirname, "src/config"),
        "@modules": path.resolve(__dirname, "src/modules"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@assets": path.resolve(__dirname, "src/assets")
      }
    }
  }
}
