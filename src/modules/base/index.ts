import { Module } from "@core"
import { inirRoutes } from "./routes"

/**
 * Модуль для работы с пользователем
 */
export default new Module({
  id: "user",
  inirRoutes
})
