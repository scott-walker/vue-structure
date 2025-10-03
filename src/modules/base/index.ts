import { Module } from "@core"
import { inirRoutes } from "./routes"

/**
 * Модуль для работы с пользователем
 */
export const baseModule = new Module({
  id: "user",
  inirRoutes
})
