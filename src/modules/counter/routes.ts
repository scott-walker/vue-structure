import { type RouteRecordRaw } from "vue-router"
import CounterView from "./views/CounterView.vue"

export default ({ invoke }: { invoke: (address: string) => unknown }): RouteRecordRaw[] => {
  const accessManager = invoke("@utils/AccessManager") as { isLogged: () => boolean }

  return [
    {
      path: "/counter",
      name: "Counter",
      component: CounterView,
      beforeEnter: (to, from, next) => {
        if (accessManager.isLogged()) {
          next()
        } else {
          next({ name: "Home" })
        }
      }
    }
  ]
}
