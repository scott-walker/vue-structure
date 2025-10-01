import { type RouteRecordRaw } from "vue-router"

export default ({ invoke }: { invoke: (address: string) => unknown }): RouteRecordRaw[] => {
  const accessManager = invoke("@utils/AccessManager") as { isLogged: () => boolean }

  return [
    {
      path: "/hello",
      name: "Hello",
      component: () => import("./views/Hello.vue"),
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
