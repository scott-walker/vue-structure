import { type Module } from "@types"
// Базовый модуль
import base from "./base"
// Модуль для ознакомления
import hello from "./hello"
// Модуль приложения (глобальные stores)
import app from "./app"
// Модуль счетчика
import counter from "./counter"

// Коллекция подключенных модулей приложения
const modules: Module[] = [base, app, hello, counter]

export default modules
