import { type RouterRoute } from "@types"
import User from "./views/User.vue"

/**
 * Инициализировать маршруты модуля
 */
export const inirRoutes = (): RouterRoute[] => {
  return [
    {
      path: "/user",
      name: "User",
      component: User
    }
  ]
}
