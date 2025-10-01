import { type RouteRecordRaw } from "vue-router"
import Home from "./views/Home.vue"

/**
 * Получить маршруты в контексте
 */
export default (): RouteRecordRaw[] => {
  return [
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ]
}
