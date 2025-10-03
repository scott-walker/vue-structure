import { type ModuleInitRoutes } from "@types"
import { type UserStore } from "./types"
import User from "./views/User.vue"
import Login from "./views/Login.vue"

/**
 * Инициализировать маршруты модуля
 */
export const inirRoutes: ModuleInitRoutes = ({ useStored }) => {
  return [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/user",
      name: "User",
      component: User,
      beforeEnter: (to, from, next) => {
        const userStore = useStored<UserStore>("user")

        if (userStore.isLogged) {
          next()
        } else {
          next({ name: "Login" })
        }
      }
    }
  ]
}
