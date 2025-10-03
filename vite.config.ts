import path from "path"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"

const __dirname = import.meta.dirname
const src = path.resolve(__dirname, "src")

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    alias: {
      "@types": path.resolve(src, "types"),
      "@core": path.resolve(src, "core"),
      "@config": path.resolve(src, "config"),
      "@utils": path.resolve(src, "utils"),
      "@modules": path.resolve(src, "modules"),
      // "@plugins": path.resolve(src, "plugins"),
      "@assets": path.resolve(src, "assets")
    }
  }
})
