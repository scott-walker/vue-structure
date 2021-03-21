import Application from "@base/Application"
import Context from "@base/Context"
import App from "./App"
import config from "@config"
import utils from "@utils"
import modules from "@modules"

// Создать контекст приложения
const context = new Context(config, { dependencies: utils })

// Инициализировать приложение
const app = new Application(App, modules, context, config.main)

// Монтировать приложение
app.mount("#app")
