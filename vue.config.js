const path = require("path")

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [".js", ".json", ".vue", ".css", ".scss"],
      alias: {
        "@base": path.resolve(__dirname, "src/base"),
        "@config": path.resolve(__dirname, "src/config"),
        // "@utils": path.resolve(__dirname, "src/utils"),
        "@common": path.resolve(__dirname, "src/common"),
        "@modules": path.resolve(__dirname, "src/modules")
        // "@assets": path.resolve(__dirname, "src/assets")
        // "@modules": path.resolve(__dirname, "src/modules"),
        // "@layouts": path.resolve(__dirname, "src/layouts"),
        // "@helpers": path.resolve(__dirname, "src/helpers"),
        // "@plugins": path.resolve(__dirname, "src/plugins"),
        // "@services": path.resolve(__dirname, "src/services"),
      }
    }
  }
}
