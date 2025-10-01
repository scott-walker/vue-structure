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
      "@": src,
      "@base": path.resolve(src, "base"),
      "@config": path.resolve(src, "config"),
      "@utils": path.resolve(src, "utils"),
      "@plugins": path.resolve(src, "plugins"),
      "@modules": path.resolve(src, "modules"),
      "@assets": path.resolve(src, "assets"),
      "@components": path.resolve(src, "components"),
      "@types": path.resolve(src, "types")
    }
  }
})
