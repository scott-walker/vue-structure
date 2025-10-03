import { type RouterRoute } from "@types"
import Home from "./views/Home.vue"
import About from "./views/About.vue"
import NotFound from "./views/NotFound.vue"
import PermissionDenied from "./views/PermissionDenied.vue"

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
    },
    {
      path: "/permission-denied",
      name: "PermissionDenied",
      component: PermissionDenied
    },
    {
      path: "/not-found",
      name: "NotFound",
      component: NotFound
    }
  ]
}
