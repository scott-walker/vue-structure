import { type RouterRoute } from "@types"
import Home from "./views/Home.vue"
import About from "./views/About.vue"

/**
 * Инициализировать маршруты модуля
 */
export const inirRoutes = (): RouterRoute[] => {
  return [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/about",
      name: "About",
      component: About
    }
  ]
}
