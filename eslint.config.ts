import { globalIgnores } from "eslint/config"
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript"
import pluginVue from "eslint-plugin-vue"
import pluginVitest from "@vitest/eslint-plugin"
import pluginPlaywright from "eslint-plugin-playwright"
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting"

export default defineConfigWithVueTs(
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"]
  },

  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

  pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"]
  },

  {
    ...pluginPlaywright.configs["flat/recommended"],
    files: ["e2e/**/*.{test,spec}.{js,ts,jsx,tsx}"]
  },

  {
    name: "app/vue-rules",
    files: ["**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off"
    }
  },

  {
    name: "app/typescript-rules",
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-this-alias": "off"
    }
  },

  skipFormatting
)
