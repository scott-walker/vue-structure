import "./assets/main.css"

import { Application, Context } from "@core"
import { config } from "@config"
import { initUtils } from "@utils"
// import { registerPlugins } from "@plugins"
import { modules } from "@modules"
import root from "./App.vue"

// Создать контекст
const context = new Context()

// Установить конфигурацию
context.setConfig(config)

// Установить общедоступный API
context.setShared("utils", initUtils(config.utils))

// Создать приложение
new Application({ root, context, modules }).mount("#app")
