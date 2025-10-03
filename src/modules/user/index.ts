import { Module } from "@core"
import { inirRoutes } from "./routes"
import { initStored } from "./store"
import { initShared } from "./share"

/**
 * Модуль для работы с пользователем
 */
export default new Module({
  id: "user",
  inirRoutes,
  initStored,
  initShared
})
